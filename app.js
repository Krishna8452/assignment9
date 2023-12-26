require('dotenv').config()
const port = parseInt(process.env.PORT);
const express = require("express");
const bodyParser = require("body-parser")
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const db = require("./config/db")
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.connect()
.then(()=>{
  console.log('postgreSQL database connected successfully')
})
.catch((error) =>{
  console.log(error, "failed to connect with postgreSQL database")
})

const userRouter = require("./routes/userRouter");
const WinstonLoggerMiddleware = require("./middleware/winstonLoggerMiddleware")
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware")

app.use(WinstonLoggerMiddleware)

app.use("/api", userRouter);
app.use(errorHandlerMiddleware)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'This is Node express api for User',
      version: '1.0.0',
      description:'this is a api for user web application'
    },
    servers: [
      {
        url: `https://krishna8452-assignment9.onrender.com`
      }
    ]
  },
  apis  : ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});