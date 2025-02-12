import { useState,useContext } from "react";
import { UserContext } from "../../../App";

const heroSectionLogic = () => {
    const [value, setValue] = useState('general');
    
    const changeHandler = (event, newValue) => {
        setValue(newValue);
    }
        const { userAuth: { accessToken } } = useContext(UserContext);
        const isAuthenticated = accessToken ? true : false;

    return {changeHandler, value, isAuthenticated};
};
export default heroSectionLogic;