const moment = require('moment');
// var date = new Date();
// console.log(date.getMonth());

// var date = moment();  //current time
// date.add(1, 'year').subtract(9, 'months')
// console.log(date.format('MMM Do YYYY'));

// Get timestamp
var someTimestamp = moment().valueOf();
console.log(someTimestamp);


var date = moment();
console.log(date.format('h:mm a'));
