<template>
    <div>
        <query-filter :searchModel="searchYsfModel"></query-filter>
        <el-table
            border
            :data="ysfData"
            style="width: 100%">
            <el-table-column class="expand-column" type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="form-in-expand">
                        <el-form-item label="售楼处地址：">
                            <span>{{ props.row.salesOffice }}</span>
                        </el-form-item>
                        <el-form-item label="开盘日期：">
                            <span>{{ props.row.startDate }}</span>
                        </el-form-item>
                        <el-form-item label="交付日期：">
                            <span>{{ props.row.deliveryDate }}</span>
                        </el-form-item>
                        <el-form-item label="物业公司：">
                            <span>{{ props.row.managerCompany }}</span>
                        </el-form-item>
                        <el-form-item label="物业类型：">
                            <span>{{ props.row.managerType }}</span>
                        </el-form-item>
                        <el-form-item label="物业费：">
                            <span>{{ props.row.managerCost }}</span>
                        </el-form-item>
                        <el-form-item label="楼栋数：">
                            <span>{{ props.row.buildingCount }}</span>
                        </el-form-item>
                        <el-form-item label="规划用户数：">
                            <span>{{ props.row.userCount }}</span>
                        </el-form-item>
                        <el-form-item label="开发商：">
                            <span>{{ props.row.developer }}</span>
                        </el-form-item>
                        <el-form-item label="绿化率：">
                            <span>{{ props.row.greenRate }}</span>
                        </el-form-item>
                        <el-form-item label="容积率：">
                            <span>{{ props.row.plotRatio }}</span>
                        </el-form-item>
                        <el-form-item label="车位：">
                            <span>{{ props.row.stall }}</span>
                        </el-form-item>
                        <el-form-item label="供水：">
                            <span>{{ props.row.water }}</span>
                        </el-form-item>
                        <el-form-item label="供暖：">
                            <span>{{ props.row.heating }}</span>
                        </el-form-item>
                        <el-form-item label="电力：">
                            <span>{{ props.row.power }}</span>
                        </el-form-item>
                        <el-form-item label="燃气：">
                            <span>{{ props.row.gas }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="楼盘名称" prop="name"></el-table-column>
            <el-table-column label="产权性质" prop="rightNature"></el-table-column>
            <el-table-column width="240" label="楼盘位置">
                <template slot-scope="scope">
                    {{scope.row.chianAreaName}} - {{scope.row.divideName}} - {{scope.row.address}}
                </template>
            </el-table-column>
            <el-table-column label="平均单价">
                <template slot-scope="scope">
                    {{scope.row.avgPrice}} 元
                </template>
            </el-table-column>
            <el-table-column label="平均总价" prop="tatlePrice">
                <template slot-scope="scope">
                    {{scope.row.tatlePrice}} 万元
                </template>
            </el-table-column>
            <el-table-column label="面积区间">
                <template slot-scope="scope">
                    {{scope.row.areaMin}} - {{scope.row.areaMax}} 平米
                </template>
            </el-table-column>
            <el-table-column label="销售情况">
                <template slot-scope="scope">
                    {{scope.row.soldQuantity}}（已售） / {{scope.row.quantity}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {ApiMethods} from 'httpserve/HttpApi'
    import QueryFilter from 'myComps/queryFilter'
    import {
        searchYsfModel
    } from 'static/js/model'

    export default {
        name: "yishoufang",
        components: {QueryFilter},
        data() {
            return {
                ysfData: [],
                searchYsfModel: searchYsfModel
            }
        },
        beforeMount() {
            this.initTable();
        },
        methods: {
            async initTable() {
                let res = await ApiMethods.YishoufangApi.queryAll();
                if (res.code == 200) {
                    console.log(res.data.content);
                    this.ysfData.push(res.data.content);
                }
            },
        },
        computed: {
            searchEsfData() {
                return {
                    status: this.searchYsfModel.status.value,
                    locked: this.searchYsfModel.locked.value,
                    decoration: this.searchYsfModel.decoration.value,
                    purpose: this.searchYsfModel.purpose.value,
                    unit: this.searchYsfModel.unit.value,
                    hall: this.searchYsfModel.hall.value,
                    chinaAreaA: this.searchYsfModel.chinaAreaA.value,
                    divideId: this.searchYsfModel.divideId.value,
                    area: this.searchYsfModel.area.value,
                    saleTotal: this.searchYsfModel.saleTotal.value,
                    created: this.searchYsfModel.created.value,
                    floor: this.searchYsfModel.floor.value,
                    rightNature: this.searchYsfModel.rightNature.value,
                    myEsf: this.searchYsfModel.myEsf.value,
                }
            }
        },
        watch: {
            searchEsfData: {
                handler(val) {
                    console.log(val);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .form-in-expand {
        font-size: 12px;
        .el-form-item {
            width: 180px;
            margin-right: 40px;
        }
        .el-form-item__content {
            font-size: 12px;
        }
        .el-form-item__label {
            font-size: 12px;
            color: #9a9a9a;
        }
    }
</style>
