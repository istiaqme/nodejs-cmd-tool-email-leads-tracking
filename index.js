const fs = require('fs');
const readlineSync = require('readline-sync');

const filesDirectory = "Sources";

let menu = [
    'Refine Unique Items In The Same File', 
    'Find Abandoned Items Between To Files'
];
let menuIndex = readlineSync.keyInSelect(menu, 'Menu');

if(menu[menuIndex] === "Refine Unique Items In The Same File"){
    let fileToRead = readlineSync.question('Write the filename to refine: ');
    let result = refineData(fileToRead);
    console.log(`Total ${result.total} items found. Unique count = ${result.unique}`);
    if (readlineSync.keyInYN('Do you want to write the unique items in a new file? ')) {
        // 'Y' key was pressed.
        let newFileName = readlineSync.question('Write the new filename: ');
        writeToNewFile(newFileName, result.data);
        console.log(`A new file is written named ${newFileName} with total ${result.data.length} items.`);
        console.log('Thank You for using this software. Love From Istiaq Hasan AKA Jonab Istiaq Shaheb');
    } else {
        // Another key was pressed.
        console.log('Thank You for using this software. Love From Istiaq Hasan AKA Jonab Istiaq Shaheb');
    }
}
else{
    let sourceFile = readlineSync.question('Write the source filename: ');
    let fileToMatch = readlineSync.question('Write the filename to match data: ');
    let result = abandonedItems(sourceFile, fileToMatch);
    console.log(`Total ${result.total} items found. Abandoned count = ${result.abandoned}`);
    if (readlineSync.keyInYN('Do you want to write the abandoned items in a new file? ')) {
        // 'Y' key was pressed.
        let newFileName = readlineSync.question('Write the new filename: ');
        writeToNewFile(newFileName, result.data);
        console.log(`A new file is written named ${newFileName} with total ${result.data.length} items.`);
        console.log('Thank You for using this software. Love From Istiaq Hasan AKA Jonab Istiaq Shaheb');
    } else {
        // Another key was pressed.
        console.log('Thank You for using this software. Love From Istiaq Hasan AKA Jonab Istiaq Shaheb');
    }
}
    


function refineData(fileToRead){
    let unrefinedData = fs.readFileSync(`./${filesDirectory}/${fileToRead}.txt`).toString().toLowerCase().split(",");
    let refinedData = [...new Set(unrefinedData)];
    return {
        total : unrefinedData.length,
        unique : refinedData.length,
        data : refinedData
    }
}

function writeToNewFile(newFileName, data){
    fs.writeFileSync(`./${filesDirectory}/${newFileName}.txt`, data.join(',').toLowerCase());
    return true;
}

function abandonedItems(sourceFile, fileToMatch){
    let sourceFileItems = fs.readFileSync(`./${filesDirectory}/${sourceFile}.txt`).toString().toLowerCase().split(",");
    let fileToMatchItems = fs.readFileSync(`./${filesDirectory}/${fileToMatch}.txt`).toString().toLowerCase().split(",");
    let abandonedItems = sourceFileItems.filter(function(item) { return fileToMatchItems.indexOf(item) == -1; });
    return {
        total : sourceFileItems.length,
        abandoned : abandonedItems.length,
        data: abandonedItems
    }
}






/* function refineDataX (fileToRead, fileToWrite){
        console.log(`...Refinery Service Started.`);
    // read comma separated data and convert it in array.
    let unrefinedData = fs.readFileSync(`./Sources/${fileToRead}.txt`).toString().split(",");
        console.log(`=> ${unrefinedData.length} items found.`);
        console.log(`=> System started to refine.`);
    let refinedData = [...new Set(unrefinedData)];
        console.log(`=> System finished refining.`);
        console.log(`=> ${unrefinedData.length - refinedData.length} duplicate items found.`);
        console.log(`=> System is writing data in file ${fileToWrite}.txt`);
    fs.writeFileSync(`./Sources/${fileToWrite}.txt`, refinedData.join(',').toLowerCase());
        console.log(`=> New file ${fileToWrite}.txt is written with ${refinedData.length} unique items.`);
        console.log(`...Refinery Service Finished`);
}

function checkItemsNotInTheSourceX(sourceFile, fileToMatch){
    let sourceFileItems = fs.readFileSync(`./Sources/${sourceFile}.txt`).toString().split(",");
    let fileToMatchItems = fs.readFileSync(`./Sources/${fileToMatch}.txt`).toString().split(",");
    let abandonedItems = sourceFileItems.filter(function(item) { return fileToMatchItems.indexOf(item) == -1; });
    let intersection = sourceFileItems.filter(element => !fileToMatchItems.includes(element));
    console.log(abandonedItems, intersection);
} */