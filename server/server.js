const express = require("express");
const app = express();
const http = require("http");
const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = http.createServer(app);
const io = require("socket.io")(server);
const router = jsonServer.router("db.json");
global.io = io;

router.render = (req, res) => {
    console.log(req.locals?.data)
    res.json(res.locals?.data)
}

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;


// Bind the router db to the app
app.db = router.db;

app.use(middlewares);

const rules = auth.rewriter({
    users: 640,
    conversations: 660,
    messages: 660,
});

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port);
