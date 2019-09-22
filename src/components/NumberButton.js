import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const NumberButton = ({ value, span }) => {
    const { currentNumber, setCurrentNumber } = useContext(EquationContext);

    const addNumber = e => {
        setCurrentNumber(currentNumber + value);
    };

    return (
        <input
            type="button"
            className={`button numberButton span-${span || 1}`}
            value={value}
            onClick={addNumber}
            readOnly
        />
    );
};

export default NumberButton;
