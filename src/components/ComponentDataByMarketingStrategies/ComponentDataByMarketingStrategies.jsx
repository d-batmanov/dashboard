import React from 'react';

export const ComponentDataByMarketingStrategies = ({ data }) => {
    
    return (
        <div>
        <h2>Данные по маркетинговым стратегиям</h2>
        <table>
            <thead>
            <tr>
                <th>Маркетинговая стратегия</th>
                <th>Доход</th>
                <th>Процентное соотношение</th>
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <tr key={item['Marketing Strategies']}>
                <td>{item['Marketing Strategies']}</td>
                <td>{item.Income}</td>
                <td>{item['Процентное соотношение - Income']}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};




