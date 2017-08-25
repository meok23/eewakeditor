/**
 * 单文件上传
 *
 * @author 煤老板 <meok23@sina.com>
 * @date 2017-03-01
 */
$.extend({
    upload: function (options) {

        /* 获取参数 */
        options = $.extend({
            url: '',
            data: null,
            fileId: '',
            success: function (res) {
                console.log(res);
            }
        }, options);

        var form, frame = $();
        var frameId = '';

        /* 创建表单 */
        (function () {
            form = $('<form  action="' + options.url + '" method="POST" enctype="multipart/form-data" style="display:none;"></form>');

            var data = options.data;
            if (data != null) {
                for (var i in data) {
                    $(form).append('<input type="hidden" name="' + i + '" value="' + data[i] + '" />');
                }
            }

            var newFile = $('#' + options.fileId).clone();
            $(newFile).attr('id', options.fileId + 'Upload');
            $(form).append(newFile);

            $('body').append(form);
        })();

        /* 创建框架 */
        (function () {
            var timestamp = new Date().getTime();
            frameId = 'uploadFrame' + timestamp;

            frame = $('<iframe id="' + frameId + '" name="' + frameId + '" src="javascript:false" style="display:none;" />');

            $('body').append(frame);
        })();

        /* 上传成功后的回调函数 */
        var uploadCallback = function () {
            var io = document.getElementById(frameId);

            var xml = {};
            if (io.contentWindow) {
                xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML: null;
                xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument: io.contentWindow.document;
            } else if (io.contentDocument) {
                xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML: null;
                xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument: io.contentDocument.document;
            }

            $(io).unbind();

            var res = JSON.parse(xml.responseText);
            options.success(res);

            setTimeout(function() {
                $(io).remove();
                $(form).remove();
            }, 100);
            xml = null;
        };

        /* 提交数据 */

        $(form).attr('target', frameId);
        $(form).submit();
        $('#' + frameId).load(uploadCallback);
    }
});
