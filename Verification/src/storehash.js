import getWeb3 from "./getWeb3";


async function storehash() { 

    const address = '0x40619f0278DE88aB843d8c57A6f6c66e3ab49dd1';

    const abi = [{
        "inputs": [],
        "name": "getHash",
        "outputs": [
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            }
        ],
        "name": "setHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];
    const web3 = await getWeb3();
    return new web3.eth.Contract(abi, address);
}
storehash();

export default storehash;
