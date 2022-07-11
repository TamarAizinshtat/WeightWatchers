const express = require('express');
const app = express();
const port=3000;
// const accountRouter=require('./router/accountRouter')
const usersRouter=require('./router/usersRouter')
const meetingRouter=require('./router/meetingRouter')
const diaryRouter=require('./router/diaryRouter')
app.use(express.json());

const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger/swagger.json');

// app.use('/login',accountRouter);
// app.use('/account',accountRouter);

// app.use('/user/:id/diary',diaryRouter)

app.use('/user',usersRouter)

app.use('/meeting',meetingRouter)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
  

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});   









//   {
        //     "id": "id",
        //     "firstName": "firstName",
        //     "lastName":"lastName",
        //     "address": {
        //         "city": "city",
        //         "street": "street",
        //         "number": "number"
        //     },
        //     "phone": "phone",
        //     "email": "email",
        //     "password": "password"
           
        // },