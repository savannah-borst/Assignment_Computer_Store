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
const outstanding = document.getElementById("outstanding");

//start
let workMoney = 0;
workAmount.innerHTML = workMoney + " " + "Euro";

let bankMoney = 0;
balanceAmount.innerHTML = bankMoney + " " + "Euro";

let loan = false;
let loanMoney = 0;
loanAmount.innerHTML = loanMoney + " " + "Euro";

//event listeners

workBtn.addEventListener("click", work);
bankBtn.addEventListener("click", bank);
getLoanBtn.addEventListener("click", getLoan);
buyBtn.addEventListener("click", buyNow);
repayLoanBtn.addEventListener("click",repayLoan);

//functions
function work() {
    //Add 100 per work click
    workMoney += 100;
    workAmount.innerHTML = workMoney + " " + "Euro";
}

function bank() {
    //if loan is true deduct 10% towards bank and remove 10% from outstanding loan
    if (loan) {
        //if there is a loan when transfer to bank 90 goes to bank 10 to pay the loan
        bankMoney += (workMoney / 100 * 90);
        balanceAmount.innerHTML = bankMoney + " " + "Euro";

        loanMoney -= (workMoney / 100 * 10);
        loanAmount.innerHTML = loanMoney + " " + "Euro";
    } else {
        //if there is no loan everything goes to bank
        bankMoney += workMoney
        balanceAmount.innerHTML = bankMoney + " " + "Euro";
    }

    //reset workMoney
    workMoney = 0;
    workAmount.innerHTML = workMoney + " " + "Euro";

    //if loanmoney = 0 than turn visibility to hidden
}

function getLoan() {
    //pop-up/prompt for amount of loan
    let amount = parseInt(prompt("please enter the amount you want to loan"));
    if (loan) {
        alert("You can only have one loan!");
    } else if (amount > (bankMoney * 2)) {
        alert("You can NOT get more loan than double your bank balance.");
    } else if (amount == "" || amount == null || isNaN(amount)) {
        alert("You did not fill in a number")
    } else {
        //set outstanding loan
        loanMoney = amount;
        loanAmount.innerHTML = amount + " " + "Euro";
        loan = true;
        //make visible: repay button + outstanding loan section
        repayLoanBtn.style.display = "inline";
        outstanding.style.visibility = "visible";
    }

    
}

function buyNow(cost) {
    if (cost > balanceAmount) {
        //add warning message
    } else {
        //add succesfull purchase message
        //deduct money from the bank
    }
}

function repayLoan() {
    //if workmoney is more then loanmoney
    if (workMoney > loanMoney) {
        workMoney -= loanMoney;
        //add remaining to bank
        bankMoney += workMoney;
        balanceAmount.innerHTML = bankMoney + " " + "Euro";

        loanMoney = 0;
        loanAmount.innerHTML = loanMoney + " " + "Euro";

        workMoney = 0;
        workAmount.innerHTML = workMoney + " " + "Euro";

        //change visibility
        repayLoanBtn.style.display = "none";
        outstanding.style.visibility = "hidden";
    } else {
        loanMoney -= workMoney;
        loanAmount.innerHTML = loanMoney + " " + "Euro";

        workMoney = 0;
        workAmount.innerHTML = workMoney + " " + "Euro";
    }
}