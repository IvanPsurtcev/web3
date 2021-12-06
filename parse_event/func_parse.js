const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3('https://mainnet.infura.io/v3/0e7fc83d517e43c8b15c10f887a9a59a');

const sushiContract = new web3.eth.Contract(
  JSON.parse(fs.readFileSync(__dirname + '/abi-refreshed.json')),
  '0xfd5eF736E72d2AE58458f235e1135148eeB1b524'
);

let results = fs.readFileSync(__dirname + '/results.txt');
results = eval(results.toString());

const wallets = [];
var sum = 0;

async function main() {
  try {
    for (let i = 0; i < results.length; i++) {
      let balance = await sushiContract.methods.balanceOf(results[i][0]).call();
      balance = web3.utils.fromWei(balance, "ether");
      sum += parseFloat(balance);
      wallets.push([results[i][0], balance])
      
    }
  } catch(error) {
    console.error(error);
  }
  console.log(sum);
  let sorted = wallets.sort((a, b) => b[1] - a[1]);
  console.log(sorted);

  process.exit();
}

main();