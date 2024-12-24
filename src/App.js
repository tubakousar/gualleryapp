// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./Component/Landingpage";
import Passwordpage from "./Component/Passwordpage";
import Albumpage from "./Component/Albumpage";
import Showphotos from "./Component/Showphotos";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/passwordpage" element={<Passwordpage />} />
          <Route path="/albumpage" element={<Albumpage />} />

          <Route path="/showphotos" element={<Showphotos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
