function login() {
  let role = document.getElementById("role").value;
  localStorage.setItem("role", role);

  if (role === "principal") window.location = "principal.html";
  else window.location = "hod.html";
}

function logout() {
  localStorage.removeItem("role");
  window.location = "index.html";
}

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// ✅ ADD TASK
function addTask() {
  let text = document.getElementById("taskText").value;
  if (!text) return alert("Please enter task");

  tasks.push({ text, status: "Pending" });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskText").value = "";
  showTasks();
  alert("✅ Task Added!\n(Email Will Be Sent)");
}

// ✅ SHOW - PRINCIPAL UI
function showTasks() {
  let list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";
  tasks.forEach((t) => {
    let statusColor =
      t.status === "Pending"
        ? "bg-yellow-300"
        : t.status === "Processing"
        ? "bg-blue-300"
        : "bg-green-300";

    list.innerHTML += `
      <div class="bg-white shadow p-4 rounded-md flex justify-between items-center border">
        <p class="font-medium">${t.text}</p>
        <span class="text-sm px-3 py-1 rounded-md ${statusColor}">
          ${t.status}
        </span>
      </div>`;
  });
}

// ✅ SHOW + UPDATE — HOD UI
function showHOD() {
  let hodList = document.getElementById("hodList");
  if (!hodList) return;

  hodList.innerHTML = "";
  tasks.forEach((t, i) => {
    hodList.innerHTML += `
      <div class="bg-white shadow p-4 rounded-md flex justify-between items-center border">
        
        <p class="font-medium">${t.text}</p>

        <select class="border p-2 rounded-md"
          onchange="changeStatus(${i}, this.value)">
        
          <option ${t.status==="Pending"?"selected":""}>Pending</option>
          <option ${t.status==="Processing"?"selected":""}>Processing</option>
          <option ${t.status==="Completed"?"selected":""}>Completed</option>

        </select>
      </div>`;
  });
}

function changeStatus(i, val) {
  tasks[i].status = val;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showHOD();
}

// Auto render
showTasks();
showHOD();
