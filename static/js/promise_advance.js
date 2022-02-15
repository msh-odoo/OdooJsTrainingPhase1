import { simplePromise } from "./promise_simple.js";

function simplePromise2() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve({ product: 'Laptop', price: 20000, tax: '18' });
            // reject("Something went wrong!");
        }, 1000);
    });
}

export function advancePromise() {
    const prom1 = simplePromise();
    const prom2 = simplePromise2();

    Promise.all([prom1, prom2]).then((resultAdvanced) => {
        console.log("Inside Successful of Advanced Promise", resultAdvanced);
    }).catch(() => {
        console.log("Inside Failure of Advanced Promise");
    }).finally(() => {
        console.log("Always comes in this callback");
    });
}
