import { createClient } from 'redis';
import { RedisQueueConsumer } from './consumer';

(async () => {
	const client = createClient();
	await client.connect();

	console.log('listening for messages');

	const consumer = new RedisQueueConsumer(client, 'test');

	for await (const message of consumer.messages()) {
		console.log(message);
	}
})();
