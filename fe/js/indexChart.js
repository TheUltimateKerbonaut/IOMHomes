var ctx = document.getElementById('volumeChart').getContext('2d');

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(1.0, "#2ed06e");
gradientStroke.addColorStop(0.0, "#007bff");

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: [{
            label: '# of properties sold',
            data: [37, 26, 101, 587, 667, 900, 1412, 1677, 1274, 1223, 1853, 1467, 1388, 1599, 1675, 1741, 1855, 2018, 1963],
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