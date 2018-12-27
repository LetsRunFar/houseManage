<template>
    <div class="main">
        <el-row style="margin-bottom: 5px;" :gutter="10">
            <el-col class="search-item" v-for="(range, index) in searchClientModel" :key="index" :span="3">
                <template v-if="range.type == 'range'">
                    <range-picker
                        :value.sync="range.value"
                        :min="range.min"
                        :max="range.max"
                        :unit="range.unit"
                        :gap="range.gap"
                        :placeholder="range.label">
                    </range-picker>
                </template>
                <template v-else-if="range.type == 'input'">
                    <el-input v-model="range.value" :placeholder="range.label"></el-input>
                </template>
                <template v-else-if="range.type=='select'">
                    <el-select
                        :placeholder="range.label"
                        clearable
                        size="mini"
                        v-model="range.value">
                        <el-option
                            v-for="option in range.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value">
                        </el-option>
                    </el-select>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-button style="float: left;" type="danger" @click="chooseClientType">
                新增客源
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
            v-if="newClientModel"
            ref="createNewEsf"
            :outerTitle="outerTitle"
            :innerTitle="innerTitle"
            :createModel.sync="newClientModel"
            @doCreate="createNewEsf">
        </create-model>
    </div>
</template>

<script>
    import {ApiMethods} from 'httpserve/HttpApi'
    import QueryStatus from 'myComps/queryStatus'
    import SubjectQuery from 'myComps/subjectQuery'
    import CreateModel from 'myComps/createModel'
    import RangePicker from 'myComps/rangePicker'
    import {
        saleTotalRange,
        areaRange,
        unitRange,
        purposRange,
        rightNature,
        floor, newClientModel, newClientRentModel, searchClientModel
    } from 'static/js/model'

    export default {
        name: "ershoufang",
        components: {QueryStatus, SubjectQuery, CreateModel, RangePicker},
        data() {
            return {
                outerTitle: '',
                innerTitle: '',
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
                queryModel: {
                    regionId: '',
                    areaRange,
                    unitRange,
                    saleTotalRange,
                    floor,
                    rightNature,
                    purposRange,
                    created: '',
                    emps: '',
                    like: '',
                },
                tradeTypes: [
                    {
                        value: '1',
                        label: '出售'
                    }, {
                        value: '2',
                        label: '出租'
                    }
                ],
                newClientModel: null,
                searchClientModel: searchClientModel,
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
            searchClientData: {
                handler(val) {
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
            },
            chooseClientType() {
                this.$confirm('请选择客源类型', '提示', {
                    confirmButtonText: '买房',
                    cancelButtonText: '租房',
                    type: 'success'
                }).then(() => {
                    this.outerTitle = '买房客源';
                    this.innerTitle = '买房客源详情';
                    this.newClientModel = newClientModel;
                    this.$nextTick(() => {
                        this.$refs.createNewEsf.showFirst();
                    })
                }).catch(() => {
                    this.outerTitle = '租房客源';
                    this.innerTitle = '租房客源详情';
                    this.newClientModel = newClientRentModel;
                    this.$nextTick(() => {
                        this.$refs.createNewEsf.showFirst();
                    })
                });
            }
        },
        computed: {
            tableHeight() {
                let windowHeight = window.screen.height;
                return windowHeight - 300;
            },
            searchClientData() {
                return {
                    clientType: this.searchClientModel.clientType.value,
                    price: this.searchClientModel.price.value,
                    area: this.searchClientModel.area.value,
                    rent: this.searchClientModel.rent.value,
                    needAddressDtos: this.searchClientModel.needAddressDtos.value,
                    decoration: this.searchClientModel.decoration.value,
                    purpose: this.searchClientModel.purpose.value,
                    myClient: this.searchClientModel.myClient.value,
                    unit: this.searchClientModel.unit.value,
                    hall: this.searchClientModel.hall.value,
                    depts: this.searchClientModel.depts.value,
                    emps: this.searchClientModel.emps.value,
                    like: this.searchClientModel.like.value
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
        /deep/ .el-input__inner {
            height: 32px;
            line-height: 32px;
        }
    }
</style>
