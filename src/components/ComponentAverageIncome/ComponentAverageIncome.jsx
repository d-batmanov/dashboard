import css from "./ComponentAverageIncome.module.css";

export const ComponentAverageIncome = ({ averageIncome }) => {
    return (
        <div className={css.root}>
            <p className={css.averageIncomeNumber}>{averageIncome}</p>
            <p className={css.averageText}>Average</p>
            <p className={css.monthlyIncomeText}>Monthly income</p>
        </div>
    )
  };