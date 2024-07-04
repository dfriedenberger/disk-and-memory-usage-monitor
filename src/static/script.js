$(document).ready(function() {
    $("#start-date, #end-date").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#time-range").change(function() {
        if ($(this).val() === "custom") {
            $("#custom-date-range").show();
        } else {
            $("#custom-date-range").hide();
        }
    });

    // Default to last month
    $("#time-range").val("1_month");
    let end = new Date();
    let start = new Date(end.getFullYear(), end.getMonth() - 1, end.getDate());
    start = start.toISOString();
    end = end.toISOString();

    fetchDiskUsageHistory(start, end);
    fetchMemoryUsageHistory(start, end);

    $("#update-range").click(function() {
        const range = $("#time-range").val();
        let start, end;
        if (range === "custom") {
            start = $("#start-date").val();
            end = $("#end-date").val();
        } else {
            end = new Date();
            switch (range) {
                case "3_hours":
                    start = new Date(end.getTime() - 3 * 60 * 60 * 1000);
                    break;
                case "1_day":
                    start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
                    break;
                case "1_week":
                    start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case "1_month":
                    start = new Date(end.getFullYear(), end.getMonth() - 1, end.getDate());
                    break;
            }
            start = start.toISOString();
            end = end.toISOString();
        }
        fetchDiskUsageHistory(start, end);
        fetchMemoryUsageHistory(start, end);
    });

    fetchDiskUsage();
    fetchMemoryUsage();
    setInterval(fetchDiskUsage, 60000); // Update every 60 seconds
    setInterval(fetchMemoryUsage, 60000); // Update every 60 seconds
});

var charts = {}

function fetchDiskUsage() {
    $.get('/disk-usage', function(data) {
        $('#disk-total').text(data.total);
        $('#disk-used').text(data.used);
        $('#disk-available').text(data.available);
        $('#disk-percent').text(data.percent);
        updateChart('disk-chart', 'Disk Usage', {
            used: parseFloat(data.used.replace('G', '')),
            available: parseFloat(data.available.replace('G', '')),
            percent: parseFloat(data.percent.replace('%', ''))
        });
    });
}

function fetchMemoryUsage() {
    $.get('/memory-usage', function(data) {
        $('#memory-total').text(`${data.total_memory} MB`);
        $('#memory-used').text(`${data.used_memory} MB`);
        $('#memory-available').text(`${data.available_memory} MB`);
        $('#memory-percent').text(`${data.percent_used.toFixed(2)}%`);
        updateChart('memory-chart', 'Memory Usage', {
            used: data.used_memory / 1024,
            available: data.available_memory / 1024,
            percent: data.percent_used
        });
    });
}

function fetchDiskUsageHistory(start, end) {
    $.get(`/disk-usage/history?start=${start}&end=${end}`, function(data) {
        const labels = data.map(entry => entry.timestamp);
        const percentUsedData = data.map(entry => entry.percent.replace('%', ''));
        updateLineChart('disk-line-chart', 'Disk Usage History', labels, percentUsedData);
    });
}

function fetchMemoryUsageHistory(start, end) {
    $.get(`/memory-usage/history?start=${start}&end=${end}`, function(data) {
        const labels = data.map(entry => entry.timestamp);
        const percentUsedData = data.map(entry => entry.percent_used);
        updateLineChart('memory-line-chart', 'Memory Usage History', labels, percentUsedData);
    });
}

function updateChart(chartId, label, data) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const usageColor = data.percent < 70 ? '#4CAF50' : data.percent < 90 ? '#FFC107' : '#F44336';
    const chartData = {
        labels: ['Used', 'Available'],
        datasets: [{
            label: label,
            data: [data.used, data.available],
            backgroundColor: [usageColor, '#D3D3D3']
        }]
    };

    if (charts[chartId]) {
        charts[chartId].data = chartData;
        charts[chartId].update();
    } else {
        charts[chartId] = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function updateLineChart(chartId, label, labels, percentUsedData) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `${label} - Percent Used`,
                data: percentUsedData,
                borderColor: '#FF6384',
                fill: false
            }
        ]
    };

    if (charts[chartId]) {
        charts[chartId].data = chartData;
        charts[chartId].update();
    } else {
        charts[chartId] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }
                }
            }
        });
    }
}
