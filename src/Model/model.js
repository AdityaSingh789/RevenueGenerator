export async function fetchBranchData() {
  try {
    const responses = await Promise.all([
      fetch("/api/branch1.json"),
      fetch("/api/branch2.json"),
      fetch("/api/branch3.json"),
    ]);

    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    const mergedData = [];
    data.forEach((branch) => {
      branch.products.forEach((product) => {
        const existingProductIndex = mergedData.findIndex(
          (item) => item.name === product.name
        );
        if (existingProductIndex !== -1) {
          mergedData[existingProductIndex].sold += product.sold;
        } else {
          mergedData.push({ ...product });
        }
      });
    });

    return mergedData;
  } catch (error) {
    throw new Error("Error fetching and processing data:", error);
  }
}
