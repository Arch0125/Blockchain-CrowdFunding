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
                description: 'The Manager created this Campaign and can create requests to withdraw money.',
                meta: 'Address of Manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                description: 'You must contribute atleast this much wei to become a approver.',
                meta: 'Minimum Contribution (wei)',
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
                description: 'The amount of money campaign has left to spend.',
                meta: 'Campaign Balance (ether)',
            },
            {
                header: address,
                description: 'Address of the Campaign Smart Contract. Check before request/contributing',
                meta: 'Contract Address',
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3 align="center" >Campaign Details</h3>
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

                    <Grid.Row>

                        <Grid.Column align="center" >
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a  >
                                    <Button  primary>View Requests </Button>
                                </a>
                            </Link>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}