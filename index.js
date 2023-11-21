const form = document.getElementById("user-form");

const getStoredEntries = () => {
  let storedEntries = localStorage.getItem("user-entries");
  if (storedEntries) {
    return JSON.parse(storedEntries);
  } else {
    return [];
  }
};

let entriesArray = getStoredEntries();

const showEntries = () => {
  const entries = getStoredEntries();
  
  const tableRows = entries.map((entry) => {
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
                  ${tableRows}
                </table>`;

  let entriesDetails = document.getElementById("user-entries");
  entriesDetails.innerHTML = table;
};

const calculateUserAge = (dob) => {
  const currentDate = new Date();
  const birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const saveUserData = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;
  
  // Calculate age and check if it's between 18 and 55
  const userAge = calculateUserAge(dob);
  if (userAge < 18 || userAge > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };
  entriesArray.push(entry);
  
  localStorage.setItem("user-entries", JSON.stringify(entriesArray));
  showEntries();
};

form.addEventListener("submit", saveUserData);
showEntries();
