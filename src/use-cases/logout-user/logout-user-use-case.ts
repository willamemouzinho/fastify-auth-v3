import { redis } from '../../database/redis'

export interface ILogoutUserRequest {
  accessToken: string
  refreshToken: string
  userId: string
}

export class LogoutUserUseCase {
  async execute({ userId, accessToken, refreshToken }: ILogoutUserRequest) {
    await redis.set(accessToken, userId, 'EX', 60 * 60)
    await redis.set(refreshToken, userId, 'EX', 60 * 60)

    console.log('tokens adicionados a lista negra\n')

    return true
  }
}

// const votes = await redis.zincrby(
//   pollId,
//   -1,
//   userPreviousVoteOnPoll.pollOptionId
// )
