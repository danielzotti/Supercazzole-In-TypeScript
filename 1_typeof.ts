// ----------------------------------------------


const awesomeObject = {
    niceProp: "greatStringValue",
    brilliantSubObj: {
        answer: 42,
        toWhat: ["life", "universe", "everything"]
    }
}

// typeof usato sull'oggetto TS, estrae il tipo
type awesomeObjectT = typeof awesomeObject



// ----------------------------------------------



// immutabile per TS
const anotherAwesomeObject = {
    niceProp: "greatStringValue",
    brilliantSubObj: {
        answer: 42,
        toWhat: ["life", "universe", "everything"]
    }
} as const // modificatore

// inferito tipo più strict possibile. che significa?
// -> valori - tipi >> 2

type anotherAwesomeObject = typeof anotherAwesomeObject