import React from "react";

interface TotalesProps {
  total: number;
}

const Totales: React.FC<TotalesProps> = ({ total }) => {
  return (
    <div>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Totales;
