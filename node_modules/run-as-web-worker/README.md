# Run as Web Worker

Run a pure function as a web worker.

This library will provide a method that hoists your function into a web worker, and returns a new function, with the same signature, that you can use to call it. You can use the new function interchangeably with the original in your code.

For TypeScript users we also include a decorator you can use to decorate a class method to run it in a web worker. Everything else about your code can run exactly the same way.

There are some rules:

- The method cannot reference any variables outside its own scope, including the `window` object, the `this` keyword and any properties or methods of the containing class or object.
- The method must return a Promise (or, technically, a Thenable object). All communication with web workers is asynchronous, so your method must be asynchronous too.
- All parameters passed into the method must be serialisable to a string.
- Any parameters passed in by reference will lose their reference. You cannot make changes to these objects and expect those changes to persist outside of the function.

## Installation

Using npm:

```
npm install run-as-web-worker
```

Using yarn:

```
yarn add run-as-web-worker
```

## Usage

The simplest use is to replace a method:

```javascript
import { raww } from "run-as-web-worker";
function myFunc() {
  return new Promise((resolve, reject) => {
    resolve("all done");
  });
}

const myFuncInWebWorker = raww(myFunc);

myFuncInWebWorker().then(result => {
  console.log(result);
});
```

You can replace the method on an object, then just keep using that object like before:

```javascript
import { raww } from "run-as-web-worker";
const myObject = {
  someProp: "some property",
  myFunc: () => {
    return new Promise((resolve, reject) => {
      resolve("all done");
    });
  }
};

myObject.myFunc = raww(myObject.myFunc);

myObject.myFunc().then(result => {
  console.log(result);
});
```

You can do the same thing inline:

```javascript
import { raww } from "run-as-web-worker";
const myObject = {
  myFunc: raww(() => {
    return new Promise((resolve, reject) => {
      resolve("all done");
    });
  })
};

myObject.myFunc().then(result => {
  console.log(result);
});
```

You can replace class methods as well:

```javascript
import { raww } from "run-as-web-worker";
class myClass {
  myFunc() {
    return new Promise((resolve, reject) => {
      resolve("all done");
    });
  }
}

const instance = new myClass();
instance.myFunc = raww(instance.myFunc);

instance.myFunc().then(result => {
  console.log(result);
});
```

If you use TypeScript, we have a decorator you can use:

```typescript
import { RunAsWebWorker } from "run-as-web-worker";
class myClass {
  @RunAsWebWorker
  public myFunc(): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      resolve("all done");
    });
  }
}

const instance = new myClass();
instance.myFunc().then((result: string) => {
  console.log(result);
});
```

## Dependencies

It is also possible to pass some global dependencies into the web worker when it is created. This can only be done when the worker is created, and not when the function is actually called. Again, there are some rules to this:

- primitives can be passed without a problem (strings, numbers and booleans).
- objects can be passed if they do not contain cyclic dependencies, or any other invalid configuration.
- functions can be passed if they do not overwrite the toString method.
- if a function has properties, they will not be passed.
- if a function has references to any object that is not also included as a dependency, it will fail.
- objects that contain primitives, other objects and functions can be passed.
- as with the main function, any references any of the objects or functions had will be broken; the objects and functions are serialised into strings for transfer, and cannot maintain references across boundaries.
- always make sure your bundler does not modify the names of the dependencies you're adding; you'll name them when you pass them, and that naming won't be updated by the bundler.

You include your dependencies by adding one or more objects as additional parameters to the `raww` method or the decorator:

```javascript
import { raww } from "run-as-web-worker";
const name = "name";
const utils = {
  clog: message => {
    console.log(message);
  }
};

function myFunc() {
  return new Promise((resolve, reject) => {
    utils.clog(name);
    resolve("all done");
  });
}

const myFuncInWebWorker = raww(myFunc, { name, utils });

myFuncInWebWorker().then(result => {
  console.log(result);
});
```

This will load the two dependencies in no particular order. If the order is important, provide multiple objects. All the dependencies from the first object will be loaded first, then all those from the second, and so on...

```javascript
import { raww } from "run-as-web-worker";
const name = "name";
const utils = {
  thisName: name,
  clog: message => {
    console.log(`${name}: ${message}`);
  }
};

function myFunc() {
  return new Promise((resolve, reject) => {
    utils.clog("a message");
    resolve("all done");
  });
}

const myFuncInWebWorker = raww(myFunc, { name }, { utils });

myFuncInWebWorker().then(result => {
  console.log(result);
});
```

### TypeScript Helper Dependencies

When TypeScript compiles into JavaScript, the compiler sometimes injects helper functions to provide functionality not available in vanilla JavaScript. As a developer, you may not know that these helper functions are being injected, and are therefore not able to provide them as explicit dependencies. If you use the `RunAsWebWorker` decorator, it will inject copies of all the TypeScript depenedencies for you, so they will be available to your scripts without any effort.

## Notes

It is not currently possible for Web Workers to import modules using the `import` keyword, but we have have plans for a mechanism for doing this, when it becomes available: any dependency whose name begins with a "\$" will be assumed to be a url, which should be used as the path for the `import` function.

We have decided not to make use of the [importScripts](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) method to import scripts:

- The general use case for importing scripts is to import third party libraries for use in your code. These libraries are generally not designed to be loaded as stand-alone scripts, without a way to assign them to a scoped variable (eg: you can import lodash with `importScript`, but it will not be assigned to the `_` global variable, or to anything you have access to).
- Most libraries are designed to either be imported directly using a module loader (es6, systemjs, etc) or, more commonly, be bundled into a build (eg: webpack), which wraps the library in a closure such that it is not available outside that closure.
- Using the `importScript` method requires that the script imported be pre-prepared for exactly this import case, and not for any of the cases above. If you do that, you can probably just create a whole webworker out of it - you don't need this library.

Unfortunately, the following libraries are known not to work with `run-as-web-worker`, until such time as we can import them using es6 imports:

| Library                       | Reason                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [lodash](https://lodash.com/) | There are two reasons why lodash does not work with this system. Firstly, lodash surfaces as a function which has properties. This allows you to use: `_()` or `_.map()`. The serialisation in `run-as-web-worker` does not include the properties of functions - when it finds a function, it serialises and adds it, then moves on. Secondly, `run-as-web-worker` serialises functions using the `toString` method of the function. `lodash` has overridden the toString method of it's root function to provide an empty string, essentially deliberately preventing serialisation. Without that `toString` method, `run-as-web-worker` cannot serialise the function, and can therefore not recreate it in the web worker. |
