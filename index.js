const API_KEYS = require('./API_KEYS');
const Iyzipay = require('iyzipay');
const fs = require('fs');
const JFile=require('jfile');

const iyzipay = new Iyzipay(API_KEYS);

const payments=new JFile("./paymentTxId.txt").lines;

let success = [];
let failed = [];
let log = "";

function approvalLoop () {
    setTimeout(function () {
        const txId = payments.pop();

        iyzipay.approval.create({
            paymentTransactionId: txId
        }, function (err, result) {
            console.log(txId, result.status, ((result.errorCode !== undefined) ? (`${result.errorCode} ${result.errorMessage}`) : "" ));
            log += `${txId} ${result.status} ${((result.errorCode !== undefined) ? (`${result.errorCode} ${result.errorMessage}`) : "" )}\n`;
            switch (result.status) {
                case "success":
                    success.push(txId);
                    break;
                case "failure":
                    failed.push(txId);
                    break;
            }
        });

        if (payments.length === 0) {
            setTimeout(logger,5000)
        }
        else{
            approvalLoop();
        }
    }, 1000)
}

function logger() {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
    log += `Başarılılar: ${success}\n\nHatalılar: ${failed}\n\nBaşarılı: ${success.length}\n\nHatalı: ${failed.length}`;

    fs.writeFile(`./logs/${dateString}.txt`, log, function (err) {
        if (err) throw err;
        console.log(`Log Saved to ./logs/${dateString}.txt`);
    });
}

approvalLoop();