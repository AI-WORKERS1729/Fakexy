// js/de-generator.js

// --- German Location Data (Simplified) ---
const deLocationData = {
    "Bavaria (Bayern)": {
        abbr: "BY",
        cities: [
            { name: "Munich (München)", plzPrefixes: ["80", "81"], areaCodes: ["089"] },
            { name: "Nuremberg (Nürnberg)", plzPrefixes: ["90", "91"], areaCodes: ["0911"] }
        ],
        latRange: [47.2, 50.5], lngRange: [9.0, 13.8],
        genericAreaCodes: ["0821", "0941", "0931"] // Augsburg, Regensburg, Würzburg
    },
    "Berlin": {
        abbr: "BE",
        cities: [
            { name: "Berlin", plzPrefixes: ["10", "12", "13", "14"], areaCodes: ["030"] }
        ],
        latRange: [52.3, 52.7], lngRange: [13.0, 13.8],
        genericAreaCodes: ["030"]
    },
    "Hamburg": {
        abbr: "HH",
        cities: [
            { name: "Hamburg", plzPrefixes: ["20", "21", "22"], areaCodes: ["040"] }
        ],
        latRange: [53.3, 53.7], lngRange: [9.7, 10.3],
        genericAreaCodes: ["040"]
    },
    "North Rhine-Westphalia (Nordrhein-Westfalen)": {
        abbr: "NW",
        cities: [
            { name: "Cologne (Köln)", plzPrefixes: ["50", "51"], areaCodes: ["0221"] },
            { name: "Düsseldorf", plzPrefixes: ["40"], areaCodes: ["0211"] },
            { name: "Dortmund", plzPrefixes: ["44"], areaCodes: ["0231"] }
        ],
        latRange: [50.3, 52.5], lngRange: [5.8, 9.5],
        genericAreaCodes: ["0201", "0234", "0208"] // Essen, Bochum, Oberhausen
    }
};
const deStateNames = Object.keys(deLocationData);

// German Street Data (Simplified)
const deStreetNames = ["Hauptstraße", "Bahnhofstraße", "Schillerstraße", "Goethestraße", "Marktplatz", "Bergstraße", "Lindenallee", "Kirchplatz", "Schulweg", "Rosenweg", "Mozartstraße", "Waldweg"];
const deStreetSuffixes = ["straße", "weg", "allee", "platz", "gasse", "ring"]; // Often integrated or 'Str.'/'Weg'

// German Names (Very simplified sample from search results)
// For a real app, these lists would be much more extensive.
// These are now expected to be defined in helpers.js for broader use,
// but if you want DE-specific names, you'd define them here and use them below.
// For this example, we'll assume the global name lists in helpers.js are diverse enough
// or you'd add more German names there.

// --- German Data Generation Functions ---
function generateDEAddress() {
    const selectedStateName = getRandomElement(deStateNames);
    const stateData = deLocationData[selectedStateName];
    const selectedCityData = getRandomElement(stateData.cities);

    const streetName = getRandomElement(deStreetNames);
    // German addresses often just have Straße or Weg as part of the name or implied.
    // Sometimes, an explicit suffix is not needed if the street name itself implies it (e.g., Lindenallee)
    const streetNumber = getRandomNumber(1, 250);

    // PLZ (Postleitzahl): 5 digits
    let plz = "";
    if (selectedCityData.plzPrefixes && selectedCityData.plzPrefixes.length > 0) {
        const prefix = getRandomElement(selectedCityData.plzPrefixes);
        plz = prefix + getRandomDigits(5 - prefix.length);
    } else {
        plz = getRandomDigits(5); // Fallback
    }

    // Area Code (Vorwahl)
    let areaCode = "";
    if (selectedCityData.areaCodes && selectedCityData.areaCodes.length > 0) {
        areaCode = getRandomElement(selectedCityData.areaCodes);
    } else if (stateData.genericAreaCodes && stateData.genericAreaCodes.length > 0) {
        areaCode = getRandomElement(stateData.genericAreaCodes);
    } else {
        areaCode = "0" + getRandomDigits(getRandomNumber(2, 4)); // Generic Vorwahl starts with 0
    }
    const phoneLocalPart = getRandomDigits(getRandomNumber(6, 8));

    const latitude = getRandomFloat(stateData.latRange[0], stateData.latRange[1], 6);
    const longitude = getRandomFloat(stateData.lngRange[0], stateData.lngRange[1], 6);

    updateTextContent('de-street', `${streetName} ${streetNumber}`);
    updateTextContent('de-plz', plz);
    updateTextContent('de-city', selectedCityData.name);
    updateTextContent('de-state', `${selectedStateName} (${stateData.abbr})`);
    updateTextContent('de-phone', `${areaCode} / ${phoneLocalPart}`); // Common display format
    updateTextContent('de-country', 'Germany (Deutschland)');
    updateTextContent('de-latitude', latitude.toString());
    updateTextContent('de-longitude', longitude.toString());
}

function generateDEPerson() {
    const gender = getRandomElement(genders); // From helpers.js
    let firstName;
    // Using global name lists from helpers.js.
    // You could define deMaleFirstNames, deFemaleFirstNames etc. here for more specificity.
    if (gender === "Male") { firstName = getRandomElement(maleFirstNames); }
    else if (gender === "Female") { firstName = getRandomElement(femaleFirstNames); }
    else { firstName = neutralFirstNames.length > 0 ? getRandomElement(neutralFirstNames) : getRandomElement(maleFirstNames.concat(femaleFirstNames)); }
    
    const lastName = getRandomElement(lastNames); // From helpers.js (add German names there or here)
    const birthYear = getRandomNumber(1950, 2005);
    const birthMonth = getRandomNumber(1, 12).toString().padStart(2, '0');
    const birthDay = getRandomNumber(1, 28).toString().padStart(2, '0');
    
    // Steueridentifikationsnummer (Tax ID) - 11 digits, fictional format
    const taxId = `${getRandomDigits(3)} ${getRandomDigits(3)} ${getRandomDigits(3)} ${getRandomDigits(2)}`;

    updateTextContent('de-fullname', `${firstName} ${lastName}`);
    updateTextContent('de-gender', gender);
    updateTextContent('de-birthday', `${birthDay}.${birthMonth}.${birthYear}`); // Common German date format DD.MM.YYYY
    updateTextContent('de-taxid', taxId);
}

function generateDECreditCard() { // Reuses global ccBrands and logic
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

    updateTextContent('de-cc-brand', brandName);
    updateTextContent('de-cc-number', formattedCcNumber);
    updateTextContent('de-cc-expire', `${expireMonth}/${expireYear.toString().slice(-2)}`); // MM/YY
    updateTextContent('de-cc-cvv', cvv);
}

// Wrapper function for DE data
function generateAllDEData() {
    generateDEAddress();
    generateDEPerson();
    generateDECreditCard();
}