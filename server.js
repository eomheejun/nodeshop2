const express = require("express");
const app = express();

const productRoute = require("./api/routes/products");
const orderRoute = require("./api/routes/orders");

app.use("/products", productRoute);//사용자가 3000번에가서 정보를요청하면 products.js로 보냄
app.use("/orders", orderRoute);

const port = 3000;

app.listen(port, console.log(`server started at ${port}`));//서버실행되는 코드


