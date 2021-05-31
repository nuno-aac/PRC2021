var gdb = require('./graphdb')
var  fs = require('fs')


let constructAdd = query => gdb.execQuery(query).then(dados => {
    gdb.execTransaction(`
        INSERT DATA {
            ${dados.data}
        }
    `)
})
.catch(e => console.log(e))


//1
constructAdd(`CONSTRUCT {
    ?filho1 :eIrmao ?filho2
} WHERE {
   	?filho1 :temProgenitor ?pai .
    ?pai :eProgenitorDe ?filho2
    FILTER (?filho1 != ?filho2)
} `)

//2
constructAdd(`CONSTRUCT {
    ?filho :eBisavo ?bisavo
} WHERE {
   	?filho :temProgenitor ?pais .
    ?pais :temProgenitor ?avos .
    ?avos :temPai ?bisavo
} `)

//3
constructAdd(`CONSTRUCT {
    ?descendente :eDescendente ?pessoa
} WHERE {
   	?pessoa :eProgenitorDe+ ?descendente
} `)

//4
constructAdd(`CONSTRUCT {
    ?primo1 :ePrimo ?primo2
} WHERE {
   	?primo1 :temProgenitor ?pai1 .
    ?pai1 :temProgenitor ?avo .
    ?avo :eProgenitorDe ?pai2 .
    ?pai2 :eProgenitorDe ?primo2
    FILTER (?primo1 != ?primo2)
}
`)

//5
constructAdd(`CONSTRUCT {
    ?mae :sexo "F".
    ?pai :sexo "M"
} WHERE {
    OPTIONAL{ ?p :temPai ?pai }
    OPTIONAL{ ?p :temMae ?mae }
} `)

//6
constructAdd(`CONSTRUCT {
    :José_Carlos_Leite_Ramalho_1967 :temRelacaoCom ?rel
} WHERE {
    :José_Carlos_Leite_Ramalho_1967 :relDireta+ ?rel
} `)
