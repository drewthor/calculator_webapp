import React, { useEffect, useReducer, useState, createContext } from "react";

export const EquationContext = createContext();

const initialCalculation = {value: ''}

const reducer = (state, action) => {
    switch (action.type) {
        case 'clear':
            return {value: ''};
        case 'append':
            return {value: state.value + action.value};
        case 'removeLast':
            return {value: state.value.slice(0, state.value.length - 1)}
        default:
            throw new Error();
    }
}

const EquationProvider = (props) => {
    const [currentNumber, setCurrentNumber] = useState('');
    const [functionType, setFunctionType] = useState('');
    const [value, setValue] = useState('');
    const [calculation, setCalculation] = useReducer(reducer, initialCalculation);
    const [sendCalculation, setSendCalculation] = useState(false);

    const handleClearAll = () => {
        setCurrentNumber('');
        setFunctionType('');
        setValue('');
        setCalculation({type: 'clear'});
    };

    const handleNegateNumber = () => {
        if (currentNumber !== '') {
            setCurrentNumber(Number.parseFloat(currentNumber) * -1);
        }
        else if (value !== '') {
            setValue(Number.parseFloat(value) * -1);
        }
    };

    const handleAddNumber = number => {
        if (functionType === '') {
            setValue('');
        }
        setCurrentNumber(currentNumber + number);
        setCalculation({type: 'append', value: number});
    };

    const handleSetFunctionType = type => {
        if (currentNumber !== '' && value === '') {
            setValue(currentNumber);
            setFunctionType(type);
            setCurrentNumber('');
            setCalculation({type: 'append', value: type});
        }
        else if (currentNumber !== '' && value !== '') {
            handlePerformCalculation();
            setFunctionType(type);
            setCalculation({type: 'append', value: type});
        }
        else if (value !== '') {
            setFunctionType(type);
            setCalculation({type: 'removeLast'})
            setCalculation({type: 'append', value: type});
        }
    };

    useEffect(() => {
        console.log("boop");
        console.log(sendCalculation);
        console.log(calculation);
        if (sendCalculation && calculation !== '') {
            console.log("sending");
            fetch('https://us-central1-calculatorwebapp-253804.cloudfunctions.net/CalculationsAPI', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    calculation: calculation,
                })
            }).catch();
            setSendCalculation(false);
            setCalculation({type: 'clear'});
        }
    }, [sendCalculation, calculation]);

    const handlePerformEquals = () => {
        handlePerformCalculation();
        setFunctionType('');
        setCalculation({type: 'append', value: '=' + value});
        setSendCalculation(true);
    };

    const handlePerformCalculation = () => {
        if (currentNumber !== '' && functionType !== '') {
            switch(functionType) {
                case '+':
                    setValue(Math.round((Number.parseFloat(value) + Number.parseFloat(currentNumber)) * 1000) / 1000)
                    break;
                case '-':
                    setValue(Math.round((Number.parseFloat(value) - Number.parseFloat(currentNumber)) * 1000) / 1000)
                    break;
                case '*':
                    setValue(Math.round((Number.parseFloat(value) * Number.parseFloat(currentNumber)) * 1000) / 1000)
                    break;
                case '/':
                    setValue(Math.round((Number.parseFloat(value) / Number.parseFloat(currentNumber)) * 1000) / 1000)
                    break;
                default:
                    break;
            }
        }
        else if (currentNumber !== '' && functionType === '') {
            setValue(currentNumber);
        }
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
                handleNegateNumber,
                handleAddNumber,
                handleSetFunctionType,
                handlePerformEquals,
                handlePerformCalculation
            }}
        >
            {props.children}
        </EquationContext.Provider>
    );
};

export default EquationProvider;