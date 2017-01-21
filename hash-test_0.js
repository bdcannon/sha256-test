var readline = require('readline');
var crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var message;

rl.question('Enter a message to sign: ', (msg)=>{
  message = msg;
  rl.question('Continue to enter secrets: ', (scrt)=>{
    var hash = crypto.createHmac('sha256', scrt).update(msg).digest('hex');
    console.log(hash);
    rl.write('Enter in another secret! ');
    rl.on('line', (input)=>{
      var hash = crypto.createHmac('sha256', input).update(msg).digest('hex');
      console.log(hash);
      rl.write('Enter in another secret! ');
    });
  });
});
