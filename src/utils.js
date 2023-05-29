/*
export const getAvailableYears = (data) => {
    return [2011, 2012, 2013]
}
*/

//! 1. Функция - getAvailableYears, которая принимает весь массив данных и возвращает массив доступных годов в виде строк:
export const getAvailableYears = (data) => {
    const years = data.map(item => item.Year.toString());
    const uniqueYears = [...new Set(years)];
    return uniqueYears
};
//! В этой функции мы использовали map, чтобы преобразовать каждый год в строку с помощью toString(). 
//! Затем мы удалили дубликаты, используя Set, и вернули уникальные годы в виде массива строк.




// Это была твоя функция, которую я переписал))
// export const getDataByTargetYear = (data, year) => {
//     return data.filter(row => row.Year === year)
// }


//! 2. Вот функция принимает год и массив данных и возвращает новый массив объектов, относящихся только к этому году:
export const getDataByYear = (data, year) => {
    return data.filter(item => item.Year === year);
};
//! Эта функция использует метод filter для отбора объектов, у которых год соответствует переданному году в виде строки. 
//! Результатом является новый массив объектов, относящихся только к указанному году.


//! 3. Вот функция - getFinancialStatistics, которая принимает массив данных date и год year и возвращает объект с двумя полями: 'Financial Statistics: number1' и 'Income Target': number2'. 
//! Первое поле содержит сумму значений свойства 'Income' из массива данных, сгруппированную по указанному году. 
//! Второе поле содержит сумму значений свойства 'Target Income' из массива данных, сгруппированную по указанному году.
export const getFinancialStatistics = (date, year) => {
    const filteredData = date.filter(item => item.Year === year);
    
    const number1 = filteredData.reduce((sum, item) => {
        return sum + item.Income;
      }, 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
    
    const number2 = filteredData.reduce((sum, item) => {
        return sum + item['Target Income'];
      }, 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
    
      return {
        'Financial Statistics': number1,
        'Income Target': number2
      };
  };
//! В этой функции я сначала использую метод filter, чтобы отфильтровать объекты с заданным годом из массива данных date. 
//! Затем использую метод reduce, чтобы получить сумму значений свойства 'Income' и 'Target Income' в отфильтрованном массиве данных. 
//! Наконец, я возвращаю объект с двумя полями, содержащими соответствующие суммы.

//! Также, я использую метод toLocaleString() с параметром undefined для форматирования чисел с запятыми после каждых трех символов 
//! и передаю опцию { maximumFractionDigits: 0 }, чтобы округлить числа до целых значений.


// Также у меня возник вопрос. По поводу правильного расположения числел в проекте, но это мы уже посмотрим с тобой лично.
  

//! 4. Вот функция, которая принимает массив данных date и год year и возвращает новый массив объектов с агрегированными значениями по месяцам:
export const aggregateDataByMonth = (date, year) => {
    const filteredData = date.filter(item => item.Year === year);
  
    const aggregatedData = filteredData.reduce((result, item) => {
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

//! В этой функции использую метод filter, чтобы отфильтровать объекты с заданным годом из массива данных date.
//! Использую метод reduce, чтобы агрегировать значения по месяцам.

//! Внутри reduce проверяю, существует ли уже объект с текущим месяцем в массиве result. 
//! Если объект с таким месяцем существует, добавляю значение дохода к существующему объекту. 
//! Если же объект с таким месяцем не найден, то создаю новый объект и добавляю его в массив result с текущим месяцем и значением дохода.
  
//! Затем, перед возвратом результата, применяю метод toLocaleString() к значению дохода с опцией { maximumFractionDigits: 0 }, 
//! чтобы получить числовое значение без плавающей точки и с запятой после каждого третьего символа.



//! 5. Вот функция, которая принимает массив данных date и год Year и возвращает массив объектов с агрегированными значениями по источникам дохода ('Income sources') (суммируя столбец Counts):
export const aggregateDataByIncomeSources = (date, Year) => {
    const filteredData = date.filter(item => item.Year === Year);
  
    const aggregatedData = filteredData.reduce((result, item) => {
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
  
//! В этой функции использую метод filter, чтобы отфильтровать объекты с заданным годом из массива данных date. 
//! Затем использую метод reduce, чтобы агрегировать значения по источникам дохода ('Income sources').

//! Внутри reduce проверяю, существует ли уже объект с текущим источником дохода в массиве result. 
//! Если объект с таким источником дохода существует, то добавляю значение количества ('Counts') к существующему объекту. 
//! Если же объект с таким источником дохода не найден, то создаю новый объект и добавляю его в массив result с текущим источником дохода и значением количества.

//! Затем мы сортируем агрегированные данные в обратном порядке (от Z до A) с помощью метода sort и функции сравнения строк localeCompare.

//! Я использую Math.floor для округления значения процентного соотношения до ближайшего целого числа.

//! Наконец, перед возвратом результата, мы применяем метод toLocaleString() к значению количества ('Counts') с опцией { maximumFractionDigits: 0 },
//! чтобы получить числовое значение с запятой после каждых трех символов.



  
  
  
  
  