/***************************************
 ✅ LOGOUT
***************************************/
function logout() {
  localStorage.removeItem("role");
  window.location = "index.html";
}


/***************************************
 ✅ ASSIGN TASK TO ONE OR MORE HODs
***************************************/
function assignTask() {
  const taskText = document.getElementById("taskText").value.trim();
  const checkedHODs = document.querySelectorAll(".hodCheck:checked");

  if (!taskText) {
    alert("Please enter task");
    return;
  }

  if (checkedHODs.length === 0) {
    alert("Select at least one HOD");
    return;
  }

  // Read old tasks or empty
  let allTasks = JSON.parse(localStorage.getItem("taskData") || "{}");

  // Store task to each selected HOD
  checkedHODs.forEach((hod) => {
    let dept = hod.value;
    if (!allTasks[dept]) allTasks[dept] = [];

    allTasks[dept].push({
      text: taskText,
      status: "Pending"
    });
  });

  // Save
  localStorage.setItem("taskData", JSON.stringify(allTasks));

  // Clear
  document.getElementById("taskText").value = "";
  checkedHODs.forEach(x => (x.checked = false));

  alert("✅ Task Assigned Successfully");
  showAllTasks();
}


/***************************************
 ✅ SHOW ALL TASKS (Group by HOD)
***************************************/
function showAllTasks() {
  let taskData = JSON.parse(localStorage.getItem("taskData") || "{}");
  let list = document.getElementById("taskList");

  if (!list) return;

  list.innerHTML = "";

  Object.keys(taskData).forEach((dept) => {
    let container = document.createElement("div");
    container.className = "bg-white p-4 rounded shadow";

    const deptTitle = dept.toUpperCase();

    container.innerHTML = `
      <h3 class="font-semibold text-lg mb-2">${deptTitle} HOD</h3>
      <ul class="list-disc pl-6">
        ${taskData[dept]
          .map(
            (t) =>
              `<li>${t.text} — <span class="text-sm">${t.status}</span></li>`
          )
          .join("")}
      </ul>
    `;

    list.appendChild(container);
  });
}


// Auto display
showAllTasks();
