import React, { useEffect, useState } from "react";

const LatestCalculations = () => {
    const [calculations, setCalculations] = useState([]);

    useEffect(() => {
        const id = setInterval(async () => {
            let response = await fetch('https://us-central1-calculatorwebapp-253804.cloudfunctions.net/CalculationsAPI', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(response => response.map(item => item.Calculation));
            setCalculations(response);
          }, 1000);
          return () => clearInterval(id);
    }, []);

    return (
        <div>
            <h3>Latest Calculations</h3>
            <ol>
                {calculations.map((calculation, index) => ( <li key={index}>{calculation}</li>))}
            </ol>
        </div>
    );
};

export default LatestCalculations;
