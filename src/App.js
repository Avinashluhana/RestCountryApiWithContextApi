import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Thapa from "./Components/Thapa";
import { Country1 } from "./Components/Country1";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./Components/Context/GlobalState";

function App() {
  return (
    <GlobalProvider>
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Thapa />} />
        <Route path="/:country" element={<Country1 />} />
      </Routes>
    </Router> 
    </GlobalProvider>
  );
}

export default App;
