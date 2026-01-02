import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Charts = () => {
  const lineRef = useRef(null);
  const donutRef = useRef(null);

  useEffect(() => {
    // Line chart (Sales)
    const ctx = lineRef.current.getContext("2d");
    const lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          label: "Sales",
          data: [250,450,700,600,520,610,720,670,550,610,720,900],
          borderColor: "#ec4899",
          backgroundColor: "rgba(236,72,153,0.12)",
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { display: false }, ticks: { color: "#666" } },
          x: { grid: { display: false }, ticks: { color: "#666" } }
        }
      }
    });

    // Donut (popular food)
    const dctx = donutRef.current.getContext("2d");
    const donutChart = new Chart(dctx, {
      type: "doughnut",
      data: {
        labels: ["Nougat Food", "Fudge Food", "Jeon Food"],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: ["#f472b6","#fb7185","#ef4444"]
        }]
      },
      options: {
        cutout: "70%",
        plugins: {
          legend: { position: "bottom", labels: { color: "#444" } }
        }
      }
    });

    return () => { lineChart.destroy(); donutChart.destroy(); };
  }, []);

  return (
    <div className="card">
      <h4>Sales Figures</h4>
      <div style={{ height: 300 }}>
        <canvas ref={lineRef} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <div className="card-small">
          <h5>Popular Food</h5>
          <div style={{ height: 150 }}>
            <canvas ref={donutRef} />
          </div>
        </div>

        <div className="card-small">
          <h5>Weekly Goal</h5>
          <div className="donut-wrap-small">
            <div className="donut">72%</div>
            <p className="muted">₹786.58</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
