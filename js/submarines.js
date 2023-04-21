// Data
const yms = SubmarinesData.yms
const submarines = SubmarinesData.submarines
const records = SubmarinesData.records
const items = SubmarinesData.items

$(function () {
    // Init data
    let currentDate = new Date()
    let submarine = `all`
    let year = currentDate.getFullYear()
    let month = (currentDate.getMonth() + 1) < 10 ? ("0" + (currentDate.getMonth() + 1)) : ("" + (currentDate.getMonth() + 1))
    let date = year + `-` + month

    // Elements
    // Elements- records
    let $records = $("#records")
    // Elements and Events - Year and Month
    let $yearMonth = $("#year-month")
    $yearMonth.eleSelect(yms, (value) => {
        date = value
        $records.html(recordView(date, submarine)) // Load submarines
    })

    // Elements and Events - Submarine
    let $submarine = $("#submarine")
    $submarine.eleSelect(submarines, (value) => {
        submarine = value
        $records.html(recordView(date, submarine)) // Load submarines
    })
})

const recordView = (yearMonth, submarine) => {
    let totalGets = 0
    let dayMap = new Map()
    let count = 0
    let html = []
    for (let i = 0; i < records.length; i++) {
        const item = records[i]
        const date = item.date

        if (yearMonth && yearMonth != "all" && date.indexOf(yearMonth) < 0) {
            continue
        }

        const ship = item.ship
        if (submarine && submarine != "all" && ship.indexOf(submarine) < 0) {
            continue
        }

        let gets = 0
        let getsText = []
        let details = item.details
        if (details) {
            let detailKeys = Object.keys(details)
            if (detailKeys && detailKeys.length > 0) {
                detailKeys.forEach((dkey) => {
                    let num = details[dkey]
                    let price = items[dkey]
                    let tempPrice = Number(num).mul(price)
                    gets = Number(gets).add(tempPrice)
                    getsText.push(dkey + " × " + num)
                })
            } else {
                getsText.push("")
            }
        } else {
            getsText.push("")
        }
        totalGets = Number(totalGets).add(gets)
        dayMap.set(date, "")
        count++

        const getsTextView = getsText.join("，")
        const getsView = Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(gets)

        html.push(`<tr>`)
        html.push(`<td class="text-center">` + date + `</td>`)
        html.push(`<td class="text-center">` + ship + `</td>`)
        html.push(`<td class="text-left">` + getsTextView + `</td>`)
        html.push(`<td class="text-right">` + getsView + `</td>`)
        html.push(`</tr>`)
    }

    const getDailyAvg = Number(totalGets).div(dayMap.size)
    const getDailyAvg1 = Number(totalGets).div(count)
    const totalGetsView = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(totalGets)
    const getDailyAvgView = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(isNaN(getDailyAvg) ? 0 : getDailyAvg)
    const getDailyAvg1View = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(isNaN(getDailyAvg1) ? 0 : getDailyAvg1)

    html.push(`<tr>`)
    html.push(`<td class="text-right" colspan="5">每日每船平均：` + getDailyAvg1View + ` &emsp;&emsp; 每日平均：` + getDailyAvgView + ` &emsp;&emsp; 合計： ` + totalGetsView + ` </td>`)
    html.push(`</tr>`)
    return html.join("")
}