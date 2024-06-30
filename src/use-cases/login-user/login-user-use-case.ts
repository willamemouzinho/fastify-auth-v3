import bcrypt from 'bcrypt'

import { postgres } from '../../database/postgres'
import { GenerateAccessTokenProvider } from '../../providers/generate-access-token-provider'
import { GenerateRefreshTokenProvider } from '../../providers/generate-refresh-token-provider'

export interface IUserLoginRequest {
  username: string
  password: string
}

export class LoginUserUseCase {
  async execute({ username, password }: IUserLoginRequest) {
    const user = await postgres.user.findUnique({ where: { username } })
    if (!user) {
      // return reply.code(400).send({ message: 'Invalid credentials' })
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword === false) {
      // return reply.code(400).send({ message: 'Invalid credentials' })
      throw new Error('Invalid credentials')
    }

    const generateAccessTokenProvider = new GenerateAccessTokenProvider()
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
    const accessToken = generateAccessTokenProvider.execute({
      userId: user.id,
      name: user.name,
      username,
    })
    const refreshToken = generateRefreshTokenProvider.execute({
      userId: user.id,
      name: user.name,
      username,
    })

    return { accessToken, refreshToken }
  }
}
