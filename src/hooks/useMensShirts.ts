import { useState, useEffect } from "react";
import { fetchMensShirts } from "../services/api";
import type { Product } from "../types/Product";

export const useMensShirts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getShirts = async () => {
      const data = await fetchMensShirts();
      setProducts(data as Product[]);
      if (data.length > 0) setSelectedProduct(data[0]);
    };
    getShirts();
  }, []);

  return { products, selectedProduct, setSelectedProduct };
};
