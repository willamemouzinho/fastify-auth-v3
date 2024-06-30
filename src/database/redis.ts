import { Redis } from 'ioredis'

export const redis = new Redis({
  password: 'willame',
})

// const redis = new Redis({})

// async function main() {
//   const create = await redis.lpush('userZ', 'token1')
// const get = await redis.lrange('userY', 0, -1)

// const decodedToken = verify(token, secret);
// const jti = decodedToken.payload.jti;

// await redis.set(`revoked:${token}`, userId, 'EX', expirationInSeconds);
// const result = await redis.get(`revoked:${token}`);

// redis.disconnect()
// console.log({ create })
// console.log({ get })
// return { get }
// }

// const result = main()
