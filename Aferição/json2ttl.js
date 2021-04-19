const data = require('./dataset.json')
const fs = require('fs')

let mapa = data.mapaPagamentos
let movimentos = data.movimentos
let fracoes = data.fracoes

let entidades = []

let getFracaoByDesc = (desc) => {
    let ret=null
    fracoes.forEach(elem => {
        if(elem.Descricao == desc)
            ret = elem.Fracao
    })
    return ret
}

movimentos.forEach(mov => {
    if(!getFracaoByDesc(mov.Entidade))
        entidades.push(mov.Entidade)
})

// ADD ENTIDADES
let addEntidade = (entidade) => {
    let ent = `### nuno-aac.github.io/ontologias/condominio#${entidade}
:${entidade}  rdf:type owl:NamedIndividual ,
        :Entidade .
        
`
    fs.appendFileSync('./inds.ttl',ent)
}

entidades.forEach(elem => {
    addEntidade(elem)
})

// ADD FRACOES
let addFracao = (fracao) => {
    let frac = `### nuno-aac.github.io/ontologias/condominio#${fracao.Fracao}
:${fracao.Fracao}  rdf:type owl:NamedIndividual ,
        :Fracao ;
    :permilagem "${fracao.Permilagem}" ;
    :mensalidade "${fracao.Mensalidade}" ;
    :descricao "${fracao.Descricao}" .
        
`
    fs.appendFileSync('./inds.ttl', frac)
}

fracoes.forEach(elem => {
    addFracao(elem)
})


// ADD FRACOES
let addMovimento = (movimento) => {
    let entidade = getFracaoByDesc(movimento.Entidade) != null ? getFracaoByDesc(movimento.Entidade) : movimento.Entidade
    let movi = `### nuno-aac.github.io/ontologias/condominio#${movimento.Numero}
:${movimento.Numero}  rdf:type owl:NamedIndividual ,
        :Movimento ;
    :tipoMovimento "${movimento.Tipo}" ;
    :dataMovimento "${movimento.Data}" ;
    :descricaoMovimento "${movimento.Descricao}" ;
    :valorMovimento "${movimento.Valor}" ;
    :associadoA :${entidade} .
        
`
    fs.appendFileSync('./inds.ttl', movi)
}

movimentos.forEach(elem => {
    addMovimento(elem)
})
