import { sourceT } from "./5_mappedTypes"

// abbiamo visto iterazione, ora selezione

type isString<T> = T extends string ? true : false; // !!! tipi !!!
// extends === è assegnabile? (subtype)

type t1 = isString<3>
type t2 = isString<"3">
type t3 = isString<{ a: 56 }>
type t4 = isString<["c"]>



// ------------------------------------------------



// Naked type parameters: a sx dell'extend, niente box
type NakedUsage<T> = T extends string ? true : false;


// Vestited type parameter: cosa non è naked? Si fa prima così :D

// T boxata all'interno della tupla
type WrappedUsage1<T> = [T] extends [string] ? true : false;

// T boxata
type UselessWrapper<T> = T
type WrappedUsage2<T> =
    UselessWrapper<T> extends UselessWrapper<string> ? true : false;

// T usata a dx dell'extends
type ReversedUsage<T> = 5 extends T ? true : false;



// ------------------------------------------------



// !!! T è naked, U no !!!
type Without<T, U> = T extends U ? never : T
// never: bottom type -> nessun valore ha tipo never

type withorwithoutyouuuuuuuuuuuuu =
    Without<string | number | boolean, boolean>

// XXXXX
// (string | number | boolean) extends boolean
// ? never
// : (string | number | boolean)
// XXXXX


// distribution over union SOLO SE il type parameter è naked

/*

    1)  Without<string | number | boolean, boolean>


    2)  Without<string, boolean>
        | // <- union
        Without<number, boolean>
        | // <- union
        Without<boolean, boolean>


    3)  (string extends boolean ? never : string)
        |
        (number extends boolean ? never : number)
        |
        (boolean extends boolean ? never : boolean)

    4)  string
        |
        number
        |
        never

    non esistono valori di tipo never,
    è inutile tenere il tipo nella union

    5) string | number (fai vedere)

*/



// ------------------------------------------------



// altri esempi di distribution over union

/**
 * Exclude null and undefined from T
 */
type NonNullable_<T> = T extends null | undefined ? never : T;

type nn = NonNullable<"2" | number | null>


/**
 * Exclude from T those types that are assignable to U
 */
// È il Without visto sopra
type Exclude_<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract_<T, U> = T extends U ? T : never;

// escludiamo chi estende a
type exclude = Exclude<"a" | "b" | "c", "a">
// escludiamo chi non estende a
type extract = Extract<"a" | "b" | "c", "a">



// estrarre un membro di una unione taggata (discriminated union)

type Actions =
    { type: "get", payload: string }
    |
    { type: "post", payload: { body: string } }

type PostAction = Extract<Actions, { type: "post" }>

/*

    1)  Extract<Actions, { type: "post"}>


    2)  // Action viene separato (distribution over union)

        Extract<{ type: "get", payload: string },
                { type: "post"}>
        | // <-- union
        Extract<{ type: "post", payload: { body: string } },
                { type: "post"}>


    3)  ({ type: "get", payload: string }
        extends { type: "post"}
        ? { type: "get", payload: string }
        : never)
        |
        ({ type: "post", payload: { body: string } }
        extends { type: "post" }
        ? { type: "post", payload: { body: string } }
        : never)

        // ricordare: extends === è assegnabile? (subtype)

    4)  never
        |
        { type: "post", payload: { body: string } }

    5) { type: "post", payload: { body: string } }

*/



// ------------------------------------------------



/**
 * Construct a type with the properties of T except for those in type K.
 */

// !!! T non è naked !!!
type Omit_<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// escludo delle chiavi, prendo ciò che rimane


type res7 = Omit<sourceT, "a" | "c">

/*

    1)  Omit<sourceT, "a" | "c">


    2)  Exclude<keyof sourceT, "a" | "c">
        Exclude< "a" | "b" | "c", "a" | "c"> // qua avviene la dou

        "b"


    3)  Pick<sourceT, "b">
        // omettere "a" e "c" significa prendere solo "b"


    4) { b: number }

*/