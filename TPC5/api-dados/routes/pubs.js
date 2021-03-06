var express = require('express');
var axios = require('axios')
var qs = require('qs')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let authorFilter = ''
    if (req.query.author != null)
        authorFilter = `<https://www.nuno-aac.github.io/ontologias/jcrpubs#${req.query.author}> <https://www.nuno-aac.github.io/ontologias/jcrpubs#participaEm> ?pub`


    let body = {
        query: `select * where {
                    ?pub rdf:type <https://www.nuno-aac.github.io/ontologias/jcrpubs#Publication> .
                    ?pub rdf:type ?type .
                    ?type rdfs:subClassOf <https://www.nuno-aac.github.io/ontologias/jcrpubs#Publication> .
                    ?pub <https://www.nuno-aac.github.io/ontologias/jcrpubs#year> ?year .
                    ?pub <https://www.nuno-aac.github.io/ontologias/jcrpubs#title> ?title .
                    ${authorFilter}
                    FILTER (?type != <https://www.nuno-aac.github.io/ontologias/jcrpubs#Publication>)
                }`
            }

    axios.post('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85400-TP5', qs.stringify(body))
    .then(dados => {
        let pubs = dados.data.results.bindings
        res.send(pubs)
    })
    .catch(error => {
        res.send(error)
    })
});

router.get('/:id', function (req, res, next) {
    let { id } = req.params
    let body = {
        query: `select * where {
                    <https://www.nuno-aac.github.io/ontologias/jcrpubs#${id}> ?p ?o .
                }`
    }

    axios.post('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85400-TP5', qs.stringify(body), { accept: 'text/csv' })
        .then(dados => {
            let pubs = dados.data.results.bindings
            res.send(pubs)
        })
        .catch(error => {
            res.send(error)
        })
});

router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.delete('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
