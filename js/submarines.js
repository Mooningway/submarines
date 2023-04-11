/**
 * 收益記錄
 */
let records = [
    { date: `2023-04-08`, ship: `1船`, remark: `第一次起航，祝願是一個好的開始~，但事與願違，帶回來的是一堆寶石......`, details: {} },
    { date: `2023-04-09`, ship: `1船`, remark: `第二天，我已經放平心態了，果然仍然是一堆寶石。`, details: {} },
    { date: `2023-04-10`, ship: `1船`, remark: `第三天總算有點收穫。`, details: {"沉船戒指": 5, "沉船項鍊": 4} },
]

/**
 * 收益物品集合
 * 與軍票相關的，按與金幣比例 1:1 計算
 * 收益物品列表，值為整數為收益，負數為支出
 */
const itemMap = {
    "海產油脂": 1,
    "沉船戒指": 8000,
    "沉船手鐲": 9000,
    "沉船耳飾": 10000,
    "沉船項鍊": 13000,
    "上等沉船戒指": 27000,
    "上等沉船手鐲": 28500,
    "上等沉船耳饰": 30000,
    "上等沉船項鍊": 34500,
    "魔導機械修理材料": -1766, // 6級暗物質：5*345=1725，暗物質晶簇：200/9≈23，風只水晶：200/120*5≈9，冰之水晶：200/120*5≈9，合計：1766
}

let showRecords = (records = [], itemMap = {}, year = ``, month = ``) => {
    let year1 = year
    let month1 = month
    if (year1) {
        year1 = year1.replace(` 年`, ``)
    }
    if (month1) {
        month1 = month1.replace(` 月`, ``)
    }

    let ymString = ``
    if (year1 && !isNaN(year1) && month1 && !isNaN(month1)) {
        ymString = year1 + `-` + month1
    }

    let tbodyHtml = []
    let totalGets = 0
    for (let i = 0; i < records.length; i++) {
        let item = records[i]

        let date = item.date
        if (ymString && ymString.length >= 0 && date.indexOf(ymString) < 0) {
            continue;
        }

        let gets = 0
        let getsView = []
        let details = item.details

        if (details) {
            let detailKeys = Object.keys(details)
            if (detailKeys && detailKeys.length > 0) {
                detailKeys.forEach((dkey) => {
                    let num = details[dkey]
                    let price = itemMap[dkey]
                    let tempPrice = Number(num).mul(price)
                    gets = Number(gets).add(tempPrice)
                    getsView.push(dkey + ` × ` + num)
                })
            } else {
                getsView.push(`無`)
            }
        } else {
            getsView.push(`無`)
        }
        totalGets = Number(totalGets).add(gets)

        tbodyHtml.push(`<tr>`)
        tbodyHtml.push(`<td class="text-center">` + date + `</td>`)
        tbodyHtml.push(`<td class="text-center">` + item.ship + `</td>`)
        tbodyHtml.push(`<td class="text-left">` + getsView.join(`，`) + `</td>`)
        tbodyHtml.push(`<td class="text-left">` + item.remark + `</td>`)
        tbodyHtml.push(`<td class="text-right">` + Intl.NumberFormat(`en-IN`, { maximumSignificantDigits: 3 }).format(gets) + `</td>`)
        tbodyHtml.push(`<td class="text-right">` + Intl.NumberFormat(`en-IN`, { maximumSignificantDigits: 3 }).format(totalGets) + `</td>`)
        tbodyHtml.push(`<tr/>`)
    }

    let tableHtml = []
    tableHtml.push(`<table class="submarines-records-table">`)
    tableHtml.push(`<thead><tr>`)
    tableHtml.push(`<th class="text-center">日期</th>`)
    tableHtml.push(`<th class="text-center">船名稱</th>`)
    tableHtml.push(`<th class="text-left">獲取</th>`)
    tableHtml.push(`<th class="text-left">備註</th>`)
    tableHtml.push(`<th class="text-center">當天收益</th>`)
    tableHtml.push(`<th class="text-center">總收益</th>`)
    tableHtml.push(`</tr></thead>`)
    tableHtml.push(`<tbody>` + tbodyHtml.join(``) + `</tbody>`)
    tableHtml.push(`</table>`)
    return tableHtml.join(``)
}

Number.prototype.add = function (arg) {
    return accAdd(arg, this)
}

Number.prototype.sub = function (arg) {
    return accSub(arg, this)
}

Number.prototype.mul = function (arg) {
    return accMul(arg, this)
}

Number.prototype.div = function (arg) {
    return accDiv(arg, this)
}

function accAdd(arg1, arg2) {
    let r1, r2, m, c
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}