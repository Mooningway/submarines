(function ($) {
    $.fn.eleSelect = function (records, callback) {
        if (records && records.length > 0) {
            let itemHtml = []
            records.forEach((item) => {
                itemHtml.push(`<li>` + item.label + `</li>`)
            });
            callback(records[0].value)

            let html = []
            html.push(`<div class="select">`)
            html.push(`<button type="button">` + records[0].label + `</button>`)
            html.push(`<ul>`)
            html.push(itemHtml.join(""))
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

})(jQuery)