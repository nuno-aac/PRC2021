import { useState } from 'react';
import axios from 'axios'

import '../css/style.css'


function Individual({individual}) {
    let [props,setProps] = useState([])
    let [show,setShow] = useState(false)
    

    let showProps = () => {
        if(!show){
            var prefixes = `PREFIX pt: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
`
            var query = `SELECT * WHERE { pt:${individual.s.value.split('#')[1]} ?p ?o }`
            var encoded = encodeURIComponent(prefixes+query)

            axios.get("http://localhost:7200/repositories/Periodic?query=" + encoded)
                .then(dados => {
                    setProps(dados.data.results.bindings)
                    setShow(true)
                })
                .catch(erro => console.log(erro))
        } else {
            setShow(false)
        }
    }

    return (
        <div>
            {individual.s.value.split('#')[1] ? 
                <div className="gdb-individual" onClick={showProps} > {show ? '⮟' : '⮞'} {individual.s.value.split('#')[1]}</div> 
                : 
                <></>
            }
            {show ? 
                props.map((v, i) => 
                    <div className="gdb-prop" key={i}> • <b>{v.p.value.split('#')[1]}:</b> {v.o.value.split('#')[1] ? v.o.value.split('#')[1] : v.o.value}</div>
                ) 
                : 
                <></>}
        </div>
    );
}

export default Individual;
