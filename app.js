// ==================== MAIN APPLICATION ====================
let processedData = null;
let stats = null;
let chartBuilder = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    chartBuilder = new ChartBuilder();
    setupFileUpload();
    setupNavigation();
});

// ==================== FILE UPLOAD HANDLERS ====================
function setupFileUpload() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');

    // Click to upload
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragging');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragging');
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragging');
        
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.xlsx')) {
            processFile(file);
        } else {
            alert('Please upload a .xlsx file');
        }
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

function processFile(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            console.log('Raw data loaded:', jsonData.length, 'records');
            
            // Validate required columns
            if (jsonData.length === 0) {
                alert('Error: The Excel file appears to be empty. Please upload a file with data.');
                return;
            }
            
            const requiredColumns = [
                'Order_Date', 'Ship_Date', 'Delivery_Date', 'Invoice_Date',
                'Region', 'Product_Category', 'Sales_Channel', 'Order_Priority',
                'Satisfaction_Level', 'Risk_Level', 'Customer_Loyalty_Tier',
                'Deal_Size', 'Return_Status', 'Discount_Bracket', 'Tax_Bracket'
            ];
            
            const firstRow = jsonData[0];
            const missingColumns = requiredColumns.filter(col => !(col in firstRow));
            
            if (missingColumns.length > 0) {
                alert(`Error: The following required columns are missing:\n${missingColumns.join(', ')}\n\nPlease ensure your Excel file has the same column structure as the sample file.`);
                console.error('Missing columns:', missingColumns);
                return;
            }
            
            // Validate data types
            const hasValidDates = firstRow.Order_Date && firstRow.Ship_Date;
            if (!hasValidDates) {
                alert('Error: Date columns appear to be empty. Please ensure Order_Date and Ship_Date have valid dates.');
                return;
            }
            
            console.log('✓ Column validation passed');
            
            // Process data
            const cleaned = DataProcessor.cleanData(jsonData);
            processedData = DataProcessor.engineerFeatures(cleaned);
            stats = DataProcessor.calculateStats(processedData);
            
            console.log('Data processed:', processedData.length, 'records');
            console.log('Stats:', stats);
            
            // Validate processed data
            if (processedData.length === 0) {
                alert('Error: No valid data could be processed. Please check your file format.');
                return;
            }
            
            // Show dashboard
            showDashboard();
            
        } catch (error) {
            console.error('Error processing file:', error);
            alert(`Error processing file: ${error.message}\n\nPlease ensure your Excel file:\n1. Is in .xlsx format\n2. Has the same column names as the sample file\n3. Contains valid data in date columns\n4. Has at least 10 rows of data`);
        }
    };
    
    reader.onerror = () => {
        alert('Error reading file. Please try again.');
    };
    
    reader.readAsArrayBuffer(file);
}

// ==================== DASHBOARD DISPLAY ====================
function showDashboard() {
    // Hide upload screen
    document.getElementById('uploadScreen').style.display = 'none';
    
    // Show dashboard
    document.getElementById('dashboard').style.display = 'block';
    
    // Populate stats
    populateStats();
    
    // Render all charts
    renderAllCharts();
}

function populateStats() {
    const statsBar = document.getElementById('statsBar');
    
    statsBar.innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${stats.totalRecords.toLocaleString()}</div>
            <div class="stat-label">Records</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${((stats.avgSatisfaction / 6) * 100).toFixed(1)}%</div>
            <div class="stat-label">Avg Satisfaction</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.avgEfficiency.toFixed(1)}</div>
            <div class="stat-label">Efficiency Index</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.returnRate.toFixed(1)}%</div>
            <div class="stat-label">Return Rate</div>
        </div>
    `;
    
    // Update footer
    const footerText = document.getElementById('footerText');
    const featuresCount = Object.keys(processedData[0]).length;
    footerText.textContent = `MBB-Level Statistical Analysis Dashboard • ${stats.totalRecords.toLocaleString()} records analyzed • ${featuresCount} features`;
}

function renderAllCharts() {
    // Overview charts
    renderOverviewCharts();
    
    // Other views will be rendered on demand when clicked
}

function renderOverviewCharts() {
    const monthlyData = DataProcessor.aggregateByMonth(processedData);
    const regionData = DataProcessor.aggregateByRegion(processedData);
    const dealSizeData = DataProcessor.aggregateByDealSize(processedData);
    
    chartBuilder.createMonthlyTrends('chart-monthly-trends', monthlyData);
    chartBuilder.createPerformanceRadar('chart-performance-radar', stats);
    chartBuilder.createRegionalPerformance('chart-regional-performance', regionData);
    chartBuilder.createDealSizeChart('chart-deal-size', dealSizeData);
}

function renderTemporalCharts() {
    const monthlyData = DataProcessor.aggregateByMonth(processedData);
    
    chartBuilder.createSatisfactionTrends('chart-satisfaction-trends', monthlyData);
    chartBuilder.createEfficiencyEvolution('chart-efficiency-evolution', monthlyData);
    chartBuilder.createFulfillmentTime('chart-fulfillment-time', monthlyData);
}

function renderCategoricalCharts() {
    const channelData = DataProcessor.aggregateByChannel(processedData);
    const categoryData = DataProcessor.aggregateByCategory(processedData);
    const regionData = DataProcessor.aggregateByRegion(processedData);
    
    chartBuilder.createChannelEfficiency('chart-channel-efficiency', channelData);
    chartBuilder.createCategoryReturns('chart-category-returns', categoryData);
    chartBuilder.createRegionalDistribution('chart-regional-distribution', regionData);
    chartBuilder.createChannelVolume('chart-channel-volume', channelData);
}

function renderCorrelationCharts() {
    const features = [
        'priorityScore', 'satisfactionScore', 'riskScore', 'loyaltyScore',
        'fulfillmentDays', 'efficiencyIndex', 'customerValue', 'discountPct'
    ];
    
    const correlations = DataProcessor.calculateCorrelations(processedData, features);
    
    if (correlations.length > 0) {
        const topCorr = correlations[0];
        const scatterData = DataProcessor.getScatterData(
            processedData,
            topCorr.feature1,
            topCorr.feature2,
            200
        );
        
        // Update title and note
        document.getElementById('correlation-title').textContent = 
            `Top Feature Relationship: ${DataProcessor.formatFeatureName(topCorr.feature1)} vs ${DataProcessor.formatFeatureName(topCorr.feature2)}`;
        document.getElementById('correlation-note').textContent = 
            `Correlation: ${topCorr.correlation.toFixed(3)} | Color intensity represents Efficiency Index`;
        
        chartBuilder.createCorrelationScatter(
            'chart-correlation-scatter',
            scatterData,
            topCorr.feature1,
            topCorr.feature2
        );
        
        // Render correlation list
        renderCorrelationList(correlations);
    }
}

function renderCorrelationList(correlations) {
    const listContainer = document.getElementById('correlationList');
    
    listContainer.innerHTML = correlations.map((corr, idx) => {
        const absCorr = Math.abs(corr.correlation);
        const width = absCorr * 100;
        const isPositive = corr.correlation > 0;
        const className = isPositive ? 'positive' : 'negative';
        
        return `
            <div class="correlation-item">
                <div class="correlation-header">
                    <span class="correlation-rank">#${idx + 1}</span>
                    <span class="correlation-features">
                        ${DataProcessor.formatFeatureName(corr.feature1)} ↔ ${DataProcessor.formatFeatureName(corr.feature2)}
                    </span>
                </div>
                <div class="correlation-bar">
                    <div class="correlation-bar-fill ${className}" style="width: ${width}%">
                        <span class="correlation-value">${corr.correlation.toFixed(3)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderOperationalCharts() {
    const fulfillmentDist = DataProcessor.createDistribution(processedData, 'fulfillmentDays', 2);
    const customerValueDist = DataProcessor.createDistribution(processedData, 'customerValue', 5);
    
    chartBuilder.createProcessingShippingScatter('chart-processing-shipping', processedData);
    chartBuilder.createDistributionChart('chart-fulfillment-dist', fulfillmentDist, 'Fulfillment Days');
    chartBuilder.createDistributionChart('chart-customer-value', customerValueDist, 'Customer Value');
}

// ==================== NAVIGATION ====================
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const viewName = button.getAttribute('data-view');
            switchView(viewName);
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const selectedView = document.getElementById(`view-${viewName}`);
    if (selectedView) {
        selectedView.classList.add('active');
        
        // Render charts for this view if not already rendered
        renderViewCharts(viewName);
    }
}

function renderViewCharts(viewName) {
    if (!processedData) return;
    
    switch(viewName) {
        case 'overview':
            // Already rendered
            break;
        case 'temporal':
            renderTemporalCharts();
            break;
        case 'categorical':
            renderCategoricalCharts();
            break;
        case 'correlations':
            renderCorrelationCharts();
            break;
        case 'operational':
            renderOperationalCharts();
            break;
    }
}

// ==================== UTILITY FUNCTIONS ====================
function downloadProcessedData() {
    if (!processedData) return;
    
    const ws = XLSX.utils.json_to_sheet(processedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Processed Data");
    XLSX.writeFile(wb, "processed_sales_data.xlsx");
}

// Make download function available globally
window.downloadProcessedData = downloadProcessedData;

console.log('Sales Analytics Dashboard initialized');