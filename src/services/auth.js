export const USER_LOGIN = "POST /login"; // account, password 密码需要加密
export const USER_LOGOUT = "GET /logout"; // 登出
export const GET_LOGIN_USER = "GET /getLoginUser"; // 获取登录用户信息
export const GET_SMS_CAPTCHA = "GET /getSmsCaptcha"; // 获取短信验证码
export const GET_CAPTCHA_IMG = "POST /captcha/get"; //获取验证图片和token
export const CHECK_CAPTCHA = "POST /captcha/check"; //滑动或者点选验证
