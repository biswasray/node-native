import util from "util";
async function fun() {
    return "hello world";
}
export const callBackFun = util.callbackify(fun);

const res1=callBackFun(()=>{});
console.log("res1",res1);

callBackFun((err,res2)=>{
    console.log("res2",res2);
})