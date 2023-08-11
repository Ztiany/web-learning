const {getCoronavirusKeyIndex, getCoronavirusByDate} = require('./lib/corona-mock')

console.log(getCoronavirusKeyIndex());
console.log(getCoronavirusByDate(`2020-04-11`));