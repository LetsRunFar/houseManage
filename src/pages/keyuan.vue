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
            :data="clientData"
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
            <el-table-column label="客源编号">
                <template slot-scope="prop">
                    <router-link title="查看详情" :to="{path: '/client/detail', query:{id: prop.row.id}}">{{prop.row.code}}</router-link>
                </template>
            </el-table-column>
            <el-table-column label="客源类型" prop="clientType"></el-table-column>
            <el-table-column label="责任人">
                <template slot-scope="prop">
                    {{prop.row.entering.name}}
                </template>
            </el-table-column>
            <el-table-column label="录入人">
                <template slot-scope="prop">
                    {{prop.row.principal.name}}
                </template>
            </el-table-column>
            <el-table-column label="私有或公有">
                <template slot-scope="prop">
                    <template v-if="prop.row.shared">公有</template>
                    <template v-else>私有</template>
                </template>
            </el-table-column>
            <el-table-column label="客户来源" prop="source"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column width="160" label="创建时间" prop="createdTime"></el-table-column>
            <el-table-column width="160" label="最后访问时间" prop="finallyTime"></el-table-column>
            <el-table-column width="160" label="下次访问时间" prop="needTime"></el-table-column>
            <el-table-column label="户口信息" prop="account"></el-table-column>

            <el-table-column label="需求位置">
                <template slot-scope="prop">
                    <span v-for="(item, index) in prop.row.needAddressDtos" :kay="index">
                        {{item.divideName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="prop">
                    <el-popover v-if="prop.row.buyNeeds" trigger="hover" placement="bottom">
                        <p>价格区间：{{ prop.row.buyNeeds.minTotalPrice }} - {{prop.row.buyNeeds.maxTotalPrice}}</p>
                        <p>面积区间：{{ prop.row.buyNeeds.minArea }} - {{prop.row.buyNeeds.maxArea}}</p>
                        <p>装修：{{prop.row.buyNeeds.decoration}}</p>
                        <p>用途：{{prop.row.buyNeeds.purpose}}</p>
                        <p>户型：{{prop.row.buyNeeds.unit}}室 {{prop.row.buyNeeds.hall}}厅</p>
                        <p>付款方式：{{prop.row.buyNeeds.payWay}}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-button size="mini" @click="$router.push({path: '/client/detail', query:{id: prop.row.id}})">查看详情</el-button>
                        </div>
                    </el-popover>
                    <el-popover v-else-if="prop.row.leaseNeeds" trigger="hover" placement="bottom">
                        <p>价格区间：{{ prop.row.leaseNeeds.minMonth }} - {{prop.row.leaseNeeds.maxMonth}}</p>
                        <p>面积区间：{{ prop.row.leaseNeeds.minArea }} - {{prop.row.leaseNeeds.maxArea}}</p>
                        <p>装修：{{prop.row.leaseNeeds.decoration}}</p>
                        <p>用途：{{prop.row.leaseNeeds.purpose}}</p>
                        <p>户型：{{prop.row.leaseNeeds.unit}}室 {{prop.row.leaseNeeds.hall}}厅</p>
                        <div slot="reference" class="name-wrapper">
                            <el-button size="mini" @click="$router.push({path: '/client/detail', query:{id: prop.row.id}})">查看详情</el-button>
                        </div>
                    </el-popover>
                </template>
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
        name: "keyuan",
        components: {QueryStatus, SubjectQuery, CreateModel, QueryFilter},
        data() {
            return {
                outerTitle: '',
                innerTitle: '',
                clientData: [],
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
                let res = await ApiMethods.ClientApi.queryAll();
                if (res.code == 200) {
                    console.log(res.data);
                    this.clientData.push(res.data.content);
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
