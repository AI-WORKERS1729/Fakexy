// --- Structured US Location Data ---
const usLocationData = {
    "California": {
        abbr: "CA",
        cities: [
            { name: "Los Angeles", zipPrefixes: ["900", "901"], areaCodes: ["213", "310", "323", "424", "661", "747", "818"] },
            { name: "San Francisco", zipPrefixes: ["941"], areaCodes: ["415", "628"] },
            { name: "San Diego", zipPrefixes: ["919", "920", "921"], areaCodes: ["619", "858"] },
            { name: "Sacramento", zipPrefixes: ["942", "958"], areaCodes: ["916", "279"] }
        ],
        latRange: [32.5, 42.0],
        lngRange: [-124.4, -114.1],
        genericAreaCodes: ["209", "279", "341", "442", "530", "559", "650", "657", "707", "760", "805", "831", "909", "925", "949", "951"]
    },
    "New York": {
        abbr: "NY",
        cities: [
            { name: "New York City", zipPrefixes: ["100", "101", "102", "103", "104", "110", "111", "112", "113", "114", "116"], areaCodes: ["212", "718", "917", "347", "646", "929"] },
            { name: "Buffalo", zipPrefixes: ["142"], areaCodes: ["716"] },
            { name: "Rochester", zipPrefixes: ["146"], areaCodes: ["585"] },
            { name: "Albany", zipPrefixes: ["122"], areaCodes: ["518", "838"] }
        ],
        latRange: [40.5, 45.0],
        lngRange: [-79.8, -71.8],
        genericAreaCodes: ["315", "363", "516", "607", "631", "845", "914", "934"]
    },
    "Texas": {
        abbr: "TX",
        cities: [
            { name: "Houston", zipPrefixes: ["770", "772"], areaCodes: ["713", "281", "832", "346"] },
            { name: "Dallas", zipPrefixes: ["752", "753"], areaCodes: ["214", "469", "972", "945"] },
            { name: "Austin", zipPrefixes: ["733", "787"], areaCodes: ["512", "737"] },
            { name: "San Antonio", zipPrefixes: ["782"], areaCodes: ["210", "726"] }
        ],
        latRange: [25.8, 36.5],
        lngRange: [-106.6, -93.5],
        genericAreaCodes: ["254", "325", "361", "409", "430", "432", "806", "817", "903", "915", "936", "940", "956"]
    },
    "Florida": {
        abbr: "FL",
        cities: [
            { name: "Miami", zipPrefixes: ["331", "332"], areaCodes: ["305", "786"] },
            { name: "Orlando", zipPrefixes: ["328", "327"], areaCodes: ["407", "689", "321"] },
            { name: "Tampa", zipPrefixes: ["336"], areaCodes: ["813", "656"] },
            { name: "Jacksonville", zipPrefixes: ["322", "320"], areaCodes: ["904", "324"] }
        ],
        latRange: [24.5, 31.0],
        lngRange: [-87.6, -80.0],
        genericAreaCodes: ["239", "352", "386", "448", "561", "727", "754", "772", "850", "863", "941"]
    }
};
const usStateNames = Object.keys(usLocationData);

// US Specific Street Data
const usStreetNames = ["Main", "Oak", "Elm", "Pine", "Maple", "Cedar", "Washington", "Park", "Highland", "Willow Creek", "Lexington", "Peachtree", "Sunset", "Broadway", "Hollywood", "Lakeview", "Ridge", "Valley", "River", "Forest"];
const usStreetSuffixes = ["St", "Ave", "Rd", "Ln", "Dr", "Blvd", "Ct", "Pl", "Way", "Ter", "Cir", "Pkwy", "Run", "View", "Trail"];

// --- US Data Generation Functions ---
function generateUSAddress() {
    const selectedStateName = getRandomElement(usStateNames);
    const stateData = usLocationData[selectedStateName];
    const selectedCityData = getRandomElement(stateData.cities);
    const streetNum = getRandomNumber(1, 9999);
    const streetName = getRandomElement(usStreetNames);
    const streetSuffix = getRandomElement(usStreetSuffixes);
    let zip = "";
    if (selectedCityData.zipPrefixes && selectedCityData.zipPrefixes.length > 0) {
        const prefix = getRandomElement(selectedCityData.zipPrefixes);
        zip = prefix + getRandomDigits(5 - prefix.length);
    } else {
        zip = getRandomDigits(5);
    }
    let areaCode = "";
    if (selectedCityData.areaCodes && selectedCityData.areaCodes.length > 0) {
        areaCode = getRandomElement(selectedCityData.areaCodes);
    } else if (stateData.genericAreaCodes && stateData.genericAreaCodes.length > 0) {
        areaCode = getRandomElement(stateData.genericAreaCodes);
    } else {
        areaCode = getRandomDigits(3);
    }
    const phonePart1 = getRandomDigits(3);
    const phonePart2 = getRandomDigits(4);
    const latitude = getRandomFloat(stateData.latRange[0], stateData.latRange[1], 6);
    const longitude = getRandomFloat(stateData.lngRange[0], stateData.lngRange[1], 6);

    updateTextContent('us-street', `${streetNum} ${streetName} ${streetSuffix}`);
    updateTextContent('us-city', selectedCityData.name);
    updateTextContent('us-state', `${selectedStateName} (${stateData.abbr})`);
    updateTextContent('us-zip', zip);
    updateTextContent('us-phone', `(${areaCode}) ${phonePart1}-${phonePart2}`);
    updateTextContent('us-country', 'United States');
    updateTextContent('us-latitude', latitude.toString());
    updateTextContent('us-longitude', longitude.toString());
}

function generateUSPerson() {
    const gender = getRandomElement(genders); // Uses global genders from helpers.js
    let firstName;
    if (gender === "Male") { firstName = getRandomElement(maleFirstNames); } // Uses global names
    else if (gender === "Female") { firstName = getRandomElement(femaleFirstNames); } // Uses global names
    else { firstName = neutralFirstNames.length > 0 ? getRandomElement(neutralFirstNames) : getRandomElement(maleFirstNames.concat(femaleFirstNames)); } // Uses global names
    
    const lastName = getRandomElement(lastNames); // Uses global names
    const birthYear = getRandomNumber(1950, 2005);
    const birthMonth = getRandomNumber(1, 12).toString().padStart(2, '0');
    const birthDay = getRandomNumber(1, 28).toString().padStart(2, '0');
    const ssnPart1 = getRandomDigits(3);
    const ssnPart2 = getRandomDigits(2);
    const ssnPart3 = getRandomDigits(4);

    updateTextContent('us-fullname', `${firstName} ${lastName}`);
    updateTextContent('us-gender', gender);
    updateTextContent('us-birthday', `${birthYear}-${birthMonth}-${birthDay}`);
    updateTextContent('us-ssn', `${ssnPart1}-${ssnPart2}-${ssnPart3}`);
}

function generateUSCreditCard() {
    const brandInfo = getRandomElement(ccBrands); // Uses global ccBrands
    const brandName = brandInfo.name;
    let ccNumber = getRandomElement(brandInfo.prefixes);
    const numLength = brandInfo.length;
    while (ccNumber.length < numLength) { ccNumber += getRandomNumber(0,9); }
    ccNumber = ccNumber.slice(0, numLength);
    const currentYear = new Date().getFullYear();
    const expireMonth = getRandomNumber(1, 12).toString().padStart(2, '0');
    const expireYear = getRandomNumber(currentYear + 2, currentYear + 7);
    const cvvLength = brandName === "American Express" ? 4 : 3;
    const cvv = getRandomDigits(cvvLength);
    let formattedCcNumber = '';
    for (let i = 0; i < ccNumber.length; i += 4) {
        formattedCcNumber += ccNumber.substring(i, i + 4) + ' ';
    }
    formattedCcNumber = formattedCcNumber.trim();

    updateTextContent('us-cc-brand', brandName);
    updateTextContent('us-cc-number', formattedCcNumber);
    updateTextContent('us-cc-expire', `${expireMonth}/${expireYear}`);
    updateTextContent('us-cc-cvv', cvv);
}

// Wrapper function for US data
function generateAllUSData() {
    generateUSAddress();
    generateUSPerson();
    generateUSCreditCard();
}