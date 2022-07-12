import data from "./details.json" assert { type: "json" };

var initialState = [];

const colClass = ["firstName", "lastName", "email", "phone", "role", "address"];

function loadData(e) {
  let loadButton = document.getElementById(e.target.id);
  loadButton.remove();

  let refreshButton = document.createElement("button");
  refreshButton.textContent = "Refresh";
  refreshButton.id = "refresh_button";
  refreshButton.addEventListener("click", refreshData);
  document.querySelector("body").appendChild(refreshButton);

  const table = document.createElement("table");
  const table_body = document.createElement("tbody");

  for (let index in data) {
    let vec = [];
    let innerIter = 0;
    if (index == 0) {
      var row_h = document.createElement("tr");
      row_h.setAttribute("id", "row_header");
    }
    const row = document.createElement("tr");
    row.id = `row_${index}`;
    for (let item in data[index]) {
      if (index == 0) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(item);
        cell.appendChild(cellText);
        row_h.appendChild(cell);
      }
      const cell = document.createElement("td");
      cell.setAttribute("class", colClass[innerIter]);
      const cellText = document.createTextNode(data[index][item]);
      vec.push(data[index][item]);
      cell.appendChild(cellText);
      row.appendChild(cell);

      innerIter++;
    }

    initialState.push(vec);

    for (let j = 0; j < 2; j++) {
      let cell = document.createElement("td");
      let button = document.createElement("button");
      if (j == 0) {
        button.setAttribute("id", `edit_${index}`);
        button.innerHTML = "Edit";
        button.addEventListener("click", editData);
        cell.setAttribute("class", "edit");
      } else {
        button.setAttribute("id", `delete_${index}`);
        button.innerHTML = "Delete";
        button.addEventListener("click", deleteData);
        cell.setAttribute("class", "delete");
      }
      cell.appendChild(button);
      row.appendChild(cell);
    }
    if (index == 0) {
      table_body.appendChild(row_h);
    }
    table_body.appendChild(row);
  }
  table.appendChild(table_body);

  document.body.appendChild(table);
}

function editData(e) {
  let _id = e.target.id;
  let edit_btn = document.getElementById(_id);
  let id = _id.slice(5, _id.length);

  let row = document.getElementById(`row_${id}`);
  row.contentEditable = true;

  let save_button = document.createElement("button");
  save_button.id = `save_${id}`;
  save_button.innerHTML = "Save";
  let editCell = document.querySelector(`#row_${id} .edit`);
  edit_btn.remove();
  editCell.appendChild(save_button);
  save_button.addEventListener("click", saveData);

  let delete_button = document.getElementById(`delete_${id}`);
  delete_button.remove();
  let cancel_button = document.createElement("button");
  cancel_button.id = `cancel_${id}`;
  cancel_button.innerHTML = "Cancel";
  let deleteCell = document.querySelector(`#row_${id} .delete`);
  deleteCell.appendChild(cancel_button);
  cancel_button.addEventListener("click", cancel);
}

function deleteData(e) {
  let id = e.target.id;
  id = id.slice(7, id.length);
  let row = document.getElementById(`row_${id}`);
  row.remove();
}

function saveData(e) {
  let _id = e.target.id;
  let id = _id.slice(5, _id.length);
  let row = document.getElementById(`row_${id}`);
  row.contentEditable = false;
  let save_button = document.getElementById(_id);
  save_button.style.visibility = "hidden";

  let cancel_button = document.getElementById(`cancel_${id}`);
  cancel_button.style.visibility = "hidden";
}

function cancel(e) {
  let _id = e.target.id;
  let id = _id.slice(7, _id.length);
  let row = document.getElementById(`row_${id}`);

  for (let index in colClass) {
    let cell = document.querySelector(`#row_${id} .${colClass[index]}`);
    cell.innerHTML = initialState[id][index];
  }
}

function refreshData(e) {
  location.reload();
}

document.querySelector("#load").addEventListener("click", loadData);
