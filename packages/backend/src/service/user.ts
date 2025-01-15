import { genRandomNumber } from '../utils/business';
import { transporter } from '../utils/mail';
import { MyContext } from '../@types/api';
import dayjs from 'dayjs';
import { getConn } from '../utils/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import debugLibrary from 'debug';
import { encodeStr } from '../utils/crypto';
import jwt from 'jsonwebtoken';

export type IVerifyCodeParams = {
  email: string;
  uid: string;
};

export type IRegisterUserParams = {
  email: string;
  password: string;
  uid: string;
  code: string;
};

export type ILoginUserParams = {
  email: string;
  password: string;
};

const debug = debugLibrary('user:service');

export const getEmailVerifyCode = async (
  ctx: MyContext,
  query: IVerifyCodeParams,
) => {
  const { email, uid } = query;

  if (!email || !uid) {
    throw new Error(`Need email and uid, got email: ${email}, uid: ${uid}.`);
  }

  let isAlreadySend = false;
  for (let value of ctx.mailValidators.values()) {
    if (value.email === email) {
      isAlreadySend = true;
      break;
    }
  }

  if (isAlreadySend) {
    throw new Error('该邮箱已经发送验证码, 请查收邮件');
  }

  const conn = await getConn();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      'SELECT * FROM user WHERE email = ?',
      [email],
    );

    if (rows.length > 0) {
      throw new Error('邮箱已存在');
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }

  const num = genRandomNumber(4);

  debug('num:', num);

  if (ctx.mailValidators.has(uid)) {
    return;
  } else {
    ctx.mailValidators.set(uid, {
      email,
      num,
      time: dayjs().valueOf(),
    });
  }

  await transporter.sendMail({
    from: 'EasyGetResourceFromWeb 🦋 <easygetresource@163.com>',
    to: email,
    subject: 'Send verification code',
    text: `${email},

  Hello！
  您好！

  Please fill in the following captcha within ${process.env.MAIL_VALID_LIFE_TIME} minutes: ${num}
  请在 ${process.env.MAIL_VALID_LIFE_TIME} 分钟内填写如下验证码：${num}

  Please do not reply to this email as it is sent from an unmanned mailbox.
  请不要回复此电子邮件，因为它是无人值守的邮箱发送的。
`,
  });

  debug('mail send success!');
};

export const registerUser = async (
  ctx: MyContext,
  data: IRegisterUserParams,
) => {
  const { email, password, uid, code } = data;

  if (!email || !password || !uid) {
    throw new Error(
      `Need email, password and uid, got email: ${email}, password: ${password}, uid: ${uid}.`,
    );
  }

  if (!ctx.mailValidators.has(uid)) {
    throw new Error('验证码已过期');
  }

  if (ctx.mailValidators.get(uid).num !== code) {
    throw new Error('验证码不正确');
  }

  const conn = await getConn();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      'SELECT * FROM user WHERE email = ?',
      [email],
    );

    if (rows.length > 0) {
      throw new Error('邮箱已存在');
    }

    const d = {
      email,
      password: encodeStr(password),
      create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      update_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    debug('d:', d);

    const [res] = await conn.query<ResultSetHeader>(
      'INSERT INTO user SET ?',
      d,
    );

    if (res.affectedRows === 0) {
      throw new Error('添加用户失败');
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

export const loginUser = async (ctx: MyContext, data: ILoginUserParams) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error(
      `Need email and password, got email: ${email}, password: ${password}.`,
    );
  }

  const encodePassword = encodeStr(password);

  const conn = await getConn();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      'SELECT * FROM user WHERE email = ? AND password = ?',
      [email, encodePassword],
    );

    if (rows.length === 0) {
      throw new Error('邮箱或密码错误');
    }

    if (rows[0].status !== 1) {
      throw new Error('账号已被禁用或删除');
    }

    const d = {
      last_login_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    debug('d:', d);
    const [res] = await conn.query<ResultSetHeader>(
      'UPDATE user SET ? WHERE email = ?',
      [d, email],
    );

    if (res.affectedRows === 0) {
      throw new Error('更新用户信息失败');
    }

    const [data] = await conn.query<RowDataPacket[]>(
      'SELECT * FROM user WHERE email = ?',
      [email],
    );

    const token = jwt.sign(
      {
        email,
        id: res.insertId,
        lastLoginTime: data[0].last_login_time,
        status: data[0].status,
        type: data[0].type,
      },
      process.env.secret,
      {
        expiresIn: isNaN(Number(process.env.expire))
          ? process.env.expire
          : Number(process.env.expire),
      },
    );

    ctx.response.set('token', token);
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};
