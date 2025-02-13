import { useState, useContext } from "react";
import {UserContext} from "../../../App";

const heroSectionLogic = () => {
    const {userAuth:{role} = {}} = useContext(UserContext);
    const [value, setValue] = useState(`${role==="ADMIN"?"pending":"general"}`);
    const tabChangeHandler = (event, newValue) => {
        setValue(newValue);
    }


    return {tabChangeHandler, value};
};
export default heroSectionLogic;