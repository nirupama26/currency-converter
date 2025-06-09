
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
for(let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if(select.name === "from" && code === "USD"){
        newOption.selected = "selected";
    }
    else if(select.name === "to" && code === "INR")
    {
        newOption.selected = "selected";
    }
    select.append(newOption);
}

select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});

}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
     let amount = document.querySelector(".amount input");
     let amtVal = amount.value;
     if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
     }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
       try {
        const res = await fetch(URL);
        const data = await res.json();
        const rate = data[from][to];
        const finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
       }catch(error){
        console.error("Error fetching exchange rate:", error);
       }
    };

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});