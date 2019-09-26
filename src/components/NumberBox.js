import React, { useContext } from "react";
import { EquationContext } from '../EquationProvider'

const NumberBox = () => {
    const { state }  = useContext(EquationContext);

    return (
        <form>
            <input
                type="text"
                value={ (state.currentNumber === '' ? (state.value === '' ? '0' : state.value) : state.currentNumber) }
                readOnly
            />
        </form>
    );
};

export default NumberBox;
