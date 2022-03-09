//GET ELEMENTS BY ID
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
const select = document.getElementById("select");
const features = document.getElementById("features");
const image = document.getElementById("laptop-image");
const laptopName = document.getElementById("laptop-name");
const info = document.getElementById("laptop-info");
const cost = document.getElementById("laptop-cost");
const outstanding = document.getElementById("outstanding");

//START
let workMoney = 0;
setWorkAmount(workMoney);

let bankMoney = 0;
setBalanceAmount(bankMoney);

let loan = false;
let loanMoney = 0;
setLoanAmount(loanMoney);

//EVENT LISTENERS
workBtn.addEventListener("click", work);
bankBtn.addEventListener("click", bank);
getLoanBtn.addEventListener("click", getLoan);
buyBtn.addEventListener("click", buyNow);
repayLoanBtn.addEventListener("click", repayLoan);
select.addEventListener("change", selectChange);

//FUNCTIONS
//work button
function work() {
    //Add 100 per work click
    workMoney += 100;
    setWorkAmount(workMoney);
}

//bank button
function bank() {
    //if loan is true deduct 10% towards bank and remove 10% from outstanding loan
    if (loan) {
        //if there is a loan when transfer to bank 90 goes to bank 10 to pay the loan
        bankMoney += (workMoney / 100 * 90);
        setBalanceAmount(bankMoney);

        loanMoney -= (workMoney / 100 * 10);
        setLoanAmount(loanMoney);
    } else {
        //if there is no loan everything goes to bank
        bankMoney += workMoney
        setBalanceAmount(bankMoney);
    }

    //reset workMoney
    workMoney = 0;
    setWorkAmount(workMoney);

    //if loanmoney = 0 than turn visibility to hidden
}

// get loan button
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
        setLoanAmount(loanMoney);
        loan = true;
        //make visible: repay button + outstanding loan section
        repayLoanBtn.style.display = "inline";
        outstanding.style.visibility = "visible";
    }
}

//buy now button
function buyNow(cost) {
    if (cost > balanceAmount) {
        //add warning message
    } else {
        //add succesfull purchase message
        //deduct money from the bank
    }
}

//repay loan button
function repayLoan() {
    //if workmoney is more then loanmoney
    if (workMoney > loanMoney) {
        workMoney -= loanMoney;
        //add remaining to bank
        bankMoney += workMoney;
        setBalanceAmount(bankMoney);

        loanMoney = 0;
        setLoanAmount(loanMoney);

        workMoney = 0;
        setWorkAmount(workMoney);

        //change visibility
        repayLoanBtn.style.display = "none";
        outstanding.style.visibility = "hidden";
    } else {
        loanMoney -= workMoney;
        setLoanAmount(loanMoney);

        workMoney = 0;
        setWorkAmount(workMoney);
    }
}

//Setting the innerHTML
function setBalanceAmount(bank){
    balanceAmount.innerText = bank + " " + "Euro";
}

function setWorkAmount(work) {
    workAmount.innerText = work + " " + "Euro";
}

function setLoanAmount(loan) {
    loanAmount.innerText = loan + " " + "Euro";
}

//fetch
fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //console.log(typeof data);
        dataArray = data;
        populateSelect(data);     
    })
    .catch(error => console.log(error));

//populate select
function populateSelect(computer){
    for (let i = 0; i < computer.length; i++) {
        const optionElement = document.createElement("option");
    
        optionElement.innerText = computer[i].title;
        select.appendChild(optionElement);
    }
}

//selection computer
function selectChange() {
    
}

