import React from "react";

interface FormularioActualizacionProps {
  codigosClientes: string;
  preciosFinales: string;
  onCodigosClientesChange: (value: string) => void;
  onPreciosFinalesChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormularioActualizacion: React.FC<FormularioActualizacionProps> = ({
  codigosClientes,
  preciosFinales,
  onCodigosClientesChange,
  onPreciosFinalesChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-8">
      <div>
        <label htmlFor="codigosClientes" className="block mb-2">
          Códigos de Clientes (uno por línea):
        </label>
        <textarea
          id="codigosClientes"
          value={codigosClientes}
          onChange={(e) => onCodigosClientesChange(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="preciosFinales" className="block mb-2">
          Precios Finales (uno por línea):
        </label>
        <textarea
          id="preciosFinales"
          value={preciosFinales}
          onChange={(e) => onPreciosFinalesChange(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Actualizar Precios
      </button>
    </form>
  );
};

export default FormularioActualizacion;
