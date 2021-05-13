var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const pricePrediction = {
  data: {
    // labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    // series: [[2, 1, 3.5, 7, 3]]
    labels: ["2020", "2025", "2030", "2035", "2040", "2045"],
    series: [[1.25, 1.4, 1.8, 2, 2, 2.2]],
  },
  options: {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
    // lineSmooth: Chartist.Interpolation.cardinal({
    //   tension: 0,
    // }),
    // low: 0,
    // high: 3, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    // chartPadding: {
    //   top: 0,
    //   right: 0,
    //   bottom: 0,
    //   left: 0,
    // },
  },
  // for animation
  animation: {
    // draw: function (data) {
    //   if (data.type === "line" || data.type === "area") {
    //     data.element.animate({
    //       d: {
    //         begin: 600,
    //         dur: 700,
    //         from: data.path
    //           .clone()
    //           .scale(1, 0)
    //           .translate(0, data.chartRect.height())
    //           .stringify(),
    //         to: data.path.clone().stringify(),
    //         easing: Chartist.Svg.Easing.easeOutQuint,
    //       },
    //     });
    //   } else if (data.type === "point") {
    //     data.element.animate({
    //       opacity: {
    //         begin: (data.index + 1) * delays,
    //         dur: durations,
    //         from: 0,
    //         to: 1,
    //         easing: "ease",
    //       },
    //     });
    //   }
    // },
  },
};

// ##############################
// // // Email Subscriptions
// #############################

const featuresImpacts = {
  data: {
    labels: [
      "Group A",
      "Group B",
      "Group C",
      "Group D",
    ],
    series: [
      [5, 4, 3, 7],
      [3, 2, 9, 5],
      [1, 5, 8, 4],
      [2, 3, 4, 6],
      [4, 1, 2, 1]
    ]
  },
  options: {
    // Default mobile configuration
  stackBars: true,
  axisX: {
    labelInterpolationFnc: function(value) {
      return value.split(/\s+/).map(function(word) {
        return word[0];
      }).join('');
    }
  },
  axisY: {
    offset: 20
  }
    // axisX: {
    //   showGrid: false,
    // },
    // low: 0,
    // high: 1000,
    // chartPadding: {
    //   top: 0,
    //   right: 5,
    //   bottom: 0,
    //   left: 0,
    // },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = {
  data: {
    labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

module.exports = {
  dailySalesChart: pricePrediction,
  emailsSubscriptionChart: featuresImpacts,
  completedTasksChart,
};