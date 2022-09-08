const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = (prompt) =>
  openai
    .createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 1,
      max_tokens: 75,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['"""'],
    })
    .then((response) => {
      Math.random() > 0.5
        ? console.log(response.data.choices[0].text)
        : console.log(response.data.choices[0].text.toLowerCase());
    });

response(
  `Write a short, informal, passionate and personal statement on metal music, that is less than 280 characters.`
);

const response = openai.listModels().then((response) => {
  console.log(response.data);
});
