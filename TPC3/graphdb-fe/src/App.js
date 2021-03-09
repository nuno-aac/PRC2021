import logo from './logo.svg';
import './App.css';
import './css/style.css'

function App() {
    return (
        <div className="gdb-background gdb-center-height gdb-flex-column">
            <div className="gdb-flex-row gdb-center-height">
                <div className="gdb-header">GraphDB</div>
                <div className="gdb-repos">
                    <select>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option selected value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </div>
            </div>
            <div className="gdb-content-box gdb-center gdb-content">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </div>
        </div>
    );
}

export default App;
