const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
// const mime = require('mime-types');
const keys = require('../config/keys');

const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: 'v4',
  region: 'eu-central-1',
  endpoint: 's3-eu-central-1.amazonaws.com',
});

module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject', {
      Bucket: 'simple-blog-bucket',
      ContentType: 'image/*',
      Key: key,
    }, (err, url) => {
      err ? console.log('error: ', err) : console.log('success!');
      console.log('key ', key);
      console.log('url ', url);
      res.send({ key, url });
    });
  });
};
