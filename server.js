import { createServer } from "http";
import { createReadStream, statSync, readFile } from "fs";

const server = createServer((req, res) => {
  if (req.url === "/") {
    const fileStream = createReadStream("video.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    return fileStream.pipe(res);
  }

  if (req.url === "/stream") {
    const range = req.headers.range;
    if (!range) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Requires Range header");
    }
    console.log(range);

    const stat = statSync("video.mp4");
    const videoSize = stat.size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = createReadStream("video.mp4", { start, end });
    return videoStream.pipe(res);
  }

  if ((req.url = "video-file")) {
    const stat = statSync("video.mp4");
    const videoSize = stat.size;
    const chunkSize = 30 * 1024;

    const range = req.headers.range;

    let header = {
      "Content-Disposition": `attachment; filename="video.mp4"`,
      "Content-Type": "video/mp4",
      "Content-Length": videoSize,
      "Accept-Ranges": "bytes",
    };
    console.log(req.headers.agent);
    console.log(range);

    if (range) {
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + chunkSize, videoSize - 1);
      const contentLength = end - start + 1;

      header["Content-Range"] = `bytes ${start}-${end}/${videoSize}`;
      header["Content-Length"] = contentLength;
    }

    res.writeHead(200, header);

    const delayBetweenChunks = 1000; // 1 second (adjust as needed)

    const readStream = createReadStream("video.mp4", {
      highWaterMark: chunkSize,
      // start,
      // end,
    });

    readStream.on("end", () => {
      res.end(); // End the response when the stream is finished
    });
    readStream.on("error", (err) => {
      console.error("Error:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    });

    return readStream.on("data", (chunk) => {
      // let chunk = readStream.read(chunkSize);

      // if (!chunk) return;

      // console.log(`Received ${chunk.length} bytes of data`);
      res.write(chunk);
      readStream.pause();

      setTimeout(() => {
        readStream.resume(); // Resume the stream after the delay
      }, delayBetweenChunks);
    });
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
