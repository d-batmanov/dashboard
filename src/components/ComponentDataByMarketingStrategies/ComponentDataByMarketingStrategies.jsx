export const ComponentDataByMarketingStrategies = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div>
        <span>{data.b2c["Marketing Strategies"]}</span>
        <span>{data.b2c.Income}</span>
        <span>{data.b2c["Процентное соотношение - Income"]}</span>
      </div>

      <div>CHART</div>

      <div>
      <span>{data.b2b["Marketing Strategies"]}</span>
        <span>{data.b2b.Income}</span>
        <span>{data.b2b["Процентное соотношение - Income"]}</span>
      </div>
    </div>
  );
};