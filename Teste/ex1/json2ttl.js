const data = require('./emd.json')
const fs = require('fs')

console.log(data[0])

let modalidades = []
let clubes = []
let atletas = []


let getAtleta = ex => {
    let atleta = {}

    atleta.id = ex.nome.primeiro + '_' + ex.nome['último']
    atleta.nome = ex.nome.primeiro + ' ' + ex.nome['último']
    atleta.idade = ex.idade
    atleta.genero = ex['género']
    atleta.modalidade = ex.modalidade.replace('ã', 'a').replace('é', 'e')
    atleta.clube = ex.clube.replace(/ /g, '_').replace('ã', 'a')
    atleta.email = ex.email
    atleta.morada = ex.morada
    atleta.federado = ex.federado
    atleta.resultado = ex.resultado

    return atleta
}

data.forEach(elem => {
    if (!modalidades.includes(elem.modalidade))
        modalidades.push(elem.modalidade)
    if (!clubes.includes(elem.clube))
        clubes.push(elem.clube)
    
    let atleta = getAtleta(elem)
    if (!atletas.some(el => el.id == atleta.id))
        atletas.push(atleta)
})

console.log(modalidades)
console.log(clubes)
console.log(atletas.length)

// ADD EQUIPAS
let addClube = (clube) => {
    let clubeIRI = clube.replace(/ /g, '_')
    clubeIRI = clubeIRI.replace('ã', 'a')
    let cl = `### https://www.nuno-aac.github.io/ontologias/emd#${clubeIRI}
:${clubeIRI}  rdf:type owl:NamedIndividual ,
        :Clube .
        
`
    fs.appendFileSync('./inds.ttl', cl)
}

// ADD MODALIDADES
let addModalidade = (modalidade) => {
    let modalidadeIRI = modalidade.replace('ã', 'a')
    modalidadeIRI = modalidadeIRI.replace('é', 'e')
    let mod = `### https://www.nuno-aac.github.io/ontologias/emd#${modalidadeIRI}
:${modalidadeIRI}  rdf:type owl:NamedIndividual ,
        :Modalidade .
        
`
    fs.appendFileSync('./inds.ttl', mod)
}

// ADD EMDS
let addEMD = (emd) => {
    let atleta = getAtleta(emd)
    let exame = `### https://www.nuno-aac.github.io/ontologias/emd#${emd._id}
:${emd._id}  rdf:type owl:NamedIndividual ,
        :EMD ;
        :refereAtleta :${atleta.id} ;
        :dataEMD "${emd.dataEMD}" ;
        :resultado ${emd.resultado ? 1 : 0} .
        
`
    fs.appendFileSync('./inds.ttl', exame)
}

modalidades.forEach(elem => {
    addModalidade(elem)
})

clubes.forEach(elem => {
    addClube(elem)
})

data.forEach(elem => {
    addEMD(elem)
})



// ADD ATLETAS
let addAtleta = (atleta) => {
    let atl = `### https://www.nuno-aac.github.io/ontologias/emd#${atleta.id}
:${atleta.id}  rdf:type owl:NamedIndividual ,
        :Atleta ;
    :participaModalidade :${atleta.modalidade} ;
    :temClube :${atleta.clube} ;
    :isFederado ${atleta.isFederado ? 1 : 0} ;
    :nome "${atleta.nome}" ;
    :email "${atleta.email}" ;
    :genero "${atleta.genero}" ;
    :idade "${atleta.idade}" ;
    :morada "${atleta.morada}" .

        
`
    fs.appendFileSync('./inds.ttl', atl)
}

atletas.forEach(elem => {
    addAtleta(elem)
})
