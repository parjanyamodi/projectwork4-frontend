import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataCollection from "./Components/DataCollection";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/data-collection" element={<DataCollection />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
