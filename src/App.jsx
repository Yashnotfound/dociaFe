// src/App.js
import Navbar from "./Shared/Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import userauthLogic from "./utils/sessionStoreUser";
import AuthScreen from "./screens/Auth/Index";
import Homepage from "./screens/Homepage";
import CreateDocument from "./screens/CreateDoc";
import DocumentViewer from "./screens/DocumentViewer";
import EditDocument from "./screens/EditDoc/index";

export const UserContext = createContext({});

const App = () => {
  const { userAuth, setUserAuth } = userauthLogic();

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
            <Route path = "/documents/doc/create" element = {<CreateDocument type="GENERAL"/>} />
            <Route path = "/documents/api-contract/create" element = {<CreateDocument type="API_CONTRACT"/>} />
            <Route path = "/documents/:id" element = {<DocumentViewer/>} />
            <Route path = "/documents/edit" element = {<EditDocument />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
