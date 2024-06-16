
function handleButtonClick(e) {
  console.log({event: e});
  e.target.innerHTML = `취소`;
}

function handelInputChange(e) {
  console.log(e.target.value);
}

function handelInputChange(e) {
  if(e.ctrlkey && (keyCode === 13 || e.key === "Enter")) {
    alert(e.target.value);
  }
}

let isFocus = false;


function handelInputFocus(e) {
  isFocus = true;
  if(!isFocus) {
    isFocus = true;
    alert("입력하세요!")
  }
  alert("입력하세요");
}

function handelInputFocus(e) {
  if(!!e.target.value) {
    e.target.value = " ";
  }
}

function handelInputBlur(event) {
  if(!e.target.value) {
    alert('값을 입력해주세요.')
  }
}