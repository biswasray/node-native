function _getCallerFile() {
    var filename;

    var _pst = Error.prepareStackTrace
    Error.prepareStackTrace = function (err, stack) { return stack; };
    try {
        var err = new Error();
        var callerfile;
        var currentfile;

        currentfile = err.stack.shift().getFileName();
        

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();
            console.log(callerfile);

            if(currentfile !== callerfile) {
                filename = callerfile;
                break;
            }
        }
    } catch (err) {}
    Error.prepareStackTrace = _pst;

    return filename;
}
export function fun() {
    console.log(import.meta.url);
    const filename = _getCallerFile();
  console.log("path",filename)
}