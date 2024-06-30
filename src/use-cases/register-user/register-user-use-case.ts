import bcrypt from 'bcrypt'

import { postgres } from '../../database/postgres'
import { GenerateAccessTokenProvider } from '../../providers/generate-access-token-provider'
import { GenerateRefreshTokenProvider } from '../../providers/generate-refresh-token-provider'

export interface IUserRegistrationRequest {
  name: string
  username: string
  password: string
}

export class RegisterUserUseCase {
  async execute({ name, username, password }: IUserRegistrationRequest) {
    const userAlreadyExists = await postgres.user.findUnique({
      where: { username },
    })
    if (userAlreadyExists) {
      throw new Error('Username already exists')
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await postgres.user.create({
      data: { name, username, password: hash },
    })

    const generateAccessTokenProvider = new GenerateAccessTokenProvider()
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
    const accessToken = generateAccessTokenProvider.execute({
      userId: user.id,
      name,
      username,
    })
    const refreshToken = generateRefreshTokenProvider.execute({
      userId: user.id,
      name,
      username,
    })

    return { accessToken, refreshToken }
  }
}
