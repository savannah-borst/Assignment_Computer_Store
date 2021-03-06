//GET ELEMENTS BY ID
//amounts
const balanceAmount = document.getElementById("balance-amount");
const loanAmount = document.getElementById("loan-amount");
const workAmount = document.getElementById("work-amount");

//buttons
const getLoanBtn = document.getElementById("get-loan-btn");
const repayLoanBtn = document.getElementById("repay-loan-btn");
const workBtn = document.getElementById("work-btn");
const bankBtn = document.getElementById("bank-btn");
const buyBtn = document.getElementById("buy-laptop-btn");

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

populateSelect();
selectChange();

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
        //if loan is equal or is less than 0
        if (loanMoney - (workMoney / 100 * 10) <= 0) {
            //set loan to 0
            loanMoney = 0;
            setLoanAmount(loanMoney);

            //add remaining to bank
            let add = (workMoney / 100 * 10) - loanMoney;
            bankMoney += (workMoney / 100 * 90) + add;

            //set visibility + loan is false
            repayLoanBtn.style.display = "none";
            outstanding.style.visibility = "hidden";
            loan = false;
        } else {
            //if there is a loan when transfer to bank 90 goes to bank 10 to pay the loan
            bankMoney += (workMoney / 100 * 90);
            setBalanceAmount(bankMoney);

            loanMoney -= (workMoney / 100 * 10);
            setLoanAmount(loanMoney);
        }
    } else {
        //if there is no loan everything goes to bank
        bankMoney += workMoney
        setBalanceAmount(bankMoney);
    }

    //reset workMoney
    workMoney = 0;
    setWorkAmount(workMoney);
}

// get loan button
function getLoan() {
    //if loan is true then pop up alert otherwise pop up prompt for entering amount
    if (loan) {
        alert("You can only have one loan!");
    } else {
        let amount = parseInt(prompt("please enter the amount you want to loan"));
        
        //if amount is 2x bank balance show alert
        if (amount > (bankMoney * 2)) {
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

    if (amount > (bankMoney * 2)) {
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
function buyNow() {
    let price = parseInt(cost.innerText.split(' '));
    if (bankMoney < price) {
        //add warning message
        alert("You do not have sufficient funds to buy this laptop");
    } else {
        //add succesfull purchase message
        alert("You have succesfully purchased the computer");
        bankMoney -= price;
        setBalanceAmount(bankMoney);
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

        //change visibility + loan is false
        repayLoanBtn.style.display = "none";
        outstanding.style.visibility = "hidden";
        loan = false;
    } else {
        loanMoney -= workMoney;
        setLoanAmount(loanMoney);

        workMoney = 0;
        setWorkAmount(workMoney);
    }
}

//Setting the innerHTML
function setBalanceAmount(bank){
    balanceAmount.innerText = `${bank} Euro's`;
}

function setWorkAmount(work) {
    workAmount.innerText = `${work} Euro's`;
}

function setLoanAmount(loan) {
    loanAmount.innerText = `${loan} Euro's`;
}

//FETCH
async function getComputer() {
    let response = await fetch('https://noroff-komputer-store-api.herokuapp.com/computers');
    let result = await response.json();
    return result
}

//populate select
async function populateSelect(){
    let computer = await getComputer();
    for (let i = 0; i < computer.length; i++) {
        const optionElement = document.createElement("option");
        optionElement.setAttribute('value', i);
        optionElement.innerText = computer[i].title;
        select.appendChild(optionElement);
    }
}

//selection computer
async function selectChange() {
    let computer = await getComputer();
    //loop through data 
    for (let i = 0; i < computer.length; i++) {
        let imageURL = urlExists('https://noroff-komputer-store-api.herokuapp.com/' + computer[i].image);
        if (select.value == i) {
            features.innerText = computer[i].specs;
            laptopName.innerText = computer[i].title;
            image.setAttribute('src', imageURL);
            info.innerText = computer[i].description;
            cost.innerText = `${computer[i].price} Euro's`;
        }
    }
    
}

//https://stackoverflow.com/questions/26630650/detect-404-error-on-page-load
function urlExists(url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status == 404) {
        return 'https://noroff-komputer-store-api.herokuapp.com/assets/images/5.png';
    } else {
        return url;
    }
}

