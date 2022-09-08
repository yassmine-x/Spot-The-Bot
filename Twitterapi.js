const axios = require("axios");

const Filter = require("purgomalum-swear-filter");
const badFilter = new Filter();
const token =
  "AAAAAAAAAAAAAAAAAAAAABiMggEAAAAAuaZbc9X7m%2BSFgHooF3bNGIZ9rZA%3DnXWz35Z6h4tj5trUsAq36VQlQ1zFwYsVgJohGVmgQa12I2p8sH";

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getTweets(topic) {
  try {
    const res = await axios.get(
      "https://api.twitter.com/2/tweets/search/recent",
      {
        headers: {
          "User-Agent": "v2RecentSearchJS",
          authorization: `Bearer ${token}`,
        },
        params: {
          "tweet.fields": "lang,author_id",
          "user.fields": "created_at",
          query: `${topic} lang:en -is:retweet -is:reply -has:media -has:links`,
          max_results: 10,
        },
      }
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function screenTweets(tweets) {
  let tweetText = [];
  tweets.forEach((tweet) => tweetText.push(tweet.text));
  for (let i = 0; i < tweetText.length; i++) {
    if (badFilter.containsProfanity(tweetText[i]) === true) {
      tweetText.splice(i, 1);
    }
  }
  return tweetText;
}

async function showTweets(topic) {
  try {
    const tweets = await getTweets(topic);
    const screenedTweets = await screenTweets(tweets);

    let tweetText = [["real"], ["real"]];

    let tweetData = [...screenedTweets];

    let random1 = 1 + Math.floor(Math.random() * tweetData.length - 1);
    let random2 = 1 + Math.floor(Math.random() * tweetData.length - 1);
    random2 === random1
      ? (random2 = 1 + Math.floor(Math.random() * tweetData.length - 1))
      : null;

    tweetText[0].push(tweetData[random1]);
    tweetText[1].push(tweetData[random2]);

    return tweetText;
  } catch (error) {
    console.log(error);
  }
}

module.exports = showTweets;
