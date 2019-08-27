"use strict";
var oVue;

$(document).ready(function () {
    oVue = new Vue({
        el: "",
        data: {
            currentTimes: "", // 当前时间
            $oNav_v: "", // nav 导航对象
            $oArticle_v: "", // article 文章对象
            $oHeaderIco_v: "", // header-ico
            oArticle_v: "",
            iNavWidth: "180px" // nav 宽度
        },
        methods: {
            fnNavShow_fob: function () {
                // nav 显示
                oVue.$oNav_v.css("z-index", "2");
                oVue.$oArticle_v.css("left", oVue.iNavWidth);
            },
            fnNavHide_fob: function () {
                // nav 隐藏
                oVue.$oNav_v.css("z-index", "0");
                oVue.$oArticle_v.css("left", 0);
            },
            fnResponsiveView_fob: function () {
                $(window).on("resize", function () {
                    var iwidth_vob = $(window).width();
                    if (iwidth_vob > 768) {
                        oVue.fnNavShow_fob();
                    } else if (iwidth_vob <= 768) {
                        oVue.fnNavHide_fob();
                    }
                });
            },
            fnClickHeaderLeftIco_fob: function () {
                // 点击header左侧区域中ico图标,控制nav显示或隐藏
                var iWidth_vob = $(window).width();
                var sZIndex_vob = oVue.$oNav_v.css("z-index");
                if (iWidth_vob > 768) {
                    // 大屏的时候
                    if (sZIndex_vob === "2") {
                        // 隐藏nav
                        oVue.fnNavHide_fob();
                    } else {
                        // 显示nav
                        oVue.fnNavShow_fob();
                    }
                } else if (iWidth_vob <= 768) {
                    // 小屏的时候
                    if (sZIndex_vob === "2") {
                        // 隐藏nav
                        oVue.fnNavHide_fob();
                    } else {
                        // 显示nav & article 宽度充满屏幕
                        oVue.$oNav_v.css("z-index", "2");
                        oVue.$oArticle_v.css("left", 0);
                    }
                }
            },
            fnCurrentTimes_fob: function () {
                setInterval(function () {
                    oVue.currentTimes = new Date().Format("yyyy-MM-dd hh:mm:ss");
                }, 1000);
            }
        },
        beforeCreate: function () {
            oVue = this;
        },
        created: function () {
            this.fnCurrentTimes_fob();
        },
        mounted: function () {
            this.$oNav_v = $("nav");
            this.$oArticle_v = $("article");
            this.$oHeaderIco_v = $(".header-ico");

            this.fnResponsiveView_fob();

            var s = new Date().Format("yyyy-MM-dd hh:mm:ss.S");
            console.log(s);

            layui.use(["element", "layer"], function () {
                var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
                var layer = layui.layer;
                //监听导航点击
                element.on("nav(navArea)", function (elem) {
                    layer.msg(elem.text());
                });
            });


            // ==========
            $('#avatarInput').on('change', function (e) {
                var filemaxsize = 1024 * 5; //5M
                var target = $(e.target);
                var Size = target[0].files[0].size / 1024;
                if (Size > filemaxsize) {
                    alert('图片过大，请重新选择!');
                    $(".avatar-wrapper").childre().remove;
                    return false;
                }
                if (!this.files[0].type.match(/image.*/)) {
                    alert('请选择正确的图片!')
                } else {
                    var filename = document.querySelector("#avatar-name");
                    var texts = document.querySelector("#avatarInput").value;
                    var teststr = texts; //你这里的路径写错了
                    var testend = teststr.match(/[^\\]+\.[^\(]+/i); //直接完整文件名的
                    filename.innerHTML = testend;
                }

            });

            $(".avatar-save").on("click", function () {
                var img_lg = document.getElementById('imageHead');
                // 截图小的显示框内的内容
                html2canvas(img_lg, {
                    allowTaint: true,
                    taintTest: false,
                    onrendered: function (canvas) {
                        canvas.id = "mycanvas";
                        //生成base64图片数据
                        var dataUrl = canvas.toDataURL("image/jpeg");
                        var newImg = document.createElement("img");
                        newImg.src = dataUrl;
                        // imagesAjax(dataUrl);
                        alert(dataUrl);
                        console.log(dataUrl);
                    }
                });
            })
        }
    });
});