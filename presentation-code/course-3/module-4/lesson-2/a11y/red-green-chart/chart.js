document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("statusChart").getContext("2d");

  // Pure red and green colors which are problematic for red-green color blindness
  const colors = {
    online: "#28a745", // Green
    offline: "#dc3545", // Red
  };

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Online Services", "Offline Services"],
      datasets: [
        {
          data: [82, 18],
          backgroundColor: [colors.online, colors.offline],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            font: {
              family: "Outfit",
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return ` ${context.label}: ${context.raw}%`;
            },
          },
        },
      },
      cutout: "70%",
    },
  });
});
