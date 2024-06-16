console.log(a); // 실행 순서 2

var a; // 실행 순서 1 

a = 10; // 실행 순서 3

var b = 10;
console.log(b);

var b = 20;
console.log(b);

let c = 30;
console.log(c);
// let c = 40; - 재선언 불가능, 호이스팅 안됨 
c ="40"; // 재할당 가능 

const d = 50;
console.log(d);
// d = 60;   재선언, 재할당 불가능
// console.log(d);