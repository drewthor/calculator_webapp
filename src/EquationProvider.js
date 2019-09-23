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

    const handleSetFunctionType = (type) => {
        console.log("function type");
        console.log(currentNumber);
        console.log(value);
        if (currentNumber !== '' && value === '') {
            setValue(currentNumber);
            setFunctionType(type);
            setCurrentNumber('');
        }
        else if (currentNumber !== '' && value !== '') {
            handlePerformCalculation();
            setFunctionType(type);
        }
        else if (value !== '') {
            setFunctionType(type);
        }
    }

    const handlePerformCalculation = () => {
        if (currentNumber !== '' && functionType !== '') {
            switch(functionType) {
                case '+':
                    setValue(Number.parseFloat(value) + Number.parseFloat(currentNumber))
                    break;
                case '-':
                    setValue(Number.parseFloat(value) - Number.parseFloat(currentNumber))
                    break;
                case '*':
                    setValue(Number.parseFloat(value) * Number.parseFloat(currentNumber))
                    break;
                case '/':
                    setValue(Number.parseFloat(value) / Number.parseFloat(currentNumber))
                    break;
                default:
                    break;
            }
            setCurrentNumber('');
        }
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
                handleSetFunctionType,
                handlePerformCalculation
            }}
        >
            {props.children}
        </EquationContext.Provider>
    );
};

export default EquationProvider;