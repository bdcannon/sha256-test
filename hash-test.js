var readline = require('readline');
var crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var message = "This is a test message!";

function promptForSecret(){
  rl.write('Enter a secret to hash the messge');
}

rl.on('line', function(secret){
var hash = crypto.createHmac('sha256', secret)
                 .update(message)
                 .digest('hex');

});

console.log('Message to hash is ' + message);
promptForSecret();
