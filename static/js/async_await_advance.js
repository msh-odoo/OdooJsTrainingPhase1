import { showDetails, showError } from "./app.js";
import { doRpcPromised } from "./async_await_simple.js";

export async function advancedAsyncAwait(forceFail = false) {
    const result = await doRpcPromised(forceFail).then((result) => {
        showDetails(result);
    }, (msg) => {
        showError(msg);
    });
    return result;
}
