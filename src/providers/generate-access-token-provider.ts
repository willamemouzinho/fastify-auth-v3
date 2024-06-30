import { sign } from 'jsonwebtoken'

export interface IUserAccessToken {
  userId: string
  name: string
  username: string
}

export class GenerateAccessTokenProvider {
  execute(user: IUserAccessToken) {
    const accessToken = sign(user, String(process.env.JWT_TOKEN_SECRET), {
      expiresIn: '15m',
    })

    return accessToken
  }
}
