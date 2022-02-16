function doRpc() {
    let result;
    setTimeout(() => {
        result = {
            'name': 'Mohammed',
            'last_name': 'Shekha',
            'job': 'Odoo Developer'
        };
    }, 2000); // We assume server call takes 2 seconds to server the request
    return result;
}

export function doRpcPromised(forceFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (forceFail) {
                reject('Something Went wrong!');
            }
            resolve({
                'name': 'Mohammed',
                'last_name': 'Shekha',
                'job': 'Odoo Developer'
            });
        }, 2000); // We assume server call takes 2 seconds to server the request
    });
}

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

export function simpleTimeout() {
    const result = doRpc();
    showDetails(result);
}

export async function simpleAsyncAwait() {
    const result = await doRpcPromised();
    showDetails(result); 
}
