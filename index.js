import inquirer from "inquirer";
let api = "https://v6.exchangerate-api.com/v6/0a4d9f07d8bb1a0f0e235bf7/latest/USD";
let fetchData = async (data) => {
    let apiData = await fetch(data);
    let response = await apiData.json();
    return response.conversion_rates;
};
let data = await fetchData(api);
let countries = Object.keys(data);
let firstData = await inquirer.prompt({
    name: "to",
    message: "Enter the currency you have ",
    type: "list",
    choices: countries, // Pass the array of countries directly
});
let secondData = await inquirer.prompt({
    name: "from",
    message: "Enter the currency  you want to convert",
    type: "list",
    choices: countries, // Pass the array of countries directly
});
let ammount = await inquirer.prompt({
    name: "dataAmount",
    message: "Enter the ammount",
    type: "number",
});
let otherApi = `https://v6.exchangerate-api.com/v6/0a4d9f07d8bb1a0f0e235bf7/pair/${firstData.to}/${secondData.from}/${ammount.dataAmount}`;
let cnvFetchData = async (data) => {
    let apiData = await fetch(data);
    let cnResponse = await apiData.json();
    return cnResponse.conversion_result;
};
let amountConverted = await cnvFetchData(otherApi);
console.log(`your ${ammount.dataAmount} ${firstData.to} is converted into ${amountConverted} ${secondData.from} `);
