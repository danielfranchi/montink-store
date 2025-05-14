import { useEffect, useState, useMemo } from "react";

import { useMensShirts } from "../hooks/useMensShirts";

import BuyButton from "./BuyButton";
import ZipCodeInput from "./ZipCodeInput";

import type { Product } from "../types/Product";

const sizes = ["P", "M", "G", "GG"];

const ProductView = () => {
  const { products, selectedProduct, setSelectedProduct } = useMensShirts();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<Product | null>(
    selectedProduct
  );
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>(
    selectedProduct?.thumbnail || ""
  );

  useEffect(() => {
    const savedData = localStorage.getItem("selectedProductData");

    if (savedData) {
      const { timestamp, product, size, color, thumbnail } =
        JSON.parse(savedData);
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        setSelectedProduct(product);
        setSelectedSize(size);
        setSelectedColor(color);
        setSelectedThumbnail(thumbnail || product.thumbnail);
      } else {
        localStorage.removeItem("selectedProductData");
      }
    } else {
      const firstProduct = products[0];
      if (firstProduct) {
        setSelectedProduct(firstProduct);
        setSelectedColor(firstProduct);
        setSelectedThumbnail(firstProduct.thumbnail);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    if (selectedProduct && selectedSize && selectedColor) {
      localStorage.setItem(
        "selectedProductData",
        JSON.stringify({
          timestamp: Date.now(),
          product: selectedProduct,
          size: selectedSize,
          color: selectedColor,
          thumbnail: selectedThumbnail,
        })
      );
    }
  }, [selectedProduct, selectedSize, selectedColor, selectedThumbnail]);

  const handleSelectColor = (shirt: Product) => {
    setSelectedColor(shirt);
    setSelectedThumbnail(shirt.thumbnail);
    setSelectedProduct(shirt);
  };

  const selectedImages = useMemo(
    () => selectedColor?.images || selectedProduct?.images || [],
    [selectedColor, selectedProduct]
  );

  if (!selectedProduct) return <p>Carregando...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">
          {selectedColor?.title ||
            selectedProduct?.title ||
            "Produto sem título"}
        </h1>
        <img
          src={selectedThumbnail}
          alt={selectedProduct?.title || "Produto"}
          className="w-64 h-64 object-cover rounded-lg"
        />
        <div className="flex gap-2 mt-4">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagem ${index + 1}`}
              className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-75"
              onClick={() => setSelectedThumbnail(image)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-start space-y-4">
        <p className="text-lg font-semibold">
          R$ {selectedProduct?.price?.toFixed(2) || "Preço indisponível"}
        </p>
        <p className="text-md font-medium">
          Cor:{" "}
          {selectedColor?.title || selectedProduct?.title || "Cor não definida"}
        </p>

        <div className="flex gap-2">
          {products.map((shirt) => (
            <img
              key={shirt.id}
              src={shirt.thumbnail}
              alt={shirt.title}
              className={`w-16 h-16 object-cover rounded cursor-pointer transition-all duration-200 ${
                selectedColor?.id === shirt.id
                  ? "ring-4 ring-[#00c7c7]"
                  : "hover:ring-2 hover:ring-gray-400"
              }`}
              onClick={() => handleSelectColor(shirt)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded-lg text-lg font-semibold transition-all ${
                selectedSize === size
                  ? "border-[#00c7c7] text-[#00c7c7]"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <BuyButton label="Comprar" type="pink" />

        <hr className="my-4 border-gray-300" />

        <ZipCodeInput />
      </div>
    </div>
  );
};

export default ProductView;
