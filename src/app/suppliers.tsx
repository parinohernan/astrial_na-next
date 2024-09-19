import { DataList } from "./components/DataList";
import React from "react";

export default function Suppliers() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Proveedores</h1>
      <DataList type="suppliers" title="Lista de proveedores" />
    </main>
  );
}
