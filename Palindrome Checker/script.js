
document.getElementById("check-btn").addEventListener("click", () => {
    const input = document.getElementById("text-input").value;
    const output = document.getElementById("result");
    if(input === "") {
        alert("please input a value");
        return;
    }
    const result = isPalindrome(input);
    output.innerHTML = result;
})

const isPalindrome = (str) => {
    const cleanStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    console.log(cleanStr);
    const reversedStr = cleanStr //"hello"
                        .split("")//["h", "e", "l", "l", "o"]
                        .reverse()//["o", "l", "l", "e", "h"]
                        .join("");//"olleh"
    console.log(reversedStr);
    return cleanStr === reversedStr ? `${str} is a palindrome` : `${str} is not a palindrome`;
}