const express=require('express');
const bodyParser =require('body-parser');
const ejs =require('ejs');
const Nexmo =require('nexmo');
const socketio =require('socket.io');

// Init app
const app=express();

// setting up nexmo
const nexmo = new Nexmo({
    apiKey: 'b2d56645',
    apiSecret: 'eO1Im5UdMuKyYtPG',
  });


// Template engine setup

app.set('view engine','html');
app.engine('html',ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname +'/public'))

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Index route
app.get('/',(req,res)=>{
    res.render('index')
})

// catch form data
app.post('/',(req,res)=>{
  const number=req.body.number;
  const text=req.body.text;
  const from = 'Vonage APIs';
const to = number;
nexmo.message.sendSms(from, to, text,{type:'unicode'},(err,responseData)=>{
  if(err)
  {
    console.log(err);
  }
  else{
    console.dir(responseData);
    const data={
      id:responseData.messages[0]['message-id'],
      number:responseData.messages[0]['to']
    }
    io.emit('smsStatus',data);
  }
});
})


// Define a port

const port=3000;
const server=app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
// connet to socket.io

const io=socketio(server);
io.on('connection',(socket)=>{
  console.log('connected');
  io.on('disconnect',()=>{
    console.log('disconnected');
  })
})