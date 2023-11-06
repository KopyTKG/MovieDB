import { Redis } from "ioredis";

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL
    } else {
        throw new Error("REDIS_URL is not defined")
    }
}

export default new Redis(getRedisUrl())