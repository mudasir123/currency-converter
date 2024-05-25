#! /usr/bin/env node

import inquirer from "inquirer";
const api = "https://v6.exchangerate-api.com/v6/0a4d9f07d8bb1a0f0e235bf7/latest/USD";

const fetchData = async (data:any) => {
    const apiData = await fetch(data);
    const response = await apiData.json();
    return response.conversion_rates;
};

const data = await fetchData(api);
const countries = Object.keys(data);

const firstData = await inquirer.prompt({
    name: "to",
    message: "Enter the currency you have ",
    type: "list",
    choices: countries, // Pass the array of countries directly
});

const secondData = await inquirer.prompt({
    name: "from",
    message: "Enter the currency  you want to convert",
    type: "list",
    choices: countries, // Pass the array of countries directly
});
const ammount = await inquirer.prompt({
    name: "dataAmount",
    message: "Enter the ammount",
    type: "number",
    
});



const otherApi=`https://v6.exchangerate-api.com/v6/0a4d9f07d8bb1a0f0e235bf7/pair/${firstData.to}/${secondData.from}/${ammount.dataAmount}`;


const cnvFetchData = async (data:any) => {
    const apiData = await fetch(data);
    const cnResponse = await apiData.json();
  
    
    return cnResponse.conversion_result;
    
};

const amountConverted=await cnvFetchData(otherApi)
console.log(`your ${ammount.dataAmount} ${firstData.to} is converted into ${amountConverted} ${secondData.from} `);