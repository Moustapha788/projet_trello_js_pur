/* 
! Functions
*/

// ! remplirTache
function remplirTache(task, planning, delay) {
    const lignes = task.querySelectorAll("table tr td");
    task.firstElementChild.innerHTML = planning[0];
    lignes[0].innerHTML = planning[1];
    lignes[1].innerHTML = planning[2];
    lignes[2].innerHTML = planning[3];
    lignes[3].innerHTML = planning[4];
    etatTache(lignes[4], delay);
}

// ! etatTache
function etatTache(tdETat, delay) {
    if (delay > 0) {
        tdETat.innerHTML = "en cours ...";
        tdETat.className = "etat en_cours";
    } else if (delay <= 0) {
        tdETat.innerHTML = "terminée";
        tdETat.className = "etat ready";
        const thisNote = tdETat.parentElement.parentElement.parentElement.parentElement;
        /* note */
        thisNote.classList.add("ready_task");
        /* bouton edit */
        thisNote.children[1].classList.add("unavailable");
        /* boutons déplacement */
        thisNote.children[3].classList.add("unavailable");
        /* table of the overview */
        tdETat.parentElement.parentElement.classList.add("ready_task");
    }
}

// ! DownAndUpDOM
function DownAndUpDOM() {
    this.classList.toggle("showDOM");
    this.firstElementChild.classList.toggle("fa-chevron-up");
    main.classList.toggle("pendule")

}
// ! TrashAsideShow
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
function createTask() {

    const listesDeNotes = document.querySelectorAll(".liste-des-notes");
    var nbrNotes = 0;
    listesDeNotes.forEach(liste => {
        nbrNotes += liste.children.length;
    });

    /* création des éléments */
    const note = document.createElement("div");
    const titleNoteP = document.createElement("p");
    const smallEdit = document.createElement("small");
    const btnRestore = document.createElement("button");
    const ifOfRestore = document.createElement("i");
    const iOfSmall = document.createElement("i");

    const IconsP = document.createElement("p");
    const btnArrowLeft = document.createElement("button");
    const btnArrowRight = document.createElement("button");
    const arrowLeft = document.createElement("i");
    const arrowRight = document.createElement("i");

    const overviewDiv = document.createElement("div");
    const table = document.createElement("table");
    overviewDiv.appendChild(table);

    const trDateDebut = document.createElement("tr");
    const thDateDebut = document.createElement("th");
    thDateDebut.innerHTML = "Date de début";
    const tdDateDebut = document.createElement("td");
    [thDateDebut, tdDateDebut].forEach(data => { trDateDebut.appendChild(data) });

    const trDateFin = document.createElement("tr");
    const thDateFin = document.createElement("th");
    thDateFin.innerHTML = "Date de fin";
    const tdDateFin = document.createElement("td");
    [thDateFin, tdDateFin].forEach(data => { trDateFin.appendChild(data) });

    const trHeureDebut = document.createElement("tr");
    const thHeureDebut = document.createElement("th");
    thHeureDebut.innerHTML = "Heure de début";
    const tdHeureDebut = document.createElement("td");
    [thHeureDebut, tdHeureDebut].forEach(data => { trHeureDebut.appendChild(data) });


    const trHeureFin = document.createElement("tr");
    const thHeureFin = document.createElement("th");
    thHeureFin.innerHTML = "Heure de fin";
    const tdHeureFin = document.createElement("td");
    [thHeureFin, tdHeureFin].forEach(data => { trHeureFin.appendChild(data) });


    const trEtat = document.createElement("tr");
    const tdEtat = document.createElement("td");
    tdEtat.innerHTML = "en cours"
    tdEtat.classList.add("etat");
    trEtat.appendChild(tdEtat);




    [trDateDebut, trDateFin, trHeureDebut, trHeureFin, trEtat].forEach(tr => {
        table.appendChild(tr);
        tr.classList.add("ligne");
    });
    /* ajout de style (attributs class et id) */
    note.classList.add("note");

    /* 
    ?cette attribut pose prblème lorsuq'on supprime
    note.setAttribute("id", `note${nbrNotes+1}`); 
    */
    titleNoteP.classList.add("title-note");
    titleNoteP.innerHTML = `note ${nbrNotes+1} `;
    iOfSmall.className = "fa-solid fa-pen-to-square fa-2x";
    btnRestore.className = "restore";
    ifOfRestore.className = "fa-solid fa-trash-can-arrow-up fa-2x";
    IconsP.classList.add("iconsPara");
    btnArrowRight.className = "";
    btnArrowLeft.className = "";
    arrowRight.className = "fa-solid fa-angles-right fa-4x";
    arrowLeft.className = "fa-solid fa-angles-left fa-4x ";
    overviewDiv.classList.add("overview");


    /* liens parents fils */
    note.appendChild(titleNoteP);
    note.appendChild(smallEdit);
    smallEdit.appendChild(iOfSmall);
    note.appendChild(btnRestore);
    btnRestore.appendChild(ifOfRestore);
    note.appendChild(IconsP);
    IconsP.appendChild(btnArrowLeft);
    IconsP.appendChild(btnArrowRight);
    btnArrowLeft.appendChild(arrowLeft);
    btnArrowRight.appendChild(arrowRight);

    note.appendChild(overviewDiv);

    /* 
    ! events about note 
    */
    overviewDiv.addEventListener("click", voirPlus);
    smallEdit.addEventListener("click", editTask);
    note.addEventListener("dblclick", chooseNote);
    btnArrowLeft.addEventListener("click", movingTaskToLeft);
    btnArrowRight.addEventListener("click", movingTaskToRight);
    btnRestore.addEventListener("click", restoreTask);

    return note;

}

function restoreTask(e) {
    const thisNote = this.parentElement;
    const idParentColumn = thisNote.getAttribute("data-colPaprent");
    const columnCible = taskDashboard.querySelector(`#${idParentColumn}`);
    const principalColumn = taskDashboard.querySelector("#col1");
    if (columnCible) {
        columnCible.lastElementChild.appendChild(thisNote);
    } else {
        if (principalColumn) {
            principalColumn.lastElementChild.appendChild(thisNote);
        }
    }
    indispoDelTask();

}
// ! movingTaskToLeft
function movingTaskToLeft(e) {
    // e.stopPropagation();
    const thisNote = accessThisNote(e);
    const thisColumn = thisNote.parentElement.parentElement;
    let identifiant = parseTheId(thisColumn);
    if (1 < identifiant && identifiant <= 5) {
        identifiant--;
        const previousColum = taskDashboard.querySelector(`#col${identifiant} `);
        if (previousColum) {
            thisNote.classList.remove('animate__backInLeft');
            thisNote.classList.add('animate__backInRight');
            previousColum.lastElementChild.appendChild(thisNote);
            const idParent = previousColum.id;
            thisNote.setAttribute("data-colPaprent", idParent);
        }
    } else {
        return false;
    }
}
// ! movingTaskToRight
function movingTaskToRight(e) {
    // e.stopPropagation();
    const thisNote = accessThisNote(e);
    const thisColumn = thisNote.parentElement.parentElement;
    let identifiant = parseTheId(thisColumn);

    if (1 <= identifiant && identifiant < 5) {
        identifiant++;
        const nextColumn = taskDashboard.querySelector(`#col${identifiant}`);
        if (nextColumn) {
            thisNote.classList.remove('animate__backInRight');
            thisNote.classList.add('animate__backInLeft');
            nextColumn.lastElementChild.appendChild(thisNote);
            const idParent = nextColumn.id;
            thisNote.setAttribute("data-colPaprent", idParent);
        }
    } else {
        return false;
    }
}
// ! accessThisNote
function accessThisNote(e) {
    return e.target.parentElement.parentElement;
}
// ! parseTheId
function parseTheId(thisNote) {
    let identifiant = parseInt(thisNote.id.replace("col", ""));
    return identifiant;
}
// ! evoquerModal
function evoquerModal(e) {
    // const noteId = e.target.parentElement.parentElement;
    const textNote = e.target.parentElement.previousElementSibling.innerHTML;
    const theFormControls = document.querySelectorAll(".form-control");
    const donnees = document.querySelectorAll("table tr td");

    theFormControls[0].lastElementChild.value = textNote;
    for (let i = 0; i <= 3; i++) {
        theFormControls[i + 1].lastElementChild.value = donnees[i].innerHTML;
    }

    modalInfo.classList.add("open");
    btnSaveNote.addEventListener("click", () => {
        // alert("ok");
    });
}

function editTask(e) {
    ombre.classList.add("gener");
    evoquerModal(e);
}

function voirPlus(e) {
    this.classList.add("voir_plus");
}

// ! chooseNote
function chooseNote(e) {
    e.stopPropagation();
    if (this.lastElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML === "terminée") { return false; }

    this.classList.toggle("choosenNote");
    this.lastElementChild.classList.toggle("choosenNoteAZ");
    const theChoosenNote = document.querySelectorAll(".choosenNote");

    if (theChoosenNote.length > 0) {
        deleteTask.classList.add("you_want_del_task");
    } else {
        deleteTask.classList.remove("you_want_del_task");
    }
    setTimeout(() => {
        deleteTask.classList.remove("you_want_del_task");
        this.classList.remove("choosenNote");
        this.lastElementChild.classList.remove("choosenNoteAZ");
    }, 10000);
}
// ! showError
function showError(input) {
    input.className = 'theNoteText error';
}
// ! showSuccess
function showSuccess(input) {
    input.className = 'theNoteText success';
}
// ! cleanTheForm
function cleanTheForm() {
    const theFormControls = document.querySelectorAll(".form-control");
    theFormControls.forEach(fromCtrl => {
        fromCtrl.lastElementChild.value = "";
        fromCtrl.lastElementChild.className = "theNoteText";
        fromCtrl.lastElementChild.parentElement.firstElementChild.innerHTML = "";
    });
}
// ! emptyModal
function emptyModal() {
    const theFormControls = document.querySelectorAll(".form-control");
    let vide = 0;
    theFormControls.forEach(fromCtrl => {
        if (fromCtrl.lastElementChild.value === "") {
            vide++;
        };
    });
    return vide == 5;
}


// ! getInfos
function getInfos(modal) {
    const planning = [];
    const theFormControls = document.querySelectorAll(".form-control");
    theFormControls.forEach(fromCtrl => {
        planning.push(fromCtrl.lastElementChild.value);
    });
    return planning;
}

// ! validAdding
function testDate(planning) {
    const divContent = noteForm.querySelectorAll(".form-control");

    let cptErrorDate = 0;
    const beginYear = planning[1].slice(0, 4);
    const beginMonth = planning[1].slice(5, 7);
    const beginDay = planning[1].slice(8);
    const hoursBegin = planning[2].slice(0, 2);
    const minBegin = planning[2].slice(3);

    const endYear = planning[3].slice(0, 4);
    const endMonth = planning[3].slice(5, 7);
    const endDay = planning[3].slice(8);
    const hoursEnd = planning[4].slice(0, 2);
    const minEnd = planning[4].slice(3);

    const now = new Date();
    const timestampNow = now.getTime();

    const DateStart = new Date(beginYear, beginMonth - 1, beginDay, hoursBegin, minBegin);
    const DateEnd = new Date(endYear, endMonth - 1, endDay, hoursEnd, minEnd);

    const timestampTaskDelay = DateEnd.getTime() - DateStart.getTime();

    if (timestampNow >= DateStart.getTime()) {
        showError(divContent[1].lastElementChild);
        showError(divContent[2].lastElementChild);
        divContent[1].lastElementChild.parentElement.firstElementChild.innerHTML = "la date et \ ou l'heure de début est incorrect";
        divContent[2].lastElementChild.parentElement.firstElementChild.innerHTML = "la date et \ ou l'heure de début est incorrect";

        cptErrorDate = cptErrorDate + 1;
    } else {
        showSuccess(divContent[1].lastElementChild);
        showSuccess(divContent[2].lastElementChild);
        divContent[1].lastElementChild.parentElement.firstElementChild.innerHTML = "";
        divContent[2].lastElementChild.parentElement.firstElementChild.innerHTML = "";
    }

    if (timestampTaskDelay <= 0) {
        showError(divContent[3].lastElementChild);
        showError(divContent[4].lastElementChild);
        divContent[3].lastElementChild.parentElement.firstElementChild.innerHTML = "le délai est incorrect, vérifie l'heure et la date de fin";
        divContent[4].lastElementChild.parentElement.firstElementChild.innerHTML = "le délai est incorrect, vérifie l'heure et la date de fin ";
        cptErrorDate = cptErrorDate + 1;
    } else {
        showSuccess(divContent[3].lastElementChild);
        showSuccess(divContent[4].lastElementChild);
        divContent[3].lastElementChild.parentElement.firstElementChild.innerHTML = "";
        divContent[4].lastElementChild.parentElement.firstElementChild.innerHTML = "";

    }
    return [cptErrorDate, `${DateEnd.getTime() - timestampNow}`];
}
// ! validAdding
function validAdding(noteForm, planning) {
    var cptError = 0;
    const divContent = noteForm.querySelectorAll(".form-control");

    for (let i = 0; i < planning.length; i++) {
        if (planning[i] === "") {
            showError(divContent[i].lastElementChild);
            divContent[i].lastElementChild.parentElement.firstElementChild.innerHTML = "ce champ est requis";
            cptError++;
        } else {
            showSuccess(divContent[i].lastElementChild);
            divContent[i].lastElementChild.parentElement.firstElementChild.innerHTML = "";
        }
    }

    if (cptError === 0) {
        cptError += testDate(planning)[0];
    }

    return cptError === 0;
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
// ! refleshColumn
function refleshColumn() {
    const myColumns = document.querySelectorAll(".colonne");
    myColumns.forEach((col, i) => {
        if (!col.classList.contains("modified")) {
            col.setAttribute("id", `col${ i + 1 }`);
            col.firstElementChild.firstElementChild.innerHTML = `colonne${i+1}`;
        }
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
        if (textSiVide != this.firstElementChild.innerHTML) {
            this.parentElement.classList.add("modified");
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
    const theChoosenColumns = document.querySelectorAll(".selected");

    if (theChoosenColumns.length > 0) {
        deleteColumn.classList.add("you_want_del_task");
    } else {
        deleteColumn.classList.remove("you_want_del_task");
    }
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
}
// ! deleteTheTask
function deleteTheTask() {
    let listsOfColumns = document.querySelectorAll(".colonne");
    listsOfColumns.forEach(column => {
        let listsOfNotesSelected = document.querySelectorAll(".choosenNote");
        const nodeList = column.lastElementChild;
        if (nodeList.children.length != 0) {
            for (const notes of listsOfNotesSelected) {
                const idParent = getIdParent(notes);
                notes.setAttribute("data-colPaprent", idParent);
                trashAside.lastElementChild.appendChild(notes);
                notes.classList.remove("choosenNote");
                notes.lastElementChild.classList.remove("choosenNoteAZ");
                indispoDelTask();
            }
        }
    });
}
// ! getIdParent
function getIdParent(notes) {
    const col = notes.parentElement.parentElement;
    return col.id;
}