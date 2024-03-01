import util from "util";
import {exec} from "child_process";
import {callBackFun} from "./callback.mjs";
function callbackFun1(cb) {
    cb(undefined,"snjn",45);
}
// const promiseFun = util.promisify(callBackFun);
const promiseFun1 = util.promisify(exec);

promiseFun1();
exec()