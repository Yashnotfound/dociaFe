import { useState } from "react";

const heroSectionLogic = () => {
    const [value, setValue] = useState('1');
    
    const changeHandler = (event, newValue) => {
        console.log(newValue);
        if(typeof newValue != 'string')
        {
            console.log('Invalid value');
        }
        setValue(newValue);
    }
    return {changeHandler, value};
};
export default heroSectionLogic;