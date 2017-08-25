/**
 * markdown 编辑器
 *
 * @author 煤老板 <meok23@sina.com>
 * @date 2017-03-13
 */
var eewakeditor = {

    /* 编辑器节点对象 */
    ed: null,

    /* 建立编辑器 */
    build: function (id) {
        eewakeditor.ed = $('#' + id);

        eewakeditor.ed.find('i[data-role]').on('click', function () {

            // 执行命令
            eewakeditor.execCmd[$(this).data('role')]();
        });

        return eewakeditor.ed;
    },

    /* 获取选中的文字 */
    selText: function () {
        var text = '';
        var area = eewakeditor.ed.find('textarea').get(0);

        if (document.selection) {
            // IE 浏览器
            area.focus();
            var r = document.selection.createRange();
            if (r !== null) text = r.text;
        } else if ('selectionStart' in area) {
            // 其它浏览器
            var len = area.selectionEnd - area.selectionStart;
            text = area.value.substr(area.selectionStart, len);
        }

        return text;
    },

    /* 替换选中的文字 */
    replace: function (text) {
        var area = eewakeditor.ed.find('textarea').get(0);

        if (document.selection) {
            // IE 浏览器
            area.focus();

            document.selection.createRange().text = text;
            $(area).trigger('propertychange');
        } else if ('selectionStart' in area) {
            // 其它浏览器
            area.focus();

            var start = area.selectionStart;
            area.value = area.value.substr(0, area.selectionStart) + text + area.value.substr(area.selectionEnd);

            area.selectionStart = area.selectionEnd = start + text.length;
            $(area).trigger('input');
        } else {
            // 不支持
            area.value += text;
        }
    },

    /* 定义命令 */
    execCmd: {
        bold: function () {
            var text = eewakeditor.selText();
            text = text.length < 1 ? '加粗文字' : text;

            eewakeditor.replace('**' + text + '**');
        },
        italic: function () {
            var text = eewakeditor.selText();
            text = text.length < 1 ? '斜体文字' : text;

            eewakeditor.replace('_' + text + '_');
        },
        h2: function () {
            var text = eewakeditor.selText();
            text = text.length < 1 ? '标题段落' : text;

            eewakeditor.replace('## ' + text);
        },
        quote: function () {
            var text = eewakeditor.selText();
            text = text.length < 1 ? '引用区块' : text;

            eewakeditor.replace('> ' + text);
        },
        link: function () {
            eewakeditor.replace('[text]()');
        },
        code: function () {
            var text = eewakeditor.selText();
            text = text.length < 1 ? '代码块' : text;

            var reg = /\n+/m;
            if (reg.test(text)) {
                eewakeditor.replace('~~~\n' + text + '\n~~~');
            } else {
                eewakeditor.replace('`' + text + '`');
            }
        },
        full_screen: function () {
            var areaH = $(window).height() - 50;
            var preview = eewakeditor.ed.find('[data-role=preview_box]');

            // 设置编辑区域的样式
            eewakeditor.ed.css({
                "width": "50%",
                "height": "100%",
                "position": "fixed",
                "top": "0px",
                "left": "0px",
                "z-index": "999"
            });
            eewakeditor.ed.find('textarea').css({"height": areaH}).show();

            // 设置预览区域的样式
            preview.css({
                "position": "fixed",
                "top": "0px",
                "left": "50%",
                "width": "50%",
                "height": "100%",
                "z-index": "999"
            });
            preview.show();

            // 设置按钮显示
            $('i[data-role=write]').hide();
            $('i[data-role=preview]').hide();

            $('i[data-role=full_screen]').hide();
            $('i[data-role=normal_screen]').show();
        },
        normal_screen: function () {
            var preview = eewakeditor.ed.find('[data-role=preview_box]');

            eewakeditor.ed.removeAttr('style').find('textarea').removeAttr('style');
            preview.removeAttr('style');

            // 设置按钮显示
            $('i[data-role=write]').hide();
            $('i[data-role=preview]').show();

            $('i[data-role=full_screen]').show();
            $('i[data-role=normal_screen]').hide();
        },
        preview: function () {
            var preview = eewakeditor.ed.find('[data-role=preview_box]');

            eewakeditor.ed.find('textarea').hide();
            preview.show();

            // 设置按钮显示
            $('i[data-role=write]').show();
            $('i[data-role=preview]').hide();

            $('i[data-role=full_screen]').show();
            $('i[data-role=normal_screen]').hide();
        },
        write: function () {
            var preview = eewakeditor.ed.find('[data-role=preview_box]');

            eewakeditor.ed.find('textarea').show();
            preview.removeAttr('style');
            preview.hide();

            // 设置按钮显示
            $('i[data-role=write]').hide();
            $('i[data-role=preview]').show();

            $('i[data-role=full_screen]').show();
            $('i[data-role=normal_screen]').hide();
        }
    }
};
