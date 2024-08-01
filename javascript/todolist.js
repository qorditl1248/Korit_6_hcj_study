let todoList = []; // 빈 배열 

loadTodoList(); // 페이지를 로드할 때 로컬스토리지에 있는 값들을 보여줌 

// TodoInput 클릭 
function handleTodoInputKeyDown(e) { // TodoInput에 클릭 
    if(e.keyCode === 13) {   // keyCode가 enter인지 확인
        handleTodoOkClick(); // enter랑 확인버튼이랑 똑같은 기능임 
    }
}

// 확인버튼 클릭 
function handleTodoOkClick(e) { 
    const todoInput = document.querySelector(".todo-input"); // todo-input 박스 불러옴
    if(isBlank(todoInput)) {    // 비어있는지 확인, todo-input 박스가 비어있다면 아래 실행 
        alert("내용을 입력하세요.");
        clearTodoInput(); // todo-input 박스에 적힌 값들 비워줌 
        return;
    } 
    // todo-input 박스가 비어있지않다면  
    addTodo(); // todo에 추가하고
    clearTodoInput(); // todo-input 박스에 적힌 값들 비워줌 
}

// todoList에 값 추가 
function addTodo() {
    const todo = {
        id: createNewId(), // 새로운 todo의 id 생성 
        content: document.querySelector(".todo-input").value,  // todo-input에 입력한 값을 가져와서 content에 넣음 
        date: transformDate(new Date()) // (transformDate)함수를 통해서 현재 날짜와 시간을 가져옴 
    }

    todoList = [ ...todoList, todo ]; // ...todoList는 기존의 todoList, 추가되는 todo 
    saveLocalStorage(); // 로컬스토리지에 저장 
    loadTodoList(); // 
}

function createNewId() { 
    const todoIdList = todoList.map(todo => todo.id); // todoList 순회해서 가져온 id값을 todoIdList에 담아줌 
    const maxId = !todoIdList.length ? 0 : Math.max(...todoIdList); // todoList의 길이가 존재하지 않니? - 존재하면 Math.max, 존재하지 않으면 0 
    return maxId + 1; // 최댓값에 + 1을 해서 다음 아이디를 생성해줌 
}

// 로컬스토리지에 값을 저장 
function saveLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList)); // javascript 객체를 JSON 문자열로 변환 
}

// 로컬스토리지의 데이터를 불러옴 
function loadTodoList() {
    const lsTodoList = localStorage.getItem("todoList"); // 로컬스토리지에 저장되어있는 키값 todoList을 들고와서 lsTodoList에 담아줌 (문자열 형태)
    todoList = !lsTodoList ? [] : JSON.parse(lsTodoList); // lsTodoList가 비어있다면 '빈 배열' 비어있지않다면 lsTodoList를 가져옴 
    renderTodoList(); // 할 일 목록을 화면에 표시               // lsTodoList를 가져올때 JSON 문자열을 javascript 객체로 변환해서 todoList에 넣음
} 

// 할 일 목록을 화면에 표시 
function renderTodoList() {
    const todoListContainer = document.querySelector(".todo-list-container"); // ul의 돔 요소를 가지고옴 
    todoListContainer.innerHTML = todoList.map((todo) => { 
        return `
            <li class="todo-card">
                <h3 class="todo-date">${todo.date}</h3> 
                <p class="todo-content">${todo.content}</p>
                <div class="todo-buttons">
                    <button class="button edit-button" onclick="handleEditClick(event)" value="${todo.id}">수정</button>
                    <button class="button delete-button" onclick="handleDeleteClick(event)" value="${todo.id}">삭제</button>
                </div>
            </li>
        `;
    }).join("");
}

// todo-input 박스 내용 비워줌 
function clearTodoInput() {
    const todoInput = document.querySelector(".todo-input"); 
    todoInput.value = "";   // todoInput안에 있던 값 비워줌  
    todoInput.focus();       
}

// 비어있는지 확인 
function isBlank(input) {   // 입력한 값 input을 매개변수로 가져옴 
    return !input.value.replaceAll(" ", ""); // 공백이 있으면 공백을 제거
}

// 날짜, 시간 가져옴 
function transformDate(date) {
    const dayList = [ "일", "월", "화", "수", "목", "금", "토" ];
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${dayList[date.getDay()]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // 2024.05.18(화) 
}

// 할 일 목록 삭제 
function handleDeleteClick(e) {
    if(confirm("정말로 삭제하시겠습니까?")) { // confirm에 확인버튼을 클릭하면 아래 실행 
        todoList = todoList.filter(todo => todo.id !== parseInt(e.target.value)); 
        // todoList의 filter을 거쳐 가져온 id와 값이 다른 것들만 todoList배열에 담음, 값이 문자열이기때문에 정수로 변환 
        saveLocalStorage(); // 로컬스토리지에 저장 
        loadTodoList(); 
    }
}

// 할 일 목록 수정 (modal 창 이용), 수정버튼 클릭 시 
function handleEditClick(e) {
    const element = `
        <div class="modal-edit-container" onclick="event.stopPropagation()">
        <h3 class="modal-title">TODO 수정하기</h3>
        <div class="input-box">
        <input type="text" class="todo-input" onkeyDown="if(event.keyCode === 13) document.querySelector('.modal button:nth-of-type(1)').click()">
        </div>
        <div class="todo-buttons">
        <button class="button" onclick="handleEditOkClick(event)" value="${e.target.value}">확인</button>
        <button class="button" onclick="closeModal()">취소</button>
        </div>
    </div>
    `;
    openModal(element); // modal 창 띄워줌 

    const todoInput = document.querySelector('.modal .todo-input'); 
    todoInput.focus(); // 수정 버튼 클릭 시, 수정 input에 focus 됨 
}

// 수정 확인 버튼 클릭
function handleEditOkClick(e) {
    todoList = todoList.map(todo => {
        if(todo.id === parseInt(e.target.value)) { // todo의 id 값과 이벤트가 발생했을 때의 값이랑 같다면 
            return {
                ...todo,                                                     // todo copy
                content: document.querySelector(".modal .todo-input").value, // 수정된 내용
                date: transformDate(new Date)                                // 수정된 시간 
            }
        }
        return todo; // 아니라면 todo를 리턴 
    })
    saveLocalStorage(); // 로컬 스토리지에 저장 
    closeModal();       // modal 창 닫음 
    loadTodoList();
}

// modal 창 밖을 클릭 
function handleModalBackgroundClick() { 
    closeModal(); // modal 창 닫힘 
} 

// modal 창 열기 
function openModal(element) { 
    const modal = document.querySelector(".modal"); 
    modal.classList.add("modal-show"); // 배열타입, 요소의 속성으로 추가
    modal.innerHTML = element;
}

// modal 창 닫힘 
function closeModal() {
    const modal = document.querySelector(".modal");
    modal.innerHTML = "";  
    modal.classList.remove("modal-show");
}

// javascript에서 날짜 가져올때 
// const year = date.getFullYear();
// const month = date.getMonth() + 1; // 0 ~ 11월
// const date = date.getDate();
// const day = date.getDay(); 



