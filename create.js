// Save
const Notes = JSON.parse(localStorage.getItem("notes") || "[]");

let seetings = document.querySelector("#seetings");
let seetings_pannel = document.querySelector(".Spanel");
seetings.addEventListener("click",()=>{
    if(seetings_pannel.style.visibility === "hidden"){
        seetings_pannel.style.visibility="visible"
    }else{
        seetings_pannel.style.visibility="hidden"
    }  
})

let isUpdate = false, updateID;



// dragging content
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

seetings_pannel.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - seetings_pannel.offsetLeft;
  offsetY = e.clientY - seetings_pannel.offsetTop;
});
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    seetings_pannel.style.left = `${e.clientX - offsetX}px`;
    seetings_pannel.style.top = `${e.clientY - offsetY}px`;
  }
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Add dialog
let addpannel = document.querySelector(".addpannel");
let plus = document.querySelector("#plus");

plus.addEventListener("click",()=>{
    if(addpannel.style.visibility === "hidden"){
        addpannel.style.visibility="visible"
    }else{
        addpannel.style.visibility="hidden"
    }  
})

// Add notes
let heroa = document.querySelector(".n_sec")
let Addnotes = document.querySelector(".addNotes");
let features = document.querySelector(".features");
let bold = document.querySelector("#bold")
let italic = document.querySelector("#italic")
let save = document.querySelector("#save")
let writing = document.querySelector("#writing_area")
let title = document.querySelector("#title")
let exit = document.querySelector("#Exit")
Addnotes.addEventListener("click",()=>{
    addpannel.style.visibility="hidden"
    features.style.visibility="visible"
    bold.style.visibility="visible"
    italic.style.visibility="visible"
    save.style.visibility="visible"
    writing.value = "";
    title.value= "";
    writing.style.visibility="visible"
    title.style.visibility="visible"
    title.focus()
    exit.style.visibility="visible"
    heroa.style.visibility="hidden"
    writing.style.height="500px"
})

exit.addEventListener("click",()=>{
    isUpdate = false;
    writing.style.height="0"
    features.style.visibility="hidden"
    bold.style.visibility="hidden"
    italic.style.visibility="hidden"
    save.style.visibility="hidden"
    writing.style.visibility="hidden"
    title.style.visibility="hidden"
    exit.style.visibility="hidden"
    heroa.style.visibility="visible"
})

// show notes

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove())
    Notes.forEach((note, index) =>{
        let n = `<div class="note">
                <div class="upper_note">
                 <h2>${note.title}</h2>
                 <h6>${note.writing}</h6>
                </div>
                <div class="down_note">
                <p>${note.date}</p> <button class="sty" onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i></button><button onclick="updateNote(${index},'${note.title}','${note.writing}')" class="sty"> <i class="fa-solid fa-pencil"></i></button>
                </div>
                </div>`
        heroa.insertAdjacentHTML("afterbegin",n)    
    })
}
showNotes();
/// save
save.addEventListener("click",e=>{
    e.preventDefault();
    let Notetitle = title.value,
    noteDesc = writing.value;
    if(Notetitle,noteDesc){
        let dateObj = new Date(),
        month = dateObj.getMonth(),
        day = dateObj.getDate(),
        year = dateObj.getFullYear();



        let noteInfo = {
            title: Notetitle , writing:noteDesc,
            date: `${day} ${month}, ${year}` 
        }

        

        

        if (isUpdate) {
            // Update the existing note
            Notes[updateID] = noteInfo;
            isUpdate = false; // Reset the update flag
        } else {
            // Add a new note
            Notes.push(noteInfo)
            
        }

        localStorage.setItem("notes", JSON.stringify(Notes));
        
    }
    
    
})

//delete note
function deleteNote(noteId) {
    let confi = confirm("Are you sure want to delete this note")
    switch(confi){
        case true: Notes.splice(noteId ,1); // removing the sleetced note from array
                   localStorage.setItem("notes",JSON.stringify(Notes))
                   alert("Sucessfully Deleted")
        break
        case false: alert("You cancleed delete")
        break
    }
    
}
function updateNote(noteId, noteTitle, noteWriting) {
    isUpdate = true;
    updateID = noteId;
    Addnotes.click();
    title.value = noteTitle;
    writing.value = noteWriting;
    console.log(noteId, title.value, writing.value);
}
