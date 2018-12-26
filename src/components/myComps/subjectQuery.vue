<template>
    <div class="condition-wrap">
        <div class="each-condition" :style="{'width': condition.width}" v-for="(condition,index) in subjectConditions" :key="index">
            <template v-if="condition.type == 'selection'">
                <el-select clearable v-model="condition.model" :placeholder="condition.placeholder || ''">
                    <el-option
                        size="mini"
                        v-for="item in condition.options"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value">
                    </el-option>
                </el-select>
            </template>
            <template v-else-if="condition.type == 'area'">

            </template>
            <template v-else-if="condition.type == 'input'">

            </template>
            <template v-else-if="condition.type == 'inputSelection'">

            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "subjectQuery",
        props: {
            subjectConditions: {
                type: Array,
                default: []
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .condition-wrap{
        padding: 5px 10px 0 10px;
        .each-condition{
            display: inline-block;
            width: auto;
        }
    }
</style>
