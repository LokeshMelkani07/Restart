const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");

// now we put onlick = addTask() in the button in html and define function here

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    // create an li and put value of input field inside it
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    // display li inside container
    listContainer.appendChild(li);
    // Add one cross icon at the end of that list tag, which we do using span tag
    // we will give css to that span tag in index.css using "ul li span{}"
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    // Now once we have appended the child, make input field value as empty again
    inputBox.value = "";
    // calling below function to save everything in local storage
    saveData();
  }
}

// Now if we click the list item it should get selected
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      // means mark underline in it
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      // if we click at deleted icon, remove parentElement means li remove kro
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// Now we want to store our data inside local storage
// we will fill everything inside our listContainer in our local storage
// we will call this saveData() function everytime we add new task
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// now show data stored in local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
