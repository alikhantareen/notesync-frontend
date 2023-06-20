import WhiteBoard from "./Components/WhiteBoard";
import Login from "./Components/Login";
import Signup from './Components/Signup'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
      </Routes>
    </div>
  );
}

export default App;
