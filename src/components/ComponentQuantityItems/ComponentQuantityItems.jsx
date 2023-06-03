import css from './ComponentQuantityItems.module.css';

export const ComponentQuantityItems = ({ quantityItems }) => {
  return (
    <div className={css.root}>
      <h2 className={css.title}>Quantity of Item's</h2>
      {quantityItems.map((item) => (
        <div className={css.row} key={item["Income sources"]}>
          <span className={css.rowTitle}>{item["Income sources"]}</span>
          <span className={css.value}>{item["Процентное соотношение - Counts"]}</span>
          <span className={css.value}>{item.Counts}</span>
          <div className={css.dot}></div>
        </div>
      ))}
    </div>
  );
};
