// Cash Register Logic
let price =19.5;
const changeDueElement = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
};
// console.log(cid);
// console.log(price);


// Main function to handle cash register logic
function cashRegister(price, cash, cid) {
  let changeDue = cash - price;
  let totalCid = cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2);
  //console.log(changeDue);
  

  if (changeDue === 0) {
    return { status: "EXACT", change: [] };
  }

  if (changeDue < 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (Number(totalCid) === changeDue) {
    let filteredCid = cid.filter(([_, amount]) => amount > 0);
    return { status: "CLOSED", change: filteredCid };
  }
  
  let changeArray = calculateChange(changeDue, cid);
  //console.log(changeArray);
  let totalChange = changeArray.reduce((sum, [_, amount]) => sum + amount, 0)
  if (totalChange < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
//   if(totalChange === changeDue){
//     return { status: "CLOSED", change: cid };
//   }

  return { status: "OPEN", change: changeArray };
}

// Helper function to calculate change
function calculateChange(changeDue, cid) {
  let changeArray = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    let [unit, amount] = cid[i];
    let unitValue = currencyUnits[unit];
    let unitUsed = 0;

    while (changeDue >= unitValue && amount > 0) {
      changeDue -= unitValue;
      changeDue = Math.round(changeDue * 100) / 100; // Avoid floating-point issues
      amount -= unitValue;
      unitUsed += unitValue;
    }

    if (unitUsed > 0) {
      changeArray.push([unit, unitUsed]);
    }
  }

  return changeArray;
}

// Helper function to format change
function formatChange(changeArray) {
    return changeArray
      .sort((a, b) => b[1] - a[1]) // Sort by amount in descending order
      .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
      .join(" ");
  }
// Event listener for purchase button
purchaseBtn.addEventListener("click", () => {
  
  const cash = parseFloat(cashInput.value);

  

  if (isNaN(price) || isNaN(cash)) {
    alert("Please enter valid numbers for price and cash.");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  const result = cashRegister(price, cash, JSON.parse(JSON.stringify(cid))); // Deep copy of cid

  // Handle results and update the UI
  switch (result.status) {
    case "EXACT":
      changeDueElement.textContent = "No change due - customer paid with exact cash.";
      break;
    case "INSUFFICIENT_FUNDS":
      changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
      break;
    case "CLOSED":
      changeDueElement.textContent = `Status: CLOSED ${formatChange(result.change)}`;
      break;
    case "OPEN":
      changeDueElement.textContent = `Status: OPEN ${formatChange(result.change)}`;
      break;
  }
});
