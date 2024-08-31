import request from '@/lib/utils/request'; // 使用自定义的 request 封装

import { BaseResult, ReqUserLogin, ResUserLogin, User } from '../types'; // 导入请求和响应参数类型

// 用户登录
async function loginUser(data: ReqUserLogin): Promise<BaseResult<ResUserLogin>> {
  return request('/api/v1/login', {
    method: 'POST',
    data,
  });
}


// 获取用户信息
async function getUserInfo(): Promise<BaseResult<User>> {
  return request('/api/v1/user/myinfo', {
    method: 'GET',
  });
}


export const authService = { loginUser, getUserInfo };
