import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-f182c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementRef = ref(database, "Endorsements")

onValue(endorsementRef, function (snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        for (let i = 0; i < endorsementArray.length; i++) {
            let currentItem
            appendEndorsementsRes(currentItem)
        }
    }
})

function appendEndorsementsRes(resultText) {
    let itemID = newItem[0];

}

function getEndorsementInput() {
    let endorsementText = document.getElementById("endorsement-input").value;
    return endorsementText;
}

let resultText = "";
let endorsementArray = [];
document.getElementById("publish-button").addEventListener("click", function () {
    resultText = getEndorsementInput();
    if (resultText === "") {
        alert("Please enter something");
    }
    push(endorsementRef, {
        endorsement: resultText
    })
    endorsementArray.push(resultText);
    renderingEndorsements();
})

let endorsementsContainer = document.getElementById("endorsements-container")
endorsementsContainer.innerHTML = "";

function renderingEndorsements(newItem) {
    let itemId = newItem[0];
    let itemValue = newItem[1];
    let endorsementEl = document.createElement("div");
    endorsementEl = itemValue

    endorsementEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `Endorsements/${itemId}`)

        remove(exactLocationOfItemInDB)
    })
    endorsementsContainer.innerHTML = "";
    for (let i = 0; i < endorsementArray.length; i++) {
        endorsementEl.innerHTML = `<p>${endorsementArray[i]}</p>`;
        endorsementsContainer.appendChild(endorsementEl);
    }
}

