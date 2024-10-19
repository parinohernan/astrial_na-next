import React, { useState } from "react";
import { useClientes } from "@/hooks/useClientes";
import { Cliente } from "@/types/cliente";
import Select from "react-select";

interface ClientesSelectProps {
  onSelect?: (cliente: string) => void;
}

const ClientesSelect: React.FC<ClientesSelectProps> = ({ onSelect }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<Cliente | null>(null);

  const { data: clientes, isLoading, error } = useClientes(terminoBusqueda);

  const manejarSeleccion = (opcionSeleccionada: any) => {
    const cliente =
      clientes?.find((c) => c.Codigo === opcionSeleccionada.value) || null;
    setClienteSeleccionado(cliente);
    if (onSelect) {
      onSelect(opcionSeleccionada.value);
    }
  };

  const manejarBusqueda = (inputValue: string) => {
    setTerminoBusqueda(inputValue);
  };

  const opcionesClientes =
    clientes?.map((cliente) => ({
      value: cliente.Codigo,
      label: `${cliente.Descripcion} (${cliente.Codigo})`,
    })) || [];

  return (
    <div className="bg-gray-400 p-4 rounded-md">
      <div className="w-full">
        <label className="block mb-2">Seleccionar Cliente:</label>
        <Select
          options={opcionesClientes}
          onChange={manejarSeleccion}
          onInputChange={manejarBusqueda}
          value={
            clienteSeleccionado
              ? {
                  value: clienteSeleccionado.Codigo,
                  label: clienteSeleccionado.Descripcion,
                }
              : null
          }
          isLoading={isLoading}
          placeholder="Buscar y seleccionar un cliente"
          noOptionsMessage={() => "No se encontraron clientes"}
          loadingMessage={() => "Cargando clientes..."}
        />
      </div>

      {error && (
        <p className="mt-4 text-red-600">Error al cargar los clientes</p>
      )}

      {clienteSeleccionado && (
        <div className="mt-6 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Información del Cliente</h2>
          <p>
            <strong>Código:</strong> {clienteSeleccionado.Codigo}
          </p>
          <p>
            <strong>Descripción:</strong> {clienteSeleccionado.Descripcion}
          </p>
          <p>
            <strong>Dirección:</strong> {clienteSeleccionado.Calle}
          </p>
          {/* Agrega más campos según la estructura de tu objeto Cliente */}
        </div>
      )}
    </div>
  );
};

export default ClientesSelect;
