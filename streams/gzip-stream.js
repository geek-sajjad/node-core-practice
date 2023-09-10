import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

const file = process.argv[2];

createReadStream(file)
  .pipe(createGzip())
  .pipe(createWriteStream(file + ".gz"));
