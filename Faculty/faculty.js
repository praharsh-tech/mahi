import { peopleData } from "../HOD/hodData.js"; // ✅ reuse same data

/************************************************
 ✅ Show Faculty Profile
************************************************/
function loadFacultyProfile() {
  const faculty_cs = localStorage.getItem("userName");
  const dept = localStorage.getItem("dept");
  const faculty = peopleData[faculty_cs]; // reuse dept-based lookup
  if (!faculty) return;

  document.getElementById("facultyFullName").textContent = faculty.name;
  document.getElementById("facultyDept").textContent = faculty.department;
  document.getElementById("facultyEmail").textContent = faculty.email;
  document.getElementById("facultyPhone").textContent = faculty.phone;
  document.getElementById("facultyImage").src = faculty.image;
}

/************************************************
 ✅ Load Tasks
************************************************/
function loadFacultyTasks() {
  const dept = localStorage.getItem("dept");
  const allTasks = JSON.parse(localStorage.getItem("taskData")) || [];
  const taskBox = document.getElementById("facultyTasks");
  taskBox.innerHTML = "";

  const myTasks = allTasks.filter(t => (t.assignedTo || []).includes(dept));

  if (myTasks.length === 0) {
    taskBox.innerHTML = "<p class='text-gray-500'>No tasks assigned yet.</p>";
    return;
  }

  myTasks.forEach(task => {
    taskBox.innerHTML += `
      <div class="bg-white shadow p-4 rounded-md flex justify-between items-center border">
        <div>
          <h3 class="font-semibold text-lg text-blue-700">${task.title}</h3>
          <p class="text-sm text-gray-700">${task.description}</p>
          <p class="text-sm mt-1"><strong>Deadline:</strong> ${task.deadline}</p>
          <p class="text-sm"><strong>Nature:</strong> ${task.nature}</p>
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
 ✅ Update Task Status
************************************************/
window.updateStatus = function (taskId, newStatus) {
  let allTasks = JSON.parse(localStorage.getItem("taskData")) || [];
  allTasks = allTasks.map(t => (t.id == taskId ? { ...t, status: newStatus } : t));
  localStorage.setItem("taskData", JSON.stringify(allTasks));
  loadFacultyTasks();
};

/************************************************
 ✅ Logout
************************************************/
window.logout = function () {
  window.location.href = "../index.html";
};

/************************************************
 ✅ Auto Run
************************************************/
document.addEventListener("DOMContentLoaded", () => {
  loadFacultyProfile();
  loadFacultyTasks();
});
