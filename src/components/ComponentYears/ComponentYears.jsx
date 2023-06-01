
export const ComponentYears = ({ years }) => {
    return (
      <div>
        {
        years.map(year => 
            <div key={year}>
                {year}
            </div>)
        }
      </div>
    );
  }
  
