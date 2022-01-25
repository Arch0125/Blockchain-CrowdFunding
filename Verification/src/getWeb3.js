import Web3 from "web3";
export default getWeb3;

async function fromBrowser() {
    let web3;       
    if(window.ethereum) {

        web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.enable();

            return web3;
        } catch (error){
            console.log('user refused connection', error);
        }
    }
    else if (window.web3) {

        web3 = window.web3;
        return web3;
    }
    else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
        web3 = new Web3(provider);
        return web3;
    }
}

async function getWeb3(){
    try {
        const web3 = await fromBrowser();
        return web3;
    } catch (error) {
        console.log('Check that Metamask connected this page to a blockchain account', error);
    }
}

getWeb3();