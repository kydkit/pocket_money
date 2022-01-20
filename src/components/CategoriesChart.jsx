import style from "../css/CategoriesChart.module.css";
import { PieChart, Tooltip, Pie, Cell, Legend } from "recharts";

const CategoriesChart = ({ data }) => {
  const COLORS = ["#070760", "#4c4c9d", "#9d9df7", "#d0d0ff", "#262651"];

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

  return data.length ? (
    <>
      <div className={style.container}>
        <p className={style.mainText}>Spent by category</p>

        <PieChart width={320} height={250}>
          <Pie
            data={newDataTotalPerCategory}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            stroke="#fff"
            fill="#262651"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Legend align="center" /> */}
          <Tooltip />
        </PieChart>
      </div>
    </>
  ) : (
    ""
  );
};

export default CategoriesChart;
