// 중괄호가 열리면 {객체}
const user ={ 
    username: "admin",
    password: "1234",
    name: {
      lastName: "김",
      firstName: "준일"
    },
    print: () => {
      console.log(`사용자 이름: ${user.username}`);
      console.log(`비밀번호: ${user.password}`);
    },
};

console.log(user); // { username: 'admin', password: '1234' }
console.log(user.username); // admin
console.log(user.password); // 1234
user.print();
console.log(user.name.lastName);
console.log(user.name.firstName);