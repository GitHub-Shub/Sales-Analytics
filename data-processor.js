// ==================== DATA PROCESSOR CLASS ====================
class DataProcessor {
    /**
     * Clean and preprocess the raw data
     */
    static cleanData(data) {
        return data.map(row => ({
            ...row,
            Promotion_Type: row.Promotion_Type || 'No Promotion',
            Competitor: row.Competitor || 'No Competitor'
        }));
    }

    /**
     * Engineer 30+ features from raw categorical data
     */
    static engineerFeatures(data) {
        return data.map(row => {
            // Parse dates
            const orderDate = this.parseDate(row.Order_Date);
            const shipDate = this.parseDate(row.Ship_Date);
            const deliveryDate = this.parseDate(row.Delivery_Date);
            const invoiceDate = this.parseDate(row.Invoice_Date);

            // Time-based features
            const processingDays = Math.ceil((shipDate - orderDate) / (1000 * 60 * 60 * 24));
            const shippingDays = Math.ceil((deliveryDate - shipDate) / (1000 * 60 * 60 * 24));
            const fulfillmentDays = Math.ceil((deliveryDate - orderDate) / (1000 * 60 * 60 * 24));
            const invoiceDelayDays = Math.ceil((invoiceDate - orderDate) / (1000 * 60 * 60 * 24));

            // Scoring systems
            const priorityMap = { Low: 1, Normal: 2, Medium: 3, High: 4, Urgent: 5, Critical: 6 };
            const satisfactionMap = { 'Very Low': 1, Low: 2, Medium: 3, Neutral: 4, High: 5, 'Very High': 6 };
            const riskMap = { Low: 1, Medium: 2, High: 3, 'Very High': 4, Critical: 5, Extreme: 6 };
            const loyaltyMap = { Bronze: 1, Silver: 2, Gold: 3, Platinum: 4, Diamond: 5, Elite: 6 };
            const dealSizeMap = { Trial: 1, Small: 2, Medium: 3, Large: 4, Enterprise: 5, Mega: 6 };

            const priorityScore = priorityMap[row.Order_Priority] || 3;
            const satisfactionScore = satisfactionMap[row.Satisfaction_Level] || 3;
            const riskScore = riskMap[row.Risk_Level] || 2;
            const loyaltyScore = loyaltyMap[row.Customer_Loyalty_Tier] || 2;
            const dealSizeScore = dealSizeMap[row.Deal_Size] || 2;

            // Binary indicators
            const isReturned = ['Approved', 'Pending'].includes(row.Return_Status) ? 1 : 0;
            const isPremium = ['Platinum', 'Diamond', 'Elite'].includes(row.Customer_Loyalty_Tier) ? 1 : 0;
            const hasPromotion = row.Promotion_Type !== 'No Promotion' ? 1 : 0;
            const isOnline = ['Website', 'Mobile App'].includes(row.Sales_Channel) ? 1 : 0;
            const isCorporate = row.Customer_Type === 'Corporate' ? 1 : 0;
            const isFastDelivery = ['Same Day', 'Drone', 'Express'].includes(row.Delivery_Mode) ? 1 : 0;

            // Composite metrics
            const efficiencyIndex = ((1 / (1 + fulfillmentDays)) * (1 - isReturned) * satisfactionScore / 6) * 100;
            const customerValue = loyaltyScore * dealSizeScore * (1 - riskScore / 6);

            // Extract percentages
            const discountPct = parseFloat(String(row.Discount_Bracket || '0').replace('%', '').replace('None', '0')) || 0;
            const taxPct = parseFloat(String(row.Tax_Bracket || '0').replace('%', '').replace('Exempt', '0')) || 0;

            return {
                ...row,
                orderDate,
                orderMonth: orderDate.getMonth() + 1,
                orderQuarter: Math.floor(orderDate.getMonth() / 3) + 1,
                orderYear: orderDate.getFullYear(),
                orderDayOfWeek: orderDate.getDay(),
                processingDays,
                shippingDays,
                fulfillmentDays,
                invoiceDelayDays,
                priorityScore,
                satisfactionScore,
                riskScore,
                loyaltyScore,
                dealSizeScore,
                isReturned,
                isPremium,
                hasPromotion,
                isOnline,
                isCorporate,
                isFastDelivery,
                efficiencyIndex,
                customerValue,
                discountPct,
                taxPct,
            };
        });
    }

    /**
     * Parse date from Excel serial number or date string
     * Handles multiple formats: Excel serial, ISO string, date string
     */
    static parseDate(value) {
        if (!value) return new Date();
        
        // If it's already a Date object
        if (value instanceof Date) return value;
        
        // If it's an Excel serial number (typically between 1 and 50000)
        if (typeof value === 'number' && value > 0 && value < 100000) {
            // Excel dates start from January 1, 1900 (serial 1)
            // But Excel incorrectly treats 1900 as a leap year, so we adjust
            const excelEpoch = new Date(1899, 11, 30); // Dec 30, 1899
            const days = Math.floor(value);
            const milliseconds = (value - days) * 86400000;
            return new Date(excelEpoch.getTime() + days * 86400000 + milliseconds);
        }
        
        // If it's a string, try to parse it
        if (typeof value === 'string') {
            // Try ISO format first (YYYY-MM-DD)
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        
        // Fallback to current date if all parsing fails
        console.warn('Could not parse date:', value, '- using current date');
        return new Date();
    }

    /**
     * Calculate summary statistics
     */
    static calculateStats(data) {
        return {
            totalRecords: data.length,
            avgSatisfaction: this.mean(data.map(d => d.satisfactionScore)),
            avgEfficiency: this.mean(data.map(d => d.efficiencyIndex)),
            returnRate: this.mean(data.map(d => d.isReturned)) * 100,
            avgFulfillment: this.mean(data.map(d => d.fulfillmentDays)),
            avgCustomerValue: this.mean(data.map(d => d.customerValue)),
            premiumRate: this.mean(data.map(d => d.isPremium)) * 100,
        };
    }

    /**
     * Calculate mean of array
     */
    static mean(arr) {
        const filtered = arr.filter(x => !isNaN(x) && x !== null);
        if (filtered.length === 0) return 0;
        return filtered.reduce((a, b) => a + b, 0) / filtered.length;
    }

    /**
     * Group data by key
     */
    static groupBy(data, key) {
        return data.reduce((acc, item) => {
            const group = item[key];
            if (!acc[group]) acc[group] = [];
            acc[group].push(item);
            return acc;
        }, {});
    }

    /**
     * Aggregate data by month
     */
    static aggregateByMonth(data) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const grouped = this.groupBy(data, 'orderMonth');
        
        return Object.keys(grouped).map(month => {
            const monthData = grouped[month];
            return {
                month: parseInt(month),
                monthName: monthNames[parseInt(month) - 1],
                orders: monthData.length,
                avgSatisfaction: this.mean(monthData.map(d => d.satisfactionScore)),
                avgEfficiency: this.mean(monthData.map(d => d.efficiencyIndex)),
                returnRate: this.mean(monthData.map(d => d.isReturned)) * 100,
                avgFulfillment: this.mean(monthData.map(d => d.fulfillmentDays)),
                avgPriority: this.mean(monthData.map(d => d.priorityScore)),
            };
        }).sort((a, b) => a.month - b.month);
    }

    /**
     * Aggregate by region
     */
    static aggregateByRegion(data) {
        const grouped = this.groupBy(data, 'Region');
        return Object.keys(grouped).map(region => ({
            region,
            avgSatisfaction: this.mean(grouped[region].map(d => d.satisfactionScore)),
            avgEfficiency: this.mean(grouped[region].map(d => d.efficiencyIndex)),
            orders: grouped[region].length,
        }));
    }

    /**
     * Aggregate by category
     */
    static aggregateByCategory(data) {
        const grouped = this.groupBy(data, 'Product_Category');
        return Object.keys(grouped).map(category => ({
            category,
            count: grouped[category].length,
            returnRate: this.mean(grouped[category].map(d => d.isReturned)) * 100,
            avgSatisfaction: this.mean(grouped[category].map(d => d.satisfactionScore)),
        }));
    }

    /**
     * Aggregate by sales channel
     */
    static aggregateByChannel(data) {
        const grouped = this.groupBy(data, 'Sales_Channel');
        return Object.keys(grouped).map(channel => ({
            channel,
            efficiency: this.mean(grouped[channel].map(d => d.efficiencyIndex)),
            count: grouped[channel].length,
            avgFulfillment: this.mean(grouped[channel].map(d => d.fulfillmentDays)),
        }));
    }

    /**
     * Aggregate by deal size
     */
    static aggregateByDealSize(data) {
        const grouped = this.groupBy(data, 'Deal_Size');
        return Object.keys(grouped).map(size => ({
            name: size,
            value: grouped[size].length,
        }));
    }

    /**
     * Calculate Pearson correlation between two arrays
     */
    static pearsonCorrelation(x, y) {
        const n = x.length;
        if (n === 0 || n !== y.length) return 0;

        const sum1 = x.reduce((a, b) => a + b, 0);
        const sum2 = y.reduce((a, b) => a + b, 0);
        const sum1Sq = x.reduce((a, b) => a + b * b, 0);
        const sum2Sq = y.reduce((a, b) => a + b * b, 0);
        const pSum = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);

        const num = pSum - (sum1 * sum2 / n);
        const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));

        return den === 0 ? 0 : num / den;
    }

    /**
     * Calculate correlations between features
     */
    static calculateCorrelations(data, features) {
        const correlations = [];
        
        for (let i = 0; i < features.length; i++) {
            for (let j = i + 1; j < features.length; j++) {
                const x = data.map(d => d[features[i]]).filter(v => !isNaN(v));
                const y = data.map(d => d[features[j]]).filter(v => !isNaN(v));
                
                if (x.length > 0 && y.length > 0) {
                    const corr = this.pearsonCorrelation(x, y);
                    
                    if (Math.abs(corr) > 0.2) {
                        correlations.push({
                            feature1: features[i],
                            feature2: features[j],
                            correlation: corr
                        });
                    }
                }
            }
        }

        return correlations
            .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
            .slice(0, 6);
    }

    /**
     * Get scatter data for correlation plot
     */
    static getScatterData(data, feature1, feature2, limit = 200) {
        return data.slice(0, limit).map(d => ({
            x: d[feature1],
            y: d[feature2],
            efficiency: d.efficiencyIndex
        }));
    }

    /**
     * Create distribution buckets
     */
    static createDistribution(data, field, bucketSize) {
        const buckets = {};
        
        data.forEach(d => {
            const value = d[field];
            const bucket = Math.floor(value / bucketSize) * bucketSize;
            const key = `${bucket}-${bucket + bucketSize}`;
            
            if (!buckets[key]) {
                buckets[key] = { range: key, count: 0, min: bucket };
            }
            buckets[key].count++;
        });

        return Object.values(buckets).sort((a, b) => a.min - b.min).slice(0, 10);
    }

    /**
     * Format feature name for display
     */
    static formatFeatureName(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/_/g, ' ')
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}