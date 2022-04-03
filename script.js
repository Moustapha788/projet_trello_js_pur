"use strict"

/* 
Récupération des éléments globaux
*/
const body = document.querySelector("body");
const btnTrash = document.querySelector("#btn-trash");
const modalInfo = document.querySelector("#modal_info");
const btnCloseNote = document.querySelector(".btn-close-note");
const btnSaveNote = document.querySelector(".btnSaveNote");
const btnEditNote = document.querySelector(".btnEditNote");
const noteForm = document.querySelector(".note-form");
const ombre = document.querySelector(".ombre");
const downDOM = document.getElementById("downDOM");
const btnMainNav = document.getElementById("btn-main-nav");
const mainNav = document.getElementById("main-nav");
const main = document.getElementById('main');
const navTask = document.getElementById('nav-task');
const addTask = document.getElementById("add-Task");
const addColumn = document.getElementById("add-Column");
const deleteColumn = document.getElementById('delete-Column');
const deleteTask = document.getElementById('delete-task');
const taskDashboard = document.getElementById('task-dashboard');
const trashAside = document.querySelector("#trash-aside");
const chemin = "http://127.0.0.1:5500/data/db.json";
const tabColors = [
    "rgb(52, 73, 94)",
    "rgb(241, 196, 15)",
    "rgb(0, 86, 202)",
    "rgb(52, 152, 219)",
    "rgb(44, 62, 80)",
    "rgb(231, 76, 60)",
    "rgb(60, 64, 198)",
    "rgb(239, 87, 119)",
    "rgb(255, 255, 0)",
    "rgb(210, 218, 226)",
    "rgb(0, 128, 128)",
    "rgb(220, 20, 60)",
    "rgb(173, 216, 230)",
    "rgb(30, 39, 46)",
    "rgb(255, 168, 1)",
    "rgb(44, 44, 84)"
];

/* 
! Events
*/

/* 
rendre indisponible certains boutons selon la circonstance 
*/
window.addEventListener("load", () => {
    const theFormControls = document.querySelectorAll(".form-control");
    // const now = new Date();
    // const temps = `${now.getFullYear()}:${now.getMonth()+1}:${now.getDate()}`;
    // console.log(temps);
    // theFormControls[1].lastElementChild.value = temps;

});
indisponibiliser();
indispoDelTask();

/* 
Le DOM
*/

downDOM.addEventListener("click", DownAndUpDOM);
btnTrash.addEventListener("click", TrashAsideShow);
/* 
menu vertical
*/
btnMainNav.addEventListener("click", () => mainNav.classList.toggle("showMainNav"));

/* 
ajouter une colonne 
*/
addColumn.addEventListener('click', () => {
    const column = createColumn();
    taskDashboard.appendChild(column);
    indisponibiliser();
    indispoDelTask();
});
/* 
ajouter une note 
*/
addTask.addEventListener('click', () => {
    ombre.classList.toggle("gener");
    modalInfo.classList.add("open");
});

btnSaveNote.addEventListener("click", () => {
    var planning = getInfos();
    /* si les données ne sont pas valides alors ne continue pas */
    if (!validAdding(noteForm, planning)) { return false; }
    ombre.classList.remove("gener");

    let firstColumn = document.querySelector(".colonne");
    var task = createTask();
    firstColumn.lastElementChild.appendChild(task);
    const idParent = getIdParent(task);
    task.setAttribute("data-colPaprent", idParent);
    var delay = testDate(planning)[1];

    remplirTache(task, planning, delay);

    const lignes = task.querySelectorAll("table tr td");
    var timer = setInterval(() => {
        delay -= 1000;
        etatTache(lignes[4], delay);
        /*  
        IT SHOWS THE DELAY OF THE TASK
        console.log(delay); 
        */
        if (delay <= 0) {
            clearInterval(timer);
        }
    }, 1000);

    cleanTheForm();
    modalInfo.classList.remove("open");
    indispoDelTask();
});


btnCloseNote.addEventListener('click', e => {
    cleanTheForm();
    modalInfo.classList.remove("open");
    ombre.classList.remove("gener");

});

/* 
supprimer une colonne 
*/
deleteColumn.addEventListener('click', deleteTheColumn);
/* 
supprimer une note 
*/
deleteTask.addEventListener('click', deleteTheTask);


// asynchrous function who gets data
getDataWithFetch(chemin);