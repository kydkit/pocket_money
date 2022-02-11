import React from "react";
import style from "../css/CategoriesChart.module.css";
import { PieChart, Tooltip, Pie, Cell } from "recharts";

const CategoriesChart = ({ data }) => {
  const COLORS = ["#014f86", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"];

  const newDataTotalPerCategory = [];

  const householdTotal = Math.abs(
    data
      .filter((item) => item.category === "Household")
      .map((item) => item.amount)
      .reduce((a, b) => a + b, 0)
  );

  const transportTotal = Math.abs(
    data
      .filter((item) => item.category === "Transport")
      .map((item) => item.amount)
      .reduce((a, b) => a + b, 0)
  );

  const foodTotal = Math.abs(
    data
      .filter((item) => item.category === "Food")
      .map((item) => item.amount)
      .reduce((a, b) => a + b, 0)
  );

  const shoppingTotal = Math.abs(
    data
      .filter((item) => item.category === "Shopping")
      .map((item) => item.amount)
      .reduce((a, b) => a + b, 0)
  );

  const otherTotal = Math.abs(
    data
      .filter((item) => item.category === "Other")
      .map((item) => item.amount)
      .reduce((a, b) => a + b, 0)
  );

  newDataTotalPerCategory.push(
    { category: "Household", amount: householdTotal },
    {
      category: "Transport",
      amount: transportTotal,
    },
    { category: "Food", amount: foodTotal },
    { category: "Shopping", amount: shoppingTotal },
    { category: "Other", amount: otherTotal }
  );

  const spentData = data.filter(
    (item) => item.category !== "Savings" && item.category !== "Income"
  );

  return (
    <>
      <div className={style.container}>
        <p className={style.mainText}>Spent by category</p>
        {spentData.length ? (
          <PieChart width={320} height={250}>
            <Pie
              data={newDataTotalPerCategory}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={90}
              stroke="#fff"
              fill="#90e0ef"
            >
              {spentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <div className={style.emptyPieContainer}>
            <img src="assets/chart-pie-solid.svg" alt="pie chart" />
            <p>Start adding your withdrawal transactions to activate graph</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesChart;
