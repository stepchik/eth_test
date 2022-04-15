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
const redis = require("redis");
let redisClient = redis.createClient();

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

let foundTransactions = [];
(async () => {
    const block = await web3.eth.getBlock(blockNumber);
    if (block != null  && block.transactions != null && block.transactions.length !== 0) {
        const txs = block.transactions;
        for (const tx of txs) {
            const data = await web3.eth.getTransaction(tx);
            if ((data.from === addr) || (data.to === addr)) {
                foundTransactions.push(data.hash);
                // v1 await redisClient.lPush(addr, data.hash);
                console.log('Find transaction ' + data.hash + ' for address ' + addr + ' in block ' + blockNumber);
            }
            //console.log(data.hash);
        }
        await store(foundTransactions)
    }
})();


async function store(foundTransactions) {
    await redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    await redisClient.hSet(addr, ...foundTransactions);
    await redisClient.disconnect();
}
