"use strict";
const time = document.querySelector(".time");

const apiUrl = "https://kaaryar0506reactblog.liara.run/current/time";

timeSection();
getTime();
function timeSection() {
  time.innerHTML = `
                    <p class="time__clock"></p>
                    <span class="time-date__shamsi"> </span>
                    <span class="time-date__shamsi"> </span>
                    <div class="time-date__division">
                    <p class="time-date__ghamari"></p>
                    <p></p>
                     </div>
                    <div class="time__selection">
                        <select name="timer" id="timer">
                            <option value="timer" selected>تایمر</option>
                        </select> 
                        <select name="oghat" id="oghat">
                            <option value="oghat" selected>اوقات شرعی</option>
                        </select>
                    </div>
    `;
}

async function getTime() {
  const response = await fetch(apiUrl);
  let data = await response.json();
  currentTime(data.current);
  shamsi(data.shamsi.dayInMonth, data.shamsi.month);
  changeDate(data.miladi.dayInMonth, data.miladi.month, data.miladi.year, 1);
  changeDate(
    data.islamicHijri.dayInMonth,
    data.islamicHijri.month,
    data.islamicHijri.year,
    0
  );
}

function currentTime(current) {
  const date = new Date(current);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;
  time.firstElementChild.innerHTML = formattedTime;
}

function shamsi(day, month) {
  time.children[1].innerHTML = day;
  time.children[2].innerHTML = month;
}
function changeDate(day, month, year, i) {
  const formattedTime = `${day}/ ${month} /${year}`;
  time.children[3].children[i].innerHTML = formattedTime;
}

setInterval(getTime, 1000)