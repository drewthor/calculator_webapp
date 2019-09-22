import React, { useState, createContext } from "react";

export const EquationContext = createContext();

const EquationProvider = (props) => {
    const [currentNumber, setCurrentNumber] = useState('');
    const [functionType, setFunctionType] = useState('');
    const [value, setValue] = useState('');

    const handleClearAll = () => {
        setCurrentNumber('');
        setFunctionType('');
        setValue('');
    };

    const handlePerformCalculation = () => {
        setCurrentNumber('');
    };

    return (
        <EquationContext.Provider
            value={{ 
                currentNumber,
                setCurrentNumber,
                functionType,
                setFunctionType,
                value,
                setValue,
                handleClearAll,
                handlePerformCalculation
            }}
        >
            {props.children}
        </EquationContext.Provider>
    );
};

export default EquationProvider;