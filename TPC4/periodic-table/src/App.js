import { useState, useEffect } from 'react';
import axios from 'axios'

import './App.css';
import './css/style.css'
import Individual from './components/individual';

/*
{
    "readable": {
        "datatype": "http://www.w3.org/2001/XMLSchema#boolean",
        "type": "literal",
        "value": "true"
    },
    "id": {
        "type": "literal",
        "value": "advocacia"
    },
    "title": {
        "type": "literal",
        "value": ""
    },
    "uri": {
        "type": "uri",
        "value": "http://localhost:7200/repositories/advocacia"
    },
    "writable": {
        "datatype": "http://www.w3.org/2001/XMLSchema#boolean",
        "type": "literal",
        "value": "true"
    }
}
*/

function App() {
    let repos = ['Element', 'Group', 'Period']
    let [classes, setClasses] = useState([])
    let [currentField,setCurrentField] = useState(null)

    let changeField = e => {
        if(e.target.value)
            setCurrentField(e.target.value)
        else
            setCurrentField(null)
    }

    useEffect(() => {
        setClasses([])

        var prefixes = `PREFIX pt: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
`
        if (currentField) {
            var query = `SELECT * WHERE { ?s rdf:type pt:${currentField} }`
            var encoded = encodeURIComponent(prefixes+query)

            axios.get("http://localhost:7200/repositories/Periodic?query=" + encoded)
                .then(dados => {
                    console.log(dados.data.results.bindings)
                    setClasses(dados.data.results.bindings)
                })
                .catch(erro => console.log(erro))

        }
    }, [currentField])

    return (
        <div className="gdb-background gdb-center-height gdb-flex-column">
            <div className="gdb-flex-row gdb-center-height">
                <div className="gdb-header">Periodic Table</div>
                <div className="gdb-repos">
                    <select onChange={changeField}>
                        <option value="" key={-1}> Choose Field </option>
                        {repos.map((v, i) => { return <option value={v} key={i}> {v} </option> })}
                    </select>
                </div>
            </div>
            <div className="gdb-content-box gdb-center gdb-content">
                {!currentField ? <>
                    <img src="logo.png" className="App-logo gdb-logo" alt="logo" />
                    <p>
                        Welcome to the Periodic Table, choose a field on the top right corner!
                    </p>
                    <a
                        className="App-link"
                        href="https://en.wikipedia.org/wiki/Periodic_table"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        What is the Periodic Table?
                    </a></>

                    : 
                    
                    <>
                        <div className="gdb-classe-header">{currentField}</div>
                        <div className="gdb-classe-wrapper">
                            { classes.map((v, i) => { return <Individual individual={v} key={i}/> }) } 
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default App;
