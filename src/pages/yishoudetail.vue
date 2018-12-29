<template>
    <div>
        <el-tabs class="info-tab" v-model="activeName">
            <el-tab-pane class="base-info each-info" label="基本信息" name="base">
                <div class="content">
                    <div v-if="detailInfo.tags" class="info-item">
                        <span class="label">标签：</span>
                        <span class="value">
                        {{detailInfo.tags.tagName}}
                    </span>
                    </div>
                    <div class="info-item" v-for="(item,key) in baseInfoEnum">
                        <template v-if="detailInfo && detailInfo[key]">
                            <span class="label">{{item}}：</span>
                            <span class="value">{{detailInfo[key]}}</span>
                        </template>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane class="base-info each-info" label="销售信息" name="sale">
                <div class="content">
                    <div class="info-item" v-for="(item,key) in sealsInfoEnum">
                        <template v-if="detailInfo && detailInfo[key]">
                            <span class="label">{{item}}：</span>
                            <span class="value">{{detailInfo[key]}}</span>
                        </template>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane class="base-info each-info" label="其他信息" name="other">
                <div class="content">
                    <div class="info-item" v-for="(item,key) in otherInfoEnum">
                        <template v-if="detailInfo && detailInfo[key]">
                            <span class="label">{{item}}：</span>
                            <span class="value">{{detailInfo[key]}}</span>
                        </template>
                    </div>
                    <div class="info-item" v-if="detailInfo.entering">
                        <span class="label">录入人：</span>
                        <span class="value">{{detailInfo.entering.empId}}</span>
                        <span class="value">{{detailInfo.entering.empName}}</span>
                        <span class="value">{{detailInfo.entering.empDeptName}}</span>
                    </div>
                    <div class="info-item" v-if="detailInfo.principal">
                        <span class="label">责任人：</span>
                        <span class="value">{{detailInfo.principal.empId}}</span>
                        <span class="value">{{detailInfo.principal.empName}}</span>
                        <span class="value">{{detailInfo.principal.empDeptName}}</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {ApiMethods} from "static/js/http-serve/HttpApi";

    export default {
        name: "detail",
        data() {
            return {
                detailInfo: {},
                activeName: 'base',
                baseInfoEnum: {
                    id: '楼盘id',
                    name: '楼盘名称',
                    developer: '开发商',
                    rightNature: '产权性质',
                    chianAreaName: '区域名称',
                    divideName: '片区名称',
                    address: '楼盘地址',
                    salesOffice: '售楼处地址',
                    buildingCount: '楼栋数',
                    userCount: '规划用户数',
                    plotRatio: '容积率',
                    greenRate: '绿化率',
                    stall: '车位',
                    water: '供水',
                    heating: '供暖',
                    power: '电力',
                    gas: '燃气'
                },
                sealsInfoEnum: {
                    avgPrice: '平均单价',
                    tatlePrice: '平均总价',
                    areaMin: '最小面积',
                    areaMax: '最大面积',
                    quantity: '总的套数',
                    soldQuantity: '已售套数',
                    startDate: '开盘日期',
                    deliveryDate: '交付日期',
                },
                otherInfoEnum: {
                    managerCompany: '物业公司',
                    managerType: '物业类型',
                    managerCost: '物业费',
                }
            }
        },
        beforeMount() {
            let id = this.$route.query.id || '';
            this.getDetail(id);
        },
        methods: {
            async getDetail(id) {
                let res = await ApiMethods.YishoufangApi.detail({id: id});
                if (res.code == 200 && res.data) {
                    this.detailInfo = res.data;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .info-tab {
        padding: 10px 20px;
        background-color: #fff;
        /deep/.el-tabs__header{
            margin-bottom: 0;
        }
        .each-info {
            margin-bottom: 10px;
            background-color: #fff;
            font-size: 14px;
            .title {
                font-size: 18px;
                padding: 20px;
            }
            .content {
                margin-top: 10px;
                overflow-y: hidden;
                .info-item {
                    display: inline-block;
                    width: 50%;
                    line-height: 2;
                    .label {
                        display: inline-block;
                        width: 90px;
                        margin-right: 10px;
                        color: #797979;
                    }
                }
            }
        }
    }
</style>
