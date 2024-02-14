import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://endorsements-f182c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const inputEl = document.getElementById("endorsement-input");
const buttonEl = document.getElementById("publish-button");
const endorsementsEl = document.getElementById("endorsements-container");
const endorsementsInDb = ref(database, "Endorsements");

buttonEl.addEventListener("click", function () {
    let newEndorsement = inputEl.value;
    push(endorsementsInDb, newEndorsement);
})

function appendEndorsement(newItem) {
    let itemIndex = newItem[0];
    let itemValue = newItem[1];
    let endorsementToDom = document.createElement("p");
    endorsementToDom.textContent = itemValue;
    endorsementsEl.append(endorsementToDom);
}



onValue(endorsementsInDb, function (snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i];
            appendEndorsement(currentEndorsement);
        }
    } else {
        endorsementsEl.innerHTML = "You have no endorsements yet 😔"
    }
})