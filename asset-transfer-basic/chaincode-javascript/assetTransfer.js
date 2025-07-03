'use strict';

const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    // Create a new asset
    async CreateAsset(ctx, dealerid, msisdn, mpin, balance, status, transamount, transtype, remarks) {
        const exists = await this.AssetExists(ctx, dealerid);
        if (exists) {
            throw new Error(`Asset ${dealerid} already exists`);
        }
        const asset = {
            DEALERID: dealerid,
            MSISDN: msisdn,
            MPIN: mpin,
            BALANCE: balance,
            STATUS: status,
            TRANSAMOUNT: transamount,
            TRANSTYPE: transtype,
            REMARKS: remarks,
        };
        await ctx.stub.putState(dealerid, Buffer.from(JSON.stringify(asset)));
        return JSON.stringify(asset);
    }

    // Read an asset
    async ReadAsset(ctx, dealerid) {
        const assetJSON = await ctx.stub.getState(dealerid);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`Asset ${dealerid} does not exist`);
        }
        return assetJSON.toString();
    }

    // Update an asset
    async UpdateAsset(ctx, dealerid, msisdn, mpin, balance, status, transamount, transtype, remarks) {
        const exists = await this.AssetExists(ctx, dealerid);
        if (!exists) {
            throw new Error(`Asset ${dealerid} does not exist`);
        }
        const updatedAsset = {
            DEALERID: dealerid,
            MSISDN: msisdn,
            MPIN: mpin,
            BALANCE: balance,
            STATUS: status,
            TRANSAMOUNT: transamount,
            TRANSTYPE: transtype,
            REMARKS: remarks,
        };
        await ctx.stub.putState(dealerid, Buffer.from(JSON.stringify(updatedAsset)));
        return JSON.stringify(updatedAsset);
    }

    // Delete an asset
    async DeleteAsset(ctx, dealerid) {
        const exists = await this.AssetExists(ctx, dealerid);
        if (!exists) {
            throw new Error(`Asset ${dealerid} does not exist`);
        }
        await ctx.stub.deleteState(dealerid);
    }

    // Check asset existence
    async AssetExists(ctx, dealerid) {
        const assetJSON = await ctx.stub.getState(dealerid);
        return assetJSON && assetJSON.length > 0;
    }

    // Get all assets
    async GetAllAssets(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        for await (const res of iterator) {
            const strValue = res.value.toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
        }
        return JSON.stringify(allResults);
    }

    // Get transaction history of an asset
    async GetAssetHistory(ctx, dealerid) {
        const results = [];
        const iterator = await ctx.stub.getHistoryForKey(dealerid);
        for await (const res of iterator) {
            const tx = {
                txId: res.txId,
                timestamp: res.timestamp,
                isDelete: res.isDelete,
                value: res.value.toString('utf8'),
            };
            results.push(tx);
        }
        return JSON.stringify(results);
    }
}

module.exports = AssetTransfer;
