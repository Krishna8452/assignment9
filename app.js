const port = 5000;
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
const errorHandlerMiddleware = require("./middleware/statusResponseMiddleware")

app.use(WinstonLoggerMiddleware)

app.use("/api", userRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'This is Node express api for Ecommerce',
      version: '1.0.0',
      description:'this is a api for ecommerce web application'
    },
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ]
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(errorHandlerMiddleware)