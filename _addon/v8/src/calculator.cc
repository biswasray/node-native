// src/calculator.cpp
#include <node.h>

namespace calculator {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;

void Sum(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    
    if (args.Length() < 2 || !args[0]->IsNumber() || !args[1]->IsNumber()) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "Number expected").ToLocalChecked()));
        return;
    }

    double arg0 = args[0]->NumberValue(isolate->GetCurrentContext()).FromJust();
    double arg1 = args[1]->NumberValue(isolate->GetCurrentContext()).FromJust();
    double sum = arg0 + arg1;

    Local<Number> result = Number::New(isolate, sum);
    args.GetReturnValue().Set(result);
}

void Subtract(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() < 2 || !args[0]->IsNumber() || !args[1]->IsNumber()) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "Number expected").ToLocalChecked()));
        return;
    }

    double arg0 = args[0]->NumberValue(isolate->GetCurrentContext()).FromJust();
    double arg1 = args[1]->NumberValue(isolate->GetCurrentContext()).FromJust();
    double resultValue = arg0 - arg1;

    Local<Number> result = Number::New(isolate, resultValue);
    args.GetReturnValue().Set(result);
}

void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "sum", Sum);
    NODE_SET_METHOD(exports, "subtract", Subtract);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace calculator
