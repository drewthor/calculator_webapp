import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const FunctionButton = ({value}) => {
    const { handleSetFunctionType } = useContext(EquationContext);

    return (
        <input
            type="button"
            className="button functionButton"
            value={value}
            onClick={() => handleSetFunctionType(value)}
            readOnly
        />
    );
}

export default FunctionButton;
