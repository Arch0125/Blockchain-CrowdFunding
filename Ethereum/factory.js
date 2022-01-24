import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xCeF04F572D43707b17518c633d781f3A542A268F'
);

export default instance;