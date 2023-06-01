export const ComponentFinancialStatistics = ({ financialStatistics }) => {
  return (
    <div>
      <h2>Financial Statistics</h2>
      <p>{financialStatistics['Financial Statistics']}</p>
      <p>Income Target {financialStatistics['Income Target']}</p>
    </div>
  );
}

