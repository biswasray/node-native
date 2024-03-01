import {fork} from "child_process";

const child = fork("./message.mjs");

child.send("Heelloo");

child.on("message",(data)=>{
    console.log("fff",data);
})