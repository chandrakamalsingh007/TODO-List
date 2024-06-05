const inputBox=document.getElementById("input-box");
let listContainer=document.getElementById("list-container");



function addTask(){
    if(inputBox.value===''){
        alert("You must write some task!!!");

    }else{
        let li = document.createElement("li");
        let para = document.createElement("p");
        para.className = "text single-line";
        para.textContent = inputBox.value; // Use textContent to set the content

        li.appendChild(para);
        
        // Append the list item to the list container
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    
    }
    inputBox.value='';
    saveData();
}


listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    
},false);



function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    updateCounts();

        
}
function updateCounts() {
    var listContainer = document.getElementById('list-container');
    var totalItems = document.getElementsByTagName("li");
    var checkedItems = listContainer.getElementsByClassName('checked');

    var checkedCountItems = document.getElementById('c-count');
    var totalCountItems = document.getElementById('t-count');
    var remCountItems = document.getElementById('r-count');

    checkedCountItems.textContent = checkedItems.length;
    totalCountItems.textContent = totalItems.length;
    remCountItems.textContent = totalItems.length - checkedItems.length;
}
function deleteAll(){
    localStorage.setItem("data",listContainer.innerHTML='');
    saveData();
}

function showAllTasks(){
   listContainer.innerHTML= localStorage.getItem("data");
   updateCounts();
}
function showCompletedTasks() {
    let storedData = localStorage.getItem("data");
    let tempContainer = document.createElement("div");
    tempContainer.innerHTML = storedData;

    let checkedItems = tempContainer.getElementsByClassName('checked');
    listContainer.innerHTML = Array.from(checkedItems).map(item => item.outerHTML).join('');

  }
  function showPendingTasks() {
    let storedData = localStorage.getItem("data");
    let tempContainer = document.createElement("div");
    tempContainer.innerHTML = storedData;

    let uncheckedItems = tempContainer.querySelectorAll('li:not(.checked)');
    listContainer.innerHTML = Array.from(uncheckedItems).map(item => item.outerHTML).join('');

  }


function handleFilterChange() {
    // Get the selected value
    var selectedValue = document.getElementById("filter").value;

    // Call different functions based on the selected value
    if (selectedValue === "all") {
      showAllTasks();
    } else if (selectedValue === "pending") {
      showPendingTasks();
    } else if (selectedValue === "completed") {
        showCompletedTasks();
    }
  }

showAllTasks();
