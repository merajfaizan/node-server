const http = require("node:http");
const fs = require("fs");

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Welcome to Full Stack Development</h1>`);
  }
  if (req.url == "/read") {
    const result = fs.readFileSync("first.txt");
    res.end(result);
  }
  if (req.url == "/write") {
    const result = fs.readFileSync("first.txt");
    const newResult = fs.writeFile("./second.txt", result, () => {
      res.end(`written the result ${result}`);
    });
  }
  if (req.url == "/append") {
    const result = fs.readFile("./first.txt", () => {
      console.log(`data read`);
    });
    const text = " No! It will be full not pull !";
    const update = fs.appendFile("./first.txt", text, () => {
      res.end(`file updated`);
    });
  }
  if (req.url == "/delete") {
    const remove = fs.unlink("./second.txt", () => {
      try {
        res.end("File Delete Successfully");
      } catch (error) {
        console.log(error);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
