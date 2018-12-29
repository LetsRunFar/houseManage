<template>
    <div class="detail">
        <div class="base-info">
            <div class="title">
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
            </div>
            <div class="tags-line">
                <el-tag class="tag" v-for="(tag,index) in tags" :type="tag.type" :key="index">
                    {{tag.label}}
                </el-tag>
                <el-button style="margin-left: 10px;" size="mini" plain type="danger">收藏</el-button>
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
            <el-button style="margin: 10px 0;" type="danger">
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
                        <el-button v-if="prop.row.label === '责任人'" type="danger">转移责任人</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {ApiMethods} from "static/js/http-serve/HttpApi";

    export default {
        name: "keyuandetail",
        data() {
            return {
                detailInfo: {},
                followInfo: [],
                personInfo: [],
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
                }
            }
        },
        beforeMount() {
            let id = this.$route.query.id || '';
            this.getDetail(id);
            this.getFollow(id);
        },
        methods: {
            async getDetail(id) {
                let res = await ApiMethods.ClientApi.detail({id: id});
                if (res.code == 200 && res.data) {
                    this.detailInfo = res.data;
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
            async getFollow(id) {
                let res = await ApiMethods.ClientApi.follers({id: id});
                if (res.code == 200 && res.data) {
                    this.followInfo.push(res.data.content);
                }
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
            }
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
