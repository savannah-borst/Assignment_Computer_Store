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

let workMoney = 0;
workAmount.innerHTML = workMoney + " " + "Euro";

//event listeners
workBtn.addEventListener("click", work);

//functions
function work() {
    workMoney += 100;
    workAmount.innerHTML = workMoney + " " + "Euro";
}

function bank() {
    
}

function getLoan() {

}

function buyNow() {

}