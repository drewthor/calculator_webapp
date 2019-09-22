import React, { useContext } from "react";
import { EquationContext } from '../EquationProvider'

const NumberBox = () => {
    const { currentNumber }  = useContext(EquationContext);

    return (
        <form>
            <input
                type="text"
                value={ currentNumber }
                readOnly
            />
        </form>
    );
};

export default NumberBox;
