const http = require("http");
const url = require("url");
const fs = require("fs");

const routeHandlers = {
  "/": homeHandler,
  "/heroes": heroHandler,
  "/contact": contactHandler,
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const handler = routeHandlers[path] || notFoundHandler;
  handler(req, res);
});

const app = express();

function homeHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
}

function heroHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("heroes.html").pipe(res);
}

function contactHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("contact.html").pipe(res);
}

function notFoundHandler(req, res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Not Found");
}

app.get('/home', (req,res) => {
  res.render('home')
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});