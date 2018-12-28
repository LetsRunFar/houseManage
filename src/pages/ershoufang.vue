<template>
    <div class="main">
        <query-filter :searchModel="searchEsfModel"></query-filter>
        <el-row>
            <el-button type="danger" @click="$refs.createNewEsf.showFirst()">
                新增房源
            </el-button>
        </el-row>
        <el-table
            ref="esfTable"
            :data="esfData"
            tooltip-effect="dark"
            class="center-table"
            style="width: 100%;"
            :height="tableHeight"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="30">
            </el-table-column>
            <el-table-column label="标签">
                <template slot-scope="scope">
                    <span v-for="(item,index) in scope.row.tags" :key="index">
                        {{item.tagName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">{{scope.row.bizType}}</template>
            </el-table-column>
            <el-table-column label="用途">
                <template slot-scope="scope">{{scope.row.purpose}}</template>
            </el-table-column>
            <el-table-column
                label="产权性质">
                <template slot-scope="scope">{{ scope.row.rightNature }}</template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">{{scope.row.open ? '公盘' : '私盘'}}</template>
            </el-table-column>
            <el-table-column label="房源编号">
                <template slot-scope="scope">{{scope.row.code}}</template>
            </el-table-column>
            <el-table-column
                label="小区">
                <template slot-scope="scope">{{ scope.row.villageName }}</template>
            </el-table-column>
            <el-table-column
                label="楼层">
                <template slot-scope="scope">{{ scope.row.floor }}F / {{ scope.row.totalFloor }}</template>
            </el-table-column>
            <el-table-column
                label="房型"
                width="90">
                <template slot-scope="scope">{{scope.row.roomTypeDto.room || '-'}}室{{scope.row.roomTypeDto.hall ||
                    '-'}}厅{{scope.row.roomTypeDto.toilet || '-'}}卫{{scope.row.roomTypeDto.balcony ||
                    '-'}}台{{scope.row.roomTypeDto.kitchen || '-'}}厨
                </template>
            </el-table-column>
            <el-table-column
                label="建筑面积">
                <template slot-scope="scope">{{ scope.row.buildingArea }}</template>
            </el-table-column>
            <el-table-column
                label="总价">
                <template slot-scope="scope">{{ scope.row.dealInfoDto.BigDecimal | tenThousands }}</template>
            </el-table-column>
            <el-table-column
                label="录入人">
                <template slot-scope="scope">{{ scope.row.entering.empName }}</template>
            </el-table-column>
        </el-table>
        <create-model
            ref="createNewEsf"
            :createModel.sync="newErshoufangModel"
            @doCreate="createNewEsf">
        </create-model>
    </div>
</template>

<script>
    import {ApiMethods} from 'httpserve/HttpApi'
    import QueryStatus from 'myComps/queryStatus'
    import SubjectQuery from 'myComps/subjectQuery'
    import CreateModel from 'myComps/createModel'
    import QueryFilter from 'myComps/queryFilter'
    import {
        newErshoufangModel, searchEsfModel
    } from 'static/js/model'

    export default {
        name: "ershoufang",
        components: {QueryStatus, SubjectQuery, CreateModel, QueryFilter},
        data() {
            return {
                esfData: [],
                selectedRows: [],
                statusSelection: [
                    {
                        id: 1,
                        text: '有效',
                        subStatus: [
                            {
                                id: 1,
                                text: '公盘'
                            },
                            {
                                id: 2,
                                text: '私盘'
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: '成交',
                        subStatus: [
                            {
                                id: 1,
                                text: '我售'
                            },
                            {
                                id: 2,
                                text: '我租'
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: '失效',
                        subStatus: [
                            {
                                id: 1,
                                text: '我售'
                            },
                            {
                                id: 2,
                                text: '我租'
                            }
                        ]
                    }
                ],
                regions: [
                    {
                        id: 1,
                        name: '江北'
                    },
                    {
                        id: 2,
                        name: '渝北'
                    }
                ],
                areas: null,
                checkedStatu: null,
                tradeTypes: [
                    {
                        value: '1',
                        label: '出售'
                    }, {
                        value: '2',
                        label: '出租'
                    }
                ],
                newErshoufangModel: newErshoufangModel,
                searchEsfModel: searchEsfModel,
            }
        },
        filters: {
            tenThousands(val) {
                if (!val) return ''
                if (isNaN(val)) return val;
                return (val / 10000).toFixed(0);
            }
        },
        watch: {
            checkedStatu: {
                handler(val) {
                    console.log(val);

                },
                deep: true
            },
            'queryModel.saleTotal': {
                handler(val) {
                    console.log(val);
                },
                deep: true
            },
            newErshoufangData: {
                handler(val) {
                    console.log(val);
                },
                deep: true
            },
            newSearchEsfData: {
                handler(val){
                    console.log(val);
                },
                deep: true
            }
        },
        beforeMount() {
            this.initTable();
            console.log(this.queryModel);
        },
        methods: {
            async initTable() {
                let res = await ApiMethods.ErshoufangApi.queryAll();
                if (res.code == 200) {
                    console.log(res.data);
                    this.esfData.push(res.data);
                }
            },
            handleSelectionChange(val) {
                this.selectedRows.push(val);
            },
            handleCheckStatus(param) {
                this.checkedStatu = param;
            },
            queryRegion(regionId) {
                this.queryModel.regionId = regionId;
                this.areas = [
                    {
                        id: 1,
                        name: '北滨路'
                    },
                    {
                        id: 2,
                        name: '大竹林'
                    },
                    {
                        id: 3,
                        name: '大竹林'
                    }
                ]
            },
            queryArea(areaId) {
                this.queryModel.areaId = areaId;
            },
            createNewEsf(data) {
                console.log(data);
            }
        },
        computed: {
            tableHeight() {
                let windowHeight = window.screen.height;
                return windowHeight - 300;
            },
            newErshoufangData() {
                return {
                    divideId: '',
                    villageId: '',
                    number: this.newErshoufangModel.firstStepInfo.number.value,
                    floor: this.newErshoufangModel.firstStepInfo.floorInfo.value.floor,
                    totalFloor: this.newErshoufangModel.firstStepInfo.floorInfo.value.totalFloor,
                    roomType: {
                        room: this.newErshoufangModel.baseInfo.roomType.value.room,
                        hall: this.newErshoufangModel.baseInfo.roomType.value.hall,
                        toilet: this.newErshoufangModel.baseInfo.roomType.value.toilet,
                        balcony: this.newErshoufangModel.baseInfo.roomType.value.balcony,
                        kitchen: this.newErshoufangModel.baseInfo.roomType.value.kitchen
                    },
                    owner: {
                        attitude: this.newErshoufangModel.attachInfo.ownerAttitude.value,
                        mentality: '',
                        remark: '',
                        contacts: {
                            name: '测试数据',
                            title: '',
                            relation: '',
                            phone: ''
                        }
                    },
                    area: this.newErshoufangModel.baseInfo.area.value,
                    buildingArea: this.newErshoufangModel.baseInfo.buildingArea.value,
                    decoration: '',
                    purpose: '',
                    dealInfoVo: {
                        totalPrice: this.newErshoufangModel.baseInfo.totalPrice.value,
                        saleBasePrice: this.newErshoufangModel.baseInfo.saleBasePrice.value,
                    },
                    bizType: this.newErshoufangModel.attachInfo.bizType,
                    age: '',
                    checkingCondition: '',
                    checkingTime: '',
                    debt: '',
                    elevator: '',
                    houseCertificate: '',
                    lastDecoration: '',
                    priceSpace: '',
                    school: '',
                    sole: '',
                    stall: '',
                    waijing: '',
                    buildingAge: '',
                    images: {
                        key: '',
                        name: '',
                        category: '',
                        remark: ''
                    },
                    tags: []
                }
            },
            newSearchEsfData(){
                return {
                    status: this.searchEsfModel.status.value,
                    locked: this.searchEsfModel.locked.value,
                    decoration: this.searchEsfModel.decoration.value,
                    purpose: this.searchEsfModel.purpose.value,
                    unit: this.searchEsfModel.unit.value,
                    hall: this.searchEsfModel.hall.value,
                    chinaAreaA: this.searchEsfModel.chinaAreaA.value,
                    divideId: this.searchEsfModel.divideId.value,
                    area: this.searchEsfModel.area.value,
                    saleTotal: this.searchEsfModel.saleTotal.value,
                    created: this.searchEsfModel.created.value,
                    floor: this.searchEsfModel.floor.value,
                    rightNature: this.searchEsfModel.rightNature.value,
                    myEsf: this.searchEsfModel.myEsf.value,
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .center-table {
        text-align: center;
    }

    .center-table.el-table /deep/ th {
        text-align: center;
        background-color: #409eff;
        color: #fff;
    }

    .area-select {
        position: relative;
        line-height: 24px;
        padding-left: 60px;
        font-size: 12px;
        &:before {
            position: absolute;
            content: attr(name);
            left: 10px;
            font-weight: 600;
        }
        .regions {
            .region {
                float: left;
                margin-right: 20px;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
                &.active {
                    color: #0e85ff;
                }
            }
            &:after {
                display: block;
                content: '';
                clear: both;
            }
        }
        .areas {
            .area {
                float: left;
                margin-right: 20px;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
                &.active {
                    color: #0e85ff;
                }
            }
            &:after {
                display: block;
                content: '';
                clear: both;
            }
        }
    }

    .checkbox-select {
        position: relative;
        line-height: 24px;
        padding-left: 60px;
        font-size: 12px;
        .checkbox-wrap {
            display: inline-block;
            width: 140px;
        }
        &:before {
            position: absolute;
            content: attr(name);
            left: 10px;
            font-weight: 600;
        }
    }
    .search-item {
        margin-top: 5px;
        height: 32px;
        line-height: 32px;
        /deep/.el-input__inner{
            height: 32px;
            line-height: 32px;
        }
    }
</style>
