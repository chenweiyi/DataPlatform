import Koa from 'koa';
import debugLibrary from 'debug';
import { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { getPool } from './mysql';
import { CronJob } from 'cron';
import dayjs from 'dayjs';

export type IModifyTableFieldOption = {
  id: number;
  key?: string;
  value: number | string | Record<string, any>;
  conn?: PoolConnection;
  field?: string;
  table?: string;
};

export const commonResponse = async (
  ctx: Koa.Context,
  task: () => Promise<any>,
  debug?: debugLibrary.Debugger,
) => {
  try {
    const res = await task();
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    };
  } catch (error) {
    debug?.(error);
    ctx.status = 200;
    ctx.body = {
      code: 500,
      msg: error.message,
    };
  }
};

export const modifyTableField = async (option: IModifyTableFieldOption) => {
  const {
    id,
    key = 'id',
    value,
    conn = null,
    field = 'status',
    table = 'task',
  } = option;
  const pool = conn || getPool();
  if (typeof value === 'object') {
    await pool.query<ResultSetHeader>(
      `UPDATE ${table} SET ? WHERE ${key || 'id'} IN (?)`,
      [value, id],
    );
  } else {
    await pool.query<ResultSetHeader>(
      `UPDATE ${table} SET ${field} = ? WHERE ${key || 'id'} = ?`,
      [value, id],
    );
  }
};

export const getNextTime = (cronTime: string) => {
  let time: string = cronTime.trim();
  let ct: string | Date = time;

  if (!isNaN(Number(time))) {
    // 兼容时间戳
    ct = new Date(+time);
  }

  try {
    const job = CronJob.from({
      cronTime: ct,
      onTick: async () => {},
      start: false,
      timeZone: 'Asia/Shanghai',
    });
    const nextDate = job.nextDate();
    return dayjs(nextDate.setZone('Asia/Shanghai').valueOf()).format(
      'YYYY-MM-DD HH:mm:ss',
    );
  } catch {
    return null;
  }
};