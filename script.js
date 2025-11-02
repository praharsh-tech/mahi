// SHOW / HIDE HOD DEPARTMENT DROPDOWN
function toggleHodList() {
  const role = document.getElementById("role").value;
  const hodBox = document.getElementById("hodBox");

  role === "hod"
    ? hodBox.classList.remove("hidden")
    : hodBox.classList.add("hidden");
}

// LOGIN
function login() {
  const role = document.getElementById("role").value;
  const hod = document.getElementById("hodType").value;

  if (!role) {
    alert("Please select role");
    return;
  }

  // Store role
  localStorage.setItem("role", role);

  // Principal → Redirect
  if (role === "principal") {
    window.location.href = "principal.html";
    return;
  }

  // HOD → Must select dept
  if (role === "hod") {
    if (!hod) {
      alert("Please select HOD department");
      return;
    }

    localStorage.setItem("hodDept", hod);
    window.location.href = "hod.html";
  }
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
