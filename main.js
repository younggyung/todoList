let filteredList=[];
let mode ='all';
let taskList = [];
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")

for(let i = 1; i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){filter(event)});
}
addButton.addEventListener("click",addTask);
//엔터키로 추가기능
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});



function addTask(){
  let task={
    taskContent:taskInput.value, 
    isComplete:false,
    id:randomIDGenerator()
          };
  taskList.push(task);
  taskInput.value="";
  filter();
}

function render(){
  let list =[];
  let resultHTML ='';

  if(mode =='all'){
    list = taskList;
  }else{
    list = filteredList;
  }
  
  for(let i = 0 ; i<list.length; i++){
    if(list[i].isComplete){
      resultHTML += `<div class="task task-done" id="${list[i].id}">
      <span>${list[i].taskContent}</span>
        <div class="buttons">
          <button onclick="check('${list[i].id}')"><img src="images/undo-circular-arrow.png" style="max-width:22px;"></button>
          <button onclick="deleteTask('${list[i].id}')"><img src="images/trash.png"></button>
          </div>
        </div>`;
    }else{
    resultHTML += `<div class="task" id="${list[i].id}">
    <span>${list[i].taskContent}</span>
      <div class="buttons">
        <button onclick="check('${list[i].id}')"><img src="images/check.png"></button>
        <button onclick="deleteTask('${list[i].id}')"><img src="images/trash.png"></button>
      </div>
    </div>`
  }
}
  document.getElementById("task-board").innerHTML = resultHTML;
}

function check(id){
  for(let i = 0; i<taskList.length;i++){
    if(taskList[i].id === id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id){
  for(let i = 0; i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1);
      break;
    }
  }
  filter();
}

//클릭이벤트를 변수로 넣어주는 filter()와
//그냥 filter는 다르다. 그래서 클릭이벤트가 없을때
//즉, 초기상태에서는 if문의 코드가 실행 x


function filter(event){
  if(event){
  mode = event.target.id;
  document.getElementById("underLine").style.width = event.target.offsetWidth + "px";
  document.getElementById("underLine").style.top = event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("underLine").style.left = event.target.offsetLeft + "px";
  }
  filteredList = [];
  if(mode =='inprogress'){
    for(let i = 0; i<taskList.length;i++){
      if(taskList[i].isComplete == false){
        filteredList.push(taskList[i]);
      }
    };
  }else if(mode =='done'){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == true){
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

//랜덤한 id값 생성, check 버튼을 눌렀을때 어떤 오브젝트인지 식별하기 위해서!
function randomIDGenerator(){
  return '_' + Math.random().toString(34).substring(2,9);
}

