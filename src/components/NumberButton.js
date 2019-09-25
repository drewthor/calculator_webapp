import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const NumberButton = ({ value, span }) => {
    const { handleAddNumber } = useContext(EquationContext);

    return (
        <input
            type="button"
            className={`button numberButton span-${span || 1}`}
            value={value}
            onClick={() => handleAddNumber(value)}
            readOnly
        />
    );
};

export default NumberButton;
