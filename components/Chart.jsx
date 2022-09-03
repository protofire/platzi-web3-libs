import React, { useState, useEffect, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ options }) {
  const [windowDimension, setWindowDimension] = useState({
    width: undefined,
    height: undefined,
  });

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  const data = {
    labels: options.map((option) => option.name),
    datasets: [
      {
        label: "# of Votes",
        data: options.map((option) => option.votes),
        backgroundColor: [
          "rgba(255,99,132,0.5)", // Pink
          "rgba(75,192,192,0.5)", // Blue
          "rgba(241,90,34,0.5)",
          "rgba(255,206,86,0.5)",
          "rgba(255,159,10,0.5)",
          "rgba(54,162,235,0.5)",
          "rgba(153,102,255,0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Pink
          "rgba(75, 192, 192, 1)", // Blue
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(241, 90, 34, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const width = windowDimension.width >= 1440 ? 1500 : 350;
  const height = windowDimension.height >= 900 ? 1500 : 350;

  return (
    <div className="w-full h-full drop-shadow-[2px_2px_10px_rgba(255,255,255,0.25)]">
      <Doughnut
        data={data}
        width={width}
        height={height}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </div>
  );
}

export default React.memo(Chart);
