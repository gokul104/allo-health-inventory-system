"use client";

import { useEffect, useState } from "react";

type Product = {
  inventoryId: string;
  product: string;
  warehouse: string;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
};

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {

    const res = await fetch(
      "http://localhost:3000/api/products"
    );

    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const reserveProduct = async (
    inventoryId: string
  ) => {

    const res = await fetch(
      "http://localhost:3000/api/reservations",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          inventoryId,
          quantity: 1,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {

      alert(
        "Reservation Created Successfully"
      );

      fetchProducts();

    } else {

      alert(data.message);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Inventory Reservation System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {products.map((item) => (

          <div
            key={item.inventoryId}
            className="border border-gray-700 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold mb-2">
              {item.product}
            </h2>

            <p className="mb-2">
              Warehouse:
              {" "}
              {item.warehouse}
            </p>

            <p className="mb-2">
              Total Stock:
              {" "}
              {item.totalStock}
            </p>

            <p className="mb-2">
              Reserved Stock:
              {" "}
              {item.reservedStock}
            </p>

            <p className="mb-4 text-green-400">
              Available Stock:
              {" "}
              {item.availableStock}
            </p>

            <button
              onClick={() =>
                reserveProduct(item.inventoryId)
              }
              className="bg-white text-black px-4 py-2 rounded-lg font-bold"
            >
              Reserve Now
            </button>

          </div>
        ))}
      </div>
    </main>
  );
}