export const getAvailableYears = (data) => {
    const years = data.map(item => item.Year);
    const uniqueYears = [...new Set(years)];
    return uniqueYears
};

export const getDataByYear = (data, year) => {
    return data.filter(item => item.Year === year);
};

export const getFinancialStatistics = (data) => {    
    const number1 = data.reduce((sum, item) => {
        return sum + item['Target Income'];
      }, 0);
      
    const number2 = data.reduce((sum, item) => {
        return sum + item.Income;
      }, 0);
    
    return {
      'Financial Statistics': number1,
      'Income Target': number2
    };
  };

export const aggregateDataByMonth = (data) => {
    const aggregatedData = data.reduce((result, item) => {
      const month = item.Month;
      const income = item.Income;
  
      const existingMonth = result.find(obj => obj.Month === month);
      if (existingMonth) {
        existingMonth.Income += income;
      } else {
        result.push({ Month: month, Income: income });
      }
  
      return result;
    }, []);
  
    return aggregatedData.map(item => ({
      Month: item.Month,
      Income: item.Income
    }));
  };

export const aggregateDataByIncomeSources = (data) => {

    const aggregatedData = data.reduce((result, item) => {
      const incomeSource = item['Income sources'];
      const counts = item.Counts;
  
      const existingSource = result.find(obj => obj['Income sources'] === incomeSource);
      if (existingSource) {
        existingSource.Counts += counts;
      } else {
        result.push({ 'Income sources': incomeSource, Counts: counts });
      }
  
      return result;
    }, []);

    const sortedData = aggregatedData.sort((a, b) => b['Income sources'].localeCompare(a['Income sources']));
  
    const modifiedData = sortedData.map(item => ({
      'Income sources': item['Income sources'],
      'Процентное соотношение - Counts': `${Math.floor((item.Counts / aggregatedData.reduce((total, obj) => total + obj.Counts, 0)) * 100)}%`,
      Counts: item.Counts.toLocaleString(undefined, { maximumFractionDigits: 0 })
    }));
  
    // Изменяем порядок вывода объектов "Advertising" и "Asset sale"
    const advertisingIndex = modifiedData.findIndex(item => item['Income sources'] === 'Advertising');
    const assetSaleIndex = modifiedData.findIndex(item => item['Income sources'] === 'Asset sale');
  
    if (advertisingIndex !== -1 && assetSaleIndex !== -1) {
      [modifiedData[advertisingIndex], modifiedData[assetSaleIndex]] = [modifiedData[assetSaleIndex], modifiedData[advertisingIndex]];
    }
  
    return modifiedData;
  };
  
export function calculateAverageIncome(data, aggregateDataByMonth) {
    const aggregatedData = aggregateDataByMonth(data);

    const totalIncome = aggregatedData.reduce((sum, data) => {
      const income = parseFloat(data.Income);
      return sum + income;
    }, 0);
  
    const averageIncome = Math.round(totalIncome / aggregatedData.length);
  
    return averageIncome.toLocaleString(); // Форматируем число с разделителями
  }
  
export const calculateTotalOperatingProfit = (data) => {
  
    const aggregatedData = data.reduce((result, item) => {
      const month = item.Month;
      const operatingProfit = item['operating profit'];
  
      const existingMonth = result.find(obj => obj.Month === month);
      if (existingMonth) {
        existingMonth['operating profit'] += operatingProfit;
      } else {
        result.push({ Month: month, 'operating profit': operatingProfit });
      }
  
      return result;
    }, []);
  
    return aggregatedData.map(item => ({
      Month: item.Month,
      'operating profit': item['operating profit'].toLocaleString(undefined, { maximumFractionDigits: 0 })
    }));
  };
  
export function getTotalOperatingProfitForYear(data, calculateTotalOperatingProfit) {
    const monthlyData = calculateTotalOperatingProfit(data);

    const totalOperatingProfit = monthlyData.reduce((sum, data) => {
      const profit = parseFloat(data['operating profit'].replace(',', ''));
      return sum + profit;
    }, 0);
  
    return totalOperatingProfit.toLocaleString(); // Возвращаем сумму в виде строки
  }
  
export const aggregateDataByMarketingStrategies = (data) => {
  
    const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.Income), 0);
  
    const aggregatedData = data.reduce((result, item) => {
      const strategy = item['Marketing Strategies'];
      const income = parseFloat(item.Income);
      const percentage = ((income / totalIncome) * 100).toFixed(2) + '%';
  
      const existingStrategy = result.find(obj => obj['Marketing Strategies'] === strategy);
      if (existingStrategy) {
        existingStrategy.Income += income;
        existingStrategy['Процентное соотношение - Income'] = ((existingStrategy.Income / totalIncome) * 100).toFixed(2) + '%';
      } else {
        result.push({
          'Marketing Strategies': strategy,
          Income: income,
          'Процентное соотношение - Income': percentage
        });
      }
  
      return result;
    }, []);
  
    const modifiedData = aggregatedData.map(item => ({
      'Marketing Strategies': item['Marketing Strategies'],
      Income: Math.round(item.Income).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      'Процентное соотношение - Income': item['Процентное соотношение - Income']
    }));
  
    return {
      b2b: modifiedData[0],
      b2c: modifiedData[1],
    };
  };

export const calculateIncomeRatio = (data) => {
    const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.Income), 0);
    const totalTargetIncome = data.reduce((sum, item) => sum + parseFloat(item['Target Income']), 0);
  
    const incomeRatio = (totalIncome / totalTargetIncome) * 100;
  
    return incomeRatio.toFixed(0) + '%'; 
  };

export const aggregateIncomeBySource = (data) => {
    const incomeBySource = data.reduce((result, item) => {
      const source = item['Income sources'];
      const income = parseFloat(item.Income);
  
      if (result[source]) {
        result[source] += income;
      } else {
        result[source] = income;
      }
  
      return result;
    }, {});
  
    const aggregatedData = Object.entries(incomeBySource).map(([source, income]) => ({
      'Income sources': source,
      Income: income
    }));
  
    return aggregatedData;
  };
  
// 12 функция (листья)

export const aggregateDataByIncomeSourcess = (data) => {

  // Вычисляем общую сумму 'Income' для процентного соотношения
  const totalIncome = data.reduce((sum, item) => {
    return sum + parseFloat(item.Income);
  }, 0);

  // Группируем данные по 'Income sources' и вычисляем сумму по 'Income' и процентное соотношение
  const incomeSourcesData = data.reduce((result, item) => {
    const incomeSource = item['Income sources'];
    const income = parseFloat(item.Income);
    const percentage = ((income / totalIncome) * 100).toFixed(2) + '%';

    if (!result.hasOwnProperty(incomeSource)) {
      result[incomeSource] = {
        income: 0,
        percentage: 0
      };
    }

    result[incomeSource].income += income;
    result[incomeSource].percentage = ((result[incomeSource].income / totalIncome) * 100).toFixed(2) + '%';

    return result;
  }, {});

  // Группируем данные по 'Income sources' и 'Income Breakdowns' и вычисляем сумму по 'Income' и процентное соотношение
  const incomeBreakdownsData = data.reduce((result, item) => {
    const incomeSource = item['Income sources'];
    const incomeBreakdown = item['Income Breakdowns'];
    const income = parseFloat(item.Income);
    const percentage = ((income / totalIncome) * 100).toFixed(2) + '%';

    if (!result.hasOwnProperty(incomeSource)) {
      result[incomeSource] = {};
    }

    if (!result[incomeSource].hasOwnProperty(incomeBreakdown)) {
      result[incomeSource][incomeBreakdown] = {
        income: 0,
        percentage: 0
      };
    }

    result[incomeSource][incomeBreakdown].income += income;
    result[incomeSource][incomeBreakdown].percentage = ((result[incomeSource][incomeBreakdown].income / totalIncome) * 100).toFixed(2) + '%';

    return result;
  }, {});

  return {
    incomeSourcesData,
    incomeBreakdownsData
  };
}

  

  
  
  
  