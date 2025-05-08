// --- Canadian Location Data ---
const caLocationData = {
    "Ontario": {
        abbr: "ON",
        cities: [
            { name: "Toronto", fsa: ["M4P", "M5A", "M5G", "M5V", "M6G"], areaCodes: ["416", "647", "437"] },
            { name: "Ottawa", fsa: ["K1A", "K1P", "K1N", "K2P"], areaCodes: ["613", "343"] },
            { name: "Mississauga", fsa: ["L4W", "L5A", "L5B", "L5R"], areaCodes: ["905", "289", "365", "742"] },
            { name: "Hamilton", fsa: ["L8P", "L8R", "L9A", "L9C"], areaCodes: ["905", "289", "365", "742"] }
        ],
        latRange: [41.6, 56.9],
        lngRange: [-95.2, -74.3],
        genericAreaCodes: ["226", "249", "519", "548", "705", "807"]
    },
    "Quebec": {
        abbr: "QC",
        cities: [
            { name: "Montreal", fsa: ["H1A", "H2L", "H3A", "H3G", "H4A"], areaCodes: ["514", "438", "263"] },
            { name: "Quebec City", fsa: ["G1A", "G1K", "G1R", "G1S"], areaCodes: ["418", "581", "367"] },
            { name: "Laval", fsa: ["H7A", "H7L", "H7P", "H7S"], areaCodes: ["450", "579", "354"] }
        ],
        latRange: [45.0, 62.6],
        lngRange: [-79.8, -57.1],
        genericAreaCodes: ["819", "873", "468"]
    },
    "British Columbia": {
        abbr: "BC",
        cities: [
            { name: "Vancouver", fsa: ["V5K", "V6A", "V6B", "V6C", "V6E"], areaCodes: ["604", "778", "236", "672"] },
            { name: "Victoria", fsa: ["V8P", "V8R", "V8S", "V8T", "V8V"], areaCodes: ["250", "778", "236"] },
            { name: "Surrey", fsa: ["V3R", "V3S", "V3T", "V3W", "V4A"], areaCodes: ["604", "778", "236", "672"] }
        ],
        latRange: [48.3, 60.0],
        lngRange: [-139.1, -114.0],
        genericAreaCodes: ["250", "604", "778", "236", "672"]
    },
    "Alberta": {
        abbr: "AB",
        cities: [
            { name: "Calgary", fsa: ["T1Y", "T2A", "T2P", "T3A", "T3B"], areaCodes: ["403", "587", "825", "368"] },
            { name: "Edmonton", fsa: ["T5A", "T5E", "T5J", "T5K", "T5L", "T6A"], areaCodes: ["780", "587", "825", "368"] }
        ],
        latRange: [49.0, 60.0],
        lngRange: [-120.0, -110.0],
        genericAreaCodes: ["403", "780", "587", "825", "368"]
    }
};
const caProvinceNames = Object.keys(caLocationData);

// CA Specific Street Data
const caStreetNames = ["Queen", "King", "Main", "Yonge", "Rue Principale", "Chemin", "Robson", "Granville", "Jasper", "Whyte", "Portage", "Bloor", "Dundas", "Hastings", "Georgia", "St. Catherine", "University"];
const caStreetSuffixes = ["St", "Ave", "Rd", "Dr", "Blvd", "Cres", "Way", "Pl", "Terr", "Grv", "Prom", "Rue", "Ch.", "Line", "Espl"];


// --- Canadian Data Generation Functions ---
function generateCAAddress() {
    const selectedProvName = getRandomElement(caProvinceNames);
    const provData = caLocationData[selectedProvName];
    const selectedCityData = getRandomElement(provData.cities);
    const streetNum = getRandomNumber(1, 2500);
    const streetName = getRandomElement(caStreetNames);
    const streetSuffix = getRandomElement(caStreetSuffixes);
    let postalCode = "";
    const fsa = getRandomElement(selectedCityData.fsa) || `${getRandomLetter()}${getRandomNumber(0,9)}${getRandomLetter()}`;
    const ldu = `${getRandomNumber(0,9)}${getRandomLetter()}${getRandomNumber(0,9)}`;
    postalCode = `${fsa} ${ldu}`;
    let areaCode = "";
    if (selectedCityData.areaCodes && selectedCityData.areaCodes.length > 0) {
        areaCode = getRandomElement(selectedCityData.areaCodes);
    } else if (provData.genericAreaCodes && provData.genericAreaCodes.length > 0) {
        areaCode = getRandomElement(provData.genericAreaCodes);
    } else {
        areaCode = getRandomDigits(3);
    }
    const phonePart1 = getRandomDigits(3);
    const phonePart2 = getRandomDigits(4);
    const latitude = getRandomFloat(provData.latRange[0], provData.latRange[1], 6);
    const longitude = getRandomFloat(provData.lngRange[0], provData.lngRange[1], 6);

    updateTextContent('ca-street', `${streetNum} ${streetName} ${streetSuffix}`);
    updateTextContent('ca-city', selectedCityData.name);
    updateTextContent('ca-province', `${selectedProvName} (${provData.abbr})`);
    updateTextContent('ca-postal', postalCode);
    updateTextContent('ca-phone', `(${areaCode}) ${phonePart1}-${phonePart2}`);
    updateTextContent('ca-country', 'Canada');
    updateTextContent('ca-latitude', latitude.toString());
    updateTextContent('ca-longitude', longitude.toString());
}

function generateCAPerson() {
    const gender = getRandomElement(genders); // Uses global genders
    let firstName;
    if (gender === "Male") { firstName = getRandomElement(maleFirstNames); } // Uses global names
    else if (gender === "Female") { firstName = getRandomElement(femaleFirstNames); } // Uses global names
    else { firstName = neutralFirstNames.length > 0 ? getRandomElement(neutralFirstNames) : getRandomElement(maleFirstNames.concat(femaleFirstNames)); } // Uses global names
    
    const lastName = getRandomElement(lastNames); // Uses global names
    const birthYear = getRandomNumber(1950, 2005);
    const birthMonth = getRandomNumber(1, 12).toString().padStart(2, '0');
    const birthDay = getRandomNumber(1, 28).toString().padStart(2, '0');
    const sin = `${getRandomDigits(3)}-${getRandomDigits(3)}-${getRandomDigits(3)}`;

    updateTextContent('ca-fullname', `${firstName} ${lastName}`);
    updateTextContent('ca-gender', gender);
    updateTextContent('ca-birthday', `${birthYear}-${birthMonth}-${birthDay}`);
    updateTextContent('ca-sin', sin);
}

function generateCACreditCard() {
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

    updateTextContent('ca-cc-brand', brandName);
    updateTextContent('ca-cc-number', formattedCcNumber);
    updateTextContent('ca-cc-expire', `${expireMonth}/${expireYear}`);
    updateTextContent('ca-cc-cvv', cvv);
}

// Wrapper function for CA data
function generateAllCAData() {
    generateCAAddress();
    generateCAPerson();
    generateCACreditCard();
}