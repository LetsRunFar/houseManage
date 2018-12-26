<template>
    <el-row class="query-status">
        <span style="color: #5d5d5d;">状态：</span>
        <span :class="{'active': mainStatu.id == -1,'main-statu':true}" @click="clearAll">全部</span>
        <div
            class="statu"
            v-for="(item,index) in status"
            :key="index">
                <span :class="{'active': item.id === mainStatu.id,'main-statu':true}" @click="checkStatu(item)">
                    {{item.text}}
                </span>
                <div v-show="item.subStatus && item.id === mainStatu.id" class="sub-statu-div">
                    <el-dropdown
                        split-button
                        size="mini"
                        type="primary"
                        trigger="click"
                        >
                        所有{{subText}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="checkSubstatu(sub)" v-for="(sub,index) in item.subStatus" :key="index">
                                {{sub.text}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
    </el-row>
</template>

<script>
    export default {
        name: "queryStatus",
        props: {
            status: {
                type: Array,
                default: []
            }
        },
        data(){
            return {
                mainStatu: {
                    id: -1,
                    subStatu: {
                        id: -1
                    }
                },
                subText: '',

            }
        },
        methods: {
            checkStatu(statu){
                this.mainStatu.id = statu.id
                this.mainStatu.subStatu.id = -1;
                this.subText = '';
                this.$emit('checkStatus',this.mainStatu);
            },
            checkSubstatu(subStatu){
                this.subText = subStatu.text;
                this.mainStatu.subStatu.id = subStatu.id;
                this.$emit('checkStatus',this.mainStatu);
            },
            clearAll(){
                this.mainStatu.id = -1;
                this.mainStatu.subStatu.id = -1;
                this.$emit('checkStatus',this.mainStatu);
            }
        }
    }
</script>

<style lang="less" scoped>
    .query-status{
        padding: 0 10px;
        font-size: 14px;
        .statu{
            display: inline-block;
            margin: 0 3px;
            padding: 3px 5px;
            cursor: pointer;
            color: #0e85ff;
        }
        .main-statu{
            display: inline-block;
            padding: 3px 5px;
            cursor: pointer;
            color: #0e85ff;
            &:hover{
                text-decoration: underline;
            }
            &.active{
                color: #e45353;
            }
        }
        .sub-statu-div{
            background-color: #fff;
            display: inline-block;
            .sub-statu{
                padding: 2px 3px;
            }
        }
    }
</style>
