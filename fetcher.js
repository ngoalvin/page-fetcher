const { dir } = require('console');
const fs = require('fs');
const args = process.argv.slice(2);
const request = require('request');

console.log(args);
request(args[0], (error, response, body) => {

  if (error || (response.statusCode > 299 && response.statusCode < 200) ) {
    console.log("Error: ", error);
    console.log('statusCode:', response && response.statusCode);
    process.exit()
  }
  
  fs.writeFile(args[1], body, (err) => {
    if (err) throw err;
    fs.stat(args[1], function(err, stats) {
      console.log(`Downloaded and saved ${stats.size} bytes to ${args[1]}`)
    })
  })
});
