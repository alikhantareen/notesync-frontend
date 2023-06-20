import WhiteBoard from "./Components/WhiteBoard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<WhiteBoard />} />
      </Routes>
    </div>
  );
}

export default App;
