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
    writing.style.visibility="visible"
    title.style.visibility="visible"
    exit.style.visibility="visible"
    heroa.style.visibility="hidden"
})

exit.addEventListener("click",()=>{
    features.style.visibility="hidden"
    bold.style.visibility="hidden"
    italic.style.visibility="hidden"
    save.style.visibility="hidden"
    writing.style.visibility="hidden"
    title.style.visibility="hidden"
    exit.style.visibility="hidden"
})

// show notes
let heroa = document.querySelector(".n_sec")
function showNotes(){
    Notes.forEach((note) =>{
        let n = `<div class="note">
                <div class="upper_note">
                 <h2>${note.title}</h2>
                 <h6>${note.writing}</h6>
                </div>
                <div class="down_note">
                <p>${note.date}</p>
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

        
        Notes.push(noteInfo)
        localStorage.setItem("notes", JSON.stringify(Notes));
    }
    
})