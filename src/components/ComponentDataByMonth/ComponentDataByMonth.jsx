import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const ComponentDataByMonth = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const formattedData = data.map(item => ({
      Month: item.Month,
      Income: parseFloat(item.Income.replace(',', '')),
    }));

    const ctx = chartContainerRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous chart instance
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: formattedData.map(item => item.Month),
        datasets: [
          {
            label: 'Income',
            data: formattedData.map(item => item.Income),
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            fill: {
              target: 'origin',
              above: 'rgba(0, 123, 255, 0.2)',
              below: 'rgba(0, 123, 255, 0)',
            },
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartContainerRef} />;
};
