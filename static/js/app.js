import { simpleTimeout, simpleAsyncAwait } from "./async_await_simple.js";
import { advancedAsyncAwait } from "./async_await_advance.js";
import { simplePromise } from "./promise_simple.js";
import { advancePromise } from "./promise_advance.js";
import { MainComponent } from "./custom_event.js";

export function showDetails(result) {
    const div = document.createElement('div');
    let details = ``;
    for (const key in result) {
        details = details.concat(`${key} is ${result[key]} `);
    }
    div.textContent = details;
    document.querySelector('.o_content').appendChild(div);
}

export const showError = (msg) => {
    document.querySelector('.o_content').textContent = msg;
};

const cleanDom = () => {
    document.querySelector(".o_content").innerHTML = "";
};

function onClickSimpleTimeout(params) {
    cleanDom();
    simpleTimeout();
}

function onClickSimpleAsyncAwait(ev) {
    // TODO: Show prevent default
    cleanDom();
    // Simple Async Await
    // TODO: Display return type of async function
    simpleAsyncAwait();
}

function onClickAdvanceAsyncAwait(ev) {
    cleanDom();
    // Advance Async Await with callbacks chains
    advancedAsyncAwait(true);
}

function onClickSimplePromise(ev) {
    cleanDom();
    // Simple promise with callback chain
    const data = simplePromise()
        .then((data) => {
            showDetails(data);
            console.log("Simple Promise resolve chain", data);
        }).catch((error) => {
            showError(error);
            console.log("Simple Promise Error ", error);
        });
}

async function onClickAdvancePromise(ev) {
    cleanDom();
    // Advance Promise with .all and settled
    const datas = await advancePromise();
    showDetails(datas[0]);
    showDetails(datas[1]);
}

function onClickCustomEvent(ev) {
    cleanDom();
    const mainComponent = new MainComponent();
    mainComponent.start();
    document.querySelector('.o_content').appendChild(mainComponent.el);
}

window.addEventListener('load', async (event) => {
    // TODO: Show Event Propagation/Bubbling and how to stop it
    // TODO: Display event binding on single element and differentiate based on data attribute
    document.querySelector("#o_simple_timeout").addEventListener('click', onClickSimpleTimeout);
    document.querySelector("#o_simple_async_await").addEventListener('click', onClickSimpleAsyncAwait);
    document.querySelector("#o_advance_async_await").addEventListener('click', onClickAdvanceAsyncAwait);
    document.querySelector("#o_simple_promise").addEventListener('click', onClickSimplePromise);
    document.querySelector("#o_advance_promise").addEventListener('click', onClickAdvancePromise);
    document.querySelector("#o_custom_event").addEventListener('click', onClickCustomEvent);

    // const div = document.createElement('div');
    // const button = document.createElement('button');
    // button.textContent = "Click Me";
    // button.setAttribute('class', 'click_me');
    // div.appendChild(button);
    // div.addEventListener("click", (ev) => {
    //     debugger;
    // });
    // button.addEventListener('click', (ev) => {
    //     ev.stopPropagation();
    //     debugger;
    // });
    // document.querySelector(".o_content").appendChild(div);

});
