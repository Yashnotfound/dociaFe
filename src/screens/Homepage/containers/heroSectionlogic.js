import { useState } from "react";

const heroSectionLogic = () => {
    const [value, setValue] = useState('general');
    
    const tabChangeHandler = (event, newValue) => {
        setValue(newValue);
    }


    return {tabChangeHandler, value};
};
export default heroSectionLogic;