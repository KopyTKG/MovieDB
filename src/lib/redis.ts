import { Redis } from 'ioredis';

const getRedisUrl = () => {
	if (process.env.REDIS_URL) {
		return process.env.REDIS_URL;
	} else {
		throw new Error('REDIS_URL is not defined');
	}
};

const RedisInstance = new Redis(getRedisUrl());

export default RedisInstance;