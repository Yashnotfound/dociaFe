// src/App.js
import Navbar from "./Shared/Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import UserAuthForm from "./pages/Auth/userAuthForm.page";
import { createContext } from "react";
import userauthLogic from "./utils/sessionStoreUser"; // Import hook
import AuthScreen from "./screens/Auth/Index";
import Homepage from "./screens/Homepage";
import CreateDocument from "./screens/CreateDoc";
import DocumentViewer from "./screens/DocumentViewer";

export const UserContext = createContext({});

const App = () => {
  const { userAuth, setUserAuth } = userauthLogic(); // Use the custom hook

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <BrowserRouter>
        <Routes>
          {/* Parent Route with Navbar */}
          <Route path="/" element={<Navbar />}>
            {/* Child routes */}
            <Route index element = {<Homepage/>}></Route>
            <Route path="/login" element={<AuthScreen type={"login"}/>} />
            <Route path="/signup" element={<AuthScreen type={"signup"}/>} />
            <Route path = "/documents/create" element = {<CreateDocument />} />
            <Route path = "/documents/:id" element = {<DocumentViewer/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
