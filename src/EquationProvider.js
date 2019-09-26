import React, { useReducer, createContext } from "react";

export const EquationContext = createContext();

const sendCalc = (calculation) => {
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
}

const initialState = {
    currentNumber: '',
    functionType: '',
    value: '',
    calculation: '',
}

const stateReducer = (state, action) => {
    switch (action.type) {
        case 'clear':
            return {...state, functionType: '', currentNumber: '', value: '', calculation: ''};

        case 'negate':
            if (state.currentNumber !== '') {
                let number = Number.parseFloat(state.currentNumber) * -1;
                let index = state.calculation.length - state.currentNumber.length;
                return {...state, currentNumber: number, calculation: state.calculation.slice(0, index) + number};
            }
            else if (state.value !== '') {
                // negate button was pressed after setting function type
                let index = state.calculation.length - 1
                return {...state, value: Number.parseFloat(state.value) * -1, calculation: state.calculation.slice(0, index) + "*-1" + state.functionType};
            }
            return state;

        case 'addNumber':
            return {...state, currentNumber: state.currentNumber + action.currentNumber, calculation: state.calculation + action.currentNumber, value: state.functionType === '' ? '' : state.value};

        case 'clearCurrentNumber':
            return {...state, currentNumber: ''};

        case 'setFunctionType':
            if (state.calculation.slice(-1) === state.functionType) {
                return {...state, functionType: action.functionType, calculation: state.calculation.slice(0, state.calculation.length - 1) + action.functionType};
            }
            else if (state.currentNumber !== '' && state.value === '') {
                return {...state, value: state.currentNumber, functionType: action.functionType, currentNumber: '', calculation: state.calculation + action.functionType};
            }
            else if (state.value !== '') {
                return {...state, functionType: action.functionType, calculation: state.calculation + action.functionType};
            }
            return state;

        case 'equals':
            sendCalc(state.calculation + '=' + state.value);
            return {...state, functionType: '', calculation: ''}

        case 'setValue':
            return {...state, value: action.value, currentNumber: ''};

        case 'clearCalculation':
            return {...state, calculation: ''};

        default:
            throw new Error();
    }
}

const EquationProvider = (props) => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const handleClearAll = () => {
        dispatch({type: 'clear'});
    };

    const handleNegateNumber = () => {
        dispatch({type: 'negate'});
    };

    const handleAddNumber = number => {
        dispatch({type: 'addNumber', currentNumber: number});
    };

    const handleSetFunctionType = type => {
        if (state.currentNumber !== '' && state.value !== '') {
            performCalculation();
        }
        dispatch({type: 'setFunctionType', functionType: type});
    };

    const handlePerformEquals = () => {
        performCalculation();
        dispatch({type: 'equals'});
    };

    const performCalculation = () => {
        if (state.currentNumber !== '' && state.functionType !== '') {
            switch(state.functionType) {
                case '+':
                    dispatch({type: 'setValue', value: Math.round((Number.parseFloat(state.value) + Number.parseFloat(state.currentNumber)) * 1000) / 1000});
                    break;
                case '-':
                    dispatch({type: 'setValue', value: Math.round((Number.parseFloat(state.value) - Number.parseFloat(state.currentNumber)) * 1000) / 1000});
                    break;
                case '*':
                    dispatch({type: 'setValue', value: Math.round((Number.parseFloat(state.value) * Number.parseFloat(state.currentNumber)) * 1000) / 1000});
                    break;
                case '/':
                    dispatch({type: 'setValue', value: Math.round((Number.parseFloat(state.value) / Number.parseFloat(state.currentNumber)) * 1000) / 1000});
                    break;
                default:
                    break;
            }
        }
        else if (state.currentNumber !== '' && state.functionType === '') {
            dispatch({type: 'setValue', value: state.currentNumber});
        }
    };

    return (
        <EquationContext.Provider
            value={{ 
                state,
                handleClearAll,
                handleNegateNumber,
                handleAddNumber,
                handleSetFunctionType,
                handlePerformEquals
            }}
        >
            {props.children}
        </EquationContext.Provider>
    );
};

export default EquationProvider;