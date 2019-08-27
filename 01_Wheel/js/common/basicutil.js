(function ($) {
    // Echarts...
    window.Echarts = function () {
        var init = function (options) { // 创建一个ECharts实例
            options = $.extend({}, {
                "id": "echarts_dom_id", // 需要echarts图表的dom容器
                "renderer": "svg",
                "option": "",
            }, options || {});
            var myChart = echarts.init(document.getElementById(options.id), null, {
                renderer: options.renderer
            });
            myChart.off("click"); // 先移走点击事件（important!!!）
            return myChart; // 返回echarts图表对象
        }
        var gererate = function (myChart, option) {
            // console.log("gererate start...");
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
        return {
            config: function (options) {
                var myChart = init(options);
                return {
                    set: function (callback) {
                        gererate(myChart, options.option);
                        // console.log(myChart, option);
                        callback(myChart);
                    }
                }
            }
        }

    }();

    // 页面路由 SPA (single page application)
    window.PageRoute = function () {
        var gererate = function (options) { // 生成新的参数并返回
            options = $.extend({}, {
                "$targetPlace": "echarts_dom_id", // 需要echarts图表的dom容器
                "url": "",
                "data": "",
                "keyName": "key", // 存储在sessionStorage中的key名称
                "message": "加载外部页面成功", // tips
            }, options);
            return options; // 返回echarts图表对象
        }
        return {
            load: function (options) {
                var oParam_vob = gererate(options); // 获取新的参数
                sessionStorage.setItem(oParam_vob.keyName, oParam_vob.data);
                oParam_vob.$targetPlace.load(oParam_vob.url, function (responseTxt, statusTxt, xhr) {
                    if (statusTxt === "success") {
                        console.log("PageRoute.load, 页面加载成功... 【statusText：" + xhr.statusText + "】");
                        // sessionStorage.setItem(oParam_vob.keyName, oParam_vob.data);
                    } else if (statusTxt === "error") {
                        alert("Error: " + xhr.status + ": " + xhr.statusTxt);
                    };
                    // console.log(responseTxt);
                    // console.log(statusTxt);
                    // console.log(xhr);
                });
            },
            getValue: function (callback) {
                if (sessionStorage.getItem("key")) {
                    var jData_vob = JSON.parse(sessionStorage.getItem("key"));
                    callback(jData_vob);
                }
            }
        }
    }();

    //  $oLeft_vob, $oRight_vob
    window.IcoToggle = function () {
        var init = function (options) { // 创建一个ECharts实例
            var sLeft_vob = '';
            sLeft_vob += '<div class="toggleLeftIcon">';
            sLeft_vob += '      <span class="glyphicon glyphicon-fast-backward"></span>';
            sLeft_vob += '</div>';
            var sRight_vob = '';
            sRight_vob += '<div class="toggleRightIcon">';
            sRight_vob += '     <span class="glyphicon glyphicon-fast-forward"></span>';
            sRight_vob += '</div>';
            options = $.extend({}, {
                "iWidthLeft_vob": 0, // 左面部分宽度
                "iWidthRight_vob": 0, // 右面部分宽度
                "sLeft_vob": sLeft_vob,
                "sRight_vob": sRight_vob,
                "$oLeft_vob": "",
                "$oRight_vob": "",
            }, options || {});
            return options;
        }
        return {
            config: function (options) {
                var o_vob = init(options);
                console.log(o_vob);
                o_vob.$oLeft_vob.append(o_vob.sLeft_vob);
                o_vob.$oRight_vob.append(o_vob.sRight_vob);
                var $oLeftIco_vob = o_vob.$oLeft_vob.find(".toggleLeftIcon"); // 左面图标
                var $oRightIco_vob = o_vob.$oRight_vob.find(".toggleRightIcon"); // 右面图标
                $oRightIco_vob.hide();
                return {
                    set: function (callback) {
                        $oLeftIco_vob.on("click", function () {
                            o_vob.$oLeft_vob.hide();
                            $oRightIco_vob.show();
                            o_vob.$oRight_vob.css("width", "100%");
                        });
                        $oRightIco_vob.on("click", function () {
                            o_vob.$oLeft_vob.show();
                            $oRightIco_vob.hide();
                            o_vob.$oRight_vob.css("width", o_vob.iWidthRight_vob);
                        })
                        callback($oLeftIco_vob, $oRightIco_vob);
                    }
                }
            }
        }


    }();

    // 表单验证
    window.Validator = function () {
        var init = function (options) {
            options = $.extend({}, {
                "$oForm": "", // form表单对象
                "container": "class_dom", // tips 区域的dom
                "live": "enabled", //验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
                "excluded": [":disabled", ":hidden", ":not(:visible)"], //排除无需验证的控件，比如被禁用的或者被隐藏的
                "fields": "",
            }, options || {});
            return options;
        }
        return {
            config: function (options) {
                var option = init(options);
                option.$oForm.bootstrapValidator({
                    container: option.container,
                    live: option.live,
                    excluded: option.excluded,
                    fields: option.fields,
                });
            },
            reset: function ($oForm) {
                $oForm.data('bootstrapValidator').resetForm();
            },
            restart: function ($oForm, sField) { // 表单对象, 重启字段的name
                $oForm.data('bootstrapValidator')
                    .updateStatus(sField, 'NOT_VALIDATED')
                    .validateField(sField);
            }
        }
    }();

})(jQuery);


// 清空所有输入框中的输入记录
$('input[type = "text"]').attr("autocomplete", "off");


var operateEvents = {
    'click [data-dropdown="dropdowns"]': function (e, value, row, index) {
        $.fnShowOrRemoveButton_fob(oBtnList_vob, sSelectorClass_vob, sSelectorParentClass_vob);
        $.fnAdjustTableDropdownMenu_fob(index);
    },
    'click .a_Update': function (e, value, row, index) {
        oLaborService_vob.LaborServiceData = row; // 给Vue中的data赋值
        // console.log(oLaborService_vob.LaborServiceData);
        $(sMdEdit_vob).modal('show');
    },
    'click .operate_delete': function (e, value, row, index) {
        alert(1);
    }
}

// console.log(window.operateEvents);
// console.log(operateEvents);

var BootstrapTables = {
    "operateFormatter": function () {
        var sDiv_vob = '';
        sDiv_vob += '<div class="operate-btn">'
        sDiv_vob += '   <button type="button" class="btn btn-warning operate_update">';
        sDiv_vob += '       <span class="glyphicon glyphicon-pencil"></span>';
        sDiv_vob += '   </button>';
        sDiv_vob += '   <button type="button" class="btn btn-danger operate_delete">';
        sDiv_vob += '       <span class="glyphicon glyphicon-trash"></span>';
        sDiv_vob += '   </button>';
        sDiv_vob += '</div>';
        return sDiv_vob
    },
    "operateEvents": function () {
        var operateEvents = {
            'click .operate_update': function (e, value, row, index) {
                alert("修改" + index);
            },
            'click .operate_delete': function (e, value, row, index) {
                alert("删除" + index);
            }
        }
        return operateEvents;
    },
    "init": function (oParam_vob) {
        var $oTable_vob = oParam_vob.$table;
        var _self = this;
        console.log(_self);
        $oTable_vob.bootstrapTable({
            toolbar: '#toolbar', //工具按钮用哪个容器
            striped: false, //是否显示行间隔色
            cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true, //是否显示分页（*）
            sortable: false, //是否启用排序
            sortOrder: "asc", //排序方式                                    //传递参数（*）
            sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1, //初始化加载第一页，默认第一页
            totalRows: 0,
            pageSize: 10, //每页的记录行数（*）
            pageList: [10, 25, 50], //可供选择的每页的行数（*）
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false, //是否显示所有的列
            showRefresh: false, //是否显示刷新按钮
            minimumCountColumns: 2, //最少允许的列数
            clickToSelect: true, //是否启用点击选中行
            // height: $(window).height() - 100, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id", //每一行的唯一标识，一般为主键列
            showToggle: false, //是否显示详细视图和列表视图的切换按钮
            cardView: false, //是否显示详细视图
            detailView: false, //是否显示父子表
            // height: $.fnAdjustSelectContent_fob(),
            columns: [{
                field: 'operate',
                title: '操作',
                align: 'center',
                // width: 20,
                formatter: _self.operateFormatter(),
                events: _self.operateEvents(),
            }, {
                field: 'row_1',
                title: '第一列',
            }, {
                field: 'row_2',
                title: '第二列',
            }, {
                field: 'row_3',
                title: '第三列',
            }, {
                field: 'row_4',
                title: '第四列',
            }],
            onPageChange: function () { //分页查询
                var oTemp_vob = $oTable_vob.getPageSizeAndNumber();

                // oParam_vob.pageData.number = 

                // console.log(temp);
                // oPage_vob.number = temp.number;
                // oPage_vob.size = temp.size;
                // //此处调用查询方法
                // fnSelectTableData_fob($oTable_vob, oPage_vob.size, oPage_vob.number);
            },
            onClickRow: function (row, $element) {
                $element.parent().find('.success').removeClass('success'); // 删除之前选中的样式
                $element.addClass("success"); // 为当前选中的，添加样式
            }
        });
    },
    "load": function (oParam_vob) {
        var $oTable_vob = oParam_vob.$table;
        console.log($oTable_vob);
        console.log(oParam_vob.data);
        $oTable_vob.bootstrapTable('removeAll');
        $oTable_vob.bootstrapTable('load', oParam_vob.data);
    }
}