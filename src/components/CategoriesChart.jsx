import React from "react";
import style from "../css/CategoriesChart.module.css";
import { PieChart, Tooltip, Pie, Cell } from "recharts";

const CategoriesChart = ({ data }) => {
  const COLORS = ["#f08080", "#f4978e", "#f8ad9d", "#fbc4ab", "#ffdab9"];

  const newDataTotalPerCategory = [];

  const getCategoryTotal = (category) => {
    return Math.abs(
      data
        .filter((item) => item.category === category)
        .map((item) => item.amount)
        .reduce((a, b) => a + b, 0)
    );
  };

  const householdTotal = getCategoryTotal("Household");
  const transportTotal = getCategoryTotal("Transport");
  const foodTotal = getCategoryTotal("Food");
  const shoppingTotal = getCategoryTotal("Shopping");
  const otherTotal = getCategoryTotal("Other");

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

  let renderLabel = function (spentData) {
    if (spentData.amount !== 0) {
      return spentData.category;
    }
  };

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
              innerRadius={30}
              outerRadius={65}
              stroke="#fff"
              fill="#ffdab9"
              label={renderLabel}
              labelLine={false}
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
