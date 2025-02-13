import { useState, useContext,useEffect } from "react";
import {UserContext} from "../../../App";

const heroSectionLogic = () => {
    const {userAuth:{role} = {}} = useContext(UserContext);
    const [value, setValue] = useState(() => {
        return localStorage.getItem('selectedTab') || (role === "ADMIN" ? "pending" : "general");
      });
    useEffect(() => {
        localStorage.setItem('selectedTab', value);
      }, [value]);
    
      const tabChangeHandler = (event, newValue) => {
        setValue(newValue);}

    return {tabChangeHandler, value};
};
export default heroSectionLogic;