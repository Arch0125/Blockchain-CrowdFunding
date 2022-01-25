import './App.css';

import React, { useState } from 'react';
import getWeb3 from "./getWeb3";
import ipfs from './ipfs';
import storeHash from './storehash';
import { Button, Table } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';

function App() {
    const [ipfsHash, setIpfsHash] = useState(null);
    const [buffer, setBuffer] = useState('');
    const [ethAddress, setEthAddress] = useState('');
    const [storeHashTransaction, setStoreHashTransaction] = useState('');
    const [blockNumber, setBlockNumber] = useState('');
    const [gasUsed, setGasUsed] = useState('');
    const [loading, setLoading] = useState(false);
    var file = '';                  

    const captureFile = (event) => {
        event.stopPropagation();    
        event.preventDefault();     
        file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => convertToBuffer(reader);
    };

    const convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        setBuffer(buffer);
    };

    const sendIt = async (event) => {
        setLoading(true);
        event.preventDefault();    
        const ipfsHash = await ipfs.add(buffer);        
        setIpfsHash(ipfsHash.path);

        try{
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const storeHashContract = await storeHash();
            const ethAddress= await storeHashContract.options.address;
            setEthAddress(ethAddress);      // 'address' is used in HTML rendering
            const receipt = await storeHashContract.methods.setHash(ipfsHash.path).send({from: accounts[0]});
            setStoreHashTransaction(receipt);
            setLoading(false);
        }catch (error) {
            alert(
                `Failed to load web3. Check that Metamask connected this page to a blockchain account. Else see browser console for error details.`
            );
            console.error(error);
            setLoading(false);
        }
    };

    const getDetails = async () => {
        console.log('transaction of which to retrieve details:', storeHashTransaction);
        setBlockNumber(storeHashTransaction.blockNumber);  
        setGasUsed(storeHashTransaction.gasUsed);
    }
    
    return (
        <div className="App"  >
            <header className="App-header">
                
                <h1 className="h1" >CrowdCoin Document Verification and Upload</h1>
                
                
            </header>
            <hr/>        
            <h3> Choose file and send it to IPFS </h3>
            <form onSubmit={sendIt}>
                <input type = "file" onChange = {captureFile} />
                {loading ?
                <div className="spinner">
                    <BounceLoader
                    color={'#004da0'}
                    loading={loading}
                    />
                </div>:
                <Button class="subbutton" size="lg" type="submit"> 2.Send it to IPFS</Button>
                }
            </form>
            <hr/> 

            <h3> Get Transaction Details </h3>
            <Button class="subbutton" size="lg" onClick = {getDetails}> 3.Get Storage Transaction Details </Button> 
            <hr/>
            
            <h3> Document Details</h3>
            <Table size="sm" bordered responsive>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th> </th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Smart Contract address storing IPFS hash</td>
                        <td> : </td>
                        <td>{ethAddress}</td>
                    </tr>
                    <tr>
                        <td>IPFS Hash to store on Ethereum</td>
                        <td> : </td>
                        <td>{ipfsHash}</td>
                    </tr>
                    <tr>
                        <td>Storing transaction's BlockNumber </td>
                        <td> : </td>
                        <td>{blockNumber}</td>
                    </tr>
                    <tr>
                        <td>Storing transaction's Gas Used </td>
                        <td> : </td>
                        <td>{gasUsed}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
    //}
}

export default App;
