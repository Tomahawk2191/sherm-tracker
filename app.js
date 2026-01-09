import { App } from '@slack/bolt';

/**
 * This sample Slack application uses Socket Mode.
 * For the companion getting started setup guide, see:
 * https://docs.slack.dev/tools/bolt-js/getting-started/
 */

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Listens to incoming messages that contain "hello"
app.command('/sherming', async ({ command, say, ack }) => {
  app.logger.info(JSON.stringify(command));
  ack();
  // say() sends a message to the channel where the event was triggered
  await say({
              "text": "Time for another Sherm session?",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Time for another Sherm session?"
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "yuh",
                      },
                      "style": "primary",
                      "value": "start",
                      "action_id": "start_sherming"
                    }
                  ]
                }
              ]});
});

app.action('start_sherming', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> started sherming`);
  // TODO: Start the sherming session, send a message to the channel with the start time and a button to stop the session
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info('⚡️ Bolt app is running!');
})();
