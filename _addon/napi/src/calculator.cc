// src/calculator.cpp
#include <node_api.h> 

Napi::Number Sum(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
        return Napi::Number::New(env, 0);
    }

    double arg0 = info[0].As<Napi::Number>().DoubleValue();
    double arg1 = info[1].As<Napi::Number>().DoubleValue();

    Napi::Number returnValue = Napi::Number::New(env, arg0 + arg1);
    return returnValue;
}

Napi::Number Subtract(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
        return Napi::Number::New(env, 0);
    }

    double arg0 = info[0].As<Napi::Number>().DoubleValue();
    double arg1 = info[1].As<Napi::Number>().DoubleValue();

    Napi::Number returnValue = Napi::Number::New(env, arg0 - arg1);
    return returnValue;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "sum"), Napi::Function::New(env, Sum));
    exports.Set(Napi::String::New(env, "subtract"), Napi::Function::New(env, Subtract));
    return exports;
}

NODE_API_MODULE(calculator, Init)
