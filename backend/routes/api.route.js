var express = require("express");
var Twitter = require("twitter");

var router = express.Router();
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

router.get("/tweets/:name", async (req, res, next) => {
  try {
    const username = req.params.name;
    const trends = await client.get("statuses/user_timeline", {
      screen_name: username,
      count: 10
    });
    res.send(trends);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
