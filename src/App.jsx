import './App.css'
import { getAvailableYears, getDataByYear, getFinancialStatistics, aggregateDataByMonth, aggregateDataByIncomeSources, calculateAverageIncome, calculateTotalOperatingProfit, getTotalOperatingProfitForYear, aggregateDataByMarketingStrategies, calculateIncomeRatio, aggregateIncomeBySource} from './utils'
import data from './data.xlsx?sheetjs';

// getDataByTargetYear


const App = () => {
  console.log('getAvailableYears', getAvailableYears(data))
  // console.log('getDataByTargetYear', getDataByTargetYear(data, 2020))
  // console.log(data)
  const year = 2021;

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
    <>
      <h1> My dashboard</h1>
    </>
  )
}

export default App




