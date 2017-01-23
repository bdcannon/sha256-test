var readline = require('readline');
var crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkAccessToken(message, secret, token){
  var messageBase64 = token.split('.')[0];
  var signatureBase64 = token.split('.')[1];

  var signatureBase64 = Buffer(signatureBase64, 'base64').toString('hex');
  var message = Buffer(messageBase64, 'base64').toString('utf-8');

  // Try to reproduce hash
  var testHash = crypto.createHmac('sha256', secret)
                 .update(message)
                 .digest('hex');
  return testHash == signatureBase64;

}

rl.question('Enter a message: ', (message) => {
  rl.question('Enter a secret: ', (secret) => {
    var hash = crypto.createHmac('sha256', secret)
                   .update(message)
                   .digest('hex');
    var hashBase64 = Buffer(hash, 'hex').toString('base64');
    var messageBase64 = Buffer(message, 'utf-8').toString('base64');
    var token = messageBase64 + '.' + hashBase64;

    if(checkAccessToken(message, secret, token)) console.log('Token is good!');
    else console.log('No good');
  });
});
