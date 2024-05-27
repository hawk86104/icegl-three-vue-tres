export interface LoginResult {
  token: {
    /**
     * token 值
     */
    tokenValue: string
    /**
     * token key
     */
    tokenName: string
  }
  userinfo: {
    /**
     * 昵称
     */
    nickname: string
    /**
     * 用户名
     */
    username: string
    /**
     * 用户 id
     */
    id: string
  }
}
