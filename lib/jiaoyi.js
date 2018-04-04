let gate = require('./gate');
let _ = require('lodash')

async function main() {
    const ethDayDetail = await gate.getTicker("eth_usdt");
    const ethHistry = await gate.tradeHistory("eth_usdt");

    // const buy = await gate.buy("eth_usdt", "jiage", "");
    // const sell = await gate.sell("eth_usdt", "sellPrice", "liang")
    
    let ethHistryPrice = JSON.parse(ethHistry).data

    let eth = []


    _.forEach(ethHistryPrice, (e)=>{
        console.log("a", e)
        eth.push(e.rate)
    })

   let sortEth = bubbleSort(eth);
   console.log(sortEth)
   

   function bubbleSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {        
                    var temp = arr[j+1];        
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
}




main();
