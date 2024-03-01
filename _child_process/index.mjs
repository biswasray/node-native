import { spawnSync } from "child_process";

function doSyncStuff(domObj){
 const output = spawnSync();
 console.log("this logs in server");
}
 return output;