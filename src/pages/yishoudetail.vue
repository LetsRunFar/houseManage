<template>
    <div>
        <!--楼盘信息-->
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
        <!--楼盘户型-->
        <div class="shape-wrap" style="padding: 10px;">
            <p class="title">楼盘户型</p>
            <el-row style="margin: 10px 0;">
                <el-button type="danger" @click="showAddShap = true">新增</el-button>
            </el-row>
            <el-table
                ref="shapeTable"
                border
                :data="shapeData">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-width="140px" label-position="left" class="shape-expand">
                            <el-form-item label="标签：">
                                <el-tag>{{props.row.tags.tagName}}</el-tag>
                            </el-form-item>
                            <el-form-item label="责任人：">
                                <span>{{ props.row.entering.empName }}</span>
                            </el-form-item>
                            <el-form-item label="责任人直属部门：">
                                <span>{{ props.row.entering.empDeptName }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间：">
                                <span>{{ props.row.createdTime }}</span>
                            </el-form-item>
                            <el-form-item label="最新更新时间：">
                                <span>{{ props.row.updateTime }}</span>
                            </el-form-item>
                            <el-form-item label="用途：">
                                <span>{{ props.row.purpose }}</span>
                            </el-form-item>
                            <el-form-item label="户型说明：">
                                <span>{{ props.row.features }}</span>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <span>{{ props.row.remark }}</span>
                            </el-form-item>
                        </el-form>
                        <div class="shape-images">
                            <p class="title">户型图</p>
                            <el-carousel v-if="props.row.images && props.row.images.length > 0" trigger="click"
                                         height="150px">
                                <el-carousel-item v-for="item in props.row.images" :key="item.key">
                                    <img :src="item.url">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="loupanId" label="楼盘id"></el-table-column>
                <el-table-column label="户型数量">
                    <template slot-scope="scope">
                        {{scope.row.soldQuantity}}（已售）/{{scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column prop="area" label="使用面积"></el-table-column>
                <el-table-column prop="buildingArea" label="建筑面积"></el-table-column>
                <el-table-column prop="averagePrice" label="均价"></el-table-column>
                <el-table-column prop="totalPrice" label="总价"></el-table-column>
                <el-table-column prop="direction" label="朝向"></el-table-column>
                <el-table-column prop="structure" label="户型结构"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="expandDetail(scope.row)">
                            展开或收起
                        </el-button>
                        <el-button @click="editShape(scope.row.loupanId,scope.row.id)" type="danger" plain>修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            width="900px"
            :visible.sync="showAddShap"
            title="新增户型">
            <multi-form
                ref="shapForm"
                :model="newShapeModel">
            </multi-form>
            <el-upload
                style="display: inline-block; padding: 10px 20px;"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload="false"
                :file-list="shapeImgList"
                list-type="picture">
                <el-button size="small" type="primary">上传户型图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddShap = false">取 消</el-button>
                <el-button type="primary" @click="submitShape">完 成</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="scanShapeImage">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {ApiMethods} from "static/js/http-serve/HttpApi";
    import MultiForm from 'myComps/multiForm'
    import {newShapeModel} from 'static/js/model'

    export default {
        name: "detail",
        components: {MultiForm},
        data() {
            return {
                showAddShap: false,
                scanShapeImage: false,
                newShapeModel: newShapeModel,
                shapeImgList: [],
                dialogImageUrl: '',
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
                },
                shapeData: []
            }
        },
        beforeMount() {
            let id = this.$route.query.id || '';
            this.getDetail(id);
            this.getShapes(id);
        },
        methods: {
            async getDetail(id) {
                let res = await ApiMethods.YishoufangApi.detail({id: id});
                if (res.code == 200 && res.data) {
                    this.detailInfo = res.data;
                }
            },
            async getShapes(id) {
                let res = await ApiMethods.YishoufangApi.shapes({id: id});
                if (res.code == 200 && res.data) {
                    this.shapeData = res.data.content
                }
            },
            expandDetail(row) {
                if (row.open) {
                    row.open = false;
                    this.$refs.shapeTable.toggleRowExpansion(row, false);
                } else {
                    row.open = true;
                    this.$refs.shapeTable.toggleRowExpansion(row, true);
                }
            },
            async editShape(loupanId,shapeId){
                let res = await ApiMethods.YishoufangApi.getShape({loupanId,shapeId});
                console.log(res);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.scanShapeImage = true;
            },
            submitShape() {
                this.$refs.shapForm.doValidate().then(res => {
                    //这里调用新增或修改接口
                    this.showAddShap = false
                }).catch(e => {
                    console.log(e);
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .info-tab {
        padding: 10px 20px;
        background-color: #fff;
        /deep/ .el-tabs__header {
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

    .shape-wrap {
        background-color: #fff;
        margin-top: 10px;
    }

    .shape-expand {
        display: inline-block;
        width: 50%;
        .el-form-item {
            width: 300px;
        }
    }

    .shape-images {
        padding: 20px;
        display: inline-block;
        width: 50%;
        float: right;
        .title {
            font-size: 16px;
        }
        /deep/ .el-carousel__container {
            height: 300px !important;
            text-align: center;
            overflow-y: hidden;
            .el-carousel__item {
                position: relative;
                overflow-y: hidden;
                img {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                    left: 0;
                }
            }
        }
    }
</style>
