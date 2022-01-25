# Blockchain-CrowdFunding
Crowd Funding campaigns have been around for a long time and is proven helpful for a lot amount for people who needs money. But with that comes a lot of ambiguity about the disbursing of funds, the authority controlling it and the authenticity of the person asking for the funds. Moreover, there are no clarity about the transaction and if the authority is truly giving away the funds.

To solve these problems, Decentralization plays an important role. Implementation of Blockchain in the Crowd Funding domain removes the need of a Third Party controlling the funds and shows the clear details about the transaction makes sure the recepient gets the full amount after the authenticity being approved by the contributors to the fund. This allows contributors to get back their money if they find something suspicious. 
Hence, CrowdChain comes with a fully secured and transparent solution faced by current crowd funding platforms

## How CrowdCoin works
### If you are a contributor
1. Create a new fund pool or contribute to an existing one.
2. There are no minimum contribution amount, but to become an approver of the fund there is a minimum amount
3. View Requests made by people from the fund you are a part of.
4. Review the request in detail if everything looks right approve the request.

### If you want to raise funds
1. Select a fund pool you seem suitable.
2. Using the verification site upload documents that supports your cause.
3. Upload the file to IPFS and copy the Hash generated.
4. From the selected fund pool create a new request.
5. Add all the details including the File Hash.
6. Once your request have been approved by all the contributors the fund is transferred directly to your wallet.

# Installation
1. Clone the repository
2. Copy the Verification folder out of the main folder.
3. Run `npm install` inside both the folders.
4. Run `npm run dev` in Blockchain-CrowdFunding, make sure it runs on `localhost:3000`
5. Run `npm start` inside Verification folder, make sure it runs on `localhost:3001`
6. Connect your Metamask accounts to Ropsten Network and add ethers, two wallets are recommended.

