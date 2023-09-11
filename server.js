import { createServer } from "http";
import { createReadStream, statSync, readFile } from "fs";

const server = createServer((req, res) => {
  if (req.url === "/") {
    const fileStream = createReadStream("index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    return fileStream.pipe(res);
  }

  if (req.url === "/stream") {
    const range = req.headers.range;
    console.log(range);
    // const videoStream = createReadStream("video.mp4");
    // const stat = statSync("video.mp4");
    // const fileSize = stat.size;

    // res.writeHead(200, {
    //   "Content-Type": "video/mp4",
    //   "Content-Length": fileSize,
    // });

    // return videoStream.pipe(res);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
