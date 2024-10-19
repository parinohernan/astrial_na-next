// import React, { useState } from "react";
// import { Product } from "@/types";

// interface ProductSelectorProps {
//   products: Product[];
//   selectedProducts: Product[];
//   onProductSelect: (product: Product) => void;
//   onProductRemove: (productCode: string) => void;
// }

// const ProductSelector: React.FC<ProductSelectorProps> = ({
//   products,
//   selectedProducts,
//   onProductSelect,
//   onProductRemove,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = products.filter(
//     (product) =>
//       product.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.Codigo.includes(searchTerm)
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Buscar producto..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <select
//         className="border p-2 rounded mb-2 w-full"
//         onChange={(e) => {
//           const selectedProduct = products.find(
//             (p) => p.Codigo === e.target.value
//           );
//           if (selectedProduct) onProductSelect(selectedProduct);
//         }}
//       >
//         <option value="">Seleccionar producto</option>
//         {filteredProducts.map((product) => (
//           <option key={product.Codigo} value={product.Codigo}>
//             {product.Codigo} - {product.Descripcion}
//           </option>
//         ))}
//       </select>
//       <div>
//         <h3 className="font-bold mb-2">Productos seleccionados:</h3>
//         <ul>
//           {selectedProducts.map((product) => (
//             <li
//               key={product.Codigo}
//               className="flex justify-between items-center mb-1"
//             >
//               <span>
//                 {product.Codigo} - {product.Descripcion}
//               </span>
//               <button
//                 onClick={() => onProductRemove(product.Codigo)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Quitar
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProductSelector;
