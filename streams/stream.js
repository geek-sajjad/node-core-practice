import { error } from "console";
import { createWriteStream, readFile, createReadStream } from "fs";
import { createServer } from "http";

// create big file
// const fileStream = createWriteStream("bigfile.txt");

// for (let i = 0; i <= 4e6; i++) {
//   fileStream.write(
//     `this is i : ${i}` +
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
//       i
//   );
// }

// const server = createServer();

// server.on("request", (req, res) => {
//   const file = createReadStream("bigfile.txt");

//   file.on("error", (e) => {
//     throw e;
//   });

//   file.pipe(res);
// });

// server.listen(3000);
