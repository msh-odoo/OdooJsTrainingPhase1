import { simpleTimeout, simpleAsyncAwait } from "./async_await_simple.js";
import { advancedAsyncAwait } from "./async_await_advance.js";
import { simplePromise } from "./promise_simple.js";
import { advancePromise } from "./promise_advance.js";
import { MainComponent } from "./custom_event.js";
import { generateClosure1 } from "./closure.js";
import { ObserverClass } from "./observer.js";

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

const onClickClosure = () => {
    // TODO: Display closure with extra arguments
    const clouserFunc = generateClosure1();
    console.log("Result of Closure is :: ", clouserFunc());
    console.log("Result of Closure is :: ", clouserFunc());
};

// TODO: Explain loos couple and tight couple
function onClickObserver(ev) {
    const observerClass = new ObserverClass({ 'hi': 'How are you?' });
    observerClass.updateState({ 'hello': 'I am fine, how about you?' });
}

window.addEventListener('load', async (event) => {
    // TODO: Show Event Propagation/Bubbling and how to stop it
    // TODO: Display event binding on single element and differentiate based on data attribute
    // document.querySelector("#o_simple_timeout").addEventListener('click', onClickSimpleTimeout);
    document.querySelector("#o_simple_async_await").addEventListener('click', onClickSimpleAsyncAwait);
    document.querySelector("#o_advance_async_await").addEventListener('click', onClickAdvanceAsyncAwait);
    document.querySelector("#o_simple_promise").addEventListener('click', onClickSimplePromise);
    document.querySelector("#o_advance_promise").addEventListener('click', onClickAdvancePromise);
    document.querySelector("#o_custom_event").addEventListener('click', onClickCustomEvent);

    document.querySelector("#o_closure").addEventListener('click', onClickClosure);
    document.querySelector("#o_observer").addEventListener('click', onClickObserver);

    // Example of stopPropagation
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

    // function addItem() {
    //     console.log("Inside Add Item");
    // }

    // document.addEventListener('add-item', addItem);

    // Event Handling
    // document.querySelector('#o_observer').addEventListener('click', () => {
    //     console.log("Inside Observer Click");
    //     const custom = new CustomEvent('add-item', { detail: { name: 'Hello'} });
    //     document.dispatchEvent(custom);
    // });

    // document.querySelector('.o_header').addEventListener('click', function () {
    //     debugger;
    // });

    // Event Propagation and Event Prevent Default
    // document.querySelector('#o_simple_timeout').addEventListener('click', (ev) => {
    //     debugger;
    //     ev.preventDefault();
    //     ev.stopImmediatePropagation();
    //     console.log("Hello world");
    // });

    // document.querySelector('#o_simple_timeout').addEventListener('click', (ev) => {
    //     debugger;
    // });

    // Custom Events
    // document.querySelector(".o_main").addEventListener('add-item', (ev) => {
    //     debugger;
    //     console.log("Inside Add Item");
    // }, true);

    // document.querySelector('#o_simple_timeout').addEventListener('click', (ev) => {
    //     debugger;
    //     const custom = new CustomEvent('add-item', { detail: {'abc': 'Hello'}});
    //     // ev.target.dispatchEvent('')
    //     document.querySelector("#o_simple_timeout").dispatchEvent(custom);
    // });

    // Prototype
    // function abc() {
    //     this.counter = 5;
    // }

    // abc.prototype.add = function (a) {
    //     debugger;
    //     this.counter = this.counter + a;
    //     return this.counter;
    // };

    // const abcInst = new abc();
    // const res = abcInst.add(10);
    // console.log(res);

    // Closure
    // function abc() {
    //     let counter = 0;

    //     const def = function () {
    //         counter = counter + 1;
    //         return counter;
    //     };

    //     return def;
    // }

    // const myFunc = abc();
    // let res1 = myFunc();
    // console.log(res1);
    // res1 = myFunc();
    // console.log(res1);

    // Onserver
    // class Observable {
    //     constructor(state) {
    //         this.state = state;
    //         this.observers = [];
    //     }
    //     addObserver(observer) {
    //         this.observers.push(observer);
    //     }
    //     notify() {
    //         this.observers.forEach(observer => observer());
    //     }
    // }

    // class ObserverClass {
    //     constructor(state) {
    //         this.observable = new Observable(state);
    //         this.observable.addObserver(this.updateComponent);
    //     }
    //     updateState(state) {
    //         this.observable.state = state;
    //         this.observable.notify();
    //     }
    //     updateComponent() {
    //         console.log("New :: ", observer.observable.state);
    //     }
    // }

    // const observer = new ObserverClass({'hello': 'Hello World'});
    // console.log("Old :: ", observer.observable.state);
    // observer.updateState({'Hi': 'How are you?'});

    function doRpc(url) {
        return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     result = { aa: 'Hello', bb: 'Hi' };
            //     reject("Something went wrong!");
            // }, 500);
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url);
            xmlhttp.send();
            xmlhttp.addEventListener('load', () => {
                const result = JSON.parse(xmlhttp.response);
                resolve(result);
            });
            xmlhttp.addEventListener('error', () => {
                reject("Something went wrong!");
            });
        });
    }

    // Async/Await
    // async function abc() {
    //     const result = await doRpc("https://reqres.in/api/users?page=2").catch((error) => {
    //         console.log(error);
    //     });
    //     console.log(result);
    // }

    // Callback chain
    // function abc() {
    //     const result = doRpc("https://reqres.in/api/users?page=2").then((data) => {
    //         console.log(data);
    //     }, (error) => {
    //         console.log(error);
    //     });
    // }

    // abc();


    class CoreComponent {
        cssClass = '';
        willStart() {
            return Promise.resolve();
        }
        async start() {
            await this.willStart();
            this.render();
        }
        async render() {
            const div = document.createElement('div');
            div.setAttribute('class', this.cssClass);
            this.el = div;
            const childComps = this.constructor.childComponents;
            if (childComps) {
                for (const comp in childComps) {
                    const compClass = childComps[comp];
                    const compClassInst = new compClass();
                    await compClassInst.start();
                    this.el.appendChild(compClassInst.el);
                }
            }
        }
    }

    class Character extends CoreComponent {
        cssClass = 'o_character'
        render() {
            super.render();
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            this.el.appendChild(input);
        }
    }

    class Float extends Character {
        cssClass = 'o_float'
    }

    class Form extends CoreComponent {
        cssClass = 'o_form'
    }
    Form.childComponents = { Character, Float };

    class ProductList extends CoreComponent {
        async willStart() {
            this.data = await doRpc("https://reqres.in/api/users?page=2")
        }
        render() {
            // super.render();
            // const table = document.createElement('table');
            // this.data.data.forEach((record) => {
            //     const tr = document.createElement('tr');
            //     for (const key in record) {
            //         const td = document.createElement('td');
            //         td.textContent = record[key];
            //         tr.appendChild(td);
            //     }
            //     table.appendChild(tr);
            // });
            // this.el.appendChild(table);
            this.el = qweb.render('ProductList', { records: this.data.data });
            document.body.querySelector('.o_main').innerHTML = productList.el;
        }
    }

    let xml = await fetch("/static/xml/app.xml");
    const parsedXml = await xml.text();
    const qweb = new QWeb2.Engine();
    qweb.add_template(parsedXml);

    window.qweb = qweb;

    const productList = new ProductList();
    await productList.start();
    window.productList = productList;

    // const form = new Form();
    // form.start().then(() => {
    //     document.body.querySelector('.o_main').appendChild(form.el);
    // });



});
