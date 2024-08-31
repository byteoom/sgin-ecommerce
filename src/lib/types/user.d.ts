export interface User {
    id: number; // 用户ID
    uuid: string; // 用户唯一标识
    email: string; // 邮箱
    username: string; // 用户名
    password: string; // 密码
    phone: string; // 手机号
    avatar: string; // 头像
    nickname: string; // 昵称
    status: number; // 状态 0:禁用 1:启用 2:删除
    age: number; // 年龄
    sex: string; // 性别 0:未知 1:男 2:女
    signed: string; // 个性签名
  }
  



// 用户登录请求参数
export interface ReqUserLogin {
  /**
   * 用户名或邮箱
   */
  username: string; // 用户名或邮箱，必填
  /**
   * 密码
   */
  password: string; // 密码，必填
}


// 用户登录响应参数
export interface ResUserLogin {
  /**
   * 登录成功后返回的令牌
   */
  token: string; // 登录令牌
}
