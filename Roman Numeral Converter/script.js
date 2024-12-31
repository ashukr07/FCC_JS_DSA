document.getElementById("convert-btn").addEventListener("click", ()=>{
    const input = document.getElementById("number").value;
    const output = document.getElementById("output");
    if(input === "") {
        output.innerHTML ="Please enter a valid number";
        return;
    }
    const num = Number(input);
    if(num < 1){
        output.innerHTML = "Please enter a number greater than or equal to 1";
        return;
    }
    if(num > 3999){
        output.innerHTML = "Please enter a number less than or equal to 3999";
        return
    }

    const result = convertToRoman(num);
    output.innerHTML = result;
})

function convertToRoman(num) {
    const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let result = ""; 
    for (let key in roman) {
        while (num >= roman[key]) {
            result += key;
            num -= roman[key];
        }
    }
    return result;  
}