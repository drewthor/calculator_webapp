import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const EqualsButton = () => {
    const { handlePerformCalculation } = useContext(EquationContext);

    return (
        <input
            type="button"
            className="button functionButton"
            value={'='}
            onClick={handlePerformCalculation}
            readOnly
        />
    );
}

export default EqualsButton;
