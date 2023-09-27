var fs = require("fs");

fs.writeFile("index.txt", "Hello World!", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

fs.readFile("./index.txt", 'utf-8' ,(err, data) => {
    if (err) throw err;
    console.log(data);
})