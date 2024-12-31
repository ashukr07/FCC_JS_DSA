
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
checkBtn.addEventListener("click", () => {
    const telephone= document.getElementById("user-input").value;
    if(telephone === "") {
        alert("Please provide a phone number")
        return;
    }
    const isValid = checkValidUSNumber(telephone);
    console.log(isValid)
    if(isValid){
        const p = document.createElement("p");
        p.innerHTML = `Valid US number: ${telephone}`;
        result.appendChild(p);
    }
    else{
        const p = document.createElement("p");
        p.innerHTML = `Invalid US number: ${telephone}`;
        result.appendChild(p)
    }

})

clearBtn.addEventListener("click", () => {
    result.innerHTML = "";
    //result.removeChild(p);
})

function checkValidUSNumber(telephone){
//1 555-555-5555
// 1 (555) 555-5555
// 1(555)555-5555
// 1 555 555 5555
// 5555555555
// 555-555-5555
// (555)555-5555

//1 555)555-5555 this is invalid
    

    const regEx = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regEx.test(telephone);
}