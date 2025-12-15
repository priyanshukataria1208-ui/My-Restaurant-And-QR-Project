import React from "react";

/* Top 4 stat cards */
const TopStats = () => {
  const cards = [
    { title: "Orders", value: "1,248", subtitle: "weekly" },
    { title: "Customers", value: "9,445", subtitle: "total" },
    { title: "Menu", value: "539", subtitle: "items" },
    { title: "Income", value: "$18,445", subtitle: "monthly" },
  ];

  return (
    <div className="topstats">
      {cards.map((c, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-left">
            <div className="stat-icon" />
            <div>
              <div className="stat-title">{c.title}</div>
              <div className="stat-value">{c.value}</div>
            </div>
          </div>
          <div className="stat-chart"> {/* mini sparkline placeholder */} </div>
        </div>
      ))}
    </div>
  );
};

export default TopStats;
