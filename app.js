import fs from "node:fs";

// default highWaterMark is 64KB
const readableStream = fs.createReadStream("input.txt", {
  encoding: "utf-8",
  highWaterMark: 1,
});

readableStream.on("data", (chunk) => {
  console.log("this is chunk", chunk);
});

readableStream.on("end", () => {
  console.log("end of file");
});
