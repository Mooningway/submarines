(function ($) {
    $.fn.eleSelect = function (records, callback) {
        if (records && records.length > 0) {
            let defaultValue
            let defaultLabel
            let itemHtml = []
            records.forEach((item, index) => {
                let label = item.label
                let value = item.value
                if (index === 0) {
                    defaultLabel = label
                    defaultValue = value
                    callback(defaultValue)
                }
                itemHtml.push(`<li data-value="` + value + `">` + label + `</li>`)
            });

            let html = []
            html.push(`<div class="select">`)
            html.push(`<button type="button">` + defaultLabel + `</button>`)
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
                let label = $(this).html()
                $button.html(label)
                let selectValue = $(this).data("value")
                callback(selectValue)
            })
        }

        return this
    }

})(jQuery)