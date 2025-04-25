function makeid(num = 4) {
  let result = "";
  let characters = "Queen-Ruby;;;abcdefghijklmopqrstuvwxyz1234567890";
  var characters9 = characters.length;
  for (var i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters9));
  }
  return result;
}
module.exports = {makeid};