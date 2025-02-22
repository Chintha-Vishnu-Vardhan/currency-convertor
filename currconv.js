const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
// console.log(countryList);
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.value=currcode;
        newoption.innerText=currcode;
        
        //we will start with usd to inr
        if (select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        } else if (select.name==="to" && currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag= (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];//INR-IN
    let newsrclink =`https://flagsapi.com/${countrycode}/flat/64.png`;
    //element is select, we can access the image by going to its parent
    let img = element.parentElement.querySelector("img");
    img.src = newsrclink;
}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault(); //stops the default action of button
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal<1){
        amountVal=1;
        amount.value = "1";
    }
    // console.log(fromCurr,toCurr);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount =amountVal*rate; 
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


});