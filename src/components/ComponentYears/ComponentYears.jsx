import css from "./ComponentYears.module.css";

/**
 * Добавить отдельный props activeYear, который будет принимать текущий выбранный год
 * В className добавить условие, если activeYear === year, то мы устанавливаем этот класс на элемент
 */
export const ComponentYears = ({ years, onYearButtonClick }) => {
  return (
    <div className={css.root}>
      {years.map((year) => (
        <button
          type="button"
          className={css.yearButton}
          key={year}
          onClick={() => onYearButtonClick(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
