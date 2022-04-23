import { createClient } from 'redis';

type IRedisClient = ReturnType<typeof createClient>;

export class RedisQueueConsumer {
	constructor(private redisClient: IRedisClient, private queueName: string) {}

	async *messages() {
		while (true) {
			const [message] = await this.redisClient.xRange(this.queueName, '-', '+', { COUNT: 1 });

			if (!message) {
				continue;
			}

			const deleteResult = await this.redisClient.xDel(this.queueName, message.id);

			if (deleteResult === 0) {
				continue;
			}

			yield message.message;
		}
	}
}
