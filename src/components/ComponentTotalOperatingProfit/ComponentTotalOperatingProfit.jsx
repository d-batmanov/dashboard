import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import css from "./ComponentTotalOperatingProfit.module.css";

export const ComponentTotalOperatingProfit = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const formattedData = data.map(item => ({
      Month: item.Month,
      'operating profit': parseFloat(item['operating profit'].replace(',', '')),
    }));

    const reversedData = formattedData.reverse(); // Reverse the data array

    const ctx = chartContainerRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous chart instance
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: reversedData.map(item => item.Month),
        datasets: [
          {
            label: 'Operating Profit',
            data: reversedData.map(item => item['operating profit']),
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: false,
            max: Math.max(...reversedData.map(item => item['operating profit'])) + 5000,
          },
        },
      },
    });
  }, [data]);

  return (
    <div className={css.root}>
      <p>Operating</p>
      <p>Profits</p>
      <canvas ref={chartContainerRef} className={css.chart} />
    </div>
  );
};
