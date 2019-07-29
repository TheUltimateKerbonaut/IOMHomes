var ctx = document.getElementById('volumeChart').getContext('2d');

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(1.0, "#2ed06e");
gradientStroke.addColorStop(0.0, "#007bff");

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2000', '2001', '2002', '2003', '2004', '2000', '2001', '2002', '2003', '2004'],
        datasets: [{
            label: '# of properties sold',
            data: [1, 1, 3, 5, 7, 15, 12, 13, 7, 4],
            backgroundColor: "transparent",
            borderColor: gradientStroke,
            borderWidth: 5
        }]
    },
    options: {
        
        legend: {
            display: false,
        },

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: true,
        responsiveAnimationDuration: 1000,
        maintainAspectRatio: false
    }
});