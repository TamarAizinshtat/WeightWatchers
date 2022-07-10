const express = require('express');
const app = express();
const port=3000;
// const accountRouter=require('./router/accountRouter')
const usersRouter=require('./router/usersRouter')
const meetingRouter=require('./router/meetingRouter')
const diaryRouter=require('./router/diaryRouter')
app.use(express.json());


// app.use('/login',accountRouter);
// app.use('/account',accountRouter);

// app.use('/user/:id/diary',diaryRouter)

app.use('/user',usersRouter)

app.use('/meeting',meetingRouter)


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});   