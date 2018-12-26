<template>
    <div @click="showRangePicker" ref="rangeWrap" class="range-wrap">
        <span v-if="iconClass" class="icon">
            <i :class="iconClass"></i>
        </span>
        <i v-if="lowerRange || higherRange" class="el-icon-error clear-icon" @click.stop="clearRange"></i>
        <span v-show="placeholder && !resultValue" class="placeholder">
            {{placeholder}}
        </span>
        {{resultValue}}
        <div v-show="rangeShow" class="range-picker">
            <el-row :gutter="10" class="inputs">
                <el-col :span="11">
                    <el-input @focus="isLowerRange = true" v-model="lowerRange" placeholder="0">{{lowerRange}}
                    </el-input>
                </el-col>
                <el-col :span="2" style="vertical-align: middle;">
                    -
                </el-col>
                <el-col :span="11">
                    <el-input @focus="isLowerRange = false" v-model="higherRange" placeholder="不限"></el-input>
                </el-col>
            </el-row>
            <ul class="selects">
                <li @click="lowerRange = ''" v-show="isLowerRange">0</li>
                <li @click="checkRange(range)" v-for="(range,index) in ranges" :key="index">{{range}}</li>
                <li @click="higherRange = ''" v-show="isLowerRange === false">不限</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rangePicker",
        props: {
            iconClass: {
                type: String,
                default: 'el-icon-caret-bottom'
            },
            placeholder: {
                type: String,
                default: '请选择范围'
            },
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            },
            gap: {
                type: Number,
                default: function () {
                    return this.max / 10
                }
            },
            unit: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                rangeShow: false,
                lowerRange: '',
                higherRange: '',
                ranges: [],
                isLowerRange: true,
            }
        },
        methods: {
            showRangePicker() {
                document.documentElement.click();
                this.rangeShow = true;
            },
            hideRangePicker() {
                this.rangeShow = false;
            },
            checkRange(range) {
                //选择的是最小值范围
                if (this.isLowerRange) {
                    this.lowerRange = range;
                }
                //选择的是最大值范围
                else {
                    this.higherRange = range;
                }
            },
            addEvent() {
                document.addEventListener('click', this.hideRangePicker);
            },
            clearRange() {
                this.lowerRange = '';
                this.higherRange = '';
            }
        },
        beforeMount() {
            this.ranges = this.lowerRanges;
        },
        mounted() {
            this.$refs.rangeWrap.addEventListener('click', function (e) {
                e.stopPropagation();
            });
            this.addEvent();
        },
        computed: {
            resultValue() {
                if (this.lowerRange) {
                    if (this.higherRange) {
                        if (this.lowerRange - this.higherRange === 0) {
                            return `${this.lowerRange}${this.unit}`
                        }
                        return `${this.lowerRange} - ${this.higherRange}${this.unit}`
                    } else {
                        return `${this.lowerRange}${this.unit}以上`
                    }
                }
                //lowerRange为空，higherRange有值的情况
                else if (this.higherRange) {
                    return `${this.higherRange}${this.unit}以下`
                }
                return '';
            },
            lowerRanges() {
                let range = [this.min];
                let currentRange = this.min;
                let gap = this.gap || this.max / 10;
                let half = this.max / 2;
                let higherRange = this.higherRange;
                let isMoreThanHalf = (higherRange - gap) > half;
                let endRange = 0;
                if (higherRange <= 0 || isMoreThanHalf) {
                    //没有选最大范围，或最大值>最小范围的最大值时
                    endRange = half;
                } else {
                    //选了最大范围，值 小于 最小范围的max时
                    endRange = higherRange - gap;
                }

                while (currentRange <= endRange) {
                    currentRange += gap;
                    range.push(currentRange);
                }
                return range;
            },
            higherRanges() {
                let range = [this.max];
                let currentRange = this.max;
                let gap = this.gap || this.max / 10;
                let endRange = (parseInt(this.lowerRange) + gap) || gap;
                while (currentRange > endRange) {
                    currentRange -= gap;
                    range.unshift(currentRange);
                }
                return range;
            }
        },
        watch: {
            isLowerRange: {
                handler(val) {
                    if (val) {
                        this.ranges = this.lowerRanges;
                    } else {
                        this.ranges = this.higherRanges;
                    }
                },
                deep: true
            },
            rangeShow: {
                handler() {
                    //切换时，设置默认显示小范围
                    this.isLowerRange = true;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .range-wrap {
        white-space: nowrap;
        position: relative;
        z-index: 10;
        line-height: 24px;
        height: 24px;
        padding: 0 34px 0 5px;
        background-color: #fff;
        border: solid 1px #ebeef5;
        font-size: 15px;
        &:hover {
            cursor: pointer;
        }
        .clear-icon{
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -6px;
            font-size: 14px;
            color: #d0d0d0;
            &:hover{
                color: #797979;
            }
        }
        .icon {
            position: absolute;
            right: 5px;
            top: 50%;
            font-size: 14px;
            margin-top: -12px;
            color: #606266;
        }
        .placeholder {
            font-size: 14px;
            color: #606266;
        }
        .range-picker {
            width: 150%;
            position: absolute;
            min-width: 150px;
            top: 25px;
            left: -1px;
            background-color: #fff;
            border: solid 1px #d4d4d4;
            /deep/ .inputs {
                padding: 10px;
                .el-input {
                    height: 24px;
                    line-height: 24px;
                }
                .el-input__inner {
                    height: 24px;
                    line-height: 24px;
                    font-size: 15px;
                    padding: 3px;
                }
            }
            .selects {
                border-top: solid #d4d4d4 1px;
                li {
                    padding: 10px 15px;
                    list-style: none;
                    font-size: 15px;
                    &:hover {
                        background-color: #e5f2ff;
                    }
                }
            }
        }
    }
</style>
