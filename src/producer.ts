import { createClient } from 'redis';

type IRedisClient = ReturnType<typeof createClient>;

export class RedisQueueProducer {
	constructor(private redisClient: IRedisClient, private queueName: string) {}

	async publish(payload: Record<string, string | Buffer>) {
		await this.redisClient.xAdd(this.queueName, '*', payload, payload);
	}
}
