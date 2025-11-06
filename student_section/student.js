/************************************************
 ✅ Show Student Section Profile
************************************************/
function loadStudentProfile() {
  document.getElementById("studentFullName").textContent = "Mr. Ramesh Patil";
  document.getElementById("studentDept").textContent = "Student Section Admin";
  document.getElementById("studentEmail").textContent = "studentsection@nitpoly.edu.in";
  document.getElementById("studentPhone").textContent = "9998887771";
}

/************************************************
 ✅ Load Assigned Tasks
************************************************/
function loadStudentTasks() {
  const allTasks = JSON.parse(localStorage.getItem("taskData")) || [];
  const taskBox = document.getElementById("studentTasks");
  taskBox.innerHTML = "";

  // Filter tasks assigned to student_admin
  const myTasks = allTasks.filter(t => (t.assignedTo || []).includes("student_admin"));

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
 ✅ Update Task Status
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
  loadStudentTasks();
};

/************************************************
 ✅ Logout
************************************************/
window.logout = function () {
  localStorage.clear();
  window.location.href = "../index.html";
};

/************************************************
 ✅ Auto Run on Page Load
************************************************/
document.addEventListener("DOMContentLoaded", () => {
  loadStudentProfile();
  loadStudentTasks();
});