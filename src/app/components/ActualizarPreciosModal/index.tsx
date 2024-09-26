import React from "react";

interface ActualizarPreciosModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultados: Array<{
    codigo: string;
    descripcionExcel: string;
    descripcionBD: string;
    precioCostoExcel: number;
    precioCostoBD: number;
  }>;
}

const ActualizarPreciosModal: React.FC<ActualizarPreciosModalProps> = ({
  isOpen,
  onClose,
  resultados,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">
          Resultados de la actualización de precios
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Código</th>
              <th className="border px-4 py-2">Descripción Excel</th>
              <th className="border px-4 py-2">Descripción BD</th>
              <th className="border px-4 py-2">Precio Costo Excel</th>
              <th className="border px-4 py-2">Precio Costo BD</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.codigo}</td>
                <td className="border px-4 py-2">{item.descripcionExcel}</td>
                <td className="border px-4 py-2">{item.descripcionBD}</td>
                <td className="border px-4 py-2">{item.precioCostoExcel}</td>
                <td className="border px-4 py-2">{item.precioCostoBD}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ActualizarPreciosModal;
