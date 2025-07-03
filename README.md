# Hyperledger Fabric Asset Transfer Sample

This project is a Hyperledger Fabric sample network customized to implement an **asset transfer** use case with a custom smart contract. It includes:

✅ Fabric test network with two organizations  
✅ Custom JavaScript chaincode supporting enhanced asset attributes  
✅ Level 1 & Level 2 lifecycle workflow tested  
✅ Commands and setup documented for clarity

---

## Project Structure
fabric-samples/
├── asset-transfer-basic/
│ └── chaincode-javascript/
│ └── lib/assetTransfer.js
├── test-network/
│ └── (network config, scripts, docker-compose)
└── README.md

---

## Prerequisites

- Docker & Docker Compose
- Node.js (16+ recommended)
- Fabric binaries (`bin/` directory) installed
- Hyperledger Fabric samples (cloned or downloaded)

---

## Network Setup

1️⃣ Launch the Fabric test network

```bash
cd test-network
./network.sh up createChannel -ca
Smart Contract Overview

The customized JavaScript chaincode includes functions to:

Create a dealer asset with:
dealerid
msisdn
mpin
balance
status
transamount
transtype
remarks
Read an asset
Update an asset
Delete an asset
Transfer an asset
The smart contract file is located at:

asset-transfer-basic/chaincode-javascript/lib/assetTransfer.js
Testing Commands

✅ To create an asset after chaincode deployment:

peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $ORDERER_CA \
  -C mychannel \
  -n mycc \
  --peerAddresses localhost:7051 \
  --tlsRootCertFiles $PEER0_ORG1_CA \
  --peerAddresses localhost:9051 \
  --tlsRootCertFiles $PEER0_ORG2_CA \
  -c '{"function":"CreateAsset","Args":["dealer001","9876543210","1234","10000","active","500","credit","first transaction"]}'
✅ To query an asset:

peer chaincode query \
  -C mychannel \
  -n mycc \
  -c '{"Args":["ReadAsset","dealer001"]}'
✅ To initialize chaincode (if required):

peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile $ORDERER_CA \
  -C mychannel \
  -n mycc \
  --isInit \
  --peerAddresses localhost:7051 \
  --tlsRootCertFiles $PEER0_ORG1_CA \
  --peerAddresses localhost:9051 \
  --tlsRootCertFiles $PEER0_ORG2_CA \
  -c '{"Args":[]}'
Project Levels

✅ Level 1: Base Fabric test network
✅ Level 2: Chaincode customization and testing
⬜ Level 3: REST API (planned for the future)

Useful References

Fabric Chaincode Docs
Asset Transfer Basic Samples
Fabric Gateway
Author

Divya Avanigadda
GitHub Profile
License

This sample project is under the Apache 2.0 License.


---
