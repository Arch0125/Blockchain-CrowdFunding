import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../Ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../Ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

export default class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            campaignBalance: summary[1],
            noOfReq: summary[2],
            noOfContributor: summary[3],
            manager: summary[4]

        };
    }

    renderCard() {

        // de structuring
        const {
            address,
            minimumContribution,
            campaignBalance,
            noOfReq,
            noOfContributor,
            manager,
        } = this.props;

        const items = [
            {
                header: manager,
                description: 'The Manager created this Pool and can create requests to withdraw money.',
                meta: 'Address of Manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(minimumContribution,'ether'),
                description: 'You must contribute atleast this much wei to become a approver.',
                meta: 'Minimum Contribution (ETH)',
            },
            {
                header: noOfReq,
                description: 'A request tries to withdraw money from the contract. A request must be approved by approvers.',
                meta: 'Number of Requests',
            },
            {
                header: noOfContributor,
                description: 'No of people who have already donated to the campaign.',
                meta: 'No of Approvers',
            },
            {
                header: web3.utils.fromWei(campaignBalance, 'ether'),
                description: 'The amount of money Fund has left to spend.',
<<<<<<< HEAD
                meta: 'Campaign Balance (ETH)',
=======
                meta: 'Campaign Balance (ether)',
>>>>>>> bff6a656bac65e57cf7158ee20e9e22251a788d3
            },
            {
                header: address,
                description: 'Address of the Campaign Smart Contract. Check before request/contributing',
                meta: 'Contract Address',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group align="center" items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3 align="center" >Fund Pool Details</h3>
                <hr></hr>
                <Grid>
                    <Grid.Row>

                        <Grid.Column width={15}>
                            {this.renderCard()}

                        </Grid.Column>

                        

                        

                    </Grid.Row>

                </Grid>

                <label/>

                <hr></hr>

                <Grid>

                    <Grid.Column align="center" width={16} >
                            <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>

                <hr></hr>
                <h2 align="center" >View or Make requests</h2>

                <Grid>

                    <Grid.Row>

                        <Grid.Column align="center" >
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a  >
                                    <Button  primary>View/Make Requests </Button>
                                </a>
                            </Link>
                            <label><br/>Note: Your withdrawal request needed to be approved by everyone before transaction</label>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                <hr></hr>
                <h5 align="center" >Blockchain Crowd Funding Platform</h5>
            </Layout>
        );
    }
}