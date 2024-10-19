import React, { useState, useCallback } from "react";
import { useArticulos } from "@/hooks/useArticulos";
import { useProveedores } from "@/hooks/useProveedores";
import { useRubros } from "@/hooks/useRubros";
import { Articulo } from "@/types/articulo";
import Select from "react-select";
import debounce from "lodash.debounce";

interface ArticulosSelectProps {
  onSelect?: (articulo: string) => void;
}

const ArticulosSelect: React.FC<ArticulosSelectProps> = ({ onSelect }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<
    string | null
  >(null);
  const [rubroSeleccionado, setRubroSeleccionado] = useState<string | null>(
    null
  );
  const [articuloSeleccionado, setArticuloSeleccionado] =
    useState<Articulo | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const {
    data: articulos,
    isLoading: isLoadingArticulos,
    error: errorArticulos,
    totalCount,
  } = useArticulos(
    terminoBusqueda,
    proveedorSeleccionado,
    rubroSeleccionado,
    page,
    pageSize
  );

  const { data: proveedores, isLoading: isLoadingProveedores } =
    useProveedores();
  const { data: rubros, isLoading: isLoadingRubros } = useRubros();

  const debouncedSearch = useCallback(
    debounce((inputValue: string) => {
      setTerminoBusqueda(inputValue);
      setPage(1);
    }, 300),
    []
  );

  const manejarSeleccionArticulo = (opcionSeleccionada: any) => {
    const articulo =
      articulos?.find((a: Articulo) => a.Codigo === opcionSeleccionada.value) ||
      null;
    setArticuloSeleccionado(articulo);
    if (onSelect) {
      onSelect(opcionSeleccionada.value);
    }
  };

  const manejarBusqueda = (inputValue: string) => {
    debouncedSearch(inputValue);
  };

  const opcionesArticulos =
    articulos?.map((articulo: Articulo) => ({
      value: articulo.Codigo,
      label: `${articulo.Descripcion} (${articulo.Codigo})`,
    })) || [];

  const opcionesProveedores =
    proveedores?.map((proveedor) => ({
      value: proveedor.Codigo,
      label: proveedor.Descripcion,
    })) || [];

  const opcionesRubros =
    rubros?.map((rubro) => ({
      value: rubro.Codigo,
      label: rubro.Descripcion,
    })) || [];

  const loadMoreOptions = () => {
    if (articulos.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="bg-gray-400 p-4 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2">Proveedor:</label>
          <Select
            options={opcionesProveedores}
            onChange={(option) => {
              setProveedorSeleccionado(option ? option.value : null);
              setPage(1);
            }}
            isClearable
            placeholder="Seleccionar proveedor"
            isLoading={isLoadingProveedores}
          />
        </div>
        <div>
          <label className="block mb-2">Rubro:</label>
          <Select
            options={opcionesRubros}
            onChange={(option) => {
              setRubroSeleccionado(option ? option.value : null);
              setPage(1);
            }}
            isClearable
            placeholder="Seleccionar rubro"
            isLoading={isLoadingRubros}
          />
        </div>
        <div>
          <label className="block mb-2">Artículo:</label>
          <Select
            options={opcionesArticulos}
            onChange={manejarSeleccionArticulo}
            onInputChange={manejarBusqueda}
            value={
              articuloSeleccionado
                ? {
                    value: articuloSeleccionado.Codigo,
                    label: articuloSeleccionado.Descripcion,
                  }
                : null
            }
            isLoading={isLoadingArticulos}
            placeholder="Buscar y seleccionar un artículo"
            noOptionsMessage={() => "No se encontraron artículos"}
            loadingMessage={() => "Cargando artículos..."}
            onMenuScrollToBottom={loadMoreOptions}
          />
        </div>
      </div>

      {errorArticulos && (
        <p className="mt-4 text-red-600">Error al cargar los artículos</p>
      )}

      {articuloSeleccionado && (
        <div className="mt-6 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Información del Artículo</h2>
          <p>
            <strong>Código:</strong> {articuloSeleccionado.Codigo}
          </p>
          <p>
            <strong>Descripción:</strong> {articuloSeleccionado.Descripcion}
          </p>
          <p>
            <strong>Precio:</strong> $
            {articuloSeleccionado.PrecioCosto.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticulosSelect;
