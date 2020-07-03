var currYear = {};
var today = new Date();
currYear.date = today.getDate();
currYear.month = (today.getMonth() + 1);
currYear.year = today.getFullYear();

document.getElementById("age").onclick = function() {
    var name = getName();
    var date = getDob();
    
    var calculateAge = calcAge(date);
    
    var result = document.getElementById('result');

    result.style.display = "block";

    result.innerHTML = `Age of ${name} is ${calculateAge} years`;
}

document.getElementById("ageinDays").onclick = function() {
    var name = getName();
    var date = getDob();

    var calculateAgeinDays = calcAgeinDays(date);

    var result = document.getElementById('result');

    result.style.display = "block";

    result.innerHTML = `Age of ${name} in days is ${calculateAgeinDays} days`;
}

document.getElementById("reset").onclick = function() {
    document.getElementById('name').value = "";
    document.getElementById('userdob').value = new Date();
    document.getElementById('result').style.display = "none";
}

function getName() {
    return document.getElementById('name').value;
}

function getDob() {
    var date = new Date(document.getElementById('userdob').value);
    return date;
}

function calcAge(date) {
    var age = 0;

    var dob = {};
    dob.date = date.getDate();
    dob.month = date.getMonth() + 1;
    dob.year = date.getFullYear();

    age = currYear.year - dob.year;
    var mon = currYear.month - dob.month;
    if (mon < 0 || (mon === 0 && currYear.date < dob.date)) {
        age--;
    }

    return age;
}

function calcAgeinDays(date) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = today;
    const secondDate = date;

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return diffDays;
}

function init() {
}

document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("result").style.display = "none";
}, false);