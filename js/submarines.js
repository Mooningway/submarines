const { createApp } = Vue
const { records, items, years, months } = SubmarinesData

createApp({
    data() {
        return {
            records: [],
            getTotal: ``,
            getDailyAvg: ``,
            year: undefined,
            yearShow: "",
            years: years,
            yearsShow: false,
            month: undefined,
            monthShow: "",
            months: months,
            monthsShow: false,
        }
    },
    created() {
        let currentDate = new Date()
        this.year = currentDate.getFullYear()
        this.yearShow = currentDate.getFullYear() + " 年"
        let currentMonth = currentDate.getMonth() + 1
        this.month = currentMonth < 10 ? "0" + currentMonth : "" + currentMonth
        this.monthShow = currentMonth < 10 ? "0" + currentMonth + " 月" : currentMonth + " 月"
        this.getRecords(this.year, this.month)
    },
    methods: {
        yearBtnClick() {
            this.yearsShow = true
        },
        yearLiClick(year) {
            if (year && !isNaN(year)) {
                this.yearShow = year + " 年"
                this.year = year
            } else {
                this.yearShow = years[0]
                this.year = undefined
                this.monthShow = months[0]
                this.month = undefined
            }
            this.yearsShow = false
            this.getRecords(this.year, this.month)
        },
        monthBtnClick() {
            this.monthsShow = true
        },
        monthLiClick(month) {
            if (month && !isNaN(month)) {
                this.monthShow = month + " 月"
                this.month = month
            } else {
                this.monthShow = months[0]
                this.month = undefined
            }
            this.monthsShow = false
            this.getRecords(this.year, this.month)
        },

        getRecords: function (year, month) {
            let result = []
            if (year && month) {
                // Year + Month
                let array = records[year][month]
                if (array) {
                    result.push(...array)
                }
            } else {
                if (year) {
                    // Year
                    Object.keys(records[year]).forEach((mk) => {
                        let array = records[year][mk]
                        if (array) {
                            result.push(...array)
                        }
                    })
                } else {
                    // ALL
                    Object.keys(records).forEach((yk) => {
                        Object.keys(records[yk]).forEach((mk) => {
                            result.push(...records[yk][mk])
                        })
                    })
                }
            }
    
            let totalGets = 0
            let day = 0
            result.forEach((r) => {
                let gets = 0
                let getsView = []
                let details = r.details
                if (details) {
                    let detailKeys = Object.keys(details)
                    if (detailKeys && detailKeys.length > 0) {
                        detailKeys.forEach((dkey) => {
                            let num = details[dkey]
                            let price = items[dkey]
                            let tempPrice = Number(num).mul(price)
                            gets = Number(gets).add(tempPrice)
                            getsView.push(dkey + " × " + num)
                        })
                    } else {
                        getsView.push("無")
                    }
                } else {
                    getsView.push("無")
                }
                totalGets = Number(totalGets).add(gets)
    
                r.getsView = getsView.join("，")
                r.gets = Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(gets)
                day++
            })

            const getDailyAvg = Number(totalGets).div(day)
            
            this.records = result
            this.getTotal = Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(totalGets)
            this.getDailyAvg = Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(isNaN(getDailyAvg) ? 0 : getDailyAvg)
        }
    }
}).mount("#submarines")