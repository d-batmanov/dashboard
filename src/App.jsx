import css from "./App.module.css";
import { ComponentText } from "./components/ComponentText/ComponentText.jsx";
import { ComponentYears } from "./components/ComponentYears/ComponentYears.jsx";
import { ComponentFinancialStatistics } from "./components/ComponentFinancialStatistics/ComponentFinancialStatistics.jsx";
import { ComponentQuantityItems } from "./components/ComponentQuantityItems/ComponentQuantityItems.jsx";
import { ComponentDataByMonth } from "./components/ComponentDataByMonth/ComponentDataByMonth.jsx";
import { ComponentAverageIncome } from "./components/ComponentAverageIncome/ComponentAverageIncome.jsx";
import { ComponentTotalOperatingProfit } from "./components/ComponentTotalOperatingProfit/ComponentTotalOperatingProfit.jsx";
import { ComponentTotalOperatingProfitForYear } from "./components/ComponentTotalOperatingProfitForYear/ComponentTotalOperatingProfitForYear.jsx";
import { ComponentDataByMarketingStrategies } from "./components/ComponentDataByMarketingStrategies/ComponentDataByMarketingStrategies.jsx";
import {
  getAvailableYears,
  getDataByYear,
  getFinancialStatistics,
  aggregateDataByMonth,
  aggregateDataByIncomeSources,
  calculateAverageIncome,
  calculateTotalOperatingProfit,
  getTotalOperatingProfitForYear,
  aggregateDataByMarketingStrategies,
  calculateIncomeRatio,
  aggregateIncomeBySource,
  aggregateDataByIncomeSourcess,
} from "./utils";
import data from "./data.xlsx?sheetjs";

import { useState } from "react";

const printData = (year) => {
  const dataByCurrentYear = getDataByYear(data, year);

  console.log("getAvailableYears", getAvailableYears(data));

  console.log("getDataByYear", getDataByYear(data, year));
  console.log(
    "getFinancialStatistics",
    getFinancialStatistics(dataByCurrentYear)
  );
  console.log("aggregateDataByMonth", aggregateDataByMonth(dataByCurrentYear));
  console.log(
    "aggregateDataByIncomeSources",
    aggregateDataByIncomeSources(dataByCurrentYear)
  );
  console.log(
    "calculateAverageIncome",
    calculateAverageIncome(dataByCurrentYear, aggregateDataByMonth)
  );
  console.log(
    "calculateTotalOperatingProfit",
    calculateTotalOperatingProfit(dataByCurrentYear)
  );
  console.log(
    "getTotalOperatingProfitForYear",
    getTotalOperatingProfitForYear(
      dataByCurrentYear,
      calculateTotalOperatingProfit
    )
  );
  console.log(
    "aggregateDataByMarketingStrategies",
    aggregateDataByMarketingStrategies(dataByCurrentYear)
  );
  console.log("calculateIncomeRatio", calculateIncomeRatio(dataByCurrentYear));
  console.log(
    "aggregateIncomeBySource",
    aggregateIncomeBySource(dataByCurrentYear)
  );
  console.log(
    "aggregateDataByIncomeSourcess",
    aggregateDataByIncomeSourcess(dataByCurrentYear)
  );
};

const App = () => {
  const [year, setYear] = useState(2022);

  const dataByCurrentYear = getDataByYear(data, year);

  printData(year);

  return (
    <div className={css.root}>
      {/* Выбрать подходяще название для компонента */}
      <div className={css.leftColumn}>
        <ComponentText />

        <ComponentYears
          years={getAvailableYears(data)}
          onYearButtonClick={setYear}
        />

        <ComponentFinancialStatistics
          financialStatistics={getFinancialStatistics(dataByCurrentYear)}
        />

        <ComponentDataByMonth data={aggregateDataByMonth(dataByCurrentYear)} />

        <ComponentQuantityItems
          quantityItems={aggregateDataByIncomeSources(dataByCurrentYear)}
        />
      </div>

      <div className={css.mainChart}>
        <div className={css.chart}>
          {calculateIncomeRatio(dataByCurrentYear)}
        </div>
      </div>

      <div className={css.rightColumn}>
        <ComponentAverageIncome
          averageIncome={calculateAverageIncome(
            dataByCurrentYear,
            aggregateDataByMonth
          )}
        />
        <div className={css.rightColumnColor}>
          <ComponentTotalOperatingProfit
            data={calculateTotalOperatingProfit(dataByCurrentYear)}
          />

          <ComponentTotalOperatingProfitForYear
            data={getTotalOperatingProfitForYear(
              dataByCurrentYear,
              calculateTotalOperatingProfit
            )}
          />
        </div>
        <ComponentDataByMarketingStrategies
          data={aggregateDataByMarketingStrategies(dataByCurrentYear)}
        />
      </div>
    </div>
  );
};

export default App;
