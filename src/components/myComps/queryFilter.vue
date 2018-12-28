<template>
    <el-row style="margin-bottom: 5px;" :gutter="10">
        <el-col class="search-item" v-for="(item, index) in searchModel" :key="index" :span="3">
            <template v-if="item.type == 'range'">
                <range-picker
                    :value.sync="item.value"
                    :min="item.min"
                    :max="item.max"
                    :unit="item.unit"
                    :gap="item.gap"
                    :placeholder="item.label">
                </range-picker>
            </template>
            <template v-else-if="item.type == 'input'">
                <el-input v-model="item.value" :placeholder="item.label"></el-input>
            </template>
            <template v-else-if="item.type=='select'">
                <el-select
                    :placeholder="item.label"
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
        </el-col>
    </el-row>
</template>

<script>
    import RangePicker from './rangePicker'

    export default {
        props: {
            searchModel: {
                type: [Object, Array],
                default: {}
            }
        },
        components: {RangePicker},
        name: "queryFilter",
    }
</script>

<style lang="less" scoped>
    .search-item {
        margin-top: 5px;
        height: 32px;
        line-height: 32px;
        /deep/ .el-input__inner {
            height: 32px;
            line-height: 32px;
        }
    }
</style>
