import { useState } from 'react';
import axios from 'axios'

import '../css/style.css'


function Individual({individual,repo}) {
    let [individuals,setIndividuals] = useState([])
    let [show,setShow] = useState(false)
    

    let showIndividuals = () => {
        if(!show){
            var query = `SELECT * WHERE { ?s rdf:type <${rdfclass.s.value}> }`
            var encoded = encodeURIComponent(query)
            axios.get("http://localhost:7200/repositories/" + repo.id.value + "?query=" + encoded)
                .then(dados => {
                    setIndividuals(dados.data.results.bindings)
                    setShow(true)
                })
                .catch(erro => console.log(erro))
        } else {
            setShow(false)
        }
    }

    return (
        <div className="gdb-classe-wrapper">
            {rdfclass.s.value.split('#')[1] ? <div className="gdb-classe gdb-center-height" onClick={showIndividuals} > {show ? '⮟' : '⮞'} {rdfclass.s.value.split('#')[1]}</div> : <></>}
            {show ? individuals.map((v, i) => <div className="gdb-individual" key={i}> ▸ {v.s.value.split('#')[1]}</div>) : <></>}
        </div>
    );
}

export default Individual;
