const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");//사용자입력값을 보기편하게 파악

const productRoute = require("./api/routes/products");
const orderRoute = require("./api/routes/orders");

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));




app.use("/products", productRoute);//사용자가 3000번에가서 정보를요청하면 products.js로 보냄
app.use("/orders", orderRoute);


const port = 3000;

app.listen(port, console.log(`server started at ${port}`));//서버실행되는 코드


