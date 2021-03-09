module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let bracket;
  for(let i=0; i<str.length; i++) {
    bracket = str.charAt(i);
    if ( bracket.isSameOpenClose(bracketsConfig) ) {
      (stack[stack.length-1] === bracket) ? stack.pop() : stack.push(bracket);
    } else if ( bracket.isOpenBracket(bracketsConfig) ) {
      stack.push(bracket);
    } else {
      if (stack.pop() !== bracket.getOpenBracket(bracketsConfig)) return false;
    }
  }
  return !stack.length;
}

String.prototype.isOpenBracket = function(bracketsConfig) {
  for (let i=0; i<bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] === this.valueOf()) return true;
  } 
  return false;
}
String.prototype.isSameOpenClose = function(bracketsConfig) {
  for (let i=0; i<bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] === this.valueOf() && bracketsConfig[i][0] === bracketsConfig[i][1]) return true;
  } 
  return false;
}
String.prototype.getOpenBracket = function(bracketsConfig) {
  for (let i=0; i<bracketsConfig.length; i++) {
    if (bracketsConfig[i][1] === this.valueOf()) return bracketsConfig[i][0];
  } 
}