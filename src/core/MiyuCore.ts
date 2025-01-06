import { MiyuCore } from './core/MiyuCore';

const config = {
  twitterConfig: {
    apiKey: 'your-twitter-api-key',
    apiSecret: 'your-twitter-api-secret',
  },
  telegramConfig: {
    botToken: 'your-telegram-bot-token',
  },
  openAIConfig: {
    apiKey: 'your-openai-api-key',
  },
  databaseConfig: {
    connectionString: 'postgresql://user:password@localhost:5432/miyu',
  },
  emotionalState: {
    happiness: 0.5,
  },
};

const miyu = new MiyuCore(config);

(async () => {
  await miyu.initializeServices();

  const response = await miyu.processInput('Hello Miyu, how are you?');
  console.log('Response:', response);

  await miyu.postToSocialMedia('Miyu is live and ready!');
})();
