var request = require('request');
var crypto = require('crypto');
var querystring = require('querystring');

// add your key and secret
const KEY  = '43A78E41-9EEC-46E7-A352-D431D7F976EC';
const SECRET  = '3d290a530568231d14e7f8e783cc2a12630a6e0393aba243db8fcdac1d4706fb';

const API_QUERY_URL = 'https://data.gate.io/';
const API_TRADE_URL = 'https://api.gate.io/';
const PAIRS_URL = 'api2/1/pairs';
const MARKETINFO_URL = 'api2/1/marketinfo';
const MARKETLIST_URL = 'api2/1/marketlist';
const TICKERS_URL = 'api2/1/tickers';
const TICKER_URL = 'api2/1/ticker';
const ORDERBOOKS_URL = 'api2/1/orderBooks';
const ORDERBOOK_URL = 'api2/1/orderBook';
const TRADEHISTORY_URL = 'api2/1/tradeHistory';

const BALANCE_URL = 'api2/1/private/balances';
const DEPOSITADDRESS_URL = 'api2/1/private/depositAddress';
const DEPOSITSWITHDRAWALS_URL = 'api2/1/private/depositsWithdrawals';
const BUY_URL = 'api2/1/private/buy';
const SELL_URL = 'api2/1/private/sell';
const CANCELORDER_URL = 'api2/1/private/cancelOrder';
const CANCELALLORDERS_URL = 'api2/1/private/cancelAllOrders';
const GETORDER_URL = 'api2/1/private/getOrder';
const OPENORDERS_URL = 'api2/1/private/openOrders';
const MYTRADEHISTORY_URL = 'api2/1/private/tradeHistory';
const WITHDRAW_URL = 'api2/1/private/withdraw';



const USER_AGENT = '';

function Request (params,cp){
    return new Promise(resolve => {
        request(params, function(error, response, body) {
            if(error) {
                // cp(error);
            }else{
                resolve(body);
                // cp(body);
            }
        });
    });
}
function getSign(form) {
    return crypto.createHmac('sha512', SECRET).update(form).digest('hex').toString();
}

var gate = {

    getPairs: function() {
        return Request({method: 'GET', url: API_QUERY_URL + PAIRS_URL, headers: { 'User-Agent' : USER_AGENT } });
    },

    getMarketinfo:function() {
        return Request({method: 'GET', url: API_QUERY_URL + MARKETINFO_URL, headers: { 'User-Agent' : USER_AGENT } });
    },

    getMarketlist:function () {
        return Request({method: 'GET', url: API_QUERY_URL + MARKETLIST_URL, headers: { 'User-Agent' : USER_AGENT } });
    },

    getTickers:function () {
        return Request({method: 'GET', url: API_QUERY_URL + TICKERS_URL, headers: { 'User-Agent' : USER_AGENT } });
    },

    getTicker:function (param) {
        return Request({method: 'GET', url: API_QUERY_URL + TICKER_URL + '/'+ param, headers: { 'User-Agent' : USER_AGENT } });
    },

    orderBooks:function () {
        return Request({method: 'GET', url: API_QUERY_URL + ORDERBOOKS_URL, headers: { 'User-Agent' : USER_AGENT } });
    },

    orderBook:function (param) {
        return Request({method: 'GET', url: API_QUERY_URL + ORDERBOOK_URL+  '/'+ param, headers: { 'User-Agent' : USER_AGENT } });
    },

    tradeHistory:function (param) {
        return Request({method: 'GET', url: API_QUERY_URL + TRADEHISTORY_URL+  '/'+ param, headers: { 'User-Agent' : USER_AGENT } });
    },

    getBalances:function () {
        let form = {};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + BALANCE_URL, headers: header, form:form });
    },

    depositAddress:function (currency) {
        let form = {'currency':currency};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        console.log(header);
        console.log(querystring.stringify(form));
        console.log(API_TRADE_URL + DEPOSITADDRESS_URL);
        Request({method: 'POST', url: API_TRADE_URL + DEPOSITADDRESS_URL, headers: header, form:form });
    },


    depositsWithdrawals:function (start,end) {
        let form = {'start':start,'end':end};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + DEPOSITSWITHDRAWALS_URL, headers: header, form:form });
    },

    buy:function (currencyPair, rate, amount) {
        let form = {'currencyPair':currencyPair,'rate':rate,'amount':amount};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + BUY_URL, headers: header, form:form });
    },

    sell:function (currencyPair, rate, amount) {
        let form = {'currencyPair':currencyPair,'rate':rate,'amount':amount};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + SELL_URL, headers: header, form:form });
    },

    cancelOrder:function (orderNumber, currencyPair ) {
        let form = {'currencyPair':currencyPair,'orderNumber':orderNumber};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + CANCELORDER_URL, headers: header, form:form });
    },

    cancelAllOrders:function (type, currencyPair ) {
        let form = {'currencyPair':currencyPair,'orderNumber':type};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + CANCELALLORDERS_URL, headers: header, form:form });
    },

    getOrder:function (orderNumber, currencyPair ) {
        let form = {'currencyPair':currencyPair,'orderNumber':orderNumber};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + GETORDER_URL, headers: header, form:form });
    },

    openOrders:function () {
        let form = {};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + OPENORDERS_URL, headers: header, form:form });
    },

    myTradeHistory:function (currencyPair, orderNumber) {
        let form = {'currencyPair':currencyPair,'orderNumber':orderNumber};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + MYTRADEHISTORY_URL, headers: header, form:form });
    },

    withdraw:function (currency,amount, address) {
        let form = {'currency':currency,'amount':amount,'address':address};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        return Request({method: 'POST', url: API_TRADE_URL + WITHDRAW_URL, headers: header, form:form });
    },

};


module.exports = gate;
