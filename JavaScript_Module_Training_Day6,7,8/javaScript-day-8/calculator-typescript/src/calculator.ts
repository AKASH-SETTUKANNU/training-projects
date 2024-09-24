
function display(input: string): void {
    const result = document.getElementById("result") as HTMLInputElement;
    if (result) {
        result.value += input;
    }
}

function clearDisplay(): void {
    const result = document.getElementById("result") as HTMLInputElement;
    if (result) {
        result.value = '';
    }
}

function solve(): void {
    const result = document.getElementById("result") as HTMLInputElement;
        let expression = result.value;
        try {
        if (eval(expression) === Infinity) {
            result.value = "Number is not divisible by Zero.";
        }
        else{
        
            var calculationResult = eval(expression);
            result.value = calculationResult;
        } 
    }
    catch (error) {
        result.value=error;
   }
}





document.addEventListener('keydown', (event: KeyboardEvent) => {
    const validKeys = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/']);
    if (validKeys.has(event.key)) {
        const result = document.getElementById("result") as HTMLInputElement;
        if (result) {
            result.value += event.key;
        }
    }
});
