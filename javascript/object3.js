function modifyUser(user, target, value) {
  const newUser = {
    ...user,
    [target]: value,   //target에 username이 들어가있고 value에 test-user가 있음 
  };
  return newUser;
}

function main() {
  const user = {
    username: "admin",
    password: "1234"
    
  }


  const newUser = modifyUser(user, "username", "test-user");
  console.log(newUser);

  const newUser2 = modifyUser(user, "password", "1111");
  console.log(newUser2);

   // 스프레드 -> 깊은 복사  (안에 내용을 새로운 주소로 복사)
   // userList의 값을 변경해도 newUserList의 값은 변경되지않는다

  const userList = [ user, newUser];
  const newUserList = [...userList, newUser2];



  // 얉은 복사
  // userList의 값을 변경하게 되면 userList2의 값이 변경됨 
  const userList2 = userList; 


  const {a, b, c} = newUserList;
  const {username, password} = a;
}

main();


