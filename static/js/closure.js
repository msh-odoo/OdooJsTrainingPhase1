export function generateClosure1() {
    let counter = 0;

    const closureFunction = () => {
        counter = counter + 1;
        return counter;
    };
    return closureFunction;
}
