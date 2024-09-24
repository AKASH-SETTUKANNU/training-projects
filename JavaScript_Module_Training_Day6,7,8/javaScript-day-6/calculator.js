
window.validateNumber = function (input, errorElementId) {
    const value = parseFloat(input.value);
    const errorMessageElement = document.getElementById(errorElementId);

    if (isNaN(value) || input.value === '') {
        errorMessageElement.innerHTML = "Please enter a valid number.";
        return false;
    } else {
        errorMessageElement.innerHTML = "";
        return true;
    }
};

window.validatePrincipal = function (input) {
    const value = parseFloat(input.value);
    const errorMessageElement = document.getElementById("principal-error");

    if (isNaN(value) || input.value === '') {
        errorMessageElement.innerHTML = "Please enter a valid number.";
        return false;
    } else if (value < 500 || value > 10000) {
        errorMessageElement.innerHTML = "Enter the principal amount between 500 and 10000.";
        return false;
    } else {
        errorMessageElement.innerHTML = "";
        return true;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    function calculateInterest() {
        let principalElement = document.getElementsByClassName("principal-amount")[0].querySelector('input');
        let interestElement = document.getElementsByClassName("interest-rate")[0].querySelector('input');
        let timeElement = document.getElementsByClassName("time-period")[0].querySelector('input');

        if (!validatePrincipal(principalElement) || !validateNumber(interestElement, 'interest-error') || !validateNumber(timeElement, 'time-error')) {
            return;
        }

        let principal = parseFloat(principalElement.value);
        let interest = parseFloat(interestElement.value);
        let time = parseFloat(timeElement.value);

        if (principal < 1000) {
            interest += 5;
        } else if (principal >= 1000 && principal < 5000) {
            interest += 7;
        } else if (principal >= 5000) {
            interest += 10;
        }

        if (time > 5) {
            interest += 2;
        }

        let totalInterest = (principal * interest * time) / 100;
        let totalAmount = principal + totalInterest;

        document.getElementById("interest").innerHTML = `Interest: ${totalInterest.toFixed(2)}`;
        document.getElementById("total").innerHTML = `Total Amount: ${totalAmount.toFixed(2)}`;
        document.getElementById("information").innerHTML = `
            ${principal} * ${interest} * ${time} / 100 = ${totalInterest.toFixed(2)}
            <P> ${interest}% Interest rate is applied.</p>
        `;
    }

    document.querySelector(".Calculate-button button").addEventListener('click', calculateInterest);
});
