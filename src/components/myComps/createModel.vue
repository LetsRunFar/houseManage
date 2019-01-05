<template>
    <el-dialog
        @close="clearAllInputs"
        custom-class="first-dialog"
        :title="outerTitle"
        lock-scroll
        :close-on-click-modal="false"
        :visible.sync="outerVisible">
        <wrap-form ref="firstCreateForm" :model="newErshoufangModel.firstStepInfo"></wrap-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideFirst">取消</el-button>
            <el-button type="primary" @click="checkShowNext()">下一步</el-button>
        </div>
        <el-dialog
            custom-class="inner-dialog"
            :title="innerTitle"
            :visible.sync="innerVisible"
            append-to-body>
            <multi-form ref="innerCreateForm" :model="newErshoufangModel.baseInfo"></multi-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideNext">上一步</el-button>
                <el-button type="primary" @click="checkDoCreate">完成</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>

<script>
    import WrapForm from 'myComps/wrapForm'
    import MultiForm from 'myComps/multiForm'

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
        components: {WrapForm, MultiForm},
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
                this.$refs.firstCreateForm.doValidate().then(res => {
                    this.showNext();
                }).catch(e => {
                    console.log(e);
                })
            },
            checkDoCreate() {
                this.$refs.innerCreateForm.doValidate().then(res => {
                    this.$emit('doCreate');
                }).catch(e => {
                    console.log(e);
                })
            },
            showFirst() {
                this.outerVisible = true
            },
            hideFirst() {
                this.outerVisible = false
            },
            showNext() {
                this.innerVisible = true
            },
            hideNext() {
                this.innerVisible = false
            },
            clearAllInputs() {
                this.newErshoufangModel = Object.assign({}, this.createModel)
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
