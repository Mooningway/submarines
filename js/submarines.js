const { createApp } = Vue
const { getRecords, years, months } = SubmarinesData

createApp({
    data() {
        return {
            records: [],
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
        getRecords(year, month) {
            this.records = getRecords(year, month)
        },
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
        }
    }
}).mount("#submarines")