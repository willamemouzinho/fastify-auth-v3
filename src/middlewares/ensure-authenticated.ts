import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
import { redis } from '../database/redis'

export const ensureAuthenticated = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const accessTokenExists = req.headers.authorization
  if (!accessTokenExists) {
    return reply.code(401).send({ message: 'Token is missing' })
  }
  const accessToken = accessTokenExists.split(' ')[1]

  const revokedAccessTokens = await redis.get(accessToken)
  console.log('\n', { revokedAccessTokens }, '\n')

  console.log('\n', { cookies: req.cookies }, '\n')

  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return reply.code(401).send({ message: 'Token expired' })
  }

  const revokedRefreshTokens = await redis.get(refreshToken)
  console.log('\n', { revokedRefreshTokens }, '\n')

  try {
    req.user = verify(accessToken, String(process.env.JWT_TOKEN_SECRET))
    // return
  } catch (err) {
    console.error(err)
    return reply.code(401).send({ message: 'Invalid token' })
  }
}
