import { useState, useEffect } from 'react';
import axios from 'axios'

import './App.css';
import './css/style.css'
import Class from './components/class';

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
    let [repos,setRepos] = useState([])
    let [classes, setClasses] = useState([])
    let [currentRepo,setCurrentRepo] = useState(null)

    let changeRepo = e => {
        if(e.target.value)
            setCurrentRepo(JSON.parse(e.target.value))
        else
            setCurrentRepo(null)
    }

    useEffect(() => {
        axios.get('http://localhost:7200/repositories')
            .then(dados => setRepos(dados.data.results.bindings))
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        setClasses([])
        if (currentRepo) {
            var query = `SELECT * WHERE { ?s rdf:type owl:Class }`
            var encoded = encodeURIComponent(query)

            axios.get("http://localhost:7200/repositories/" + currentRepo.id.value + "?query=" + encoded)
                .then(dados => {
                    setClasses(dados.data.results.bindings)
                })
                .catch(erro => console.log(erro))

        }
    }, [currentRepo])

    return (
        <div className="gdb-background gdb-center-height gdb-flex-column">
            <div className="gdb-flex-row gdb-center-height">
                <div className="gdb-header">GraphDB</div>
                <div className="gdb-repos">
                    <select onChange={changeRepo}>
                        <option value="" key={-1}> Choose Repo </option>
                        {repos.map((v, i) => { return <option value={JSON.stringify(v)} key={i}> {v.id.value} </option> })}
                    </select>
                </div>
            </div>
            <div className="gdb-content-box gdb-center gdb-content">
                {!currentRepo ? <>
                    <img src="logo.png" className="App-logo gdb-logo" alt="logo" />
                    <p>
                        Welcome to GraphDB, choose a repository on the top right corner!
                    </p>
                    <a
                        className="App-link"
                        href="https://graphdb.ontotext.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        What is GraphBD?
                    </a></>

                    : 
                    
                    <>
                        <div className="gdb-classe-header">Classes</div>
                        { classes.map((v, i) => { return <Class rdfclass={v} repo={currentRepo} key={i}/> }) } 
                    </>
                }
            </div>
        </div>
    );
}

export default App;
