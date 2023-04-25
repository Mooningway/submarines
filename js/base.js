(function ($) {
    Number.prototype.add = function (arg) {
        return calAdd(this, arg)
    }

    Number.prototype.sub = function (arg) {
        return calSub(this, arg)
    }

    Number.prototype.mul = function (arg) {
        return calMul(this, arg)
    }

    Number.prototype.div = function (arg) {
        return calDiv(this, arg)
    }

    Number.prototype.amount = function () {
        return Intl.NumberFormat(`en-US`, { maximumSignificantDigits: 3 }).format(isNaN(this) ? 0 : this)
    }

    $.fn.eleSelect = function (records, callback) {
        if (records && records.length > 0) {
            let itemHtml = []
            records.forEach((item) => {
                itemHtml.push(`<li>` + item.label + `</li>`)
            });

            let html = []
            html.push(`<div class="select">`)
            html.push(`<button type="button">` + records[0].label + `</button>`)
            html.push(`<ul>`)
            html.push(itemHtml.join(``))
            html.push(`</ul>`)
            html.push(`</div>`)
            $(this).html(html.join(``))

            let $button = $(this).find(`button`)
            let $ul = $(this).find(`ul`)
            $ul.hide()

            $button.on(`click`, function () {
                if ($ul.is(`:visible`) === true) {
                    $ul.hide()
                } else {
                    $ul.show()
                }
            })

            $ul.on(`click`, `li`, function () {
                $ul.hide()
                let index = $(this).index()
                $button.html(records[index].label)
                callback(records[index].value)
            })
        }

        return this
    }

    $.fn.elePage = function (pageSize = 10, total = 0, callback) {
        let temp = total % pageSize === 0 ? total.div(pageSize) / pageSize : total.div(pageSize).add(1)
        let totalPage = parseInt(temp)

        let html = []
        html.push(`<ul class="page">`)
        for (let i = 0; i < totalPage; i++) {
            if (i === 0) {
                html.push(`<li class="page-active">` + (i + 1) + `</li>`)
            } else {
                html.push(`<li>` + (i + 1) + `</li>`)
            }
        }
        html.push(`</ul>`)
        $(this).html(html.join(``))

        $(this).on(`click`, `li`, function () {
            $(this).prevAll().removeClass(`page-active`)
            $(this).nextAll().removeClass(`page-active`)
            $(this).addClass(`page-active`)
            let index = $(this).index() + 1
            callback(index)
        })

        return this
    }

    $.extend({
        totalPage: function(pageSize = 10, total = 0) {
            let result = total % pageSize === 0 ? total.div(pageSize) / pageSize : total.div(pageSize).add(1)
            return parseInt(result)
        }
    })

    function calAdd(arg1, arg2) {
        let r1, r2, m, c
        try {
            r1 = arg1.toString().split(`.`)[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(`.`)[1].length
        } catch (e) {
            r2 = 0
        }
        c = Math.abs(r1 - r2)
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0) {
            var cm = Math.pow(10, c)
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(`.`, ``))
                arg2 = Number(arg2.toString().replace(`.`, ``)) * cm
            } else {
                arg1 = Number(arg1.toString().replace(`.`, ``)) * cm
                arg2 = Number(arg2.toString().replace(`.`, ``))
            }
        } else {
            arg1 = Number(arg1.toString().replace(`.`, ``))
            arg2 = Number(arg2.toString().replace(`.`, ``))
        }
        return (arg1 + arg2) / m
    }

    function calSub(arg1, arg2) {
        var r1, r2, m, n
        try {
            r1 = arg1.toString().split(`.`)[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(`.`)[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        n = (r1 >= r2) ? r1 : r2
        return ((arg1 * m - arg2 * m) / m).toFixed(n)
    }

    function calMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
        try {
            m += s1.split(`.`)[1].length
        } catch (e) {
        }
        try {
            m += s2.split(`.`)[1].length
        } catch (e) {
        }
        return Number(s1.replace(`.`, ``)) * Number(s2.replace(`.`, ``)) / Math.pow(10, m)
    }

    function calDiv(arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2
        try {
            t1 = arg1.toString().split(`.`)[1].length
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(`.`)[1].length
        } catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(`.`, ``))
            r2 = Number(arg2.toString().replace(`.`, ``))
            return (r1 / r2) * pow(10, t2 - t1)
        }
    }
})(jQuery)