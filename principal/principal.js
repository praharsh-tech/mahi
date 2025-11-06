// ✅ Import updated people data (use correct relative path)
import { peopleData } from "../HOD/hodData.js";

/**************************************************
 ✅ Populate Dropdown with All People
**************************************************/
function populatePeopleDropdown() {
  const select = document.getElementById("assignTo");
  select.innerHTML = "";

  for (const [key, person] of Object.entries(peopleData)) {
    const option = document.createElement("option");
    option.value = key; // ✅ key = "faculty_cs", "hod_mech", etc.
    option.textContent = `${person.name} (${person.role} - ${person.department})`;
    select.appendChild(option);
  }
}

/**************************************************
 ✅ Add Task
**************************************************/
function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();
  const nature = document.getElementById("taskNature").value;
  const deadline = document.getElementById("taskDeadline").value;
  const assignSelect = document.getElementById("assignTo");
  const assignedTo = Array.from(assignSelect.selectedOptions).map(opt => opt.value);
  const support = document.getElementById("supportPeople").value.trim();

  if (!title || !desc || !nature || !deadline || assignedTo.length === 0) {
    alert("Please fill all fields and assign at least one person.");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description: desc,
    nature,
    deadline,
    assignedTo,
    supportPeople: support ? support.split(",").map(s => s.trim()) : [],
    status: "Pending",
  };

  const taskData = JSON.parse(localStorage.getItem("taskData")) || [];
  taskData.push(task);
  localStorage.setItem("taskData", JSON.stringify(taskData));

  showTasks();
  clearForm();
  alert("✅ Task added successfully!");
}

/**************************************************
 ✅ Display Tasks
**************************************************/
function showTasks(filterText = "", filterStatus = "") {
  const taskList = document.getElementById("taskList");
  const taskData = JSON.parse(localStorage.getItem("taskData")) || [];
  taskList.innerHTML = "";

  const filteredTasks = taskData.filter(t => {
    const matchText =
      t.title.toLowerCase().includes(filterText.toLowerCase()) ||
      t.description.toLowerCase().includes(filterText.toLowerCase());
    const matchStatus = filterStatus ? t.status === filterStatus : true;
    return matchText && matchStatus;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<p class='text-gray-500'>No tasks found.</p>";
    return;
  }

  filteredTasks.forEach(task => {
    // Convert assigned keys (like "faculty_cs") into readable names
    const assignedList = task.assignedTo
      .map(key => peopleData[key]?.name || key)
      .join(", ");

    const supportList = task.supportPeople.join(", ") || "None";

    taskList.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow border">
        <h3 class="text-xl font-semibold text-blue-700">${task.title}</h3>
        <p class="text-gray-700 mt-1">${task.description}</p>
        <p class="mt-2 text-sm"><strong>Nature:</strong> ${task.nature}</p>
        <p class="text-sm"><strong>Deadline:</strong> ${task.deadline}</p>
        <p class="text-sm"><strong>Assigned To:</strong> ${assignedList}</p>
        <p class="text-sm"><strong>Support:</strong> ${supportList}</p>
        <p class="text-sm mt-1"><strong>Status:</strong> 
          <span class="text-yellow-600">${task.status}</span></p>

        <div class="flex gap-2 mt-3">
          <button onclick="editTask(${task.id})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
          <button onclick="deleteTask(${task.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>`;
  });
}

/**************************************************
 ✅ Edit Task
**************************************************/
function editTask(id) {
  const taskData = JSON.parse(localStorage.getItem("taskData")) || [];
  const task = taskData.find(t => t.id === id);
  if (!task) return alert("Task not found.");

  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDesc").value = task.description;
  document.getElementById("taskNature").value = task.nature;
  document.getElementById("taskDeadline").value = task.deadline;
  document.getElementById("supportPeople").value = task.supportPeople.join(", ");

  // Re-populate assignTo with previous selections
  populatePeopleDropdown();
  const select = document.getElementById("assignTo");
  Array.from(select.options).forEach(opt => {
    if (task.assignedTo.includes(opt.value)) opt.selected = true;
  });

  // Remove old task on save
  deleteTask(id);
}

/**************************************************
 ✅ Delete Task
**************************************************/
function deleteTask(id) {
  let taskData = JSON.parse(localStorage.getItem("taskData")) || [];
  taskData = taskData.filter(t => t.id !== id);
  localStorage.setItem("taskData", JSON.stringify(taskData));
  showTasks();
}

/**************************************************
 ✅ Filters
**************************************************/
function applyFilters() {
  const text = document.getElementById("searchTask").value;
  const status = document.getElementById("filterStatus").value;
  showTasks(text, status);
}

/**************************************************
 ✅ Helpers
**************************************************/
function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskNature").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("supportPeople").value = "";
}

/**************************************************
 ✅ Logout
**************************************************/
function logout() {
  localStorage.removeItem("role");
  window.location.href = "../index.html";
}

/**************************************************
 ✅ Auto Load (after DOM is ready)
**************************************************/
document.addEventListener("DOMContentLoaded", () => {
  populatePeopleDropdown();
  showTasks();
  
  // Add logout event listener
  document.querySelector("#logoutBtn").addEventListener("click", logout);
});

/**************************************************
 ✅ Make Functions Global (after function definitions)
**************************************************/
window.addTask = addTask;
window.editTask = editTask;
window.deleteTask = deleteTask;
window.applyFilters = applyFilters;
window.logout = logout;