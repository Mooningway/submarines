const SubmarinesData = {
    years: ["年份", "2023"],
    months: ["月份", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    records: {
        "2023": {
            "04": [
                { date: "2023-04-08", ship: "1船", remark: "第一次起航，祝願是一個好的開始~，但事與願違，帶回來的是一堆寶石......", details: {} },
                { date: "2023-04-09", ship: "1船", remark: "第二天，我已經放平心態了，果然仍然是一堆寶石。", details: {} },
                { date: "2023-04-10", ship: "1船", remark: "第三天總算有點收穫。", details: { "沉船戒指": 5, "沉船項鍊": 4 } },
                { date: "2023-04-11", ship: "1船", remark: "第四天，成績有點OK。", details: { "上等沉船項鍊": 5 } },
            ]
        }
    },
    items: {
        "沉船戒指": 8000,
        "沉船手鐲": 9000,
        "沉船耳飾": 10000,
        "沉船項鍊": 13000,
        "上等沉船戒指": 27000,
        "上等沉船手鐲": 28500,
        "上等沉船耳饰": 30000,
        "上等沉船項鍊": 34500,
    },
    getRecords: function (year, month) {
        let itemMap = SubmarinesData.items
        let records = SubmarinesData.records

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
        result.forEach((r) => {
            let gets = 0
            let getsView = []
            let details = r.details
            if (details) {
                let detailKeys = Object.keys(details)
                if (detailKeys && detailKeys.length > 0) {
                    detailKeys.forEach((dkey) => {
                        let num = details[dkey]
                        let price = itemMap[dkey]
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
            r.totalGets = Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(totalGets)
        })
        return result
    }
}