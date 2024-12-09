import React from 'react';
import { fakeData } from './data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { products, categories, orders } = fakeData;

  // Calculate totals
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  // Chart data (Sales per day)
  const salesByDay = orders.reduce((acc, order) => {
    const date = order.date;
    if (acc[date]) {
      acc[date] += order.total;
    } else {
      acc[date] = order.total;
    }
    return acc;
  }, {});

  const chartData = Object.keys(salesByDay).map((date) => ({
    date,
    totalSales: salesByDay[date],
  }));

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>

      {/* Metrics */}
      <div className={styles.metrics}>
        <div className={`${styles.metricCard} ${styles.totalProducts}`}>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className={`${styles.metricCard} ${styles.totalCategories}`}>
          <h3>Total Categories</h3>
          <p>{totalCategories}</p>
        </div>
        <div className={`${styles.metricCard} ${styles.totalOrders}`}>
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className={`${styles.metricCard} ${styles.totalRevenue}`}>
          <h3>Total Revenue</h3>
          <p>${totalRevenue}</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className={styles.charts}>
        <div className={styles.chart}>
          <h3>Sales by Day</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#4b49ac" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
