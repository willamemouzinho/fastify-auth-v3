import { sign } from 'jsonwebtoken'

export interface IUserRefreshToken {
  userId: string
  name: string
  username: string
}

export class GenerateRefreshTokenProvider {
  execute(user: IUserRefreshToken) {
    const refreshToken = sign(user, String(process.env.JWT_TOKEN_SECRET), {
      expiresIn: '30d',
    })

    return refreshToken
  }
}
