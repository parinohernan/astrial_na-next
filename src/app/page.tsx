"use client";
import React, { useState } from "react";
import { ItemDetails } from "./components/ItemDetails/index";
import { DataList } from "./components/DataList";

export default function Home() {
  return (
    <main className="p-8">
      <h3 className="text-3xl font-bold mb-4">
        Astial NA App - testeando next
      </h3>
      {/* <div>
        <h1>Artículos</h1> */}
      {/* <DataList type="items" title="Lista de Artículos" />
        {selectedItemId && <ItemDetails itemId={selectedItemId} />} */}
      {/* </div> */}
      {/* <DataList type="customers" title="Clientes" /> */}
      {/* <DataList type="suppliers" title="Proveedores" /> */}
      {/* <DataList type="items" title="Articulos" /> */}
      {/* <DataList type="vendors" title="Vendedores" /> */}
      {/* <DataList type="headings" title="Rubros" /> */}
    </main>
  );
}
