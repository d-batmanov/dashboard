import './App.css'
import { getAvailableYears, getDataByYear, getFinancialStatistics, aggregateDataByMonth, aggregateDataByIncomeSources } from './utils'
import data from './data.xlsx?sheetjs';

// getDataByTargetYear


const App = () => {
  console.log('getAvailableYears', getAvailableYears(data))
  // console.log('getDataByTargetYear', getDataByTargetYear(data, 2020))
  // console.log(data)
  const year = 2022;
  console.log('getDataByYear', getDataByYear(data, year))
  
  console.log('getFinancialStatistics', getFinancialStatistics(data, year))

  console.log('aggregateDataByMonth', aggregateDataByMonth(data, year))
  
  console.log('aggregateDataByIncomeSources', aggregateDataByIncomeSources(data, year))
  
  return (
    <>
      <h1> My dashboard</h1>
    </>
  )
}

export default App




