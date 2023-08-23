import { useState, useEffect } from "react";
import { fetchBranchData } from "../Model/model";

export function useProductPresenter() {
  const [branchData, setBranchData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = await fetchBranchData();
        setBranchData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num) => {
    return Math.floor(num).toLocaleString();
  };

  const filteredData = branchData.filter((product) =>
    product.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {
    filter,
    setFilter,
    filteredData,
    formatNumber,
    sortedData,
  };
}
