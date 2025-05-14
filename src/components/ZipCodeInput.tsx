import { useState, useEffect } from "react";

import BuyButton from "./BuyButton";

import { fetchCepData } from "../services/cepService";

import type { AddressData } from "../types/ZipCodeInput";

const ZipCodeInput = () => {
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCep = localStorage.getItem("cepData");
    if (savedCep) {
      const { timestamp, data } = JSON.parse(savedCep);
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        setAddress(data as AddressData);
      } else {
        localStorage.removeItem("cepData");
      }
    }
  }, []);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedCep = e.target.value.replace(/\D/g, "");
    formattedCep = formattedCep.replace(/(\d{5})(\d)/, "$1-$2");
    setZipCode(formattedCep);
  };

  const handleSearch = async () => {
    if (zipCode.length < 9) return;
    setLoading(true);
    const data = await fetchCepData(zipCode);
    if (data) {
      setAddress(data);
      localStorage.setItem(
        "cepData",
        JSON.stringify({ timestamp: Date.now(), data })
      );
    }
    setLoading(false);
  };

  const resetSearch = () => {
    setAddress(null);
    setZipCode("");
    localStorage.removeItem("cepData");
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {!address ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Insira seu CEP"
            value={zipCode}
            onChange={handleZipCodeChange}
            className="border border-gray-300 rounded p-3 w-48 text-center"
          />
          <BuyButton
            label={loading ? "Consultando..." : "Consultar"}
            type="teal"
            onClick={handleSearch}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-md font-medium">
            📍 {address.logradouro}, {address.bairro} - {address.localidade}/
            {address.uf}
          </p>
          <BuyButton label="Nova Consulta" type="teal" onClick={resetSearch} />
        </div>
      )}
    </div>
  );
};

export default ZipCodeInput;
