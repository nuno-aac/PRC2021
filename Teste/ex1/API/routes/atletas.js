var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')

/* GET home page. */
router.get('/', function (req, res, next) {
    let gen = req.query.gen
    let clube = req.query.clube
    let linegen = ""
    let lineclube = ""
    if (gen)
        linegen = ':genero "' + gen + '" ;\n'
    if (clube)
        lineclube = ':temClube :' + clube + ' ;\n'

    let query = `select ?id where {
                    ?id rdf:type :Atleta ;
                        `+linegen+`
                        `+lineclube+`
            }`

            console.log(query)

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

module.exports = router;
