import fs from "node:fs";

const writableStream = fs.createWriteStream("output.txt");

writableStream.on("ready", () => {
  console.log("ready");
});

writableStream.on("close", () => {
  console.log("close");
});

writableStream.on("open", () => {
  console.log("open");
});

writableStream.on("finish", () => {
  console.log("finish");
});

writableStream.on("error", () => {
  console.log("error");
});

writableStream.write("test");
writableStream.write("test2");

writableStream.end();
