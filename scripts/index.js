//Get elements by ID
//amounts
const balanceAmount = document.getElementById("balance-amount");
const loanAmount = document.getElementById("loan-amount");
const workAmount = document.getElementById("work-amount");

//buttons
const getLoanBtn = document.getElementById("get-loan");
const repayLoanBtn = document.getElementById("repay-loan");
const workBtn = document.getElementById("work");
const bankBtn = document.getElementById("bank");
const buyBtn = document.getElementById("buy-laptop");

//Laptop
const features = document.getElementById("features");
const image = document.getElementById("laptop-image");
const name = document.getElementById("laptop-name");
const info = document.getElementById("laptop-info");
const cost = document.getElementById("laptop-cost");

//start
let workMoney = 0;
workAmount.innerHTML = workMoney + " " + "Euro";

let bankMoney = 0;
balanceAmount.innerHTML = bankMoney + " " + "Euro";

//event listeners
workBtn.addEventListener("click", work);
bankBtn.addEventListener("click", bank);

//functions
function work() {
    workMoney += 100;
    workAmount.innerHTML = workMoney + " " + "Euro";
}

function bank() {
    bankMoney += workMoney
    balanceAmount.innerHTML = bankMoney + " " + "Euro";

    workMoney = 0;
    workAmount.innerHTML = workMoney + " " + "Euro";
}

function getLoan() {

}

function buyNow() {

}