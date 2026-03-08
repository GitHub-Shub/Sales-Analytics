// ==================== CHART BUILDER CLASS ====================
// Navy Blue Color Palette
const COLORS = {
    navy: {
        deepest: '#000814',
        deep: '#001d3d',
        primary: '#003566',
        medium: '#0055a5',
        bright: '#0077b6',
        light: '#4895c7',
        pale: '#90c9e8',
    },
    chart: ['#001d3d', '#003566', '#0055a5', '#0077b6', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4'],
    accent: '#ffd60a'
};

class ChartBuilder {
    constructor() {
        this.charts = {};
    }

    /**
     * Default chart options with navy theme
     */
    getDefaultOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: COLORS.navy.primary,
                        font: { size: 12, weight: '600' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 29, 61, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: COLORS.navy.bright,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: COLORS.navy.medium, font: { size: 11 } },
                    grid: { color: 'rgba(144, 201, 232, 0.2)' }
                },
                y: {
                    ticks: { color: COLORS.navy.medium, font: { size: 11 } },
                    grid: { color: 'rgba(144, 201, 232, 0.2)' }
                }
            }
        };
    }

    /**
     * Destroy existing chart if it exists
     */
    destroyChart(chartId) {
        if (this.charts[chartId]) {
            this.charts[chartId].destroy();
            delete this.charts[chartId];
        }
    }

    /**
     * Create monthly trends area chart
     */
    createMonthlyTrends(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.monthName),
                datasets: [{
                    label: 'Order Volume',
                    data: data.map(d => d.orders),
                    borderColor: COLORS.navy.bright,
                    backgroundColor: 'rgba(0, 119, 182, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: COLORS.navy.bright,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...this.getDefaultOptions('Monthly Performance'),
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Number of Orders',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false },
                        title: {
                            display: true,
                            text: 'Month',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                },
                plugins: {
                    ...this.getDefaultOptions().plugins,
                    tooltip: {
                        ...this.getDefaultOptions().plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return 'Orders: ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create performance radar chart
     */
    createPerformanceRadar(canvasId, stats) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const data = [
            { metric: 'Satisfaction', value: (stats.avgSatisfaction / 6) * 100 },
            { metric: 'Efficiency', value: stats.avgEfficiency },
            { metric: 'Low Returns', value: 100 - stats.returnRate },
            { metric: 'Premium Rate', value: stats.premiumRate },
            { metric: 'Fast Fulfillment', value: Math.max(0, 100 - stats.avgFulfillment * 5) }
        ];

        this.charts[canvasId] = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.map(d => d.metric),
                datasets: [{
                    label: 'Performance',
                    data: data.map(d => d.value),
                    borderColor: COLORS.navy.bright,
                    backgroundColor: 'rgba(0, 53, 102, 0.3)',
                    borderWidth: 2,
                    pointBackgroundColor: COLORS.navy.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: COLORS.navy.medium,
                            backdropColor: 'transparent'
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.3)' },
                        pointLabels: {
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create regional performance horizontal bar chart
     */
    createRegionalPerformance(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Sort by satisfaction ascending
        const sortedData = [...data].sort((a, b) => a.avgSatisfaction - b.avgSatisfaction);
        
        // Assign colors from light to dark based on ascending values
        const backgroundColors = sortedData.map((_, idx) => {
            const colorIndex = Math.floor((idx / sortedData.length) * (COLORS.chart.length - 1));
            return COLORS.chart[colorIndex];
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedData.map(d => d.region),
                datasets: [{
                    label: 'Avg Satisfaction Score',
                    data: sortedData.map(d => d.avgSatisfaction),
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                ...this.getDefaultOptions('Regional Performance'),
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 6,
                        ticks: { color: COLORS.navy.medium },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Satisfaction Score (1-6)',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    y: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    /**
     * Create deal size donut chart
     */
    createDealSizeChart(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.name),
                datasets: [{
                    data: data.map(d => d.value),
                    backgroundColor: COLORS.chart,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create satisfaction trends line chart
     */
    createSatisfactionTrends(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.monthName),
                datasets: [{
                    label: 'Satisfaction Score',
                    data: data.map(d => d.avgSatisfaction),
                    borderColor: COLORS.navy.bright,
                    backgroundColor: 'rgba(0, 119, 182, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: COLORS.navy.bright,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                ...this.getDefaultOptions('Satisfaction Trends'),
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 6,
                        ticks: { 
                            color: COLORS.navy.medium,
                            stepSize: 1
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Satisfaction Score (1-6)',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false },
                        title: {
                            display: true,
                            text: 'Month',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create efficiency evolution multi-line chart
     */
    createEfficiencyEvolution(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.monthName),
                datasets: [
                    {
                        label: 'Efficiency Index',
                        data: data.map(d => d.avgEfficiency),
                        borderColor: COLORS.navy.primary,
                        backgroundColor: 'rgba(0, 53, 102, 0.1)',
                        borderWidth: 3,
                        pointRadius: 6,
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Return Rate %',
                        data: data.map(d => d.returnRate),
                        borderColor: COLORS.accent,
                        backgroundColor: 'rgba(255, 214, 10, 0.1)',
                        borderWidth: 3,
                        borderDash: [5, 5],
                        pointRadius: 6,
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                ...this.getDefaultOptions('Efficiency & Returns'),
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        max: 100,
                        ticks: { 
                            color: COLORS.navy.primary,
                            callback: function(value) {
                                return value;
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Efficiency Index (0-100)',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        max: 100,
                        ticks: { 
                            color: COLORS.accent,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: { display: false },
                        title: {
                            display: true,
                            text: 'Return Rate %',
                            color: COLORS.accent,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false },
                        title: {
                            display: true,
                            text: 'Month',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create fulfillment time bar chart
     */
    createFulfillmentTime(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Data is already sorted by month, assign colors based on value
        const maxValue = Math.max(...data.map(d => d.avgFulfillment));
        const backgroundColors = data.map(d => {
            const intensity = d.avgFulfillment / maxValue;
            const colorIndex = Math.floor(intensity * (COLORS.chart.length - 1));
            return COLORS.chart[colorIndex];
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.monthName),
                datasets: [{
                    label: 'Avg Fulfillment Days',
                    data: data.map(d => d.avgFulfillment),
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...this.getDefaultOptions('Fulfillment Time'),
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value.toFixed(1) + ' days';
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Days',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false },
                        title: {
                            display: true,
                            text: 'Month',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create channel efficiency chart
     */
    createChannelEfficiency(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Sort by efficiency ascending
        const sortedData = [...data].sort((a, b) => a.efficiency - b.efficiency);
        
        // Assign colors from light to dark based on ascending values
        const backgroundColors = sortedData.map((_, idx) => {
            const colorIndex = Math.floor((idx / sortedData.length) * (COLORS.chart.length - 1));
            return COLORS.chart[colorIndex];
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedData.map(d => d.channel),
                datasets: [{
                    label: 'Efficiency Index (0-100)',
                    data: sortedData.map(d => d.efficiency),
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...this.getDefaultOptions('Channel Efficiency'),
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: COLORS.navy.medium },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Efficiency Index',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    /**
     * Create category returns chart
     */
    createCategoryReturns(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Sort by return rate ascending
        const sortedData = [...data].sort((a, b) => a.returnRate - b.returnRate);
        
        // Assign colors from light to dark (higher returns = darker/redder)
        const backgroundColors = sortedData.map((_, idx) => {
            const colorIndex = Math.floor((idx / sortedData.length) * (COLORS.chart.length - 1));
            return COLORS.chart[colorIndex];
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedData.map(d => d.category),
                datasets: [{
                    label: 'Return Rate %',
                    data: sortedData.map(d => d.returnRate),
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...this.getDefaultOptions('Category Returns'),
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Return Rate (%)',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    /**
     * Create regional distribution pie chart
     */
    createRegionalDistribution(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.charts[canvasId] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(d => d.region),
                datasets: [{
                    data: data.map(d => d.orders),
                    backgroundColor: COLORS.chart,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create channel volume donut chart
     */
    createChannelVolume(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.channel),
                datasets: [{
                    data: data.map(d => d.count),
                    backgroundColor: COLORS.chart,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create correlation scatter plot
     */
    createCorrelationScatter(canvasId, data, feature1, feature2) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Create scatter data with color based on efficiency
        // Filter out any invalid data points
        const validData = data.filter(d => 
            d.x !== null && d.x !== undefined && !isNaN(d.x) &&
            d.y !== null && d.y !== undefined && !isNaN(d.y) &&
            d.efficiency !== null && d.efficiency !== undefined && !isNaN(d.efficiency)
        );

        const scatterData = validData.map(d => ({
            x: d.x,
            y: d.y,
            r: 5
        }));

        // Create colors based on efficiency gradient
        const colors = validData.map(d => {
            const alpha = Math.min(1, Math.max(0.2, d.efficiency / 100));
            return `rgba(0, 119, 182, ${alpha})`;
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Orders (color = efficiency)',
                    data: scatterData,
                    backgroundColor: colors,
                    borderColor: COLORS.navy.bright,
                    borderWidth: 1
                }]
            },
            options: {
                ...this.getDefaultOptions('Correlation'),
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: DataProcessor.formatFeatureName(feature1),
                            color: COLORS.navy.primary,
                            font: { size: 13, weight: '600' }
                        },
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value.toFixed(1);
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: DataProcessor.formatFeatureName(feature2),
                            color: COLORS.navy.primary,
                            font: { size: 13, weight: '600' }
                        },
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value.toFixed(1);
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' }
                    }
                },
                plugins: {
                    ...this.getDefaultOptions().plugins,
                    tooltip: {
                        ...this.getDefaultOptions().plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                const efficiency = validData[index].efficiency;
                                return [
                                    `${DataProcessor.formatFeatureName(feature1)}: ${context.parsed.x.toFixed(2)}`,
                                    `${DataProcessor.formatFeatureName(feature2)}: ${context.parsed.y.toFixed(2)}`,
                                    `Efficiency: ${efficiency.toFixed(1)}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create processing vs shipping scatter
     */
    createProcessingShippingScatter(canvasId, data) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const scatterData = data.slice(0, 300).map(d => ({
            x: d.processingDays,
            y: d.shippingDays,
            r: 5
        }));

        this.charts[canvasId] = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Orders (300 samples)',
                    data: scatterData,
                    backgroundColor: 'rgba(0, 119, 182, 0.5)',
                    borderColor: COLORS.navy.bright,
                    borderWidth: 1
                }]
            },
            options: {
                ...this.getDefaultOptions('Processing vs Shipping'),
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Processing Time (Days from Order to Ship)',
                            color: COLORS.navy.primary,
                            font: { size: 13, weight: '600' }
                        },
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value + 'd';
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Shipping Time (Days from Ship to Delivery)',
                            color: COLORS.navy.primary,
                            font: { size: 13, weight: '600' }
                        },
                        ticks: { 
                            color: COLORS.navy.medium,
                            callback: function(value) {
                                return value + 'd';
                            }
                        },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' }
                    }
                },
                plugins: {
                    ...this.getDefaultOptions().plugins,
                    tooltip: {
                        ...this.getDefaultOptions().plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `Processing: ${context.parsed.x}d, Shipping: ${context.parsed.y}d (Total: ${context.parsed.x + context.parsed.y}d)`;
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Create distribution histogram
     */
    createDistributionChart(canvasId, data, label) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Assign colors based on ascending order
        const backgroundColors = data.map((_, idx) => {
            const colorIndex = Math.floor((idx / data.length) * (COLORS.chart.length - 1));
            return COLORS.chart[colorIndex];
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.range),
                datasets: [{
                    label: 'Frequency',
                    data: data.map(d => d.count),
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...this.getDefaultOptions(label),
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: COLORS.navy.medium },
                        grid: { color: 'rgba(144, 201, 232, 0.2)' },
                        title: {
                            display: true,
                            text: 'Number of Orders',
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    },
                    x: {
                        ticks: { color: COLORS.navy.medium },
                        grid: { display: false },
                        title: {
                            display: true,
                            text: label,
                            color: COLORS.navy.primary,
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }
}