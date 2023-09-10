import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

createReadStream("bigfile.txt")
  .pipe(createGzip())
  .pipe(createWriteStream("bigfile.txt.gz"));
