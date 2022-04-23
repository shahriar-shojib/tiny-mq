import { createClient } from 'redis';
import { RedisQueueProducer } from './producer';

(async () => {
	const client = createClient({
		url: 'redis://localhost:6379',
	});
	client.on('error', console.log);
	await client.connect();

	const producer = new RedisQueueProducer(client, 'test');

	for (let i = 0; i < 10; i++) {
		producer.publish({
			message: `message ${i}`,
			index: String(i),
		});
	}
})();
