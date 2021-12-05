const express = require("express");
const app = express();
app.use(express.json());

app.post("/v1/update", (req, res) => {
  setTimeout(()=>{
    res.status(200).json(req.body);
  },[1000])
});

app.listen(8000, () => {
  console.log("Server is running");
});
