export function simplePromise() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve({product: 'Desk', price: 2000, tax: '10'});
            // reject("Something went wrong!");
        }, 1000);
    }).then(() => {
        console.log("Inside simple promise resolve.");
    });
}
