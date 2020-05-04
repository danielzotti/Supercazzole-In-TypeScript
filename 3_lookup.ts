// LIBRI: keying-in

const awesomeObj = {
    niceProp: "greatStringValue",
    brilliantSubObj: {
        answer: 42,
        toWhat: ["life", "universe", "everything"]
    } as const // <-- notare
}

type awesomeObjT = typeof awesomeObj

const answer = awesomeObj.brilliantSubObj.answer;
// const answer2 = awesomeObj["brilliantSubObj"]["answer"]



// ----------------------------------------------------


// utilizzo sempre le chiavi

type answerT =
    awesomeObjT["brilliantSubObj"]["answer"]

type nicePropT = awesomeObjT["niceProp"]

type answerToWhatT =
    awesomeObjT["brilliantSubObj"]["answer" | "toWhat"]



// ----------------------------------------------------



// per quanto riguarda gli array...

const ns = [1, 2, 3, 4, 5] // as const

type ns0T = (typeof ns)[0] // <- lookup


// accediamo contemporaneamente a tutti i tipi
// degli elementi contenuti nell'array
type nsnT = (typeof ns)[number];

// as const -> union coi tipi dei 5 valori