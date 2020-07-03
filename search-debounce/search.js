let searchdb;

//init function
let init = function(){
    document.getElementById('search-text').addEventListener('input', debounceSearch);
    buildSearchKeywords();
    displaySearchdb();
}

// filtering terms in the list by using javascript startswith. 
let getResults = function(term) {
    if(term.length !== 0) {
    let result = [];

    result = searchdb.filter((item) => {
        if(item.startsWith(term)) return item;
    });

    return result;
    }
}

//  Debouncing executes a function based on a certain wait time that's being passed to improve the performance 
//  and avoid unnecessary user activities click-bombing.
let debounce = function(searchfn, wait, immediate) {
    var waitTime;
    return function() {
        var self = this, args = arguments;
        if (immediate && !waitTime) {
            searchfn.apply(self, args);
        }
        else {
            clearTimeout(waitTime);
            waitTime = setTimeout(() => {
                searchfn.apply(self, args);
            }, wait);
        }
    };
};

// reference: https://medium.com/better-programming/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc
// core search function that gets the list of Matched results and constructs ul/li elements on the DOM to display the results.
function searchfn(element) {
    let term = element.target.value;
    document.getElementById('search-term').innerText = `Your search term is ${term}`;

    let ul = document.getElementById('matches');

    let results = [];
    results = term.length > 1 ? getResults(term) : [];
    ul.innerHTML = '';
    if(results && results.length === 0) {
        let li = document.createElement('li');
        li.innerText = 'No Matches found or you have to enter more than 1 character';
        ul.appendChild(li);
    } else {
        results.forEach((value) => {
            let li = document.createElement('li');
            li.innerText = value;
            ul.appendChild(li);
        })
    }
}

let debounceSearch = debounce(searchfn, 500, false); //arguments: search function, debounce wait time, immediate : true/false
   
document.addEventListener('DOMContentLoaded', init);

// Creating Dummy List of Keywords to mimic API's response.
function buildSearchKeywords() {
    searchdb = ['java', 'javascript', 'json', 'job', 'engineering', 'interview', 'algorithms', 
                'questions', 'developer', 'applications', 'white-board', 'html', 'css', 
                'data structures', 'technology', 'resume', 'es6', 'js', 'full stack', 'web apps',
                'programming unit', 'gadgetcage', 'engineer', 'learning', 'salesforce', 'debug', 'bugs',
                'python', 'data science', 'analysis', 'system design', 'smts', 'software engineer', 'apple',
                'google', 'facebook', 'microsoft', 'netflix', 'coding', 'programming', 'coffee', 'tea', 'troubleshooting',
                'zoo', 'maths', 'magic', 'create', 'design', 'ui/ux', 'solve'];

    return searchdb;
}

// using sort and join functions to convert array into string and alphabetically sort them.
function displaySearchdb() {
    let searchDb = document.getElementById('searchdb');

    let searcharrToString = searchdb.sort().join(', ');

    searchDb.innerHTML += searcharrToString;

}
