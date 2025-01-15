export type ILoginData = {
  email: string;
  password: string;
};

export type IEmailVerifyCodeParams = {
  email: string;
  uid: string;
};

export type IRegisterParams = {
  email: string;
  password: string;
  code: string;
  uid: string;
};

export const login: (data: ILoginData) => Promise<null> = data => {
  return axios({
    url: '/user/login',
    method: 'post',
    data,
  });
};

export const getEmailVerifyCode: (
  params: IEmailVerifyCodeParams,
) => Promise<null> = params => {
  return axios({
    url: '/user/verify/code',
    method: 'get',
    params,
  });
};

export const registerUser: (data: IRegisterParams) => Promise<null> = data => {
  return axios({
    url: '/user/register',
    method: 'post',
    data,
  });
};