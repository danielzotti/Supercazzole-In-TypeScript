// iteriamo sulle chiavi di un oggetto,
// mappiamo i tipi dei field


// ---------------------------------------



// in operator: K itera la union di chiavi
type antani = {
    [K in "tre" | 4 | 23 | "fragola"]: string // tipo (si può usare K)
}



// ---------------------------------------



const source = {
    a: 1,
    b: 2,
    c: 3 as const
}

export type sourceT = typeof source
type sourceTKeyof = keyof sourceT

// adesso giochiamo un po'

type resT1 = {
    [K in sourceTKeyof]: K
}

type resT2 = {
    [K in sourceTKeyof]: sourceT[K] // lookup
}

type resT3 = {
    [K in sourceTKeyof]?: sourceT[K] // lookup
}

type resT3bis = {
    [K in keyof resT3]-?: resT3[K] // <-- lookup su resT3
}

type resT4 = {
    readonly [K in sourceTKeyof]: sourceT[K]
}

type resT5 = {
    [K in sourceTKeyof]: sourceT[K] | string[]
}


// ---------------------------------------

// !!! underscore === provveduto out-of-the-box da TS !!!
// !!! nella vita reale, non serve usare l'underscore !!!

/**
 * Make all properties in T optional
 */
type Partial_<T> = { // prende T, usa keyof, itera, lookup in T
    [P in keyof T]?: T[P]; // lookup
};

/**
 * Make all properties in T required
 */
type Required_<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly_<T> = {
    readonly [P in keyof T]: T[P];
};



// ---------------------------------------



/**
 * From T, pick a set of properties whose keys are in the union K
 */
// extends non significa oneof ma subtype/assegnabilità
type Pick_<T, K extends keyof T> = {
    // itero, lookup liscio
    // ma di un subset delle key di T
    [P in K]: T[P];
};

type res6 = Pick<sourceT, "a" | "c">



/**
 * Construct a type with a set of properties K of type T
 */
type Record_<K extends keyof any, T> = {
    // K extends keyof any === una qualunque union di chiavi
    [P in K]: T;
};

type customRecordFromSourceT =
    Record<sourceTKeyof, { name: string, age: number }>
// es. mappe