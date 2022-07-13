const express = require('express');

const app = express();
const db = require('./db/mongoose')
const {port}=require('./config')

const usersRouter=require('./router/usersRouter')
const meetingRouter=require('./router/meetingRouter')
const diaryRouter=require('./router/diaryRouter')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger/swagger.json');


app.use(express.json());

app.use('/user',usersRouter)

app.use('/meeting',meetingRouter)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
  
db.connect();
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});   

