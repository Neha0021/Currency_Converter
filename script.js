const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
const swap = document.querySelector("i")


for(let select of dropdown){
    for(currCode in countryList) {
        let newOptn = document.createElement("option")
        newOptn.innerText = currCode;
        newOptn.value = currCode;
        
        if (select.name === "from" && currCode === "USD") {
            newOptn.selected = "selected"
        }else if(select.name === "to" && currCode === "INR") {
            newOptn.selected = "selected"
        }
        select.append(newOptn)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateExchngRate = async () => {
    let ammount = document.querySelector(".amount input")
    let amtValue = ammount.value;
    if(amtValue===" " || amtValue<1){
        amtValue=1;
        ammount.value="1"
    }

    //console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmnt= rate* amtValue;
    //console.log(finalAmnt)
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmnt} ${toCurr.value}`
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    updateExchngRate();
})

window.addEventListener("load", () => {
    updateExchngRate()
})

swap.addEventListener("click", (evt) => {
    //fromCurr.value = toCurr.value;
    toCurr.value = fromCurr.value;

})