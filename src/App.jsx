import './App.css'
import { ComponentText } from "/Users/vladimirbatmanov/Desktop/projects/dashboard/src/components/ComponentText/ComponentText.jsx";
import { ComponentYears } from '/Users/vladimirbatmanov/Desktop/projects/dashboard/src/components/ComponentYears/ComponentYears.jsx';
import { ComponentFinancialStatistics } from '/Users/vladimirbatmanov/Desktop/projects/dashboard/src/components/ComponentFinancialStatistics/ComponentFinancialStatistics.jsx';
import { ComponentQuantityItems } from '/Users/vladimirbatmanov/Desktop/projects/dashboard/src/components/ComponentQuantityItems/ComponentQuantityItems.jsx';
//import { ComponentDataByMonth } from '/Users/vladimirbatmanov/Desktop/projects/dashboard/src/components/ComponentDataByMonth/ComponentDataByMonth.jsx';
import { getAvailableYears, getDataByYear, getFinancialStatistics, aggregateDataByMonth, aggregateDataByIncomeSources, calculateAverageIncome, calculateTotalOperatingProfit, getTotalOperatingProfitForYear, aggregateDataByMarketingStrategies, calculateIncomeRatio, aggregateIncomeBySource} from './utils'
import data from './data.xlsx?sheetjs';

// getDataByTargetYear


const App = () => {
  console.log('getAvailableYears', getAvailableYears(data))
  
  const year = 2022;

  const dataByCurrentYear = getDataByYear(data, year)

  console.log('getDataByYear', getDataByYear(data, year))
  
  console.log('getFinancialStatistics', getFinancialStatistics(dataByCurrentYear))

  console.log('aggregateDataByMonth', aggregateDataByMonth(dataByCurrentYear))
  
  console.log('aggregateDataByIncomeSources', aggregateDataByIncomeSources(dataByCurrentYear))
  
  console.log('calculateAverageIncome', calculateAverageIncome(dataByCurrentYear, aggregateDataByMonth))
  
  console.log('calculateTotalOperatingProfit', calculateTotalOperatingProfit(dataByCurrentYear))
  
  console.log('getTotalOperatingProfitForYear', getTotalOperatingProfitForYear(dataByCurrentYear, calculateTotalOperatingProfit))
  
  console.log('aggregateDataByMarketingStrategies', aggregateDataByMarketingStrategies(dataByCurrentYear))
  
  console.log('calculateIncomeRatio', calculateIncomeRatio(dataByCurrentYear))
  
  console.log('aggregateIncomeBySource', aggregateIncomeBySource(dataByCurrentYear))

  
  return (
    <div>
      <h1>My Dashboard</h1>
      <ComponentText /> {/* Render the ComponentText component */}
      <ComponentYears years={getAvailableYears(data)} />
      <ComponentFinancialStatistics financialStatistics={getFinancialStatistics(dataByCurrentYear)} />

      <ComponentQuantityItems quantityItems={aggregateDataByIncomeSources(dataByCurrentYear)} />
    </div>

  )
}

export default App




