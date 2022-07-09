//selectors
const tareaInput = document.querySelector('.tarea-input');
const tareaButton = document.querySelector('.tarea-button');
const tareaLista = document.querySelector('.tarea-lista');
const opcionFiltro = document.querySelector('.tarea-filtro');
//event Listeners
document.addEventListener('DOMcontentLoaded', getTareas);
tareaButton.addEventListener('click', addTarea);
tareaLista.addEventListener('click', deleteCheck);
opcionFiltro.addEventListener('click', tareaFiltro);
//functions
function addTarea(event) {
//form submitting
    event.preventDefault();
//Tarea DIV    
    const tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');
//Create Li
    const newTarea = document.createElement('li');
    newTarea.innerText = tareaInput.value;
    newTarea.classList.add('tarea-item');
    tareaDiv.appendChild(newTarea)
//add tarea to localstorage
    saveLocalTareas(tareaInput.value);
//check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    tareaDiv.appendChild(completedButton);
//check basura button
    const basuraButton = document.createElement('button');
    basuraButton.innerHTML = '<i class="fas fa-trash"></i>';
    basuraButton.classList.add('basura-btn');
    tareaDiv.appendChild(basuraButton);
//append to list
    tareaLista.appendChild(tareaDiv);
//clear tarea input value
    tareaInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
//delete tarea
    if (item.classList[0] === 'basura-btn') {
        const tarea = item.parentElement;
        //animacion
        tarea.classList.add('fall');
        removeLocalTareas(tarea);
        tarea.addEventListener('transitionend', function(){
            tarea.remove();
        });
    }

//check mark
    if (item.classList[0] === "complete-btn") {
        const tarea = item.parentElement;
        tarea.classList.toggle("completed");
    }
}

function tareaFiltro(e){
    const tareas = tareaLista.childNodes;
    tareas.forEach(function(tarea){
        switch(e.target.value){
            case "all":
                tarea.style.display = "flex";
                break;
            case "completed":
                if(tarea.classList.contains('completed')){
                    tarea.style.display = "flex";
                }else{
                    tarea.style.display = "none";
                }
                break;
                case "uncompleted":
                    if(!tarea.classList.contains('completed')){
                        tarea.style.display = "flex";
                    }else{
                        tarea.style.display = "none";
                    }
                    break;
        }
    });
}

function saveLocalTareas(tarea){
    let tareas;
    if(localStorage.getItem('tareas') === null) {
        tareas = [];
    }else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }

    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function getTareas() {
    let tareas;

    if(localStorage.getItem('tareas') === null) {
        tareas = [];
    }else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    tareas.forEach(function(tarea){
    //Tarea div
        const tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');
//create Li
    const newTarea = document.createElement('li');
    newTarea.innerText = tarea;
    newTarea.classList.add('tarea-item');
    tareaDiv.appendChild(newTarea)

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    tareaDiv.appendChild(completedButton);

    const basuraButton = document.createElement('button');
    basuraButton.innerHTML = '<i class="fas fa-trash"></i>';
    basuraButton.classList.add('basura-btn');
    tareaDiv.appendChild(basuraButton);

    tareaLista.appendChild(tareaDiv);
    })
}

function removeLocalTareas(tarea) {
    let tareas;
    if(localStorage.getItem('tareas') === null) {
        tareas = [];
    }else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    const tareaIndex = tarea.children[0].innerText;
    tareas.splice(tareas.indexOf(tareaIndex), 1);
    localStorage.setItem('tarea', JSON.stringify(tareas));
}