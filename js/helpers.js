// --- Helper Functions (Randomizers) ---
function getRandomElement(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

function getRandomDigits(length) {
    let digits = '';
    for (let i = 0; i < length; i++) {
        digits += getRandomNumber(0, 9);
    }
    return digits;
}

function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// --- Helper function to update text and trigger animation ---
function updateTextContent(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.animationTimeout) { clearTimeout(element.animationTimeout); }
        element.textContent = value;
        element.classList.remove('data-updated');
        void element.offsetWidth; 
        element.classList.add('data-updated');
        element.animationTimeout = setTimeout(() => {
            element.classList.remove('data-updated');
        }, 700); // Match CSS animation duration (0.7s)
    }
}

// --- Shared Data (Names, Genders, CC Brands) ---
// These are made global by being in this file, which is loaded first (after HTML)
const maleFirstNames = ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Andrew", "Paul", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Timothy", "Ronald", "Jason", "Edward", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Gregory", "Alexander", "Patrick", "Frank", "Raymond", "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Jose", "Adam", "Nathan", "Henry", "Zachary", "Douglas", "Peter", "Kyle", "Noah", "Walter", "Ethan", "Jeremy", "Christian", "Keith", "Roger", "Terry", "Gerald", "Austin", "Sean", "Arthur", "Lawrence", "Jesse", "Dylan", "Bryan", "Joe", "Jordan", "Billy", "Bruce", "Albert", "Willie", "Gabriel", "Logan", "Alan", "Juan", "Wayne", "Elijah", "Randy", "Roy", "Vincent", "Ralph", "Eugene", "Russell", "Bobby", "Mason", "Philip", "Louis"];
const femaleFirstNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Sandra", "Margaret", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Dorothy", "Rebecca", "Sharon", "Laura", "Cynthia", "Kathleen", "Amy", "Angela", "Shirley", "Brenda", "Emma", "Anna", "Pamela", "Nicole", "Samantha", "Katherine", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Maria", "Heather", "Catherine", "Diane", "Olivia", "Julie", "Joyce", "Victoria", "Ruth", "Virginia", "Lauren", "Kelly", "Christina", "Joan", "Evelyn", "Judith", "Andrea", "Hannah", "Megan", "Cheryl", "Madison", "Teresa", "Sara", "Gloria", "Janice", "Ann", "Jean", "Alice", "Abigail", "Julia", "Sophia", "Martha", "Grace", "Judy", "Frances", "Rose", "Beverly", "Denise", "Marilyn", "Amber", "Danielle", "Brittany", "Diana", "Natalie", "Isabella", "Charlotte", "Jacqueline", "Theresa", "Monique", "Marie"];
const neutralFirstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Jessie", "Skyler", "Dakota", "Drew", "Remi", "Blake", "Kendall", "Sage", "Charlie", "Finley", "Emerson", "Avery", "Parker", "Quinn", "Rowan", "Cameron", "Hayden", "River", "Kai"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Martin", "Jackson", "Thompson", "White", "Lee", "Perez", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Tremblay", "Gagnon", "Roy"]; // Added some Canadian ones here too for broad use
const genders = ["Male", "Female", "Non-binary"];
const ccBrands = [
    { name: "Visa", prefixes: ["4"], length: 16 },
    { name: "Mastercard", prefixes: ["51", "52", "53", "54", "55", "2221", "2720"], length: 16 },
    { name: "American Express", prefixes: ["34", "37"], length: 15 },
    { name: "Discover", prefixes: ["6011", "644", "645", "646", "647", "648", "649", "65"], length: 16 }
];