import React from "react";
import "./view.css";
import { useProductPresenter } from "../Presenter/presenter";

function SingleFileApp() {
  const { filter, setFilter, filteredData, formatNumber, sortedData } =
    useProductPresenter();

  return (
    <div className="container">
      <h1>Revenue Aggregator App</h1>
      <input
        type="text"
        placeholder="Filter by product name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{formatNumber(product.unitPrice * product.sold)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              ₹
              {formatNumber(
                filteredData.reduce(
                  (sum, product) => sum + product.unitPrice * product.sold,
                  0
                )
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default SingleFileApp;
