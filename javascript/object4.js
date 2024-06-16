//! 비구조 할당, 구조 분해 **중요
//? {} 객체 , [] 배열

function main() {
  const user = {
    username: "admin",
    password: "1234",
    name: "김준일",
    email: "aaa@naver.com"
  }


  const names = ["박현주", "이성희", "권오광", "권혁진"];

  const {username, password, email} = user; // 키값이 변수명
  console.log(username);
  console.log(password);
  console.log(email);

  const [ a, b ] = names; // a, b - 변수명 
  console.log(a);
  console.log(b);

  const {name, ...rest2} = user; // name을 제외한 나머지 키값들을 새로운 객체로 들고옴 
  console.log(rest2);

  console.log(names.slice(1, 3)); // [ '이성희', '권오광' ] , 1부터 3전까지

  
}

main()