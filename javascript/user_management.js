// const names = ["김준일", "김준이", "김준삼"];
// console.log(names.join(""));

// inputMode = 1 >> 추가 
// inputMdoe = 2 >> 수정

let inputMode = 1;

let userList = []; 
loadUserList();

let emptyUser = {  // 비워주는
  id: 0, 
  name: "",
  username: "",
  password: "",
}

let user = {       // 새로운 주소안에 emptyUser안에 있는 내용을 복사 (깊은 복사)
  ...emptyUser,
}

function renderTable() {
  const userTableBody = document.querySelector('.user-table-body');
  userTableBody.innerHTML = userList.map(({name, id, username, password}, index) => {
    return `
      <tr>
        <th><input type="checkbox" onchange="handleUsercheck(event)"/></th>
        <td>${index + 1}</td>
        <td>${id}</td>
        <td>${name}</td>
        <td>${username} </td>
        <td>${password} </td>
        <th><button onclick="deleteUser(event)" value="${id}">삭제</button></th>
      </tr>
    `;
  }).join("");
}

function handleUserInputKeyDown(e) {
  user = {    // 입력받을 때 마다 매번 새로운 객체 생성 - 주소가 달라짐 
    ...user,
    [e.target.name]: e.target.value
  }

  // user[e.target.name] = e.target.value; - user의 주소는 똑같고, 값만 달라짐 -> 이 경우는 밑에서 스프레드 써줘야함 

  if(e.keyCode === 13)  {// - enter키인 경우 
    const nameInput = document.querySelector('.name-input')
    const usernameInput = document.querySelector('.username-input');
    const passwordInput = document.querySelector('.userpassword-input');

    if(e.target.name == "name") {
      usernameInput.focus();
    } if(e.target.name === "username") {  // username에서 enter가 일어나면 password에 포커스 
      passwordInput.focus();         
    } if(e.target.name === "password") {
      userList = [...userList, {...user, id: getNewId()}]; 

      getNewId();

      saveUserList();                       // 다 입력하고 난 뒤 저장 
      renderTable();                        // password에 enter가 일어나면 빈값으로 초기화 

      nameInput.value = emptyUser.name;
      usernameInput.value = emptyUser.username;
      passwordInput.value = emptyUser.password;
      
      nameInput.focus();
    }
  }
}
  // 로컬스토리지 저장하는 방법 
  function saveUserList() {
    localStorage.setItem("userList", JSON.stringify(userList));
  }

  // 페이지를 열었을 때 불러옴 
  function loadUserList() {
    const lsUserList = localStorage.getItem('userList');
    userList = !lsUserList ? [] : JSON.parse(lsUserList);
    renderTable();  // 저장만 해서는 보이지 않음 -> 화면에서 보여주기 위해서 함수 호출 
  }

  // 삭제 
  function deleteUser(e) {
    userList = userList.filter(({id}) => id !== parseInt(e.target.value));
    saveUserList();
    renderTable();
  }

  // 아이디 추가 
  function getNewId() {
    const userIds = (userList.map(user => user.id));
    const maxUserId = userIds.length === 0 ? 0 : Math.max.apply(null, userIds);
    return maxUserId + 1; 
  }

  function handleUsercheck(e) {
    const checkBoxList = document.querySelectorAll('input[type="checkbox"]');

  }