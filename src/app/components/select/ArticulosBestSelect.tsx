import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

interface Articulo {
  id: number;
  codigo: string;
  descripcion: string;
  proveedorArticuloCodigo: string;
}

interface ArticulosBestSelectProps {
  onChange: any;
}

const ArticulosBestSelect: React.FC<ArticulosBestSelectProps> = ({
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Articulo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCodigo, setSelectedCodigo] = useState<string>("");

  const searchArticulos = useCallback(
    debounce(async (term: string) => {
      if (term.length < 3) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/articulos/search?term=${encodeURIComponent(term)}`
        );
        if (!response.ok) throw new Error("Error en la búsqueda");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error al buscar artículos:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    searchArticulos(term);
  };

  const handleSelectArticulo = (articulo: any) => {
    setSearchTerm(articulo.Descripcion);
    setSelectedCodigo(articulo.Codigo);
    setResults([]); // Limpia los resultados
    onChange(articulo.Codigo); // Notifica al componente padre
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        fullWidth
        label="Buscar artículos"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {isLoading && <CircularProgress />}
      {results.length > 0 && (
        <div
          className="best-select-list"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "260px",
            overflow: "auto",
            backgroundColor: "#f0f0f0",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <List>
            {results.map((articulo: any) => (
              <ListItem
                key={articulo.Codigo}
                onClick={() => handleSelectArticulo(articulo)}
                style={{ cursor: "pointer" }}
              >
                <ListItemText
                  primary={articulo.Descripcion}
                  secondary={`Código: ${articulo.Codigo}, Proveedor: ${articulo.ProveedorArticuloCodigo}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default ArticulosBestSelect;
