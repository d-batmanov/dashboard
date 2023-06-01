export const ComponentQuantityItems = ({ quantityItems }) => {
    return (
      <div>
        <h2>Quantity of Item's</h2>
        {quantityItems.map(item => (
          <div key={item['Income sources']}>
            <p>{item['Income sources']} {item.Counts} {item['Процентное соотношение - Counts']}</p>
          </div>
        ))}
      </div>
    );
  }
  