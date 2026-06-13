import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: import.meta.env?.VITE_DATABASE_URL || "https://leads-tracker-app-ca6aa-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDatabase = ref(database, "leads")

// console.log(app)
// console.log(database)
// console.log(firebaseConfig.databaseURL)

// let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
// const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
//const tabBtn = document.getElementById("tab-btn")

// if (leadsFromLocalStorage) {
//     myLeads = leadsFromLocalStorage
//     render(myLeads)
// }

//tabBtn.addEventListener("click", function(){    
//    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//        myLeads.push(tabs[0].url)
//        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//        render(myLeads)
//    })
//})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDatabase, function(snapshot){
    if(snapshot.exists()){
        render(Object.values(snapshot.val()))
    }
})
deleteBtn.addEventListener("dblclick", function() {
    // localStorage.clear()
    // myLeads = []
    // render(myLeads)

    remove(referenceInDatabase)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    // myLeads.push(inputEl.value)
    push(referenceInDatabase, inputEl.value)
    inputEl.value = "" 
    // localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    // render(myLeads)
})