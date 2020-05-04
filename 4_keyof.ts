const awsObj = {
    niceProp: "greatStringValue",
    brilliantSubObj: {
        answer: 42,
        toWhat: ["life", "universe", "everything"]
    }
} as const

type awsObjT = typeof awsObj


// keyof: otteniamo un tipo formato dalla union di
// tutte le chiavi (shallow) di un oggetto
// solitamente "sottoforma di stringhe"



// agisce su un tipo (usato con i tipi degli oggetti)
// -> prende le chiavi ("1° livello")
// -> "cast a tipo stringa"
// -> restituisce una union con esse

type awsObjTKeyof = keyof awsObjT



// -----------------------------------------------




const ex1 = [1, 2, 3] // as const
type ex1 = keyof (typeof ex1);




// -----------------------------------------------


// la prima supercazzola :D
function get<
    O extends object,
    K extends keyof O // keyof O union delle chaivi di O
>(obj: O, key: K): O[K] { // <-- lookup coi generics

    // type safe e type correct (tipo di ritorno allineato)
    return obj[key]
}

// key check, tipo di ritorno corretto
const ex2 = get(awsObj, "niceProp")
type ex2 = typeof ex2



// -----------------------------------------------



// K ci serve per sapere, al type level,
// quale chiave abbiamo usato
// altrimenti il tipo del risultato
// non è sufficientemente ristretto

// keyof O è la union -> accesso in contemporanea
function get2<
    O extends object
>(obj: O, key: keyof O): O[keyof O] {
    return obj[key]
}

const ex3 = get2(awsObj, "niceProp") // <-- key check

