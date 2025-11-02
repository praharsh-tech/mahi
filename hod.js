/************************************************
 ✅ IMPORT HOD DATA (from hodData.js)
************************************************/
import { hodData } from "./hodData.js";


/************************************************
 ✅ SHOW HOD PROFILE
************************************************/
function loadHodProfile() {
  const dept = localStorage.getItem("hodDept");
  if (!dept) return;

  const hod = hodData[dept];
  if (!hod) return;

  document.getElementById("hodName").innerText = hod.name;
  document.getElementById("hodDept").innerText = hod.department;
  document.getElementById("hodEmail").innerText = hod.email;
  document.getElementById("hodPhone").innerText = hod.phone;
  document.getElementById("hodImg").src = hod.image;
}


/************************************************
 ✅ LOAD HOD TASKS
************************************************/
function loadHodTasks() {
  const dept = localStorage.getItem("hodDept");
  let allTasks = JSON.parse(localStorage.getItem("taskData") || "{}");

  let hodList = document.getElementById("hodList");
  if (!hodList || !dept) return;

  hodList.innerHTML = "";

  let tasks = allTasks[dept] || [];

  tasks.forEach((task, i) => {
    hodList.innerHTML += `
      <div class="bg-white shadow p-4 rounded-md flex justify-between items-center border">
        <p class="font-medium">${task.text}</p>

        <select class="border p-2 rounded-md"
          onchange="updateStatus(${i}, this.value)">
        
          <option ${task.status==="Pending"?"selected":""}>Pending</option>
          <option ${task.status==="Processing"?"selected":""}>Processing</option>
          <option ${task.status==="Completed"?"selected":""}>Completed</option>

        </select>
      </div>
    `;
  });
}


/************************************************
 ✅ UPDATE TASK STATUS
************************************************/
function updateStatus(index, value) {
  const dept = localStorage.getItem("hodDept");
  let allTasks = JSON.parse(localStorage.getItem("taskData") || "{}");

  if (!allTasks[dept]) return;

  allTasks[dept][index].status = value;
  localStorage.setItem("taskData", JSON.stringify(allTasks));

  loadHodTasks();
}


/************************************************
 ✅ LOGOUT
************************************************/
function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("hodDept");
  window.location.href = "index.html";
}


/************************************************
 ✅ MAKE FUNCTIONS GLOBAL
************************************************/
window.logout = logout;
window.updateStatus = updateStatus;

/************************************************
 ✅ AUTO RUN
************************************************/
loadHodProfile();
loadHodTasks();
