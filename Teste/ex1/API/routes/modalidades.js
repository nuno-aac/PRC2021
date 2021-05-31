var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')

/* GET home page. */
router.get('/', function (req, res, next) {
    let query = `select ?id {
                    ?id rdf:type :Modalidade ;
                }`

    graphdb.execQuery(query)
        .then(dados => {
            let pubs = dados.data.results.bindings
            pubs = pubs.map(elem => {
                let ret = {}
                ret = graphdb.pair2Value(elem.id)
                return ret
            })
            res.send(pubs)
        })
        .catch(error => {
            res.send(error)
        })
});

router.get('/:id', function (req, res, next) {
    let { id } = req.params
    let query = `select ?e where {
                    :${id} :modalidadeTemAtleta ?a .
                    ?a :temExame ?e
                }`

    graphdb.execQuery(query)
        .then(dados => {
            let pubs = dados.data.results.bindings
            pubs = pubs.map(elem => {
                let ret = {}
                ret = graphdb.pair2Value(elem.e)
                return ret
            })
            res.send(pubs)
        })
        .catch(error => {
            res.send(error)
        })
});

module.exports = router;
