export const fetchCepData = async (cep: string) => {
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
    );
    const data = await response.json();
    if (!("erro" in data)) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};
