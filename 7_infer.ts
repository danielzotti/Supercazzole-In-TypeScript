// introdurre nuove type variables, estrarre tipi

type vicesindaco<T> =
    // se T ha almeno...
    T extends { a: any, b: any } ? T["a"] | T["b"] : never // lookup

type vc1 = vicesindaco<2>
type vc2 = vicesindaco<{ a: 3, b: "ciaone" }>

// tipo, non object literal, non serve as const per restringere
// type test = { a:3, b:"ciaone" }

// TS di base deve/può calcolare il tipo di 'a' e di 'b',
// grazie ad infer possiamo estrarlo,
// memorizzarlo in una type variable e utilizzarlo easy
type vicesindaco2<T> =
    T extends { a: infer A, b: infer B } ? A | B : never

type vc21 = vicesindaco2<2>
type vc22 = vicesindaco2<{ a: 3, b: "ciaone" }>


// infer del tipo contenuto nell'array
type ElementType<T> = T extends Array<infer E> ? E : never

const ns2 = [1,"ciao",3]
type el1 = ElementType<typeof ns2>



// --------------------------------------------------------



// Estrarre tipi dai posti più bizzarri: fatto ✓

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters_<T extends (...args: any) => any> // guardia aggiuntiva
    = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters_<T extends new (...args: any) => any>
    = T extends new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType_<T extends (...args: any) => any>
    = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType_<T extends new (...args: any) => any>
    = T extends new (...args: any) => infer R ? R : any;
