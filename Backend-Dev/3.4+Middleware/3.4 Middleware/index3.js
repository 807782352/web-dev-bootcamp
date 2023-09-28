import express from "express";

const app = express();
const port = 3000;

app.use(logger);

function logger(req, res, next){
  console.log("Request method: ", req.method);
  console.log("Request URL: ", req.url);
  // 注：如果不写next()的话，后面的Hello是无法加载的，一直处于hanging中
  next();
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
