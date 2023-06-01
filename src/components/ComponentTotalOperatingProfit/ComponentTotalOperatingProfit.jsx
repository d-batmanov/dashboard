import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

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
      type: 'bar', // Use 'bar' for a column chart
      data: {
        labels: reversedData.map(item => item.Month),
        datasets: [
          {
            label: 'Operating Profit',
            data: reversedData.map(item => item['operating profit']),
            backgroundColor: ctx.createLinearGradient(0, 0, chartContainerRef.current.width, 0), // Change the gradient coordinates
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y', // Rotate the chart 90 degrees to the right
        scales: {
          x: {
            display: false, // Hide the X axis
          },
          y: {
            beginAtZero: true,
            max: Math.max(...reversedData.map(item => item['operating profit'])) + 5000, // Adjust the maximum value of the y-axis if needed
          },
        },
      },
    });

    // Set the gradient colors for the bars
    const gradient = chartInstanceRef.current.config.data.datasets[0].backgroundColor;
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'rgba(150, 0, 255, 1)');
  }, [data]);

  return <canvas ref={chartContainerRef} />;
};


