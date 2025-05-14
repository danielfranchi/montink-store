const BASE_URL = "https://dummyjson.com/products/category/mens-shirts";

export const fetchMensShirts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};
