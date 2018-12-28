<template>
    <div>
        <div class="base-info each-info">
            <div class="info-item" v-for="(item,key) in detailInfo">
                <template v-if="baseInfoEnum[key]">
                    <span class="label">{{baseInfoEnum[key]}}</span>
                    <span class="value">{{item}}</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import {ApiMethods} from "static/js/http-serve/HttpApi";

    export default {
        name: "detail",
        data() {
            return {
                detailInfo: null,
                activeName: 'base',
                baseInfoEnum: {
                    id: 'id',
                    name: '楼盘名称',
                    tags: '标签',
                    rightNature: '产权性质',
                    chianAreaName: '区域名称',
                    divideName: '片区名称',
                    address: '楼盘地址',
                    salesOffice: '售楼处地址',
                    avgPrice: '平均单价',
                    tatlePrice: '平均总价',
                    areaMin: '最小面积',
                    areaMax: '最大面积',
                    quantity: '总的套数',
                    soldQuantity: '已售套数',
                    startDate: '开盘日期',
                    deliveryDate: '交付日期',
                }
            }
        },
        beforeMount() {
            let id = this.$route.query.id || '';
            this.getDetail(id);
        },
        methods: {
            async getDetail(id) {
                let param = {
                    id: id
                }
                let res = await ApiMethods.YishoufangApi.detail(param);
                if (res.code == 200 && res.data) {
                    this.detailInfo = res.data;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .each-info {
        font-size: 14px;
        .info-item {
            display: inline-block;
            .label {
                color: #797979;
                margin-right: 10px;
            }
        }
    }
</style>
