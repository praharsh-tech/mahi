/****************************************************
 ✅ Show department selector only for HOD or Faculty
****************************************************/
function toggleDeptBox() {
  const role = document.getElementById("role").value;
  const deptBox = document.getElementById("deptBox");
  const deptSelect = document.getElementById("dept");

  if (role === "hod" || role === "faculty") {
    deptBox.classList.remove("hidden");
    
    // Update dropdown options based on role
    if (role === "hod") {
      deptSelect.innerHTML = `
        <option value="">-- Select Department --</option>
        <option value="hod_cs">Computer Science</option>
        <option value="hod_mech">Mechanical</option>
        <option value="hod_elec">Electrical</option>
        <option value="hod_civil">Civil</option>
         <option value="hod_electronic">electronic</option>
        
      `;
    } else if (role === "faculty") {
      deptSelect.innerHTML = `
        <option value="">-- Select Department --</option>
        <option value="faculty_cs">Computer Science</option>
        <option value="faculty_mech">Mechanical</option>
        <option value="faculty_elec">Electrical</option>
        <option value="faculty_civil">Civil</option>
        <option value="faculty_electronic">Electronic</option>
      `;
    }
  } else {
    deptBox.classList.add("hidden");
  }
}

/****************************************************
 ✅ Handle Login + Redirect by Role
****************************************************/
function login() {
  const role = document.getElementById("role").value;
  const dept = document.getElementById("dept")?.value || "";

  // Validation
  if (!role) {
    alert("⚠️ Please select a role.");
    return;
  }

  // Save base role info
  localStorage.setItem("role", role);

  /****************************************************
   ✅ HOD & FACULTY LOGIN LOGIC
  ****************************************************/
  if (role === "hod" || role === "faculty") {
    if (!dept) {
      alert("⚠️ Please select your department.");
      return;
    }

    // Save department key and user identity
    localStorage.setItem("dept", dept);
    localStorage.setItem("userName", dept); // ✅ Used by hod.js filtering
  }

  /****************************************************
   ✅ Redirect based on Role
  ****************************************************/
  switch (role) {
    case "principal":
      window.location.href = "./principal/principal.html";
      break;

    case "hod":
      // Short delay to ensure data saves before redirect
      setTimeout(() => {
        window.location.href = "./HOD/hod.html";
      }, 100);
      break;

    case "faculty":
      setTimeout(() => {
        window.location.href = "./Faculty/faculty.html";
      }, 100);
      break;

    case "student":
      window.location.href = "./student_section/student.html";
      break;

    case "scholarship":
      window.location.href = "./scholarship/scholarship.html";
      break;

    default:
      alert("⚠️ Invalid role selected.");
  }
}

/****************************************************
 ✅ Debug helper (optional)
****************************************************/
function showLoginData() {
  console.log("🧠 LocalStorage Data:");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`${key}:`, localStorage.getItem(key));
  }
}
