//! 1. Функция - getAvailableYears, которая принимает весь массив данных и возвращает массив доступных годов в виде строк:
export const getAvailableYears = (data) => {
    const years = data.map(item => item.Year);
    const uniqueYears = [...new Set(years)];
    return uniqueYears
};

//! 2. Вот функция принимает год и массив данных и возвращает новый массив объектов, относящихся только к этому году:
export const getDataByYear = (data, year) => {
    return data.filter(item => item.Year === year);
};

//! 3. Вот функция - getFinancialStatistics, которая принимает массив данных date и год year и возвращает объект с двумя полями: 'Financial Statistics: number1' и 'Income Target': number2'. 
export const getFinancialStatistics = (data) => {    
    const number1 = data.reduce((sum, item) => {
        return sum + item.Income;
      }, 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
    
    const number2 = data.reduce((sum, item) => {
        return sum + item['Target Income'];
      }, 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
    
    return {
      'Financial Statistics': number1,
      'Income Target': number2
    };
  };


//! 4. Вот функция, которая принимает массив данных date и год year и возвращает новый массив объектов с агрегированными значениями по месяцам:
/*
 * TODO: Сделать для всех функций где используется подобный подход
 * 1. Убрать year из аргумента функции, функция должа принимать только аргумент data, без какой либо
 * фильтрации внутри функции, отфильтрованные данные функция получает в качестве аргумента. 
 * Сама функция должна выполнять только одно действие, которое отражено в ее названии
 */
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
      Income: item.Income.toLocaleString(undefined, { maximumFractionDigits: 0 })
    }));
  };


//! 5. Вот функция, которая принимает массив данных date и год Year и возвращает массив объектов с агрегированными значениями по источникам дохода ('Income sources') (суммируя столбец Counts):
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
  

//! 6. Вот экспортируемая функция, которая принимает массив данных, год и функцию для агрегации данных по месяцам и возвращает среднее значение дохода (Income) из функции aggregateDataByMonth.

/**
 * TODO: 
 * 1. Удалить аргумент функции aggregateDataByMonth
 * 2. Удалить year
 * 3. Переименовать date в data
 * 4. Избавить от функции aggregateDataByMonth, получать в качестве аргумента функции данные за конкретный год
 * На основе данных за год просуммировать income каждой строки и разделить результат на кол-во месяцев в году
 */
export function calculateAverageIncome(data, aggregateDataByMonth) {
    const aggregatedData = aggregateDataByMonth(data);
  
    // Суммируем доходы по месяцам
    const totalIncome = aggregatedData.reduce((sum, data) => {
      const income = parseFloat(data.Income.replace(',', ''));
      return sum + income;
    }, 0);
  
    // Вычисляем среднее значение и округляем до целого числа
    const averageIncome = Math.round(totalIncome / aggregatedData.length);
  
    return averageIncome.toLocaleString(); // Форматируем число с разделителями
  }
  
//! 7. Вот экспортируемая функция, которая принимает массив данных и год в качестве аргументов. 
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
  

//!! 8.  Вот экспортируемая функция, которая принимает функцию calculateTotalOperatingProfit, массив данных date и год year. 
export function getTotalOperatingProfitForYear(data, calculateTotalOperatingProfit) {
    const monthlyData = calculateTotalOperatingProfit(data);

    // Вычисляем сумму операционных прибылей за год
    const totalOperatingProfit = monthlyData.reduce((sum, data) => {
      const profit = parseFloat(data['operating profit'].replace(',', ''));
      return sum + profit;
    }, 0);
  
    return totalOperatingProfit.toLocaleString(); // Возвращаем сумму в виде строки
  }
  
// 9. функция, которая принимает массив данных date и год year и возвращает новый массив объектов с агрегированными значениями по полю 'Marketing Strategies' и полю 'Income'.
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
  
    return modifiedData;
  };
  
// 10 функция
export const calculateIncomeRatio = (data) => {
    const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.Income), 0);
    const totalTargetIncome = data.reduce((sum, item) => sum + parseFloat(item['Target Income']), 0);
  
    const incomeRatio = (totalIncome / totalTargetIncome) * 100;
  
    return incomeRatio.toFixed(0) + '%'; 
  };

// 11 функция 
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
      Income: income.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }));
  
    return aggregatedData;
  };
  
// 12 функция (листья)


  
  
  
  
  