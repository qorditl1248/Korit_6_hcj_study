
const USERNAME = 'admin';
const PASSWORD = "1234";

function login(username, password) {
  if(USERNAME === username && PASSWORD === password) {
    console.log(`로그인 성공`);
    return;
  }
  console.log(`로그인 실패`);
}


const login2 = login;

login2('admin', '1234');
login('admin', '1234');

const add2 = function add(x, y) {
  return x + y;
}

console.log(add2(10, 20));

// 익명함수
const sub2 = function (x, y) {
  return x - y;
}

console.log(sub2(10, 3));

// 화살표 함수(람다)
div = (x, y) => {
  return !x || !y ? 0 : x / y;
}

console.log(div(10, 2));

// 화살표 함수(명령이 한줄)

div = ((x, y) => !x || !y ? 0 : x / y);
console.log(div(5, 5));

// 화살표 함수(매개변수가 하나면 괄호 생략)

const print = data => console.log(data);

print("출력");


// 함수 안에 함수를 쓰는 경우 화살표 함수로 표현
function main() {
  const test = () => {
    console.log("테스트 함수 호출");
  }

  test();
}

main();
// test(); - 오류 