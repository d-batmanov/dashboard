import css from './ComponentFinancialStatistics.module.css'

export const ComponentFinancialStatistics = ({ financialStatistics }) => {
  return (
    <div className={css.root}>
      <h2 className={css.title}>Financial Statistics</h2>

      <p className={css.statisticValue}>
        {financialStatistics['Financial Statistics'].toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </p>

      <p>
        Income Target {financialStatistics['Income Target'].toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </p>
    </div>
  );
}

