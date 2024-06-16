function createUser(userName, password, name, email) {
  return {
    "userName": userName,
    "password": password,
    "name": name,
    "email": email,
  }
}

function createUser2(userName, password, name, email) {
  return {
    ["userName"]: userName,
    ["password"]: password,
    ["name"]: name,
    ["email"]: email,
  }
}

function createUser3(userName, password, name, email) {
  return {
    userName,
    password,
    name,
    email,
  }
}



function main() {
  const userName = 'admin';
  const password = "1234";
  const name = "김준일";
  const email = "aaa@gmail.com";

  let user = createUser(userName, password, name, email);
  let user2 = createUser2(userName, password, name, email);
  let user3 = createUser2(userName, password, name, email);

  
  console.log(user);
  console.log(user2);
  console.log(user3);
}

main();


