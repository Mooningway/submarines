// Data
const years = SubmarinesData.years
const months = SubmarinesData.months
const submarines = SubmarinesData.submarines
const records = SubmarinesData.records
const items = SubmarinesData.items

$(function () {
    let currentDate = new Date()
    // Elements
    // Elements - Year
    let year = currentDate.getFullYear()
    let $year = $("#year")
    $year.html(yearView(year)) // Load years
    let $yearUl = $year.find("ul")
    let $yearButton = $year.find("button")
    $yearUl.hide()
    // Elements - Month
    let month = (currentDate.getMonth() + 1) < 10 ? ("0" + (currentDate.getMonth() + 1)) : ("" + (currentDate.getMonth() + 1))
    let $month = $("#month")
    $month.html(monthView(month)) // Load months
    let $monthButton = $month.find("button")
    let $monthUl = $month.find("ul")
    $monthUl.hide()
    // Elements - Submarine
    let submarine = submarines[0]
    let $submarine = $("#submarine")
    $submarine.html(submarineView(submarine)) // Load submarines
    let $submarineButton = $submarine.find("button")
    let $submarineUl = $submarine.find("ul")
    $submarineUl.hide()
    // Elements - Records
    let $records = $("#records")
    $records.html(recordView(year, month, submarine)) // Load records

    // Event
    // Event - Year
    $yearButton.on("click", function () {
        if ($yearUl.is(":visible") === true) {
            $yearUl.hide()
        } else {
            $yearUl.show()
        }
    })
    $yearUl.on("click", "li", function () {
        $yearUl.hide()
        let ylabel = $(this).html()
        $yearButton.html(ylabel)
        year = $(this).data("value")

        if (isNaN(year)) {
            $monthUl.hide()
            month = months[0]
            $monthButton.html(month)
        }

        $records.html(recordView(year, month, submarine)) // Load records
    })
    // Event - Month
    $monthButton.on("click", function () {
        if (isNaN(year)) {
            return
        }
        if ($monthUl.is(":visible") === true) {
            $monthUl.hide()
        } else {
            $monthUl.show()
        }
    })
    $monthUl.on("click", "li", function () {
        $monthUl.hide()
        let mlabel = $(this).html()
        $monthButton.html(mlabel)
        month = $(this).data("value")

        $records.html(recordView(year, month, submarine)) // Load records
    })
    // Event - Submarine
    $submarineButton.on("click", function () {
        if ($submarineUl.is(":visible") === true) {
            $submarineUl.hide()
        } else {
            $submarineUl.show()
        }
    })
    $submarineUl.on("click", "li", function () {
        $submarineUl.hide()
        let slabel = $(this).html()
        $submarineButton.html(slabel)
        submarine = $(this).data("value")

        $records.html(recordView(year, month, submarine)) // Load records
    })
})

const yearView = (yearValue) => {
    let itemHtml = []
    years.forEach((year) => {
        itemHtml.push(`<li data-value="` + year + `">` + (isNaN(year) ? year : year + "") + `</li>`)
    })
    let html = []
    html.push(`<button type="button">` + yearValue + `</button>`)
    html.push(`<ul>`)
    html.push(itemHtml.join(""))
    html.push(`</ul>`)
    return html.join("")
}

const monthView = (monthValue) => {
    let itemHtml = []
    months.forEach((month) => {
        itemHtml.push(`<li data-value="` + month + `">` + (isNaN(month) ? month : month + "") + `</li>`)
    })
    let html = []
    html.push(`<button type="button">` + monthValue + `</button>`)
    html.push(`<ul>`)
    html.push(itemHtml.join(""))
    html.push(`</ul>`)
    return html.join("")
}

const submarineView = (submarineValue) => {
    let itemHtml = []
    submarines.forEach((submarine) => {
        itemHtml.push(`<li data-value="` + submarine + `">` + submarine + `</li>`)
    })
    let html = []
    html.push(`<button type="button">` + submarineValue + `</button>`)
    html.push(`<ul>`)
    html.push(itemHtml.join(""))
    html.push(`</ul>`)
    return html.join("")
}

const recordView = (year, month, submarine) => {
    let dateYm = undefined
    if (!isNaN(year) && !isNaN(month)) {
        dateYm = year + "-" + month
    } else {
        if (!isNaN(year)) {
            dateYm = year + "-"
        }
    }

    const oneSubmarine = submarine && (submarine.indexOf("1") >= 0 || submarine.indexOf("2") >= 0 || submarine.indexOf("3") >= 0 || submarine.indexOf("4") >= 0)

    let totalGets = 0
    let day = 0
    let html = []
    for (let i = 0; i < records.length; i++) {
        const item = records[i]
        const date = item.date

        if (dateYm && date.indexOf(dateYm) < 0) {
            continue
        }

        const ship = item.ship
        if (oneSubmarine === true && submarine !== ship) {
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
                getsText.push("無")
            }
        } else {
            getsText.push("無")
        }
        totalGets = Number(totalGets).add(gets)
        day++

        const getsTextView = getsText.join("，")
        const getsView = Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(gets)

        html.push(`<tr>`)
        html.push(`<td class="text-center">` + date + `</td>`)
        html.push(`<td class="text-center">` + ship + `</td>`)
        html.push(`<td class="text-left">` + getsTextView + `</td>`)
        html.push(`<td class="text-left">` + item.remark + `</td>`)
        html.push(`<td class="text-right">` + getsView + `</td>`)
        html.push(`</tr>`)
    }

    const getDailyAvg = Number(totalGets).div(day)
    const totalGetsView = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(totalGets)
    const getDailyAvgView = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(isNaN(getDailyAvg) ? 0 : getDailyAvg)

    html.push(`<tr>`)
    html.push(`<td class="text-right" colspan="5">每日平均：` + getDailyAvgView + ` &emsp;&emsp; 合計： ` + totalGetsView + ` </td>`)
    html.push(`</tr>`)
    return html.join("")
}