const io=require("socket.io")(8900,{

    cors:{
        origin:"http://localhost:3000",


    },

})

let users=[];
const adduser=(userid,socketid)=>{

    !users.some(user=>user.userid===userid)&&
    users.push({userid,socketid})

}


const removeUser=(socketid)=>{
    users=users.filter(user=>user.socketid!=socketid);

}

const getUser=(userid)=>{
    return users.find(user=>user.userid===userid)

}

io.on("connection",(socket)=>{
    console.log("user connected")

    socket.on("adduser",userid=>{
 adduser(userid,socket.id)
console.log(users.length,"-----------")
console.log(users)
 io.emit("getUsers",users)

    })


//send message
socket.on("sendMessage",({senderId,receiverId,text})=>{
try{
    const user=getUser(receiverId);
    console.log("--------------------------------")
    console.log(senderId,receiverId,text)
    console.log(user)
    console.log("----------")
    console.log(text)
    io.to(user.socketid).emit("getMessage",{
        senderId,
        text,
    })
}
    catch(e) {{
        
    }}
})


    //disconect
    socket.on("disconnect",()=>{
        console.log("disconnected")
        removeUser(socket.id);
        io.emit("getUsers",users)
    })

})