// Data
const yms = SubmarinesData.yms
const submarines = SubmarinesData.submarines
const records = SubmarinesData.records
const items = SubmarinesData.items

// Init data
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = (currentDate.getMonth() + 1) < 10 ? ("0" + (currentDate.getMonth() + 1)) : ("" + (currentDate.getMonth() + 1))
const pageSize = 10

$(function () {
    // Query params
    let date = year + `-` + month
    let submarine = `all`
    let query = { date: date, submarine: submarine }

    // Elements and Events - Year and Month
    $yearMonth.eleSelect(yms, (value) => {
        query.date = value
        renderRecords(1, pageSize, query)
    })

    // Elements and Events - Submarine
    $("#submarine").eleSelect(submarines, (value) => {
        query.submarine = value
        renderRecords(1, pageSize, query)
    })

    // Render
    renderRecords(1, pageSize, query)
})

const renderRecords = (page0, pageSize0, query) => {
    const data = handleSubmarinesData(query)
    renderSubmarinesData(data, 1, pageSize0)
    $(`#dataPage`).elePage(page0, pageSize0, data.data.length, (page1) => {
        renderSubmarinesData(data, page1, pageSize0)
    })
}

const handleSubmarinesData = (query) => {
    let data = []
    let total = 0
    let daily = 0
    let dailyPreSub = 0

    let queryDate = query.date
    let querySubmarine = query.submarine

    let dayMap = new Map()
    let count = 0

    for (let i = records.length - 1; i >= 0; i--) {
        const item = records[i]
        const date = item.date

        if (queryDate && queryDate != "all" && date.indexOf(queryDate) < 0) {
            continue
        }

        const ship = item.ship
        if (querySubmarine && querySubmarine != "all" && ship !== querySubmarine) {
            continue
        }

        let gets = 0
        let getsItems = []
        let details = item.details
        if (details) {
            let detailKeys = Object.keys(details)
            if (detailKeys && detailKeys.length > 0) {
                detailKeys.forEach((dkey) => {
                    let num = details[dkey]
                    let price = items[dkey]
                    let tempPrice = Number(num).mul(price)
                    gets = Number(gets).add(tempPrice)
                    getsItems.push({ key: dkey, num: num })
                })
            }
        }
        total = Number(total).add(gets)
        dayMap.set(date, "")
        count++

        data.push({ date: date, submarine: item.ship, items: getsItems, total: gets.amount() })
    }

    daily = parseInt(Number(total).div(dayMap.size))
    dailyPreSub = parseInt(Number(total).div(count))

    let result = {}
    result.total = total.amount()
    result.daily = daily.amount()
    result.dailyPreSub = dailyPreSub.amount()
    result.data = data
    return result
}

const renderSubmarinesData = (data, page, pageSize) => {
    let records = data.data
    let start = (page - 1) * pageSize
    if (start < 0) {
        start = 0
    }
    let end = page * pageSize
    if (end > records.length) {
        end = records.length
    }
    let html = []
    for (let i = start; i < end; i++) {
        const r = records[i]

        let itemHtml = []
        r.items.forEach((ritem) => {
            itemHtml.push(`<div class="get-item">`)
            itemHtml.push(`<img src="./image/` + ritem.key + `.png" >`)
            itemHtml.push(`<div>` + ritem.num + `</div>`)
            itemHtml.push(`</div>`)
        })

        html.push(`<tr>`)
        html.push(`<td class="text-center">` + r.date + `</td>`)
        html.push(`<td class="text-center">` + r.submarine + `</td>`)
        html.push(`<td class="text-left"><div class="get-items">` + itemHtml.join(``) + `</div></td>`)
        html.push(`<td class="text-right">` + r.total + `</td>`)
        html.push(`<tr>`)
    }

    html.push(`<tr>`)
    html.push(`<td class="text-right" colspan="5">每日每船平均：` + data.dailyPreSub + ` &emsp;&emsp; 每日平均：` + data.daily + ` &emsp;&emsp; 合計： ` + data.total + ` </td>`)
    html.push(`</tr>`)

    $("#records").html(html.join(``))
}