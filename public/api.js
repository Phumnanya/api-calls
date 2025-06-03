const apiUrl = "/users";

function loadUsers() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById("user-list");
      list.innerHTML = "";
      users.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `ID: ${u.id}, Name: ${u.name}`;
        list.appendChild(li);
      });
    });
}

function addUser() {
  const name = document.getElementById("name-input").value;
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  }).then(loadUsers);
}

function updateUser() {
  const id = document.getElementById("update-id").value;
  const name = document.getElementById("update-name").value;
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  }).then(loadUsers);
}

function deleteUser() {
  const id = document.getElementById("delete-id").value;
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  }).then(loadUsers);
}

window.onload = loadUsers;
