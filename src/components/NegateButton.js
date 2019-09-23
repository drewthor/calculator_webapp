import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const NegateButton = () => {
    const { handleNegateNumber } = useContext(EquationContext);

    return (
        <input
            type="button"
            className="button specialButton"
            value={'+/-'}
            onClick={handleNegateNumber}
            readOnly
        />
    );
}

export default NegateButton;
