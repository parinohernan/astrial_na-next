import React from "react";
import { DataList } from "./components/DataList";

export default function Vendors() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Vendedores</h1>
      <DataList type="vendors" title="Lista de vendedores" />
    </main>
  );
}
