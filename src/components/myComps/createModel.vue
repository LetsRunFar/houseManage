<template>
    <el-dialog
        @close="clearAllInputs"
        custom-class="first-dialog"
        :title="outerTitle"
        lock-scroll
        :close-on-click-modal="false"
        :visible.sync="outerVisible">
        <el-form ref="firstCreateForm" :model="newErshoufangModel.firstStepInfo">
            <el-form-item
                v-for="(item,index) in newErshoufangModel.firstStepInfo"
                :key="index"
                :prop="`${getKey(newErshoufangModel.firstStepInfo,item)}.value`"
                :required="item.required"
                :rules="item.rules || []"
                :label="item.label">
                <template v-if="item.type == 'input'">
                    <el-input :style="{'width': item.width || 'auto'}" v-model="item.value"
                              :placeholder="item.placeholder || ''"></el-input>
                </template>
                <template v-else-if="item.type=='select'">
                    <el-select
                        :style="{'width': item.width || 'auto'}"
                        clearable
                        size="mini"
                        :placeholder="item.placeholder || ''"
                        v-model="item.value">
                        <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value">
                        </el-option>
                    </el-select>
                </template>
                <template v-else-if="item.type=='cascader'">
                    <el-cascader
                        :style="{'width': item.width || 'auto'}"
                        :options="item.options"
                        v-model="item.value"
                        change-on-select>
                    </el-cascader>
                </template>
                <template v-else-if="item.type == 'multi'">
                    <el-row :gutter="10">
                        <el-col :span="24/(item.children.length)" v-for="(child,i) in item.children" :key="i">
                            <template v-if="child.type == 'input'">
                                <el-input
                                    :style="{'width': child.width || 'auto'}"
                                    v-model="item.value[child.model]"
                                    :placeholder="child.placeholder">
                                    <template v-if="item.unit" slot="append">{{item.unit}}
                                    </template>
                                    <template v-else-if="child.unit" slot="append">
                                        {{child.unit}}
                                    </template>
                                </el-input>
                            </template>
                            <template v-else-if="child.type=='select'">
                                <el-select
                                    :style="{'width': child.width || 'auto'}"
                                    clearable
                                    size="mini"
                                    :placeholder="child.placeholder"
                                    v-model="item.value[child.model]">
                                    <el-option
                                        v-for="option in child.options"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>
                    </el-row>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideFirst">取消</el-button>
            <el-button type="primary" @click="checkShowNext()">下一步</el-button>
        </div>
        <el-dialog
            custom-class="inner-dialog"
            :title="innerTitle"
            :visible.sync="innerVisible"
            append-to-body>
            <el-form ref="innerCreateForm" :model="newErshoufangModel.baseInfo">
                <el-collapse v-model="activeInfos">
                    <el-collapse-item title="基本信息" name="baseInfo">
                        <el-row>
                            <el-col :span="8" v-for="(item,index) in newErshoufangModel.baseInfo" :key="index">
                                <el-form-item
                                    :prop="`${getKey(newErshoufangModel.baseInfo,item)}.value`"
                                    :rules="item.rules || []"
                                    :required="item.required"
                                    :label="item.label">
                                    <template v-if="item.type == 'input'">
                                        <el-input :style="{'width': item.width || 'auto'}" v-model="item.value">
                                            <template v-if="item.unit" slot="append">{{item.unit}}</template>
                                        </el-input>
                                    </template>
                                    <template v-else-if="item.type=='select'">
                                        <el-select
                                            :style="{'width': item.width || 'auto'}"
                                            clearable
                                            size="mini"
                                            v-model="item.value">
                                            <el-option
                                                v-for="option in item.options"
                                                :key="option.value"
                                                :label="option.label"
                                                :value="option.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-else-if="item.type=='cascader'">
                                        <el-cascader
                                            :style="{'width': item.width || 'auto'}"
                                            :options="item.options"
                                            v-model="item.value"
                                            change-on-select>
                                        </el-cascader>
                                    </template>
                                    <template v-else-if="item.type == 'multi'">
                                        <template v-for="(child,i) in item.children">
                                            <template v-if="child.type == 'input'">
                                                <el-input
                                                    :key="i"
                                                    :style="{'width': child.width || 'auto'}"
                                                    v-model="item.value[child.model]"
                                                    :placeholder="child.placeholder">
                                                    <template v-if="item.unit" slot="append">{{item.unit}}
                                                    </template>
                                                </el-input>
                                            </template>
                                            <template v-else-if="child.type=='select'">
                                                <el-select
                                                    :style="{'width': child.width || 'auto'}"
                                                    clearable
                                                    size="mini"
                                                    v-model="item.value[child.model]">
                                                    <el-option
                                                        v-for="option in child.options"
                                                        :key="option.value"
                                                        :label="option.label"
                                                        :value="option.value">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                        </template>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item v-if="newErshoufangModel.attachInfo" title="附加信息" name="attachInfo">
                        <el-row>
                            <el-col :span="8" v-for="(item,index) in newErshoufangModel.attachInfo" :key="index">
                                <el-form-item
                                    :prop="getKey(newErshoufangModel.attachInfo,item).value"
                                    :rules="item.rules || []"
                                    :required="item.required"
                                    :label="item.label">
                                    <template v-if="item.type == 'input'">
                                        <el-input :style="{'width': item.width || 'auto'}"
                                                  v-model="item.value"></el-input>
                                    </template>
                                    <template v-else-if="item.type=='select'">
                                        <el-select
                                            :style="{'width': item.width || 'auto'}"
                                            clearable
                                            size="mini"
                                            v-model="item.value">
                                            <el-option
                                                v-for="option in item.options"
                                                :key="option.value"
                                                :label="option.label"
                                                :value="option.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-else-if="item.type == 'multi'">
                                        <template v-for="(child,i) in item.children">
                                            <template v-if="child.type == 'input'">
                                                <el-input
                                                    :key="i"
                                                    :style="{'width': child.width || 'auto'}"
                                                    v-model="item.value[child.model]"
                                                    :placeholder="child.placeholder">
                                                    <template v-if="item.unit" slot="append">{{item.unit}}
                                                    </template>
                                                    <template v-else-if="child.unit" slot="append">{{child.unit}}
                                                    </template>
                                                </el-input>
                                            </template>
                                            <template v-else-if="child.type=='select'">
                                                <el-select
                                                    :style="{'width': child.width || 'auto'}"
                                                    clearable
                                                    size="mini"
                                                    v-model="item.value[child.model]">
                                                    <el-option
                                                        v-for="option in child.options"
                                                        :key="option.value"
                                                        :label="option.label"
                                                        :value="option.value">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                        </template>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideNext">上一步</el-button>
                <el-button type="primary" @click="checkDoCreate">完成</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>

<script>
    export default {
        name: "createModel",
        props: {
            outerTitle: {
                type: String,
                default: '新增'
            },
            innerTitle: {
                type: String,
                default: '新增详情'
            },
            createModel: {
                type: Object,
                default: function () {
                    return {}
                }
            },
        },
        data() {
            return {
                newErshoufangModel: this.createModel,
                showCreateNext: false,
                outerVisible: false,
                innerVisible: false,
                activeInfos: ['baseInfo', 'attachInfo']
            }
        },
        methods: {
            getKey(parent, child) {
                for (var key in parent) {
                    if (this.isObjectValueEqual(parent[key], child)) {
                        return key;
                    }
                }
                return 'lx';
            },
            isObjectValueEqual(a, b) {
                var aProps = Object.getOwnPropertyNames(a);
                var bProps = Object.getOwnPropertyNames(b);
                if (aProps.length != bProps.length) {
                    return false;
                }
                for (var i = 0; i < aProps.length; i++) {
                    var propName = aProps[i];
                    if (a[propName] !== b[propName]) {
                        return false;
                    }
                }
                return true;
            },
            checkShowNext() {
                this.$refs.firstCreateForm.validate((valid) => {
                    if (valid) {
                        this.showNext();
                    } else {
                        return false;
                    }
                });
            },
            checkDoCreate() {
                this.$refs.innerCreateForm.validate((valid) => {
                    if (valid) {
                        this.$emit('doCreate');
                    } else {
                        return false;
                    }
                });
            },
            showFirst(){
                this.outerVisible = true
            },
            hideFirst() {
                this.outerVisible = false
            },
            showNext(){
                this.innerVisible = true
            },
            hideNext(){
                this.innerVisible = false
            },
            clearAllInputs(){
                this.newErshoufangModel = Object.assign({},this.createModel)
            }
        },
        watch: {
            newErshoufangModel: {
                handler(val) {
                    this.$emit('update:createModel', val);
                },
                deep: true
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .first-dialog {
        width: 400px;
        text-align: left;
        .el-form-item__label {
            width: 90px;
        }
        .el-input__inner {
            height: 32px;
            line-height: 32px;
            width: 100%;
        }
        .el-input {
            width: 100%;
        }
        .el-form-item__content {
            display: inline-block;
            width: calc(100% - 90px);
        }
        .el-form-item {
            display: inline-block;
        }
    }

    /deep/ .inner-dialog {
        width: 90%;
        min-width: 800px;
        .el-form-item__label {
            width: 105px;
        }
    }

    /deep/ .el-dialog__header {
        text-align: left;
        padding: 10px 20px;
        border-bottom: solid 1px #ddd;
    }

    /deep/ .el-dialog__headerbtn {
        top: 13px;
        font-size: 20px;
    }

    /deep/ .el-input-group__append {
        padding: 0 5px;
    }
</style>
