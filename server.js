const express = require("express");
const proxy = require("express-http-proxy");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(
    "/twitter",
    proxy("https://api.twitter.com/1.1/search/tweets.json")
  );
  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
