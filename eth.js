/*
Установить Ethereum ноду
Реализовать поиск адресов пользовательских адресов в блоке по средствам nodejs и Redis
Скрипт nodejs по приему сообщений RabbitMQ
Запушить изменения в github
После проверки кода получить задание и произвести рефакторинг с покрытием тестов"
*/

const prompt = require('prompt-sync')();
const blockNumber = prompt('Input block number. For example: 14588452');
const addr = prompt('Input address. For example: 0x66d91CD58D5E270AAa5525CaBc6cc6f41E9ed9e4');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

(async () => {
    const block = await web3.eth.getBlock(blockNumber, true);
    if (block != null  && block.transactions != null && block.transactions.length !== 0) {
        const txs = block.transactions;
        const foundTxs = txs.filter(function (e) {
            return e.from === addr || e.to === addr;
        });
        console.log(foundTxs);
    }
})();
