var num = 10;
var sNum = "10";
console.log(num == sNum); // true
console.log(num === sNum); // false

var num2;
console.log(num2); // undefined
console.log(!!num2); // true

//? not(!) 연산자를 활용하여 문자, 숫자 등의 자료를 논리데이터로 변환하는 법 
//? 0, null, undefind, " ", NaN(계산할 수 없음, 연산 오류) - 를 제외한 건 true

/*
  var num = 10;
? !!num -> true

  num = 0; 
? !!num -> false

  var str = "test";
? !!str -> true

  var str = " ";
? !!str -> false

  var array = [ 1, 2, 3 ];
? !!array -> true

  array = [];
? !!array -> true 
? !!array.length -> false
? array.length > 0 -> true
? array.length === 0? -> false
*/

var num = 0;
console.log(!!num); // false

var str = "";
console.log(!!str); // false

var array = [];
console.log(!!array); // true
console.log(!!array.length); // false

var a;
console.log(!!a); //false

var b = null;
console.log(!!b); // false

var c = 0 / 0;
console.log(c);

if(!num) {
  var num2 = 20;
  console.log(`num은 0입니다.`);
  if(!!num2) {
    console.log(`num2는 값이 있습니다.`);
  }
}

if(!str) {
  console.log(`빈 문자열입니다.`);
}

if(!b) {
  console.log(`Null 입니다.`);
}