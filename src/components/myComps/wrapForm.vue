<template>
    <el-form ref="wrapForm" :model="model">
        <el-form-item
            v-for="(item,index) in model"
            :key="index"
            :prop="`${getKey(model,item)}.value`"
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
</template>

<script>
    export default {
        name: "multiForm",
        props: {
            model: {
                type: Object
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
                    this.$refs.wrapForm.validate(valid => {

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

<style scoped>

</style>
