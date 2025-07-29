// Generate mock daily yield data for the last 90 days
export const mockYieldHistory = (() => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.unshift({
      date: date.toISOString().slice(0, 10),
      yieldPct: +(Math.random() * 0.2 + 0.05).toFixed(3), // 5%-25% APY translated to daily rate placeholder
    });
  }
  return data;
})();