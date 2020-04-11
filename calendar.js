let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

let daysShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    /*
     * Insert week day short name into the header
     * of the table conatining the calendar
     */
    let calendarTableHead = document.getElementById("calendar-head");
    calendarTableHead.innerHTML = ""; // clear the head for month navigation

    let weekDaysTr = document.createElement("tr");

    for (let day = 0; day < daysShortNames.length; day++) {
        const insertTh = document.createElement("th");
        const dayNameText = document.createTextNode(daysShortNames[day]);
        insertTh.appendChild(dayNameText);
        weekDaysTr.appendChild(insertTh);
    }

    calendarTableHead.appendChild(weekDaysTr);

    /*
     * Insert day number into de table body
     */
    let calendarTableBody = document.getElementById("calendar-body");

    calendarTableBody.innerHTML = ""; // clear the table for month navigation

    monthAndYear.innerHTML = months[month] + " " + year;

    // TODO: Create cells for days
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let weekRow = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let dayCell = document.createElement("td");
                let dayNumber = document.createTextNode("");
                dayCell.appendChild(dayNumber);
                weekRow.appendChild(dayCell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let dayCell = document.createElement("td");
                let dayNumber = document.createTextNode(date.toString());
                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    dayCell.classList.add("bg-info");
                } // color today's date
                dayCell.appendChild(dayNumber);
                weekRow.appendChild(dayCell);
                date++;
            }
        }
        calendarTableBody.appendChild(weekRow);
    }
}
