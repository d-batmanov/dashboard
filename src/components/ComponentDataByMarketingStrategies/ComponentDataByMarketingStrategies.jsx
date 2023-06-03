import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import css from "./ComponentDataByMarketingStrategies.module.css";

export const ComponentDataByMarketingStrategies = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const incomeData = {
      b2b: parseFloat(data.b2b.Income.replace(",", "")),
      b2c: parseFloat(data.b2c.Income.replace(",", "")),
    };

    const ctx = chartContainerRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous chart instance
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["B2B", "B2C"],
        datasets: [
          {
            label: "Income",
            data: [incomeData.b2b, incomeData.b2c],
            backgroundColor: ["rgba(0, 123, 255, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(0, 123, 255, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data]);

  return (
    <div className={css.root}>
      <div>
        <span>{data.b2b["Marketing Strategies"]}</span>
        <span>{data.b2b.Income}</span>
        <span>{data.b2b["Процентное соотношение - Income"]}</span> 
      </div>

      <div className={css.chartContainerWrapper}>
        <canvas ref={chartContainerRef} className={css.chartContainer} />
      </div>

      <div>
        <span>{data.b2c["Процентное соотношение - Income"]}</span>
        <span>{data.b2c.Income}</span>
        <span>{data.b2c["Marketing Strategies"]}</span>  
      </div>
    </div>
  );
};
