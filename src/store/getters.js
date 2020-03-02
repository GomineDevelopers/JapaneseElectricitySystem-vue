const getters = {
    // 大屏截止日期
    BigScreenExpirationDate: state => state.app.BigScreenExpirationDate,
    BigScreenStartDate: state => state.app.BigScreenStartDate,
    // 大屏贵州频道Top5 - 单位（全局）
    GuizhouChannel_unit: state => state.app.GuizhouChannel_unit,
    // ////////////////// 条件
    // ULC 用户生命周期（地区、运营商...）（天、周、月） 
    ULC_region: state => state.app.ULC_region,
    ULC_operator: state => state.app.ULC_operator,
    ULC_day: state => state.app.ULC_day,
    ULC_week: state => state.app.ULC_week,
    ULC_month: state => state.app.ULC_month,
    ULC_time_type: state => state.app.ULC_time_type,
    // UVB 用户收视行为（地区、运营商、播放方式、栏目）（天、周、范围）
    UVB_region: state => state.app.UVB_region,
    UVB_operator: state => state.app.UVB_operator,
    UVB_playmode: state => state.app.UVB_playmode,
    UVB_programa: state => state.app.UVB_programa,
    UVB_programa_list: state => state.app.UVB_programa_list, // 栏目 - api get
    UVB_contenttype: state => state.app.UVB_contenttype,
    UVB_contenttype_list: state => state.app.UVB_contenttype_list, // 内容类型 - api get
    UVB_day: state => state.app.UVB_day,
    UVB_week: state => state.app.UVB_week,
    UVB_picker: state => state.app.UVB_picker,
    UVB_time_type: state => state.app.UVB_time_type,
    // 指标类型- 用于判断指标中是否显示户数户均
    // 播放方式length >1 不显示
    // 时间类型为范围 不显示
    // 0-不显示  1-显示
    UVB_target_type: state => state.app.UVB_target_type,  // 默认都是全选，默认0-不显示
    
    // PR  定期报告（运营商）（天、周、月、范围）
    PR_operator: state => state.app.PR_operator,
    PR_day: state => state.app.PR_day,
    PR_week: state => state.app.PR_week,
    PR_month: state => state.app.PR_month,
    PR_picker: state => state.app.PR_picker,
    // 专题专区-（选择的）专题名称
    PR_value_specialName: state => state.app.PR_value_specialName,
    // ////////////////// 定期报告 - 指定报告（页面显示时间范围）
    // 日报-day-1 周报-week-2 月报-month-3 专区-范围-4
    PR_assignReportNum: state => state.app.PR_assignReportNum,
    // 定期报告-顺序-用于excel数据下载
    // 1 - G+TV用户活跃发展日报表   2 - G+TV用户收视日报表
    // 3 - 市场业务运营数据分析周报  4 - 移动运营数据周报   5 - G+TV用户收视行为周报
    // 6 - VIP增值业务专项分析      7 - G+TV月度用户收视行为报告
    // 8 - 专题专区数据报告
    PR_Report_index: state => state.app.PR_Report_index,
    // excel 表单
    PR_Excel_dataArr: state => state.app.PR_Excel_dataArr,   // 总data
    PR_Excel_titleArr: state => state.app.PR_Excel_titleArr, // 总title
    PR_excel_ifCanDownload: state => state.app.PR_excel_ifCanDownload, // 能否下载
    PR_downloadNum_child: state => state.app.PR_downloadNum_child,
    PR_downloadNum_parent: state => state.app.PR_downloadNum_parent,
    PR_excel_DownloadingStatus: state => state.app.PR_excel_DownloadingStatus, // 0-未下载/下载完成 1-初始化数据中 2-下载中 
    // EPG（运营商、栏目）（周、月）
    EPG_operator: state => state.app.EPG_operator,
    EPG_programa: state => state.app.EPG_programa,
    EPG_value_others: state => state.app.EPG_value_others,
    EPG_week: state => state.app.EPG_week,
    EPG_month: state => state.app.EPG_month,
    EPG_time_type: state => state.app.EPG_time_type,
    EPG_programa_type: state => state.app.EPG_programa_type,
    // ADD_ALL 增值业务-总览（运营商、栏目）（周、月）
    ADD_ALL_operator: state => state.app.ADD_ALL_operator,
    ADD_ALL_programa: state => state.app.ADD_ALL_programa,
    ADD_ALL_week: state => state.app.ADD_ALL_week,
    ADD_ALL_month: state => state.app.ADD_ALL_month,
    ADD_ALL_time_type: state => state.app.ADD_ALL_time_type,
    // ADD_VIP 增值业务-VIP（地区、运营商、播放方式、栏目）（天、周、范围）
    ADD_VIP_region: state => state.app.ADD_VIP_region,
    ADD_VIP_operator: state => state.app.ADD_VIP_operator,
    ADD_VIP_playmode: state => state.app.ADD_VIP_playmode,
    ADD_VIP_programa: state => state.app.ADD_VIP_programa,
    ADD_VIP_valueAddedPackage: state => state.app.ADD_VIP_valueAddedPackage,
    ADD_VIP_day: state => state.app.ADD_VIP_day,
    ADD_VIP_week: state => state.app.ADD_VIP_week,
    ADD_VIP_picker: state => state.app.ADD_VIP_picker,
    ADD_VIP_time_type: state => state.app.ADD_VIP_time_type,
    ADD_VIP_programa_list: state => state.app.ADD_VIP_programa_list,
    ADD_VIP_package_list: state => state.app.ADD_VIP_package_list,
    // 0-不显示  1-显示
    ADD_VIP_target_type: state => state.app.ADD_VIP_target_type,  // 默认都是全选，默认0-不显示
    // 数据审计
    DA_day: state => state.app.DA_day,
    // 节目搜索（时间段）
    PS_time: state => state.app.PS_time,
    PS_name: state => state.app.PS_name,
    // 当前账号权限记录
    current_authority: state => state.app.current_authority,
    // 测试
    ifTest: state => state.app.ifTest,

    ADD_VIP_targetOption: state => state.app.ADD_VIP_targetOption,
    UVB_targetOption: state => state.app.UVB_targetOption,

}
export default getters
