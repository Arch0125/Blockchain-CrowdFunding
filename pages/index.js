import React, { Component } from 'react';
import factory from '../Ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';


class CampaignIndex extends Component {

    static async getInitialProps() {
        // next js execute on the server side
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <Button
                                content="View Fund Pool"
                    
                                primary
                                floated="right"
                            />
                    </Link>
                    
                ),
                fluid: true,
                style: { overflowWrap: 'break-word' }
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h1 align="center" > CrowdChain <br/><label>The blockchain based Crowd Funding Platform</label> </h1>
                <hr></hr>
                <div align="center" >
                <img width={200} height={200} src="https://i.ibb.co/zGwXw7d/Red-Clean-Un-Style-Equality-Civil-Society-SDG-Instagram-Post.png"/>
                <img width={200} height={200} src="https://i.ibb.co/DL8dR1g/Red-Clean-Un-Style-Equality-Civil-Society-SDG-Instagram-Post-1.png"/>
                <img width={200} height={200} src="https://i.ibb.co/xmMR4mK/Red-Clean-Un-Style-Equality-Civil-Society-SDG-Instagram-Post-2.png"/>
                <img width={200} height={200} src="https://i.ibb.co/TMGJZpr/Red-Clean-Un-Style-Equality-Civil-Society-SDG-Instagram-Post-3.png"/>
                <img width={200} height={200} src="https://i.ibb.co/q7RkyNS/Red-Clean-Un-Style-Equality-Civil-Society-SDG-Instagram-Post-4.png"/>          
                </div>
                
                
                <hr></hr>
                <div>
                    <h2 align="center" >Fund Pools open for Contributing</h2>

                    <Link route="/campaigns/new">
                        <a align="center" >
                            <Button
                                content="Create New Fund"
                                icon="add circle"
                                primary
                                floated="right"
                            />
                            
                        </a>
                        
                    </Link>
                    </div>
                    <div>
                    {this.renderCampaigns()}
                    </div>
                    
                
            </Layout>
        );
    }
}

export default CampaignIndex;