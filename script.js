"use strict"

/* 
Récupération des éléments globaux
*/
const body = document.querySelector("body");
const btnTrash = document.querySelector("#btn-trash");
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
const taskDashboard = document.getElementById('task-dashboard')
const listeDesNotes = document.querySelectorAll(".liste-des-notes");
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
indisponibiliser();
indispoDelTask();

/* 
Le DOM
*/

downDOM.addEventListener("click", DownAndUpDOM);
btnTrash.addEventListener("click", TrashAsideShow)
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
    let firstColumn = document.querySelector(".colonne");
    var task = createTask();
    firstColumn.lastElementChild.appendChild(task);
    const theNotes = document.querySelectorAll(".note");
    theNotes.forEach(note => {
        const listsOfNotes = document.querySelectorAll(".liste-des-notes");
        for (const list of listsOfNotes) {
            list.addEventListener("dragover", dragOverTask);
            list.addEventListener("dragenter", dragEnterTask);
            list.addEventListener("dragleave", dragLeaveTask);
            list.addEventListener("drop", e => dragDropTask(e, note));
        }
    });
    indispoDelTask();
});
/* 
supprimer une colonne 
*/
deleteColumn.addEventListener('click', deleteTheColumn);
/* 
supprimer une note 
*/
deleteTask.addEventListener('click', deleteTheTask);


/* 
! Functions
*/

// ! DownAndUpDOM
function DownAndUpDOM() {
    this.classList.toggle("showDOM");
    this.firstElementChild.classList.toggle("fa-chevron-up");
    main.classList.toggle("pendule")

}

function TrashAsideShow() {
    this.parentElement.classList.toggle("showTrashAside");
    this.firstElementChild.classList.toggle("fa-chevron-right");
}
// ! indisponibiliser
function indisponibiliser() {
    if (taskDashboard.children.length === 0) {
        addTask.classList.add("indisponible");
        deleteColumn.classList.add("indisponible");
        deleteTask.classList.add('indisponible');
    } else {
        addTask.classList.remove("indisponible");
        deleteColumn.classList.remove("indisponible");
        deleteTask.classList.remove('indisponible');
    }
    if (taskDashboard.children.length === 5) {
        addColumn.classList.add('indisponible');
    } else {
        addColumn.classList.remove('indisponible');
    }
}
// ! indispoDelTask
function indispoDelTask() {
    const listesDeNotes = document.querySelectorAll(".liste-des-notes");
    var nbrNotes = 0;
    listesDeNotes.forEach(liste => {
        nbrNotes += liste.children.length;
    });
    if (nbrNotes === 0) {
        deleteTask.classList.add('indisponible');
    } else {
        deleteTask.classList.remove('indisponible');

    }
}

// ! createTask
function createTask(params) {

    const listesDeNotes = document.querySelectorAll(".liste-des-notes");
    // console.log(listesDeNotes.children);
    var nbrNotes = 0;
    listesDeNotes.forEach(liste => {
        nbrNotes += liste.children.length;
    });
    /* création des éléments */
    const note = document.createElement("div");
    const smallEdit = document.createElement("small");
    const iOfSmall = document.createElement("i");
    const titleNoteP = document.createElement("p");
    const article = document.createElement("article");
    const infoTitleNoteDiv = document.createElement('div');
    const h1Title = document.createElement("h1");
    const btnCloseNoteSpan = document.createElement('span');
    const iBtnClose = document.createElement("i");
    const form = document.createElement("form");
    const formCntrl1 = document.createElement("div");
    const formCntrl2 = document.createElement("div");
    const formCntrl3 = document.createElement("div");
    const formCntrl4 = document.createElement("div");
    const label1 = document.createElement('label');
    const label2 = document.createElement('label');
    const label3 = document.createElement('label');
    const label4 = document.createElement('label');
    const textArreaNote = document.createElement('textarea');
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    const input3 = document.createElement("input");
    const btnAjouter = document.createElement('button');

    /* ajout de style (attributs class et id) */
    note.className = "note drag-drop-note";
    note.setAttribute("id", `task${nbrNotes+1}`);
    note.setAttribute('data-id', note.id);
    note.setAttribute('draggable', 'true');
    titleNoteP.className = "title-note";
    titleNoteP.innerHTML = "votre note";

    article.className = "note-information";
    article.style.zIndex = `${10+nbrNotes+1} `
    infoTitleNoteDiv.className = "info-title-note";
    h1Title.innerHTML = `note ${nbrNotes+1}`;

    btnCloseNoteSpan.className = "btn-close-note";
    iBtnClose.className = "fa-solid fa-xmark fa-4x";
    form.className = "note-form";
    form.setAttribute("action", "");
    [formCntrl1, formCntrl2, formCntrl3, formCntrl4].forEach(formControl => formControl.className = "form-control");
    [label1, label2, label3, label4].forEach(label => label.setAttribute("for", ""));

    label1.innerHTML = "Tâche";
    label2.innerHTML = "Date";
    label3.innerHTML = "Heure de Début";
    label4.innerHTML = "Heure de Fin";
    label1.setAttribute("for", `tache${nbrNotes+1}`);
    label2.setAttribute("for", `dateD${nbrNotes+1}`);
    label3.setAttribute("for", `time${nbrNotes+1}`);
    label4.setAttribute("for", `dateF${nbrNotes+1}`);
    textArreaNote.setAttribute("id", `tache${nbrNotes+1}`);
    textArreaNote.setAttribute("name", `tache${nbrNotes+1}`);
    input1.setAttribute("id", `dateD${nbrNotes+1}`);
    input2.setAttribute("id", `time${nbrNotes+1}`);
    input3.setAttribute("id", `dateF${nbrNotes+1}`);

    textArreaNote.className = "theNoteText";
    [input1, input3].forEach(input => input.setAttribute("type", 'date'))
    input2.setAttribute("type", 'time');
    btnAjouter.setAttribute('type', 'button');
    btnAjouter.className = "btnSaveNote";
    btnAjouter.innerHTML = "Ajouter";

    /* liens parents fils */
    note.appendChild(titleNoteP);
    note.appendChild(article);
    article.appendChild(infoTitleNoteDiv);
    article.appendChild(form);
    infoTitleNoteDiv.appendChild(h1Title);
    infoTitleNoteDiv.appendChild(btnCloseNoteSpan);
    btnCloseNoteSpan.appendChild(iBtnClose);
    [formCntrl1, formCntrl2, formCntrl3, formCntrl4].forEach(formControl => form.appendChild(formControl));
    form.appendChild(btnAjouter);



    formCntrl1.appendChild(label1);
    formCntrl1.appendChild(textArreaNote);

    formCntrl2.appendChild(label2);
    formCntrl2.appendChild(input1);

    formCntrl3.appendChild(label3);
    formCntrl3.appendChild(input2);

    formCntrl4.appendChild(label4);
    formCntrl4.appendChild(input3);


    /* 
    ! events about note 
    */
    textArreaNote.select();
    // note.addEventListener("click", showNote)
    note.addEventListener("dblclick", chooseNote)
    note.addEventListener("dragstart", dragStartNote);
    note.addEventListener("dragend", dragEndNote);
    // var planning = [input1.value, input2.value, input3.value];
    btnCloseNoteSpan.addEventListener("click", closeInfosNote);
    btnAjouter.addEventListener("click", saveTask);

    function saveTask() {
        var planning = [input1.value, input2.value, input3.value];

        if (planning.some(data => data == "")) {
            console.log(planning)
            alert("ok");
        } else {
            console.log(planning);
            // const butoir = new Date(planning[0]);
            // const begin = new Date(`${planning[0] + planning[1]}`);
            testDate(planning)
                // console.log(butoir);
                // console.log(begin);
        }
    }
    return note;
}


// 
function showNote(params) {
    this.lastElementChild.classList.toggle("close");
    ombre.classList.toggle("gener");
}
// ! chooseNote
function chooseNote(e) {
    this.classList.toggle("choosenNote");
    setTimeout(() => {
        this.classList.toggle("choosenNote");
    }, 10000);
    e.stopPropagation();

}
// ! closeInfosNote
function closeInfosNote(e) {
    this.parentElement.parentElement.classList.add("close");
    ombre.classList.remove("gener");
    e.stopPropagation();
}

function testDate(planning) {
    const beginYear = planning[0].slice(0, 4);
    const beginMonth = planning[0].slice(5, 7);
    const beginDay = planning[0].slice(8);

    const timeHours = planning[1].slice(0, 2);
    const timeMin = planning[1].slice(3);

    const endYear = planning[2].slice(0, 4);
    const endMonth = planning[2].slice(5, 7);
    const endDay = planning[2].slice(8);

    console.log(timeHours, timeMin);
    const now = new Date()
    const currentY = now.getFullYear();
    // const currentMin = now.get();
    const currentMin = now.getMinutes();
    // now.get
}




// ! createColumn
function createColumn() {
    let id = taskDashboard.children.length;
    /* création des éléments */
    const column = document.createElement("div");
    const h1 = document.createElement("h1");
    const marquee = document.createElement("marquee");
    const aside = document.createElement("aside");

    /* ajout de style (attributs class et id) */
    const bgcolor = tabColors[randomColor()];
    column.classList.add("colonne", "animate__backInDown");
    column.setAttribute("id", `col${ id + 1 }`);
    column.style.backgroundColor = bgcolor;
    h1.className = "title-col";
    marquee.setAttribute("behavior", "alternate");
    marquee.innerHTML = `colonne${id+1}`;
    aside.className = "liste-des-notes";

    /* liens parents fils */
    column.appendChild(h1);
    h1.appendChild(marquee);
    column.appendChild(aside);

    /*
    ! events about column
    */
    h1.addEventListener("dblclick", modifierTitreColonne)
    column.addEventListener("dblclick", selectTheColumn)
    return column;
}

function refleshColumn() {
    const myColumns = document.querySelectorAll(".colonne");
    myColumns.forEach((col, i) => {
        col.setAttribute("id", `col${ i + 1 }`);
        col.firstElementChild.firstElementChild.innerHTML = `colonne${i+1}`;
        // if (col.firstElementChild.firstElementChild.innerHTML === `colonne${i}`) {
        //     col.firstElementChild.firstElementChild.innerHTML = `colonne${i+1}`;
        // }
    });
}
// ! modifierTitreColonne
function modifierTitreColonne(e) {
    e.stopPropagation();
    const text = document.createElement('input');
    this.appendChild(text);
    text.value = this.firstElementChild.innerHTML;
    const textSiVide = text.value;
    this.firstElementChild.innerHTML = "";
    text.className = "modificationColonne"
    text.focus();
    text.addEventListener("blur", (e) => {
        this.firstElementChild.innerHTML = text.value;
        if (this.firstElementChild.innerHTML.trim() === "") {
            this.firstElementChild.innerHTML = textSiVide;
        }
        e.target.parentElement.removeChild(e.target);
    });
}
// ! selectTheColumn
function selectTheColumn(e) {
    e.stopPropagation();
    this.classList.toggle("selected");
    setTimeout(() => {
        this.classList.remove("selected");
    }, 10000);
}
// ! randomColor
function randomColor() {
    const len = tabColors.length;
    var pos = Math.floor(Math.random() * len);
    if (taskDashboard.length > 0) {
        do {
            var pos = Math.floor(Math.random() * len);
        } while (taskDashboard.lastElementChild.style.backgroundColor === tabColors[pos]);
    }
    return pos;
}
// ! deleteTheColumn
function deleteTheColumn() {

    let listsOfColumns = document.querySelectorAll(".colonne");
    let listsOfColumnsSelected = document.querySelectorAll(".selected");
    for (let i = 0; i < listsOfColumnsSelected.length; i++) {
        if (listsOfColumnsSelected[i].id === "col1" && listsOfColumns.length > 1) {
            return false;
        } else {
            taskDashboard.removeChild(listsOfColumnsSelected[i]);
            refleshColumn();
            indisponibiliser();
            indispoDelTask();
        }
    }
    // if (listsOfColumns.length === 1) { return false } else {

    // }
    // for (const column of listsOfColumnsSelected) {
    //     if (column.id = "col1") {
    //         alert("ok");
    //     } else {
    //         console.log(column.id);
    //         taskDashboard.removeChild(column);
    //         indisponibiliser();
    //         indispoDelTask();
    //     }
    // }
}
// ! deleteTheTask
function deleteTheTask() {
    let listsOfColumns = document.querySelectorAll(".colonne");
    listsOfColumns.forEach(column => {
        let listsOfNotesSelected = document.querySelectorAll(".choosenNote");
        const nodeList = column.lastElementChild;
        if (nodeList.children.length != 0) {
            for (const notes of listsOfNotesSelected) {
                nodeList.removeChild(notes);
                indispoDelTask();
            }
        }
    });
}
/* Drag and drop for the Task */
// ! dragStartNote
function dragStartNote(e) {
    this.classList.add('tenu');
    setTimeout(() => { this.classList.add('invisible') }, 0);
}
// ! dragEndNote
function dragEndNote(e) {
    this.classList.remove('tenu');
    setTimeout(() => { this.classList.remove('invisible') }, 0);

}
// ! dragOverTask
function dragOverTask(e) {
    e.preventDefault();

    e.stopPropagation();
}
// ! dragEnterTask
function dragEnterTask(e) {
    e.preventDefault();
    this.parentElement.classList.add('ajout');
    e.stopPropagation();
}
// ! dragLeaveTask
function dragLeaveTask(e) {
    this.parentElement.classList.remove('ajout');
    e.stopPropagation();

}
// ! dragDropTask
function dragDropTask(e, note) {
    e.target.parentElement.classList.remove('ajout');
    e.target.appendChild(note);
    e.stopPropagation();
}