var AWS = require('aws-sdk');
import { cred } from '../../config/dynamodbcred'

AWS.config.update({
  region: "us-west-2",
 "accessKeyId": cred.accessKeyId,
 "secretAccessKey": cred.secretAccessKey,
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
