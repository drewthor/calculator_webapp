import React, { useContext } from "react";
import { EquationContext } from "../EquationProvider";

const ClearButton = ({ span }) => {
    const { handleClearAll } = useContext(EquationContext);

    return(
        <input
            type="button"
            className={`button specialButton span-${span || 1}`}
            value={'C'}
            onClick={handleClearAll}
            readOnly
        />
    );
}

export default ClearButton;
