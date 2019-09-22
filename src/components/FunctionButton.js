import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const FunctionButton = ({value}) => {
    const { setFunctionType, handlePerformCalculation } = useContext(EquationContext);

    const handlePerformFunctionType = () => {
        handlePerformCalculation();
        setFunctionType(value);
    };

    return (
        <input
            type="button"
            className="button functionButton"
            value={value}
            onClick={handlePerformFunctionType}
            readOnly
        />
    );
}

export default FunctionButton;
