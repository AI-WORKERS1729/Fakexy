// js/uk-generator.js

// --- UK Location Data (Simplified) ---
const ukLocationData = {
    "England": {
        cities: [
            { name: "London", postcodeArea: ["SW", "WC", "EC", "N", "E", "SE", "W", "NW"], areaCodes: ["020"], county: "Greater London" },
            { name: "Manchester", postcodeArea: ["M"], areaCodes: ["0161"], county: "Greater Manchester" },
            { name: "Birmingham", postcodeArea: ["B"], areaCodes: ["0121"], county: "West Midlands" },
            { name: "Liverpool", postcodeArea: ["L"], areaCodes: ["0151"], county: "Merseyside" }
        ],
        latRange: [49.9, 55.8], lngRange: [-6.4, 1.8], // Approximate for England
        genericAreaCodes: ["0113", "0114", "0115", "0117", "0118"] // Leeds, Sheffield, Nottingham, Bristol, Reading
    },
    "Scotland": {
        cities: [
            { name: "Edinburgh", postcodeArea: ["EH"], areaCodes: ["0131"], county: "Midlothian (traditional)" },
            { name: "Glasgow", postcodeArea: ["G"], areaCodes: ["0141"], county: "Lanarkshire (traditional)" }
        ],
        latRange: [54.6, 60.9], lngRange: [-7.5, -0.7], // Approximate for Scotland
        genericAreaCodes: ["01224", "01382", "01738"] // Aberdeen, Dundee, Perth
    },
    "Wales": {
        cities: [
            { name: "Cardiff", postcodeArea: ["CF"], areaCodes: ["029"], county: "South Glamorgan (traditional)" },
            { name: "Swansea", postcodeArea: ["SA"], areaCodes: ["01792"], county: "West Glamorgan (traditional)" }
        ],
        latRange: [51.3, 53.5], lngRange: [-5.4, -2.6], // Approximate for Wales
        genericAreaCodes: ["01633", "01248"] // Newport, Bangor
    },
    "Northern Ireland": {
        cities: [
            { name: "Belfast", postcodeArea: ["BT"], areaCodes: ["028"], county: "Antrim / Down (traditional)" }
        ],
        latRange: [54.0, 55.4], lngRange: [-8.2, -5.4], // Approximate for NI
        genericAreaCodes: ["028"] // Most NI numbers use 028 prefix
    }
};
const ukRegionNames = Object.keys(ukLocationData);

// UK Street Data (Simplified)
const ukStreetNames = ["High Street", "Station Road", "Main Street", "Park Road", "Church Street", "London Road", "Victoria Road", "Green Lane", "Manor Road", "Queens Road", "The Green", "Abbey Road"];
const ukStreetSuffixes = ["Road", "Street", "Lane", "Avenue", "Drive", "Close", "Gardens", "Way", "Crescent", "Hill", "Park"]; // Often 'Road' or 'Street' is part of the name

// UK Names (using global lists from helpers.js, but you could add UK-specific ones here or in helpers.js)
// For example, in helpers.js, ensure names like Oliver, Olivia, George, Amelia, Harry, Isla, etc. are present for UK feel.
// And surnames like Smith, Jones, Williams, Taylor, Brown.

// --- UK Data Generation Functions ---
function generateUKAddress() {
    const selectedRegionName = getRandomElement(ukRegionNames);
    const regionData = ukLocationData[selectedRegionName];
    const selectedCityData = getRandomElement(regionData.cities);

    const buildingNumber = getRandomNumber(1, 350);
    const streetName = getRandomElement(ukStreetNames);
    // Suffix might be part of the name itself (e.g., Park Road), or we can append one
    const streetSuffixChoice = Math.random() > 0.7 ? "" : " " + getRandomElement(ukStreetSuffixes);


    // UK Postcode: e.g., SW1A 1AA or M1 1AE. Outward + Inward.
    // Outward: 2-4 chars (Area + District: AN, ANN, AAN, AANN, ANA, AANA)
    // Inward: 3 chars (Sector + Unit: NAA)
    let outwardCode = getRandomElement(selectedCityData.postcodeArea); // Uses the city's postcode area
    if (outwardCode.length === 1) { // e.g., M, B, G
        outwardCode += getRandomNumber(1, 9); // M1, B2, G3
        if (Math.random() > 0.5 && outwardCode.length < 4) { // Sometimes another letter or number
             outwardCode += Math.random() > 0.5 ? getRandomLetter() : getRandomNumber(0,9).toString();
        }
    } else if (outwardCode.length === 2 && /^[A-Z]{2}$/.test(outwardCode)) { // e.g., SW, WC, EH
        outwardCode += getRandomNumber(1, 9); // SW1, WC2, EH3
         if (Math.random() > 0.5 && outwardCode.length < 4) { // Sometimes another letter
             outwardCode += getRandomLetter();
        }
    }
    outwardCode = outwardCode.slice(0,4); // Ensure max length

    const inwardCode = `${getRandomNumber(0,9)}${getRandomLetter()}${getRandomLetter()}`;
    const postcode = `${outwardCode} ${inwardCode}`;

    let areaCode = "";
    if (selectedCityData.areaCodes && selectedCityData.areaCodes.length > 0) {
        areaCode = getRandomElement(selectedCityData.areaCodes);
    } else if (regionData.genericAreaCodes && regionData.genericAreaCodes.length > 0) {
        areaCode = getRandomElement(regionData.genericAreaCodes);
    } else {
        areaCode = "0" + getRandomDigits(getRandomNumber(2,4)); // Fallback
    }
    const phoneLocalPart = getRandomDigits(getRandomNumber(6, 7));

    const latitude = getRandomFloat(regionData.latRange[0], regionData.latRange[1], 6);
    const longitude = getRandomFloat(regionData.lngRange[0], regionData.lngRange[1], 6);

    updateTextContent('uk-street', `${buildingNumber} ${streetName}${streetSuffixChoice}`);
    updateTextContent('uk-city', selectedCityData.name);
    updateTextContent('uk-postcode', postcode.toUpperCase());
    updateTextContent('uk-county', selectedCityData.county || ""); // County is optional
    updateTextContent('uk-phone', `${areaCode} ${phoneLocalPart}`);
    updateTextContent('uk-country', 'United Kingdom');
    updateTextContent('uk-latitude', latitude.toString());
    updateTextContent('uk-longitude', longitude.toString());
}

function generateUKPerson() {
    const gender = getRandomElement(genders); // From helpers.js
    let firstName;
    // Using global name lists. Add UK-specific names to helpers.js or define here for more accuracy.
    if (gender === "Male") { firstName = getRandomElement(maleFirstNames); }
    else if (gender === "Female") { firstName = getRandomElement(femaleFirstNames); }
    else { firstName = neutralFirstNames.length > 0 ? getRandomElement(neutralFirstNames) : getRandomElement(maleFirstNames.concat(femaleFirstNames)); }
    
    const lastName = getRandomElement(lastNames); // From helpers.js
    const birthYear = getRandomNumber(1950, 2005);
    const birthMonth = getRandomNumber(1, 12).toString().padStart(2, '0');
    const birthDay = getRandomNumber(1, 28).toString().padStart(2, '0');
    
    // National Insurance Number (NINO) - Fictional format like QQ 12 34 56 A
    // Valid prefixes generally don't include D, F, I, Q, U, or V as the first or second letter.
    // Letters O, S, Z are not used as the second letter.
    const niPrefixChars = "ABCEGHJKLMNOPRTWXYZ";
    const niPrefix1 = getRandomElement(niPrefixChars.split(''));
    const niPrefix2 = getRandomElement(niPrefixChars.replace('O','').replace('S','').replace('Z','').split(''));

    const niNumber = `${niPrefix1}${niPrefix2} ${getRandomDigits(2)} ${getRandomDigits(2)} ${getRandomDigits(2)} ${getRandomLetter()}`;

    updateTextContent('uk-fullname', `${firstName} ${lastName}`);
    updateTextContent('uk-gender', gender);
    updateTextContent('uk-birthday', `${birthDay}/${birthMonth}/${birthYear}`); // Common UK date format DD/MM/YYYY
    updateTextContent('uk-ni', niNumber);
}

function generateUKCreditCard() { // Reuses global ccBrands and logic
    const brandInfo = getRandomElement(ccBrands);
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

    updateTextContent('uk-cc-brand', brandName);
    updateTextContent('uk-cc-number', formattedCcNumber);
    updateTextContent('uk-cc-expire', `${expireMonth}/${expireYear.toString().slice(-2)}`); // MM/YY
    updateTextContent('uk-cc-cvv', cvv);
}

// Wrapper function for UK data
function generateAllUKData() {
    generateUKAddress();
    generateUKPerson();
    generateUKCreditCard();
}