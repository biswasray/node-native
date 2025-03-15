import { Worker } from "worker_threads";
import { depsMap } from "./map.cjs";
import {fileURLToPath} from "url";

/**
 * Represents a custom event indicating the exit status of a process.
 */
export class ExitEvent extends CustomEvent {
  /**
   * Creates an instance of ExitEvent with the specified exit code.
   * @param {number} code - The exit code indicating the status of the process.
   */
  constructor(code) {
    super("exit", { detail: { code } });
  }
}
/**
 * @ref https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
 * @returns 
 */
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

          if(currentfile !== callerfile) {
              filename = callerfile;
              break;
          }
      }
  } catch (err) {}
  Error.prepareStackTrace = _pst;

  return filename;
}

/**
 * Creates a Web Worker with the provided runnable function and options.
 * @template P - The type of parameters accepted by the runnable function.
 * @template R - The type of result returned by the runnable function.
 * @param {IRunnable<P, R>} runnable - The function to be executed by the Web Worker.
 * @param {IRunnableOption} [options={}] - Options for configuring the behavior of the Web Worker.
 * @param {P} params - The parameters to be passed to the runnable function.
 * @returns {Worker} The created Web Worker instance.
 */
export function createWorker(
  runnable,
  options={},
  params,
) {
  const { deps } = options;
  const depEntries = Object.entries(deps || {});
  const depNames = depEntries.map((p) => p[0]);
  
  for(const k in deps) {
    depsMap[k] = deps[k]
  }
  const script = `
		const {
			parentPort
		} = require("node:worker_threads");
    const { depsMap } = require("./map.cjs");
    

    const funcName = Symbol("runnable.name");
    function factoryFun(${depNames.join(",")}) {
      var funcMap = {};
      funcMap[funcName] = ${runnable.toString()};
      return funcMap;
    }
		parentPort.on("message",async (data)=>{
      const {params} = data;
      const depValues = Object.values(depsMap);
      const funcMap = factoryFun.apply(null,depValues);
      const result = await funcMap[funcName].apply(null,params);
			parentPort.postMessage(result);
			parentPort.close();
		});
		`;
  const { signal, startTime = 0, timeout } = options;
  const worker = new Worker(script, { eval: true });
  signal?.addEventListener(
    "abort",
    (_) => {
      _;
      worker.terminate();
    },
    { once: true },
  );
  let startTimer;
  let timeoutTimer;
  if (startTime) {
    startTimer = setTimeout(
      () => worker.postMessage({ params }),
      startTime,
    );
  } else {
    worker.postMessage({ params });
  }
  if (timeout) {
    timeoutTimer = setTimeout(() => {
      worker.terminate();
      clearTimeout(startTimer);
    }, timeout);
  }
  worker.on("message", (_) => {
    _;
    clearTimeout(timeoutTimer);
    clearTimeout(startTimer);
  });
  // worker.on("error", reject);
  // worker.on("exit", reject);
  return worker;
}

/**
 * Creates a pool of workers to execute a given runnable function asynchronously.
 * @template P - The type of parameters accepted by the runnable function.
 * @template R - The type of result returned by the runnable function.
 * @param {IRunnable<P, R>} runnable - The function to be executed by the workers.
 * @param {IRunnableOption} [options] - Options for configuring the pool and worker behavior.
 * @returns {(...params: P) => Promise<IUnwrappedResult<R>>} A function that, when called with parameters, returns a Promise that resolves to the result of executing the runnable function.
 */
export function createPool(
  runnable,
  options,
) {
  const filename = _getCallerFile();
  console.log("path",filename)
  return function (...params) {
    return new Promise((resolve, reject) => {
      const { log } = console;
      const retriesWithIn = options?.retriesWithIn || [];
      const logger = options?.logger || log;
      const retriesWithInLength = retriesWithIn.length;
      let retryCount = 0;
      let errorInstance;
      function exitHandler(code) {
        if (code === 0) {
          return;
        }
        if (retryCount < retriesWithInLength) {
          const retryTimeout = retriesWithIn[retryCount++];
          logger(`Retry with in ${retryTimeout}ms`);
          setTimeout(tryExecution, retryTimeout);
        } else {
          reject(
            errorInstance instanceof Error
              ? errorInstance
              : new Error(`Worker stopped with exit code ${code}`),
          );
        }
      }
      function tryExecution() {
        const worker = createWorker(runnable, options, params);
        worker.on("message", resolve);
        worker.on("error", (error) => (errorInstance = error));
        worker.on("exit", exitHandler);
      }
      tryExecution();
    });
  };
}

export default { createPool, createWorker };
