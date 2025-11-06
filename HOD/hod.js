import { peopleData } from "./hodData.js";

/************************************************
 ✅ SHOW HOD PROFILE
************************************************/
function loadHodProfile() {
  const name = localStorage.getItem("userName"); // store this when HOD logs in
  if (!name) {
    alert("No user found! Please login again.");
    window.location = "../index.html";
    return;
  }

  const hod = peopleData[name];
  if (!hod) {
    console.warn("⚠️ No HOD profile found for:", name);
    return;
  }

  document.getElementById("hodFullName").innerText = hod.name;
  document.getElementById("hodDept").innerText = hod.department;
  document.getElementById("hodEmail").innerText = hod.email;
  document.getElementById("hodPhone").innerText = hod.phone;
  document.getElementById("hodImage").src = hod.image;
}

/************************************************
 ✅ SHOW TASKS ASSIGNED TO THIS HOD
************************************************/
function loadHodTasks() {
  const allTasks = JSON.parse(localStorage.getItem("taskData")) || [];
  const hodList = document.getElementById("hodTasks");
  if (!hodList) return;

  hodList.innerHTML = "";

  const name = localStorage.getItem("userName");
  if (!name) {
    hodList.innerHTML = "<p class='text-red-500'>Login info missing. Please log in again.</p>";
    return;
  }

  // ✅ Match tasks assigned to this HOD by department key
const dept = localStorage.getItem("dept");

const hodTasks = allTasks.filter(t =>
  (t.assignedTo || []).includes(dept)
);


  hodTasks.forEach((task, i) => {
    hodList.innerHTML += `
      <div class="bg-white shadow p-4 rounded-md flex justify-between items-center border">
        <div>
          <h3 class="font-semibold text-lg text-blue-700">${task.title}</h3>
          <p class="text-sm text-gray-700">${task.description}</p>
          <p class="text-sm mt-1"><strong>Deadline:</strong> ${task.deadline}</p>
          <p class="text-sm"><strong>Nature:</strong> ${task.nature}</p>
          <p class="text-sm"><strong>Support:</strong> ${task.supportPeople.join(", ") || "None"}</p>
        </div>

        <select class="border p-2 rounded-md text-sm" onchange="updateStatus('${task.id}', this.value)">
          <option ${task.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${task.status === "Processing" ? "selected" : ""}>Processing</option>
          <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </div>
    `;
  });
}

/************************************************
 ✅ UPDATE STATUS
************************************************/
window.updateStatus = function (taskId, newStatus) {
  let allTasks = JSON.parse(localStorage.getItem("taskData")) || [];

  allTasks = allTasks.map(task => {
    if (task.id == taskId) {
      task.status = newStatus;
    }
    return task;
  });

  localStorage.setItem("taskData", JSON.stringify(allTasks));
  loadHodTasks();
};

/************************************************
 ✅ LOGOUT
************************************************/
window.logout = function () {
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  localStorage.removeItem("dept");
  window.location.href = "../index.html";
};

/************************************************
 ✅ AUTO RUN (after DOM is ready)
************************************************/
document.addEventListener("DOMContentLoaded", () => {
  loadHodProfile();
  loadHodTasks();
});
