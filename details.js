import data from "./details.json" assert { type: "json" };
document.getElementById("load").addEventListener("click", load_data);

var initialState = [];

function refresh_data() {
  location.reload();
}

function save_data(e) {
  let eid = e.target.id;
  eid = eid.slice(4, eid.length);
  let row = document.getElementById(`row${eid}`);
  let save_btn = document.getElementById(`save${eid}`);
  let cancel_btn = document.getElementById(`cancel${eid}`);
  row.contentEditable = false;

  save_btn.remove();
  cancel_btn.remove();
}

function edit_data(e) {
  let eid = e.target.id;
  let edit_btn = document.getElementById(eid);
  let id = eid.slice(4, eid.length);
  let row = document.getElementById(`row${id}`);
  row.style.backgroundColor = "yellow";
  row.contentEditable = true;

  let save_button = document.createElement("button");
  save_button.id = `save${id}`;
  save_button.innerHTML = "Save";

  let editCell = document.getElementById(`cell_edit${id}`);

  edit_btn.remove();

  editCell.appendChild(save_button);
  save_button.addEventListener("click", save_data);

  let cancel_button = document.createElement("button");
  cancel_button.id = `cancel${id}`;

  cancel_button.innerHTML = "Cancel";
  row.appendChild(cancel_button);
  cancel_button.addEventListener("click", cancel);
}
function delete_data(e) {
  let eid = e.target.id;
  let id = eid.slice(6, eid.length);
  let row = document.getElementById(`row${id}`);
  row.remove();
}

function cancel(e) {
  let eid = e.target.id;
  eid = eid.slice(6, eid.length);
  let save_btn = document.getElementById(`save${eid}`);
  let cancel_btn = document.getElementById(`cancel${eid}`);
  let row = document.getElementById(`row${eid}`);
  row.style.backgroundColor = "cyan";

  row.contentEditable = false;

  save_btn.remove();
  cancel_btn.remove();
}

function load_data() {
  let vec = [];
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  const rowh = document.createElement("tr");

  for (var item in data[0]) {
    let cell = document.createElement("td");
    let cellText = document.createTextNode(item);
    cell.appendChild(cellText);
    rowh.appendChild(cell);
  }
  tbody.appendChild(rowh);
  table.appendChild(tbody);

  for (var i in data) {
    var row = document.createElement("tr");
    row.setAttribute("id", `row${i}`);
    for (var j in data[i]) {
      let cell = document.createElement("td");
      let cellText = document.createTextNode(data[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
      vec.push(data[i][j]);
    }
    initialState.push(vec);

    for (var k = 0; k < 2; k++) {
      let cell = document.createElement("td");
      let btn = document.createElement("button");
      if (k == 0) {
        btn.setAttribute("id", `edit${i}`);
        btn.innerHTML = "Edit";
        btn.addEventListener("click", edit_data);
        cell.setAttribute("id", `cell_edit${i}`);
      } else {
        btn.setAttribute("id", `delete${i}`);
        btn.innerHTML = "Delete";
        btn.addEventListener("click", delete_data);
        cell.setAttribute("id", `cell_delete${i}`);
      }
      cell.appendChild(btn);
      row.appendChild(cell);
    }

    tbody.appendChild(row);
    table.appendChild(tbody);
  }

  document.body.appendChild(table);
  document.getElementById("load").innerHTML = "Refresh";

  document.getElementById("load").addEventListener("click", refresh_data);
}
