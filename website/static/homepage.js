import {weekdayStrFromNo, pythonToJSDay} from "./utils.js";

function toggleHabitDetails() {
    var detailsDiv = document.getElementsByClassName("habit-details")[0];
    if (detailsDiv.classList.contains("hidden")) {
        detailsDiv.classList.remove("hidden");
        detailsDiv.classList.add("open");
    } else {
        detailsDiv.classList.add("hidden");
        detailsDiv.classList.remove("open");
    }
}

function openProfileMenu() {
    var profileMenu = document.getElementById("profile-menu");
    profileMenu.classList.remove("hidden");
    profileMenu.classList.add("visible");
}

function closeProfileMenu() {
    var profileMenu = document.getElementById("profile-menu");
    profileMenu.classList.remove("visible");
    profileMenu.classList.add("hidden");
}

document.querySelector('.menu-trigger').addEventListener('click', function() {
    document.getElementById('sideMenu').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('visible');
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
});

function openHabitInfo(event) {
    var currentDiv = event.currentTarget;
    var detailsDiv = currentDiv.getElementsByClassName("habit-details")[0];
    if (detailsDiv.classList.contains("hidden")) {
        detailsDiv.classList.remove("hidden");
        detailsDiv.classList.add("open");
    } else {
        detailsDiv.classList.add("hidden");
        detailsDiv.classList.remove("open");
    }
}

function displayHabitData(habitDiv, habitData) {
    habitDiv.querySelector(".habit-title").textContent = habitData.name;
    habitDiv.querySelector(".habit-notes").textContent = habitData.notes;

    const weekDiv = habitDiv.querySelector(".week");
    const dayDivs = weekDiv.querySelectorAll(".day");
    dayDivs.forEach(
        dayDiv => {
            dayDiv.style.display = "none";
        }
    )

    // Display only days which are part of the habit
    fetch(`/get_weekly_completion?habit_id=${habitData.id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const keys = Object.keys(data);
        // Handle the days completion display
        keys.forEach(
            dayNo => {
                let dayDiv = weekDiv.querySelector(`.${weekdayStrFromNo(dayNo)}`);
                dayDiv.style.display = "flex";
                if (data[dayNo] == true) {
                    dayDiv.classList.add("completed");
                }
                else if (data[dayNo] == false) {
                    dayDiv.classList.add("missed");
                }
                else if (pythonToJSDay(dayNo) == new Date().getDay()) {
                    dayDiv.classList.add("today");
                }
                else {
                    dayDiv.classList.remove("completed", "missed", "today");
                }
            }
        )
    })
}


export function createHabitDiv(habitData) {
    const originalDiv = document.getElementsByClassName("card")[0];
    const clonedDiv = originalDiv.cloneNode(true);
    const contentDiv = document.getElementById("content");
    clonedDiv.onclick = openHabitInfo
    clonedDiv.style.display = "block";

    displayHabitData(clonedDiv, habitData)

    contentDiv.appendChild(clonedDiv);
}


function displayAllHabits() {
    console.log('here')
    // Remove all cards
    const cards = document.getElementsByClassName("card");
    for (let i=1; i<cards.length; i++) { // Spare the first invisible card to use as template
        habitsDiv.remove(cards[i]);
    }

    fetch("/get_all_habits")
    .then(response => response.json())
    .then(habits => {
        for (let habit of habits) {
            createHabitDiv(habit);
        }
    })
}

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        const li = document.createElement('li');
        li.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed');
        });
        
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        taskList.appendChild(li);

        taskInput.value = '';
    }
});




document.addEventListener('DOMContentLoaded', displayAllHabits);