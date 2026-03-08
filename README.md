# MBB-LEVEL SALES ANALYTICS DASHBOARD
**HTML/CSS/JavaScript Version**
**Professional Statistical Analysis & Feature Engineering Platform**

---

## 🎯 WHAT'S INCLUDED

This package contains a **complete, production-ready dashboard** built with pure HTML, CSS, and JavaScript:

### 📁 **FILE STRUCTURE**
```
sales-dashboard/
├── index.html              # Main HTML structure (270 lines)
├── styles.css              # Complete styling with navy theme (600+ lines)
├── data-processor.js       # Feature engineering & statistics (400+ lines)
├── chart-builder.js        # Chart.js visualizations (500+ lines)
├── app.js                  # Main application logic (300+ lines)
├── README_HTML.md          # This file
└── QUICK_START.md          # Quick reference guide
```

**Total Code:** ~2000+ lines of clean, well-documented code

---

## 🚀 GETTING STARTED

### **Option 1: Direct Open (Simplest)**
1. Download all 5 files to a folder
2. Double-click `index.html`
3. Upload your Excel file
4. Start analyzing!

### **Option 2: Local Web Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```
Then open: `http://localhost:8000`

### **Option 3: Deploy Online**
Upload all files to:
- **GitHub Pages** (free hosting)
- **Netlify** (drag & drop)
- **Vercel** (automatic deployment)
- **Any web hosting service**

---

## 📊 FEATURES

### **1. Advanced Feature Engineering**
Automatically creates **30+ features** from your raw data:

**Time-Based Features:**
- Order month, quarter, year, day of week
- Processing time (Order → Ship)
- Shipping time (Ship → Delivery)
- Total fulfillment time
- Invoice delay

**Scoring Systems:**
- Priority Score (1-6)
- Satisfaction Score (1-6)
- Risk Score (1-6)
- Loyalty Score (1-6)
- Deal Size Score (1-6)

**Binary Indicators:**
- Is Returned (0/1)
- Is Premium Customer (0/1)
- Has Promotion (0/1)
- Is Online Channel (0/1)
- Is Corporate (0/1)
- Is Fast Delivery (0/1)

**Composite Metrics:**
- Efficiency Index (0-100)
- Customer Value Index
- Frequency Encodings
- Percentage Extractions

### **2. Statistical Analysis**
- **Pearson Correlation** between all numerical features
- **Top 6 Correlations** automatically discovered
- **Distribution Analysis** with histograms
- **Temporal Trends** with monthly aggregations
- **Categorical Breakdowns** by region, channel, product

### **3. Interactive Visualizations**
Uses **Chart.js** for beautiful, responsive charts:

**15+ Chart Types:**
- Area Charts (monthly trends)
- Radar Charts (performance metrics)
- Bar Charts (comparisons)
- Line Charts (time series)
- Scatter Plots (correlations)
- Pie/Donut Charts (distributions)

**5 Comprehensive Views:**
1. **Overview** - KPIs and high-level insights
2. **Temporal** - Time-based analysis
3. **Categorical** - Category comparisons
4. **Correlations** - Relationship discovery
5. **Operational** - Efficiency metrics

### **4. Navy Blue Professional Design**
- Clean, modern interface
- Gradient backgrounds
- Card-based layout
- Smooth animations
- Responsive design
- Professional color scheme

---

## 🎨 DESIGN SYSTEM

### **Color Palette**
```css
--navy-deepest: #000814   /* Dark backgrounds */
--navy-deep: #001d3d      /* Headers */
--navy-primary: #003566   /* Primary elements */
--navy-medium: #0055a5    /* Secondary */
--navy-bright: #0077b6    /* Highlights */
--navy-light: #4895c7     /* Text accents */
--navy-pale: #90c9e8      /* Light elements */
--accent-gold: #ffd60a    /* Special highlights */
```

### **Typography**
- **Font:** Inter (clean, modern)
- **Headers:** 800 weight, gradient text
- **Body:** 400-600 weight
- **Sizes:** 13px-48px range

### **Layout**
- **Grid System:** CSS Grid with 2-column layout
- **Responsive:** Breakpoints at 768px and 1024px
- **Spacing:** Consistent 24px gaps
- **Cards:** Rounded corners (16px), shadows

---

## 💻 TECHNICAL DETAILS

### **Libraries Used**
1. **Chart.js 4.4.0** - Charting library
   - Source: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`
   - Used for all visualizations

2. **SheetJS (XLSX) 0.18.5** - Excel parser
   - Source: `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js`
   - Handles .xlsx file reading

**No other dependencies!** Pure JavaScript for everything else.

### **Browser Compatibility**
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

**Not supported:** IE11 and older browsers

### **File Size**
- **index.html:** ~12 KB
- **styles.css:** ~18 KB
- **data-processor.js:** ~15 KB
- **chart-builder.js:** ~20 KB
- **app.js:** ~12 KB
- **Total:** ~77 KB (before compression)

With CDN libraries: ~500 KB total page load

---

## 🔬 DATA PROCESSING PIPELINE

### **Step 1: File Upload**
```javascript
User uploads .xlsx file
    ↓
FileReader API reads file
    ↓
SheetJS parses Excel data
    ↓
JSON array created
```

### **Step 2: Data Cleaning**
```javascript
Handle missing values
    ↓
Fill nulls with defaults
    ↓
Standardize formats
```

### **Step 3: Feature Engineering**
```javascript
Parse dates (handle Excel serial numbers)
    ↓
Calculate time differences
    ↓
Apply scoring mappings
    ↓
Create binary indicators
    ↓
Compute composite metrics
    ↓
Extract percentages from text
```

### **Step 4: Statistical Analysis**
```javascript
Calculate summary statistics
    ↓
Aggregate by dimensions (month, region, category)
    ↓
Compute Pearson correlations
    ↓
Create distributions
    ↓
Prepare chart data
```

### **Step 5: Visualization**
```javascript
Initialize Chart.js instances
    ↓
Populate with processed data
    ↓
Apply navy blue theme
    ↓
Render interactive charts
```

---

## 📈 CHART CONFIGURATIONS

### **Overview View**
1. **Monthly Trends** - Area chart showing order volume over time
2. **Performance Radar** - 5-axis radar: Satisfaction, Efficiency, Returns, Premium, Fulfillment
3. **Regional Performance** - Horizontal bar chart of average satisfaction by region
4. **Deal Size Distribution** - Donut chart of deal size breakdown

### **Temporal View**
1. **Satisfaction Trends** - Line chart of satisfaction score evolution
2. **Efficiency Evolution** - Multi-line chart: Efficiency Index vs Return Rate
3. **Fulfillment Time** - Bar chart of average fulfillment days by month

### **Categorical View**
1. **Channel Efficiency** - Bar chart comparing sales channels
2. **Category Returns** - Bar chart of return rates by product category
3. **Regional Distribution** - Pie chart of order volume by region
4. **Channel Volume** - Donut chart of orders by channel

### **Correlations View**
1. **Correlation Scatter** - Interactive scatter plot of top correlated features
2. **Correlation List** - Visual bars showing top 6 correlations with strength

### **Operational View**
1. **Processing vs Shipping** - Scatter plot of time relationships
2. **Fulfillment Distribution** - Histogram of fulfillment time buckets
3. **Customer Value Segments** - Bar chart of value distribution

---

## 🎯 KEY FUNCTIONS

### **DataProcessor Class**
```javascript
cleanData(data)              // Handle nulls and missing values
engineerFeatures(data)       // Create 30+ derived features
calculateStats(data)         // Summary statistics
aggregateByMonth(data)       // Monthly aggregations
aggregateByRegion(data)      // Regional aggregations
aggregateByCategory(data)    // Category aggregations
aggregateByChannel(data)     // Channel aggregations
calculateCorrelations()      // Pearson correlation matrix
pearsonCorrelation(x, y)     // Correlation calculation
createDistribution()         // Histogram buckets
formatFeatureName(name)      // Clean feature names
```

### **ChartBuilder Class**
```javascript
createMonthlyTrends()        // Area chart
createPerformanceRadar()     // Radar chart
createRegionalPerformance()  // Horizontal bar
createDealSizeChart()        // Donut chart
createSatisfactionTrends()   // Line chart
createEfficiencyEvolution()  // Multi-line chart
createFulfillmentTime()      // Bar chart
createChannelEfficiency()    // Bar chart
createCategoryReturns()      // Bar chart
createCorrelationScatter()   // Scatter plot
createProcessingShippingScatter() // Scatter
createDistributionChart()    // Histogram
```

### **Main App Functions**
```javascript
setupFileUpload()            // Drag & drop + file input
handleFileSelect()           // Process selected file
processFile(file)            // Parse and process Excel
showDashboard()              // Display dashboard
populateStats()              // Fill KPI cards
renderAllCharts()            // Initial chart rendering
renderViewCharts()           // On-demand chart rendering
switchView(viewName)         // Navigate between views
downloadProcessedData()      // Export processed data
```

---

## 🔧 CUSTOMIZATION GUIDE

### **Change Colors**
Edit `styles.css` at the top:
```css
:root {
    --navy-primary: #YOUR_COLOR;
    --navy-bright: #YOUR_COLOR;
    /* etc... */
}
```

### **Add New Chart**
1. Add canvas to `index.html`:
```html
<canvas id="chart-your-new-chart"></canvas>
```

2. Create method in `chart-builder.js`:
```javascript
createYourNewChart(canvasId, data) {
    // Chart.js configuration
}
```

3. Call from `app.js`:
```javascript
chartBuilder.createYourNewChart('chart-your-new-chart', yourData);
```

### **Add New Feature**
Edit `engineerFeatures()` in `data-processor.js`:
```javascript
const yourNewFeature = /* your calculation */;
return {
    ...row,
    yourNewFeature,
};
```

### **Modify Correlations**
Change features array in `renderCorrelationCharts()` in `app.js`:
```javascript
const features = [
    'priorityScore',
    'yourNewFeature',  // Add your feature
    // ...
];
```

---

## 📊 DATA REQUIREMENTS

### **Expected Excel Columns**
Your .xlsx file should have these columns:

**Dates:**
- Order_Date
- Ship_Date
- Delivery_Date
- Invoice_Date

**Location:**
- Region
- Country
- State
- City

**Product:**
- Product_Category
- Product_Subcategory
- Brand

**Customer:**
- Customer_Type
- Customer_Age_Group
- Customer_Gender
- Customer_Loyalty_Tier

**Order:**
- Order_Priority
- Order_Status
- Deal_Size
- Return_Status

**Operational:**
- Sales_Channel
- Store_Type
- Delivery_Mode
- Shipping_Provider

**Financial:**
- Discount_Bracket
- Tax_Bracket
- Payment_Method

**Analysis:**
- Satisfaction_Level
- Risk_Level
- Promotion_Type

**...and 15+ more categorical columns**

---

## 🚨 TROUBLESHOOTING

### **Problem: Charts not displaying**
✅ **Solution:** 
- Check browser console for errors
- Ensure Chart.js CDN is loading
- Verify internet connection

### **Problem: File upload fails**
✅ **Solution:**
- Ensure file is .xlsx format
- Check file size (<10MB recommended)
- Verify Excel file structure

### **Problem: Blank dashboard**
✅ **Solution:**
- Check data has required columns
- Open browser console for error messages
- Verify at least 50+ rows of data

### **Problem: Correlations empty**
✅ **Solution:**
- Need 100+ records for meaningful correlations
- Check that numerical features exist
- Verify data variety (not all same values)

### **Problem: Slow performance**
✅ **Solution:**
- Limit data to 5,000 records for best performance
- Use modern browser (Chrome/Firefox recommended)
- Close other browser tabs

---

## 🎓 CODE STRUCTURE EXPLAINED

### **index.html**
- Semantic HTML5 structure
- Upload screen markup
- Dashboard layout
- Canvas elements for charts
- Script includes at bottom

### **styles.css**
- CSS custom properties (variables)
- Mobile-first responsive design
- Flexbox and Grid layouts
- Smooth transitions and animations
- Custom scrollbar styling
- Print-friendly styles

### **data-processor.js**
- Pure JavaScript class
- No external dependencies (except for stats)
- Efficient array operations
- Memory-conscious processing
- Reusable utility methods

### **chart-builder.js**
- Chart.js wrapper class
- Consistent theming
- Responsive configurations
- Chart lifecycle management
- Navy blue color schemes

### **app.js**
- Event listeners setup
- File upload handling
- View navigation
- Chart orchestration
- State management

---

## 📱 RESPONSIVE DESIGN

### **Desktop (1400px+)**
- Full 2-column grid layout
- All features visible
- Optimal chart sizes

### **Tablet (768px - 1024px)**
- Single column grid
- Stacked charts
- Adjusted font sizes

### **Mobile (< 768px)**
- Vertical layout
- Touch-friendly buttons
- Scrollable navigation
- Compact stats display

---

## 🎯 PERFORMANCE TIPS

### **Best Practices**
1. Limit dataset to 5,000 rows
2. Use modern browser
3. Close unused tabs
4. Enable hardware acceleration
5. Use on-demand chart rendering

### **Memory Management**
- Charts destroyed before recreation
- Event listeners properly cleaned up
- Data processed in batches
- Efficient array methods used

### **Load Time Optimization**
- CDN libraries cached
- Minimal external resources
- Deferred chart rendering
- Progressive enhancement

---

## 🔐 SECURITY & PRIVACY

### **Data Handling**
✅ **100% Client-Side Processing**
- No data sent to servers
- All processing in browser
- Files not stored anywhere
- Complete privacy

✅ **No Backend Required**
- Pure frontend application
- No database needed
- No API calls
- Fully offline capable

✅ **Safe File Handling**
- Only .xlsx files accepted
- FileReader API (secure)
- No file system access
- Sandboxed execution

---

## 🎨 DESIGN PHILOSOPHY

### **MBB Consulting Style**
1. **Professional** - Navy blue corporate theme
2. **Data-Driven** - Every visual backed by statistics
3. **Clear** - Easy to understand and navigate
4. **Actionable** - Insights lead to decisions
5. **Comprehensive** - Multiple analytical perspectives

### **User Experience**
- **Intuitive** - Drag and drop upload
- **Fast** - Instant processing
- **Responsive** - Works on all devices
- **Beautiful** - Aesthetically pleasing
- **Accessible** - Clear labels and contrast

---

## 📚 ADDITIONAL RESOURCES

### **Chart.js Documentation**
https://www.chartjs.org/docs/

### **SheetJS Documentation**
https://docs.sheetjs.com/

### **MDN Web Docs**
https://developer.mozilla.org/

### **CSS Grid Guide**
https://css-tricks.com/snippets/css/complete-guide-grid/

---

## ✅ FEATURE CHECKLIST

**Completed Features:**
- ✅ Drag & drop file upload
- ✅ Excel file parsing (.xlsx)
- ✅ 30+ feature engineering
- ✅ Statistical analysis
- ✅ Correlation discovery
- ✅ 15+ interactive charts
- ✅ 5 comprehensive views
- ✅ Navy blue design theme
- ✅ Responsive layout
- ✅ Smooth animations
- ✅ Browser compatibility
- ✅ Performance optimization
- ✅ Clean code structure
- ✅ Comprehensive documentation

**Not Included (Future Enhancements):**
- ❌ Export charts as images
- ❌ Save dashboard state
- ❌ Custom date range filtering
- ❌ Real-time data updates
- ❌ Multi-file comparison
- ❌ Advanced ML predictions

---

## 🎉 SUMMARY

This HTML/CSS/JavaScript dashboard provides:

1. **Simple Deployment** - Just 5 files, no build process
2. **Powerful Analysis** - 30+ engineered features
3. **Beautiful Design** - Professional navy blue theme
4. **Fast Performance** - Client-side processing
5. **Complete Privacy** - No data leaves browser
6. **Easy Customization** - Well-documented code
7. **MBB Quality** - Consulting-grade output

**Perfect for:**
- Sales analysis
- Business intelligence
- Data exploration
- Executive reporting
- Performance monitoring
- Trend identification

---

**Ready to analyze your sales data? Just open `index.html` and start uploading! 🚀**
