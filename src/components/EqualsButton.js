import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const EqualsButton = () => {
    const { handlePerformEquals } = useContext(EquationContext);

    return (
        <input
            type="button"
            className="button functionButton"
            value={'='}
            onClick={handlePerformEquals}
            readOnly
        />
    );
}

export default EqualsButton;
