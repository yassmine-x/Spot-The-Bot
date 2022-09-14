const { Configuration, OpenAIApi } = require("openai");
import "react-native-url-polyfill";

async function getAiTweet(prompt) {
  try {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const res = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 1,
      max_tokens: 75,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['"""'],
    });

    return res.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

async function showAiTweet(prompt) {
  try {
    let aiResponse = [["bot"]];
    const aiTweet = await getAiTweet(prompt);
    aiResponse[0].push(aiTweet);
    return aiResponse;
  } catch (error) {
    console.log(error);
  }
}

showAiTweet();
module.exports = showAiTweet;
