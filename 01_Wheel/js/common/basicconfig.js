/**
 * Created by Administrator on 2017-07-18.
 */

"use strict";

var SuD = {
    config: {
        baseUrl: "http://127.0.0.1:8888/beam_project/"
    },
    info: JSON.parse(localStorage.getItem("key")), // 登录信息
    tipsInfo: {
        // 提示信息(Y：正确，N：错误)
        Y: {
            insert: "已成功添加数据",
            update: "已成功修改数据",
            delete: "已成功删除数据"
        },
        N: {
            insert: "数据添加失败",
            update: "数据修改失败",
            delete: "数据删除失败"
        },
        T: {
            delete: "确定要删除这条数据吗?"
        }
    }
};

var SuD_config_baseUrl = SuD.config.baseUrl;
var virtualUrl = {
    m_personnel: {
        login: SuD_config_baseUrl + "personnel/login" // 登录
    },
    m_pmmanager: {
        // 项目管理
        select: SuD_config_baseUrl + "beamPlanMonth/select", // 查询月度计划（a制梁 & b架梁）
        insert: SuD_config_baseUrl + "beamPlanMonth/insert", // 添加月度计划（a制梁 & b架梁）
        update: SuD_config_baseUrl + "beamPlanMonth/update", // 修改月度计划（a制梁 & b架梁）
        delete: SuD_config_baseUrl + "beamPlanMonth/delete" // 修改月度计划（a制梁 & b架梁）
    }
};
