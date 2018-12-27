<template>
    <div>
        <el-table
            :data="ysfData"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="form-in-expand">
                        <el-form-item label="售楼处地址：">
                            <span>{{ props.row.salesOffice }}</span>
                        </el-form-item>
                        <el-form-item label="开盘时间：">
                            <span>{{ props.row.startDate }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="楼盘名称" prop="name"></el-table-column>
            <el-table-column label="产权性质" prop="rightNature"></el-table-column>
            <el-table-column label="楼盘位置">
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
    export default {
        name: "yishoufang",
        data() {
            return {
                ysfData:[]
            }
        },
        beforeMount(){
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
        }
    }
</script>

<style lang="less" scoped>
/deep/.form-in-expand{
    font-size: 12px;
    .el-form-item{
        margin-right: 40px;
    }
    .el-form-item__content{
        font-size: 12px;
    }
    .el-form-item__label{
        font-size: 12px;
        color: #9a9a9a;
    }
}
</style>
