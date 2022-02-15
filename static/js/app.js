import { simpleTimeout, simpleAsyncAwait } from "./async_await_simple.js";
import { advancedAsyncAwait } from "./async_await_advance.js";
import { simplePromise } from "./promise_simple.js";
import { advancePromise } from "./promise_advance.js";

export function showDetails(result) {
    const div = document.createElement('div');
    const details = `
        Name is ${result.name}
        Last name is ${result.last_name}
        Job is ${result.job}
    `;
    div.textContent = details;
    document.querySelector('.o_content').appendChild(div);
}

export const showError = (msg) => {
    document.querySelector('.o_content').textContent = msg;
};

window.addEventListener('load', (event) => {
    // simpleTimeout();

    // Simple Async Await
    // simpleAsyncAwait();

    // Advance Async Await with callbacks chains
    advancedAsyncAwait(true);

    // Simple promise with callback chain
    const data = simplePromise()
        .then((data) => {
            console.log("Simple Promise resolve chain", data);
        }).catch((error) => {
            console.log("Simple Promise Error ", error);
        });

    // Advance Promise with .all and settled
    const prom = advancePromise();
    
});
