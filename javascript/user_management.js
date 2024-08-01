// const names = ["김준일", "김준이", "김준삼"];
// console.log(names.join(""));

// inputMode = 1 >> 추가 
// inputMdoe = 2 >> 수정

let inputMode = 1;

let userList = []; 
loadUserList();


// user의 기본 틀 
let emptyUser = {  // input의 name이랑 지금 여기 들어있는 해당 키값들이랑 같아야함 
  id: 0, 
  name: "",
  username: "",
  password: "",
}

// user 객체의 emptyUser를 copy, 
let user = {       
  ...emptyUser,
}

// 테이블을 보이게 뿌려줌 
function renderTable() {
  const userTableBody = document.querySelector('.user-table-body');
  userTableBody.innerHTML = userList.map(({name, id, username, password}, index) => {
    return `
      <tr>
        <th><input type="checkbox" onchange="handleUsercheck(event)" value="${id}"/></th>
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


// 입력 
function handleUserInputKeyDown(e) {
  user = {   // 키보드의 입력이 일어날때마다 user에 값들이 계속 추가됨
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
      if(inputMode === 1) {
        // const newUser = { - {...user, id: getNewId()} 이거를 풀어쓴거 
        //   ...user,
        //   id: getNewId()
        // }
        userList = [...userList, {...user, id: getNewId()}]; // 기존의 userList을 가져와서 새로운 user의 정보를 가져옴
      }

      if(inputMode === 2) {
        let findeIndex = -1;
        for(let i = 0; i < userList.length; i++) {
          if(userList[i].id === user.id) {
            findeIndex = i;
            break;
          }
        }
        if(findeIndex === -1) {
          alert(`사용자 정보 수정 중 오류 발생. 관리자에게 문의하세요.`)
          return;
        }
        userList[findeIndex] = user;
      }

      saveUserList();                       // 다 입력하고 난 뒤 저장 
      renderTable();                        // password에 enter가 일어나면 빈값으로 초기화 
      clearInputValue();
    
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
    userList = userList.filter(({id}) => id !== parseInt(e.target.value)); // 비구조할당으로 user안에 있는 id만 꺼내겠다
    saveUserList();  // 로컬스토리지에 저장 
    renderTable();   // 화면에 뿌려줌 
  }

  // 아이디 추가 
  function getNewId() {
    const userIds = (userList.map(user => user.id)); // user의 id값들만 뽑아서 새로운 배열에 담음 
    // 유저들이 가지고있는 제일 큰 값 찾음 -> 해당 값 뒤에 넣어줘야하기때문 5번이나 6번에 넣어주기위해서 
    const maxUserId = userIds.length === 0 ? 0 : Math.max.apply(null, userIds);
    return maxUserId + 1; 
  }

  // 체크 박스, 체크 해제
  function handleUsercheck(e) {
    const checkBoxList = document.querySelectorAll('input[type="checkbox"]')
    console.log(checkBoxList);
    for(let checkBox of checkBoxList) {
      if(checkBox === e.target) { // 같으면 계속 
        continue;  
      }
      checkBox.checked = false; // 아니면 체크 풀기 
    }

    if(e.target.checked) {    // 체크가 됐을때 -> input박스 안에 값들이 담기면서 수정모드
      inputMode = 2;
      const[findUser] = userList.filter(user => user.id === parseInt(e.target.value)); // 비구조 할당 
      setInputValue(findUser);  
      user = {
        ...findUser,
      }
      return;
    }
    // 체크가 풀리면 input박스안에 값들을 없애줌 
    clearInputValue();
  }

  function setInputValue(user) {
    const nameInput = document.querySelector(".name-input");
    const usernameInput = document.querySelector(".username-input");
    const passwordInput = document.querySelector(".userpassword-input");

    nameInput.value = user.name;
    usernameInput.value = user.username;
    passwordInput.value = user.password;

    
  }

  // 각각의 input안의 value를 공백으로 바꿈 
  function clearInputValue() {  
    const nameInput = document.querySelector(".name-input");
    const usernameInput = document.querySelector(".username-input");
    const passwordInput = document.querySelector(".userpassword-input");

    nameInput.value = emptyUser.name;
    usernameInput.value = emptyUser.username;
    passwordInput.value = emptyUser.password;

    inputMode = 1;
    user = {       // 키보드의 입력이 일어날때마다 user에 값들이 계속 추가됨, 그래서 남은 정보를 비워줌 
      ...emptyUser
    }
  }
