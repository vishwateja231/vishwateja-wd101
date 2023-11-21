let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let type = localStorage.getItem("user-entries");
  if (vt) {
    return JSON.parse(vt);
  } else {
    return [];
  }
};

let  vt = retrieveEntries();

const displayEntries = () => {
  const type = retrieveEntries();
  
  const tableEntries = type.map((entry) => {
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
    const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
    return row;
  }).join("\n");

  const table = `<table class="table-auto w-full">
                  <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                  </tr>
                  ${tableEntries}
                </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const calculateAge = (dob) => {
  const  ye = new Date();
  const birthDate = new Date(dob);
  let age =  ye.getFullYear() - birthDate.getFullYear();
  const monthDiff =  ye.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 &&  ye.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
  
  // Calculate age and check if it's between 18 and 55
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };
   vt.push(entry);
  
  localStorage.setItem("user-entries", JSON.stringify( vt));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
