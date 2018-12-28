<template>
    <div class="main">
        <query-filter :searchModel="searchClientModel"></query-filter>
        <el-row>
            <el-button style="float: left;" type="danger" @click="chooseClientType">
                新增客源
            </el-button>
        </el-row>
        <el-table
            ref="esfTable"
            :data="esfData"
            tooltip-effect="dark"
            class="center-table blue-header"
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
    import QueryFilter from 'myComps/queryFilter'
    import {
        newClientModel, newClientRentModel, searchClientModel
    } from 'static/js/model'

    export default {
        name: "ershoufang",
        components: {QueryStatus, SubjectQuery, CreateModel, QueryFilter},
        data() {
            return {
                outerTitle: '',
                innerTitle: '',
                esfData: [],
                selectedRows: [],
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
            searchClientData: {
                handler(val) {
                    console.log(val);
                },
                deep: true
            }
        },
        beforeMount() {
            this.initTable();
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

</style>
