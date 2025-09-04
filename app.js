const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-minus");
const money_minus = document.getElementById("money-minus")
const list =document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");




let Transactions = [];

function addTrasaction(e){
e.preventDefault();
if(
  text.value.trim() === ""|| amount.value.trim()===""

){
    alert("Please Enter Text And Value")
}else{
    const transaction={
id:generateID(),
text:text.value,
amount: +amount.value,
    };
    Transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value="";
    amount.value="";
}
}
function generateID(){
return Math.floor(Math.random()*100000000)
}

function addTransactionDOM(transaction){
    const sign =transaction.amount < 0 ? "-" : "+" ;
    const item =document.createElement("li");

    item.classList.add(
        transaction.amount<0 ? "minus" : "plus" 
);
    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>

    <button class="delete-btn" onclick="">X</button>
`;
    list.appendChild(item)
}
function updateValues(){
    const amounts = Transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item)=>{acc += item},0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item)=> (acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item)=> (acc += item),0)* -1
    ).toFixed();
    balance.innerText=`$${total}`;
    money_plus.innerHTML=`$${income}`;
    money_minus.innerText=`$${expense}`
}


function Init(){
    list.innerHTML="";
    Transactions.forEach(addTransactionDOM);
    updateValues();
}


Init();
form.addEventListener("submit",addTrasaction)