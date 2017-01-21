var readline = require('readline');
var crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var secret = "shhh...";

function promptForSecret(){
  rl.write('Enter a message to hash: ');
}

rl.on('line', function(message){
  var hash = crypto.createHmac('sha256', secret)
                 .update(message)
                 .digest('hex');
  console.log(hash);
  promptForSecret();
});

console.log('The current secret is ' + secret);
promptForSecret();
