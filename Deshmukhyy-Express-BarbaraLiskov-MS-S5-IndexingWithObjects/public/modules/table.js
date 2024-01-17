const templates = {
    table: {
        container: (data) => {
            return `<table class="m-4 table w-75 ${data.classes || ''}">${data.html || ''}</table>`
        },
        header: (data) => {
            return `<thead>
                        <tr>${data.columns.map(column => templates.table.th(column)).join(' ')}</tr> </thead>        `
        },
        th: (data) => {
            return `<th class="col ${data.classes || ''}">${data.title}</th>`
        },
        row: (row, attributes,classes='') => {
            let attr = '';
            for (const i in attributes) attr += `data-${i}="${attributes[i]}" `;
                return `<tr ${attr} class=" ${classes}">${Object.keys(row).map(key => templates.table.td({
                classes: key,
                value: row[key]
            })).join(' ')
                }</tr>`
        },
        td: (data) => {
            return `<td class="${data.classes || ''}">${data.value}</td>`
        },
        body: function (data,classes={}) {
            return `<tbody class="${classes.body || ''}">${data.map(row => templates.table.row(row.data, row.attributes || {},(row.classes || classes.row))).join(' ')}</tbody>`
        },
        empty: function (data) {
            let { message = 'No data found!' } = data;

            return `
            <h6 class="p-4 text-center">
                ${message}
            </h6>
            `;
        },
    },
    pagination: {
        container: function (data) {
            return `<nav class="pagination justify-content-center pt-2"> <ul class="pagination d-flex justify-content-center">${data.html || ''}</ul></nav>`
        },
        previous: function (url) {
            return `<li class="page-item mr-2"><a data-href="${url}" data-navigation class="page-link ${!url ? 'disabled' : ''}" href="#" style="border: none;">
            <span aria-hidden="true" class="p-2">
                <svg width="15" height="20" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 21.1797L5.72863 12L15 2.82031L12.1457 -1.24766e-07L-5.24537e-07 12L12.1457 24L15 21.1797Z" fill="#0029FF" fill-opacity="0.8"></path>
                </svg>
            </span></a></li>`
        },
        details: function (current_page, last_page) {
            return ` <li class="page-item mt-2"><span>${current_page} of ${last_page + 1}</span></li>`
        },
        next: function (url) {
            return `<li class="page-item ml-2"><a data-href="${url}" data-navigation  class="page-link ${!url ? 'disabled' : ''}" href="#" style="border: none;">
            <span aria-hidden="true" class="p-2">
                <svg width="15" height="20" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-9.25794e-07 2.82031L9.27137 12L-1.2328e-07 21.1797L2.85431 24L15 12L2.85431 -1.24766e-07L-9.25794e-07 2.82031Z" fill="#0029FF" fill-opacity="0.8"></path>
                </svg>
            </span></a></li>`
        }
    }
}

class Table {
    constructor(data) {
        this.params = data.params;
        this.target = data.target;
        this.columns = data.columns;
        this.hover = undefined == data.hover ?  !false : data.hover;
        this.formatter = data.formatter;
        this.url = data.url || '';
        this.withSkeleton = data.withSkeleton || false;
        this.template = templates.table;
        this.pagination = templates.pagination;
        this.emptyMessage = templates.table.empty({ message: data.emptyMessage });
        this.perPage = data.perPage || 5;
    }
    render(url) {
       
        let $that = this;
        this.loader(true);
        this.url = url || this.url;
        if(!this.url) return false;
        $($that.target).html(``);
        if(this.withSkeleton) this.skeleton();
        $.ajax({
            url: url,
            method: 'get',
            cache: false,
            success: ({ response }) => {
                    let { from }  = response;
                    $($that.target).html(!response.data.length ? $that.emptyMessage : $that.template.container({
                        html: ($that.template.header({ columns: $that.columns }) + $that.template.body($that.formatter(response.data, from))),
                        classes: $that.hover ? '' : 'no-hover'
                    })).append(!response.data.length ? '' : $that.paginate(response));
                    $that.events();
                    $that.params = {};
                    $($that.target).trigger('table:rendered', response);
                },
            error: ((error) => {
                    console.log(error);
                    $($that.target).find('table').html($that.emptyMessage);
                })
            })
    }                    
    paginate(data) {
        return this.pagination.container({
            html: (this.pagination.previous(data.prev_page_url) + this.pagination.details(data.to, data.last_page) + this.pagination.next(data.next_page_url))
        })
    }
    events() {
        let $that = this;
        $(this.target).find('[data-navigation]:not(.disabled)').on('click', function () {
            let href = $(this).data('href');
            $that.render(href)
        })
    }
    loader(is) {
        $(this.target)[is ? 'addClass' : 'removeClass']('ajaxifying')
    }
    skeleton() {
        let $that = this;
        $($that.target).html(`<table></table>`);
        $($that.target).find('table').html($that.template.container({
            html: ($that.template.header({ columns: $that.columns }) + $that.template.body($that.formatter(Array(10).fill({})),{
                row:"skeleton-box"
            }))
        }))
    }
    setFilter(filter) {
        this.url  = this.url.split('?')[0] || this.url;
        this.params = filter || {};
    }
    refresh(withDefault) {
        console.log(withDefault)
        this.params = withDefault || this.params || {};
        this.render();
    }
    reset() {
        this.params = {};
        this.render();
    }
    static populate(target,data,config={}) {
        $(target).html(`<table></table>`);
        $(target).find('table').html(!data.rows.length ? 'No Data': templates.table.container({
            html: (templates.table.header({ columns: data.columns }) +templates.table.body(data.formatter(data.rows))),
            classes: config.classes ? config.classes : ""
        }))
    }
}