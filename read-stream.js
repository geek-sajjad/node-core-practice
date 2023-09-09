import fs from "node:fs";

// default highWaterMark is 64KB
const readableStream = fs.createReadStream("input.txt", {
  encoding: "utf8",
});

// const readableStream = fs.createReadStream("image.png", {
//   encoding: "hex",
// });

readableStream.on("data", (chunk) => {
  console.log("this is chunk", chunk);
});

readableStream.on("end", () => {
  console.log("end of file");
});
