import React, { useContext } from "react";
import { EquationContext } from '../EquationProvider'

const NumberBox = () => {
    const { currentNumber, value }  = useContext(EquationContext);

    return (
        <form>
            <input
                type="text"
                value={ (currentNumber === '' ? (value === '' ? '0' : value) : currentNumber) }
                readOnly
            />
        </form>
    );
};

export default NumberBox;
