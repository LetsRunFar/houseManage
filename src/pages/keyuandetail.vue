<template>
    <div class="detail">
        <div class="base-info">
            <el-row class="title">
                <el-col :span="20">
                    [{{detailInfo.code}}]
                    <template v-if="detailInfo.buyNeeds">
                        求购
                        {{detailInfo.clientType}}
                        {{range(detailInfo.buyNeeds.minTotalPrice, detailInfo.buyNeeds.maxTotalPrice)}}万
                        {{range(detailInfo.buyNeeds.minArea, detailInfo.buyNeeds.maxArea)}}平
                    </template>
                    <template v-else-if="detailInfo.leaseNeeds">
                        求租
                        {{detailInfo.clientType}}
                        {{range(detailInfo.leaseNeeds.minTotalPrice, detailInfo.leaseNeeds.maxTotalPrice)}}万
                        {{range(detailInfo.leaseNeeds.minArea, detailInfo.leaseNeeds.maxArea)}}平
                    </template>
                </el-col>
                <el-col :span="4" style="text-align: right;">
                    <el-button @click="showModify = true">
                        修改信息
                    </el-button>
                </el-col>
            </el-row>
            <div class="tags-line">
                <el-tag class="tag" v-for="(tag,index) in tags" :type="tag.type" :key="index">
                    {{tag.label}}
                </el-tag>
                <el-button style="margin-left: 10px;" size="mini" plain type="danger" @click="collect">收藏</el-button>
            </div>
            <div class="info-content">
                <p class="areas">
                    需求区域：
                    <span class="each-area" v-for="(item,index) in detailInfo.needAddressDtos" :key="index">
                            {{item.divideName}}；
                        </span>
                </p>
                <template v-if="detailInfo.buyNeeds">
                    <p>
                        需求价格：
                        <span style="color: #ec1c1c;">
                                {{range(detailInfo.buyNeeds.minTotalPrice, detailInfo.buyNeeds.maxTotalPrice)}}
                            </span>
                        （万）
                    </p>
                    <p>
                        需求面积：
                        <span>
                                {{range(detailInfo.buyNeeds.minArea, detailInfo.buyNeeds.maxArea)}}
                            </span>
                        （平米）
                    </p>
                    <p>
                        需求户型：
                        <span>
                                {{detailInfo.buyNeeds.unit || '-'}}室{{detailInfo.buyNeeds.hall || '-'}}厅
                            </span>
                    </p>
                </template>
                <template v-else-if="detailInfo.leaseNeeds">
                    <p>
                        需求价格：
                        <span style="color: #ec1c1c;">
                                {{range(detailInfo.leaseNeeds.minTotalPrice, detailInfo.leaseNeeds.maxTotalPrice)}}
                            </span>
                        （万）
                    </p>
                    <p>
                        需求面积：
                        <span>
                                {{range(detailInfo.leaseNeeds.minArea, detailInfo.leaseNeeds.maxArea)}}
                            </span>
                        （平米）
                    </p>
                    <p>
                        需求户型：
                        <span>
                                {{detailInfo.leaseNeeds.unit || '-'}}室{{detailInfo.leaseNeeds.hall || '-'}}厅
                            </span>
                    </p>
                </template>
            </div>
        </div>
        <div class="detail-info">
            <p class="each-info" v-for="(item,key) in detailEnum">
                <template v-if="detailInfo.buyNeeds">
                    <span class="label">{{item}}</span>
                    <span>{{detailInfo.buyNeeds[key]}}</span>
                </template>
                <template v-else-if="detailInfo.leaseNeeds">
                    <span class="label">{{item}}</span>
                    <span>{{detailInfo.leaseNeeds[key]}}</span>
                </template>

            </p>
        </div>
        <div class="attach-info">
            <p class="each-info" v-for="(item,key) in attachEnum">
                <span class="label">{{item}}</span>
                <span>{{detailInfo[key]}}</span>
            </p>
        </div>
        <div class="follow-info">
            <p>跟进</p>
            <el-button @click="showAddFollow = true" style="margin: 10px 0;" type="danger">
                新增跟进
            </el-button>
            <el-table
                border
                :data="followInfo"
                style="width: 100%">
                <el-table-column prop="clientId" label="客源id"></el-table-column>
                <el-table-column prop="sourceId" label="房源id"></el-table-column>
                <el-table-column prop="details" label="跟进内容"></el-table-column>
                <el-table-column width="160" prop="createdTime" label="时间"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column label="跟进人">
                    <template slot-scope="prop">
                        <el-popover trigger="hover" placement="bottom">
                            <p>id：{{prop.row.employee.empId}}</p>
                            <p>姓名：{{prop.row.employee.empName}}</p>
                            <p>直属部门：{{prop.row.employee.empDeptName}}</p>
                            <div slot="reference" class="name-wrapper">
                                {{prop.row.employee.empName}}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="person-info">
            <p style="margin-bottom: 10px;">相关经纪人</p>
            <el-table
                border
                :data="personInfo"
                style="width: 100%">
                <el-table-column label="身份" prop="label"></el-table-column>
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="性别" prop="title"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="prop">
                        <el-button v-if="prop.row.label === '责任人'" type="danger" @click="showTransform = true">转移责任人
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            @close="closeAddFollow"
            title="新增跟进"
            width="30%"
            :visible.sync="showAddFollow">
            <el-form ref="addFollowForm" v-model="addFollowInfo" label-width="80px">
                <el-form-item prop="sourceId" label="房源id">
                    <el-input placeholder="请输入房源id" v-model="addFollowInfo.sourceId"></el-input>
                </el-form-item>
                <el-form-item prop="clientId" label="客户id">
                    <el-input placeholder="请输入客户id" v-model="addFollowInfo.clientId"></el-input>
                </el-form-item>
                <el-form-item prop="details" label="跟进内容">
                    <el-input placeholder="请输入跟进内容" v-model="addFollowInfo.details"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="跟进类型">
                    <el-select v-model="addFollowInfo.type" placeholder="请选择">
                        <el-option
                            v-for="item in followTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddFollow = false">取 消</el-button>
                <el-button type="primary" @click="addFollow">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            @close="closeTransform"
            title="新增跟进"
            width="30%"
            :visible.sync="showTransform">
            <el-form ref="addFollowForm" label-width="80px">
                <el-form-item label="被转移人id">
                    <el-input placeholder="请输入被转移人id" v-model="pasvEmpId"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showTransform = false">取 消</el-button>
                <el-button type="primary" @click="doTransform">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改基本信息"
            width="900px"
            :visible.sync="showModify">
            <multi-form
                :model.sync="modifyModel"
                @doCreate="doModify">
            </multi-form>
        </el-dialog>
    </div>
</template>

<script>
    import {ApiMethods} from "static/js/http-serve/HttpApi";
    import MultiForm from "@/components/myComps/multiForm";

    export default {
        name: "keyuandetail",
        components: {MultiForm},
        data() {
            return {
                detailInfo: {},
                followInfo: [],
                personInfo: [],
                addFollowInfo: {
                    sourceId: '',
                    clientId: '',
                    details: '',
                    type: ''
                },
                pasvEmpId: '',
                showAddFollow: false,
                showTransform: false,
                showModify: false,
                detailEnum: {
                    purpose: '用途',
                    decoration: '装修',
                },
                attachEnum: {
                    createdTime: '创建时间',
                    finallyTime: '最后访问时间',
                    needTime: '下次访问时间',
                    account: '户口信息',
                    id: 'ID',
                    code: '编号',
                    status: '状态',
                    source: '客户来源'
                },
                followTypes: [
                    {
                        value: 'DK',
                        label: '带看',
                    },
                    {
                        value: 'HF',
                        label: '电话回访',
                    },
                    {
                        value: 'YJ',
                        label: '议价',
                    },
                    {
                        value: 'LD',
                        label: '业主来电',
                    },
                    {
                        value: 'MF',
                        label: '面访',
                    },
                    {
                        value: 'SM',
                        label: '业主上门',
                    },
                    {
                        value: 'CKGJ',
                        label: '查勘',
                    },
                    {
                        value: 'QT',
                        label: '其他',
                    }
                ],
                modifyModel: {
                    clientType: {
                        label: '客源类型',
                        type: 'select',
                        required: true,
                        value: '',
                        rules: [{required: true, message: '请选择交易类型'}],
                        options: [
                            {
                                label: '出售',
                                value: '1'
                            },
                            {
                                label: '出租',
                                value: '2'
                            }
                        ]
                    },
                    source: {
                        type: 'input',
                        value: '',
                        label: '客户来源',
                    },
                    account: {
                        type: 'input',
                        value: '',
                        label: '户口信息'
                    },
                    needAddressDtos: {
                        type: 'input',
                        value: '',
                        label: '需求位置'
                    },
                    minTotalPrice: {
                        type: 'input',
                        value: '',
                        label: '最低总价'
                    },
                    maxTotalPrice: {
                        type: 'input',
                        value: '',
                        label: '最高总价'
                    },
                    minArea: {
                        type: 'input',
                        value: '',
                        label: '最小面积'
                    },
                    maxArea: {
                        type: 'input',
                        value: '',
                        label: '最大面积'
                    },
                    decoration: {
                        type: 'select',
                        value: '',
                        label: '装修',
                        options: [
                            {
                                label: '毛坯',
                                value: 'NONE'
                            },
                            {
                                label: '简装',
                                value: 'SIMPLE'
                            },
                            {
                                label: '中装',
                                value: 'CENTER'
                            },
                            {
                                label: '豪装',
                                value: 'RSZ'
                            },
                            {
                                label: '精装',
                                value: 'JZ'
                            },
                            {
                                label: '清水',
                                value: 'QS'
                            },
                            {
                                label: '准新房',
                                value: 'ZXF'
                            },
                            {
                                label: '装修不限',
                                value: 'ALL'
                            }
                        ]
                    },
                    purpose: {
                        type: 'select',
                        value: '',
                        label: '用途',
                        options: [
                            {
                                label: '住宅',
                                value: 'RESIDENCE'
                            },
                            {
                                label: '厂房',
                                value: 'CF'
                            },
                            {
                                label: '写字楼',
                                value: 'XZL'
                            },
                            {
                                label: '公寓',
                                value: 'CROCS'
                            },
                            {
                                label: '商铺',
                                value: 'SHANGPU'
                            },
                            {
                                label: '别墅',
                                value: 'BIESHU'
                            },
                            {
                                label: '仓库',
                                value: 'CK'
                            }
                        ]
                    },
                    unit: {
                        type: 'input',
                        label: '室数',
                        value: ''
                    },
                    hall: {
                        type: 'input',
                        label: '厅数',
                        value: ''
                    },
                    payWay: {
                        type: 'select',
                        label: '付款方式',
                        value: '',
                        options: [
                            {
                                label: '分期',
                                value: 'FQ'
                            },
                            {
                                label: '公积金',
                                value: 'THELOAN'
                            },
                            {
                                label: '全款',
                                value: 'BIGBANG'
                            },
                            {
                                label: '商贷',
                                value: 'SD'
                            },
                            {
                                label: '其他',
                                value: 'QT'
                            }
                        ]
                    },
                    minMonth: {
                        type: 'input',
                        value: '',
                        label: '最小月租金'
                    },
                    maxArea: {
                        type: 'input',
                        value: '',
                        label: '最大月租金'
                    }
                }
            }
        },
        beforeMount() {
            let id = this.$route.query.id || '';
            this.getDetail(id);
            this.getFollow(id);
        },
        methods: {
            /*获取详情*/
            async getDetail(id) {
                let res = await ApiMethods.ClientApi.detail({id: id});
                if (res.code == 200 && res.data) {
                    this.detailInfo = res.data;
                    this.syncModifyModel(res.data)
                    if (this.detailInfo.entering) {
                        this.detailInfo.entering.label = '责任人'
                        this.personInfo.push(this.detailInfo.entering)
                    }
                    if (this.detailInfo.principal) {
                        this.detailInfo.principal.label = '录入人'
                        this.personInfo.push(this.detailInfo.principal)
                    }
                }
            },
            /*获取跟进信息*/
            async getFollow(id) {
                let res = await ApiMethods.ClientApi.follers({id: id});
                if (res.code == 200 && res.data) {
                    this.followInfo.push(res.data.content);
                }
            },
            /*收藏*/
            async collect() {
                if (!this.$route.query) {
                    this.$message({
                        message: '缺少指定客源',
                        type: 'error'
                    });
                    return;
                }
                let param = {
                    clientIds: this.$route.query.id
                }

                let res = await ApiMethods.ClientApi.collect(param);
                console.log(res);

            },
            async addFollow() {
                let res = await ApiMethods.ClientApi.addFollow(this.addFollowInfo);
                if (res.code != '200') {
                    this.$message({
                        message: '新增跟进失败',
                        type: 'error'
                    });
                } else {
                    this.$message({
                        message: '新增跟进成功',
                        type: 'success'
                    });
                    this.closeAddFollow();
                }

            },
            async doTransform() {
                if (!this.pasvEmpId) {
                    this.$message({
                        message: '请输入被转移人id',
                        type: 'info'
                    });
                    return;
                }
                let param = {
                    id: this.pasvEmpId
                }
                let res = await ApiMethods.ClientApi.transform(param);
                if (res.code == 200) {
                    this.$message({
                        message: '转移成功',
                        type: 'success'
                    });
                    this.closeTransform();
                } else {
                    this.$message({
                        message: '转移失败',
                        type: 'success'
                    });
                }
            },
            syncModifyModel(data) {
                Object.keys(data).forEach(t => {
                    if (typeof data[t] === 'string' || typeof data[t] === 'number') {
                        //基本数据，直接赋值
                        if (this.modifyModel.hasOwnProperty(t)) {
                            this.modifyModel[t].value = data[t]
                        }
                    } else if (data[t] instanceof Array) {
                        //数组，转换为“，”分割的字符串
                        this.modifyModel[t].value = this.valueFromArray(data[t], 'divideId', ',')
                    } else if (data[t] instanceof Object) {
                        //对象，递归
                        this.syncModifyModel(data[t])
                    }
                })
            },
            doModify() {
                console.log(this.modifyModel);
            },
            closeAddFollow() {
                this.addFollowInfo = {};
                this.showAddFollow = false;
            },
            closeTransform() {
                this.pasvEmpId = '';
                this.showTransform = false;
            },
            range(min, max) {
                if (min) {
                    if (max) {
                        return `${min}-${max}`
                    }
                    return `${min}以上`
                } else {
                    if (max) {
                        return `${max}以下`
                    }
                    return '不限'
                }
            },
            /**
             *
             * @param array 原始数组
             * @param key 键
             * @param join 分隔符
             * @returns {string}
             */
            valueFromArray(array, key, join) {
                let res = [];
                array.forEach(t => {
                    if (t[key]) {
                        res.push(t[key]);
                    }
                });
                return res.join(join)
            }
        },
        watch: {
            addFollowInfo: {
                handler(val) {
                    console.log(val);
                },
                deep: true
            },
            modifyModel: {
                handler(val) {
                    console.log(val);
                },
                deep: true
            }
        },
        computed: {
            tags() {
                let tags = [];
                if (this.detailInfo.buyNeeds) {
                    tags.push({label: `求购${this.detailInfo.clientType}`})
                    tags.push({label: this.detailInfo.buyNeeds.payWay, type: 'warning'})
                }
                if (this.detailInfo.shared) {
                    tags.push({label: `公客`, type: 'info'})
                } else {
                    tags.push({label: `私客`, type: 'info'})
                }
                if (this.detailInfo.status) {
                    tags.push({label: `${this.detailInfo.status}`, type: 'success'})
                }
                return tags;
            },
        }
    }
</script>

<style lang="less" scoped>
    .detail {
        background-color: #fff;
        padding: 10px;
        .base-info {
            padding: 20px;
            border: solid 1px #ddd;
            .tags-line {
                margin: 15px 0 10px;
                .tag {
                    margin-right: 10px;
                }
            }
            .title {
                font-size: 20px;
            }
            .info-content {
                font-size: 16px;
                line-height: 1.8;
                .areas {
                    .each-area {
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }
        }
        .attach-info, .detail-info, .follow-info, .person-info {
            padding: 20px;
            border: solid 1px #ddd;
            border-top-width: 0;
            .each-info {
                font-size: 14px;
                line-height: 1.8;
                display: inline-block;
                width: 50%;
                .label {
                    display: inline-block;
                    width: 110px;
                    text-align: right;
                    margin-right: 5px;
                    color: #949494;
                }
            }
        }
    }
</style>
