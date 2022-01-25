import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
import web3 from '../Ethereum/web3';

export default () => {

    const accounts = web3.eth.getAccounts();
    console.log(accounts[0])

    return (
        <Menu style={{ marginTop: 10 }}>
            <Link route="/">
                <a className="item">
                    Blockchain Crowd Funding
                </a>
            </Link>
            <Link route="https://coinmarketcap.com/currencies/ethereum/">
                <a className="item">
                    Check current Ethereum Prices
                </a>
            </Link> 

            
        </Menu>
    );
};