const data = require('./dataset.json')
const fs = require('fs')

let cidades = data.cidades
let ligacoes = data.ligações

// ADD CIDADES
let addCidade = (cidade) => {
    let cid = `### nuno-aac.github.io/ontologias/cidades#${cidade.id}
:${cidade.id}  rdf:type owl:NamedIndividual ,
        :Cidade ;
    :nome "${cidade.nome}" ;
    :descricao "${cidade.descrição}" ;
    :populacao "${cidade.população}" ;
    :distrito "${cidade.distrito}" .
        
`
    fs.appendFileSync('./inds.ttl', cid)
}

let addLigacao = (ligacao) => {
    let lig = `### nuno-aac.github.io/ontologias/cidades#${ligacao.id}
:${ligacao.id}  rdf:type owl:NamedIndividual ,
        :Ligacao ;
    :distancia "${ligacao.distância}" ;
    :origem :${ligacao.origem} ;
    :destino :${ligacao.destino} .
        
`
    fs.appendFileSync('./inds.ttl', lig)
}

cidades.forEach(elem => {
    addCidade(elem)
})

ligacoes.forEach(elem => {
    addLigacao(elem)
})