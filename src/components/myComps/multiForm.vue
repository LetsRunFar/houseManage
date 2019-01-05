<template>
    <el-form ref="multiForm" :model="model" label-width="100px">
        <el-row>
            <el-col :span="6" v-for="(item,index) in model" :key="index">
                <el-form-item
                    :prop="`${getKey(model,item)}.value`"
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
                                    class="unit-inputs"
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
    </el-form>
</template>

<script>
    export default {
        name: "multiForm",
        props: {
            model: {
                type: Object
            }
        },
        data() {
            return {
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
            doValidate() {
                return new Promise((resolve, reject) => {
                    this.$refs.multiForm.validate(valid => {

                        if (valid) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/.unit-inputs{
        .el-input__inner{
            padding: 0;
            text-align: center;
        }
    }
</style>
