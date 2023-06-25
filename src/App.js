import WhiteBoard from "./Components/WhiteBoard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import FolderPage from "./Components/FolderPage"
import AddNote from './Components/AddNote';
import ViewNote from './Components/ViewNote';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/whiteboard/:id" element={<WhiteBoard />} />
        <Route path="/myfolder/:id" element={<FolderPage />} />
        <Route path="/myfolder/addnote/:id" element={<AddNote />} />
        <Route path="/myfolder/mynote/:id" element={<ViewNote />} />
      </Routes>
    </div>
  );
}

export default App;
