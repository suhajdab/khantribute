let adjectives = [
    "Happy",
    "Sad",
    "Smart",
    "Tired",
    "Green",
    "Purple",
    "Small",
    "Large",
    "Real",
    "Weird"
];

let nouns = [
    "Aardvark",
    "Buffalo",
    "Chair",
    "Dog",
    "Eagle",
    "Fountain",
    "Goat",
    "Human",
    "Igloo",
    "Juniper"
];

function generatePlaceholderNick() {
    return adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)];
}

export default generatePlaceholderNick;