let data;
if (localStorage.getItem("TransactionAppData")) {
    data = JSON.parse(localStorage.getItem("TransactionAppData"));
} else {
    data = []
}

let transactionDescription = document.querySelector("#text-value");
let transactionAmount = document.querySelector("#amount-value");
let submitBtn = document.querySelector("#submit");
let transactionsUi = document.querySelector("#transactions");
let balance = document.querySelector("#balance")
let transaction ;

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let descriptionValue = transactionDescription.value;
    let amountValue = transactionAmount.value;
    transaction= [descriptionValue, amountValue]
    data.push(transaction);
    localStorage.setItem("TransactionAppData", JSON.stringify(data));
    transactionDescription.value = "";
    transactionAmount.value = "";
    renderTransactions();
    totolFunction()
});

function renderTransactions() {
    let cards = "";
    data.forEach((transaction, index) => {
        cards += `
            <li class="items">
                <span class="left">${transaction[0]}</span>
                <span class="right">${transaction[1]}</span>
                <span class="delete fa-solid fa-xmark" id=${index}></span>
            </li>
        `;
    });

    transactionsUi.innerHTML = cards;
    deletFunction()
}

function deletFunction() {

    let cross = document.querySelectorAll(".delete")

    cross.forEach((elm, i) => {
        elm.addEventListener('click', (e) => {

            let tagerVal = Number(e.target.id);

            let arryINdied = data[tagerVal]

            let myindex = data.indexOf(arryINdied);

            if (tagerVal == myindex) {
                data.splice(myindex, 1)
                console.log(data);
                localStorage.setItem("TransactionAppData", JSON.stringify(data));
                renderTransactions();
                totolFunction()
            } else {
                console.log("Nahi mili")
            }
        })
    })
}

function totolFunction() {

    let total = 0
    data.map((elm) => {
        let covetNum = Number(elm[1]);
        return total = total + covetNum
    })

    balance.innerHTML = `₹ ${total}`;
}

totolFunction()

renderTransactions();
