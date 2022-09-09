const showTweets = require("../Twitterapi");

describe("showTweets", () => {
  it("Responds with an array", async () => {
    let res = await showTweets();
    expect(Array.isArray(res)).toBe(true);
  });
  it("Responds with an array length of two", async () => {
    let res = await showTweets();
    expect(res.length).toBe(2);
  });
  it("Can take topic subjects as a query", async () => {
    let topic = "Fusion Energy";
    let res = await showTweets(topic);
    expect(res[0].includes(topic) || res[1].includes(topic)).toBe(true);
  });
});
