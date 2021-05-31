var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')

/* GET home page. */
router.get('/', function(req, res, next) {
    let resu = req.query.res
    let line = ""
    if(resu == 'OK')
        line = ":resultado 1 ;"

    let query = `select ?id ?data ?res ?nome where {
                    ?id rdf:type :EMD ;
                        :dataEMD ?data ;
                        :resultado ?res ; `
                        + line +
                        `:refereAtleta ?a .
                    ?a :nome ?nome
                }`

    graphdb.execQuery(query)
        .then(dados => {
            let pubs = dados.data.results.bindings
            pubs = pubs.map(elem => {
                let ret = {}
                ret.id = graphdb.pair2Value(elem.id)
                ret.data = graphdb.pair2Value(elem.data)
                ret.res = graphdb.pair2Value(elem.res)
                ret.nome = graphdb.pair2Value(elem.nome)
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
    let query = `select * where {
                    :${id} ?p ?o
                }`

    graphdb.execQuery(query)
        .then(dados => {
            let pubs = dados.data.results.bindings
            pubs = pubs.map(elem => {
                let ret = {}
                ret.p = graphdb.pair2Value(elem.p)
                ret.o = graphdb.pair2Value(elem.o)
                return ret
            })
            res.send(pubs)
        })
        .catch(error => {
            res.send(error)
        })
});

module.exports = router;
