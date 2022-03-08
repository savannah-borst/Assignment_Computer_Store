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

repayLoanBtn.style.display = "none";
outstanding.style.visibility = "hidden";

//event listeners
workBtn.addEventListener("click", work);
bankBtn.addEventListener("click", bank);
getLoanBtn.addEventListener("click", getLoan);

//functions
function work() {
    workMoney += 100;
    workAmount.innerHTML = workMoney + " " + "Euro";
}

function bank() {
    //if loan is true deduct 10% towards bank and remove 10% from outstanding loan
    if (loan) {
        bankMoney = bankMoney + (workMoney / 100 * 90);
        balanceAmount.innerHTML = bankMoney + " " + "Euro";

        loanMoney = loanMoney - (workMoney / 100 * 10);
        loanAmount.innerHTML = loanMoney + " " + "Euro";
    } else {
        bankMoney += workMoney
        balanceAmount.innerHTML = bankMoney + " " + "Euro";
    }

    workMoney = 0;
    workAmount.innerHTML = workMoney + " " + "Euro";
}

function getLoan() {
    //pop-up/prompt for amount of loan
    let amount = prompt("please enter the amount you want to loan");
    if (loan) {
        alert("You can only have one loan!");
    } else if (amount > (bankMoney * 2)) {
        alert("You can NOT get more loan than double your bank balance.");
    } else {
        loanAmount.innerHTML = amount + " " + "Euro";
        loan = true;
        repayLoanBtn.style.display = "inline";
        outstanding.style.visibility = "visible";
    }


    //make visible: repay button + outstanding loan section
    //refer to layout changes function
    //set outstanding loan
}

function buyNow() {

}