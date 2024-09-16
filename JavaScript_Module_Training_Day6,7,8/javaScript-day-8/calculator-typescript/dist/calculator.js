function display(input) {
    const result = document.getElementById("result");
    if (result) {
        result.value += input;
    }
}
function clearDisplay() {
    const result = document.getElementById("result");
    if (result) {
        result.value = '';
    }
}
function solve() {
    const result = document.getElementById("result");
    let expression = result.value;
    try {
        if (eval(expression) === Infinity) {
            result.value = "Number is not divisible by Zero.";
        }
        else {
            var calculationResult = eval(expression);
            result.value = calculationResult;
        }
    }
    catch (error) {
        result.value = error;
    }
}
document.addEventListener('keydown', (event) => {
    const validKeys = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/']);
    if (validKeys.has(event.key)) {
        const result = document.getElementById("result");
        if (result) {
            result.value += event.key;
        }
    }
});
