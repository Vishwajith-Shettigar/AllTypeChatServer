const io=require('socket.io')(8000,{

cors:{
    origin: "http://localhost:3000"
}

})

let globalUsers=[];

io.on('connection', (socket)=>{

console.log("heyy")


socket.on('send:message',({senderId,senderUsername,senderImg,text})=>{
console.log(senderId,text)
try{

    io.emit('get:message',{

        senderId,
        senderUsername,
        senderImg,

        text
    })
}
catch(e){

}

})

socket.on('disconnect', function () {
    console.log("dis")
  
   
});

})