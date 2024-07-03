$(document).ready(function() {
    $("#start-date, #end-date").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#time-range").change(function() {
        if ($(this).val() === "custom") {
            $("#custom-date-range").show();
        } else {
            $("#custom-date-range").hide();
        }
    });
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
            start = start.toISOString().slice(0, 19).replace('T', ' ');
            end = end.toISOString().slice(0, 19).replace('T', ' ');
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
            available: parseFloat(data.available.replace('G', ''))
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
            available: data.available_memory / 1024
        });
    });
}

function fetchDiskUsageHistory(start, end) {
    $.get(`/disk-usage/history?start=${start}&end=${end}`, function(data) {
        const labels = data.map(entry => entry.timestamp);
        const usedData = data.map(entry => parseFloat(entry.used.replace('G', '')));
        const availableData = data.map(entry => parseFloat(entry.available.replace('G', '')));
        updateLineChart('disk-line-chart', 'Disk Usage History', labels, usedData, availableData);
    });
}

function fetchMemoryUsageHistory(start, end) {
    $.get(`/memory-usage/history?start=${start}&end=${end}`, function(data) {
        const labels = data.map(entry => entry.timestamp);
        const usedData = data.map(entry => entry.used_memory / 1024);
        const availableData = data.map(entry => entry.available_memory / 1024);
        updateLineChart('memory-line-chart', 'Memory Usage History', labels, usedData, availableData);
    });
}

function updateChart(chartId, label, data) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const chartData = {
        labels: ['Used', 'Available'],
        datasets: [{
            label: label,
            data: [data.used, data.available],
            backgroundColor: ['#FF6384', '#36A2EB']
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
                responsive: true
            }
        });
    }
}

function updateLineChart(chartId, label, labels, usedData, availableData) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `${label} - Used`,
                data: usedData,
                borderColor: '#FF6384',
                fill: false
            },
            {
                label: `${label} - Available`,
                data: availableData,
                borderColor: '#36A2EB',
                fill: false
            }
        ]
    };

    console.log(charts[chartId],chartId)
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
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        }
                    }
                }
            }
        });
    }
}
