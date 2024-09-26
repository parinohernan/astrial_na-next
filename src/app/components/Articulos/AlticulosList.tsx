import React, { useState, useEffect } from "react";
import { Articulo } from "@/types";

const ArticulosList: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [filtros, setFiltros] = useState({
    codigo: "",
    descripcion: "",
    proveedor: "",
    rubro: "",
  });

  const obtenerArticulos = async () => {
    const params = new URLSearchParams(filtros);
    const response = await fetch(`/api/articulos?${params}`);
    const data = await response.json();
    setArticulos(data);
  };

  useEffect(() => {
    obtenerArticulos();
  }, [filtros]);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Lista de Artículos</h2>
      <div>
        <input
          type="text"
          name="codigo"
          placeholder="Filtrar por código"
          value={filtros.codigo}
          onChange={handleFiltroChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Filtrar por descripción"
          value={filtros.descripcion}
          onChange={handleFiltroChange}
        />
        <input
          type="text"
          name="proveedor"
          placeholder="Filtrar por proveedor"
          value={filtros.proveedor}
          onChange={handleFiltroChange}
        />
        <input
          type="text"
          name="rubro"
          placeholder="Filtrar por rubro"
          value={filtros.rubro}
          onChange={handleFiltroChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Proveedor</th>
            <th>Rubro</th>
            <th>Precio Costo</th>
            <th>Lista 1</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map((articulo) => (
            <tr key={articulo.Codigo}>
              <td>{articulo.Codigo}</td>
              <td>{articulo.Descripcion}</td>
              <td>{articulo.ProveedorCodigo}</td>
              <td>{articulo.RubroCodigo}</td>
              <td>{articulo.PrecioCosto?.toFixed(2)}</td>
              <td>{articulo.Lista1?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticulosList;
