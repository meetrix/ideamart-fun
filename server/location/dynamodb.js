var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  "accessKeyId": "AKIAIPRAXEYE724WLYGA",
  "secretAccessKey": "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",
});

const call = (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
};


const subscribe = async (phoneNumber) => {
  var params = {
    TableName: 'IdearmartSubscribers',
    Item: {'phoneNumber': phoneNumber}
  };
  return call('put',params);
}
const getSubscriber = async (phoneNumber) => {
  var params = {
    TableName: 'IdearmartSubscribers',
    Key: {'phoneNumber': phoneNumber}
  };
  return call('get',params);
}

module.exports = {
  subscribe,
  getSubscriber
}
