export const saleTotalRange = [
    {
        text: '40万以下',
        id: 1
    },
    {
        text: '40-60万',
        id: 2
    },
    {
        text: '60-80万',
        id: 3
    }
]
export const areaRange = [
    {
        text: '30平以下',
        id: 1
    },
    {
        text: '30-50平',
        id: 2
    },
    {
        text: '50-70平',
        id: 3
    },
    {
        text: '70-90平',
        id: 4
    }
]
export const unitRange = [
    {
        text: '一室',
        id: 1
    },
    {
        text: '二室',
        id: 2
    },
    {
        text: '三室',
        id: 3
    },
    {
        text: '四室',
        id: 4
    },
    {
        text: '五室',
        id: 5
    },
]
export const purposRange = [
    {
        text: '普通住宅',
        id: 1
    },
    {
        text: '商业类',
        id: 2
    },
    {
        text: '别墅',
        id: 3
    },
    {
        text: '其他',
        id: 4
    },
]
export const rightNature = [
    {
        text: '商品房',
        id: 1
    },
    {
        text: '公房',
        id: 2
    },
    {
        text: '经适房',
        id: 3
    },
    {
        text: '其他',
        id: 4
    }
]
export const floor = [
    {
        text: '低楼层',
        id: 1
    },
    {
        text: '中楼层',
        id: 2
    },
    {
        text: '高楼层',
        id: 3
    }
]
export const newErshoufangModel = {
    firstStepInfo: {
        tradeType: {
            label: '交易类型',
            type: 'select',
            required: true,
            value: '',
            rules: [{required: true, message: '请选择交易类型'}],
            options: [
                {
                    label: '出售',
                    value: '1'
                },
                {
                    label: '出租',
                    value: '2'
                }
            ]
        },
        region: {
            label: '小区',
            type: 'cascader',
            width: '240px',
            value: [],
            rules: [{required: true, message: '请选择'}],
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }]
        },
        floorInfo: {
            label: '楼层',
            type: 'multi',
            value: {
                floor: '',
                totalFloor: ''
            },
            children: [
                {
                    type: 'input',
                    unit: '楼',
                    rules: [{required: true, message: '请输入楼层'}],
                    model: 'floor',
                },
                {
                    type: 'input',
                    unit: '楼',
                    rules: [{required: true, message: '请输入总楼层'}],
                    model: 'totalFloor',
                }
            ]
        },
        number: {
            label: '门牌号',
            placeholder: '如：3',
            type: 'input',
            value: '',
            rules: [{required: true, message: '请输入室号'}]
        },
        owner: {
            label: '姓名',
            type: 'input',
            required: true,
            width: '100px',
            value: '',
            rules: [{required: true, message: '业主姓名'}]
        },
        title: {
            type: 'select',
            required: true,
            width: '140px',
            value: '',
            placeholder: '性别',
            rules: [{required: true, message: '性别'}],
            options: [
                {
                    label: '先生',
                    value: '男'
                },
                {
                    label: '女士',
                    value: '女'
                }
            ]
        },
        phone: {
            label: '联系方式',
            placeholder: '手机号',
            type: 'input',
            required: true,
            width: '160px',
            value: '',
            rules: [{required: true, message: '请输入手机号'}, {}]
        },
        relation: {
            type: 'select',
            required: true,
            value: '',
            width: '80px',
            rules: [{required: true, message: '关系'}],
            options: [
                {
                    label: '配偶',
                    value: '配偶'
                },
                {
                    label: '亲戚',
                    value: '亲戚'
                },
                {
                    label: '朋友',
                    value: '朋友'
                },
                {
                    label: '授权委托人',
                    value: '授权委托人'
                }
            ]
        }
    },
    baseInfo: {
        source: {
            label: '来源',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请选择来源'}],
            options: [
                {
                    label: '上门',
                    value: '1'
                },
                {
                    label: '电话',
                    value: '2'
                }
            ]
        },
        level: {
            label: '房源等级',
            type: 'input',
            value: '',
            rules: [{required: true, message: '请输入房源等级'}]
        },
        title: {
            label: '房源标题',
            type: 'input',
            value: '',
            rules: [{required: true, message: '请输入房源标题'}]
        },
        roomType: {
            label: '户型',
            type: 'multi',
            required: true,
            value: {
                room: '',
                hall: '',
                toilet: '',
                balcony: '',
                kitchen: ''
            },
            children: [
                {
                    type: 'input',
                    placeholder: '室',
                    rules: [{required: true, message: '请输入室数'}],
                    model: 'room',
                    width: '14%'
                }, {
                    type: 'input',
                    placeholder: '厅',
                    model: 'hall',
                    width: '14%'
                }, {
                    type: 'input',
                    placeholder: '卫',
                    model: 'toilet',
                    width: '14%'
                }, {
                    type: 'input',
                    placeholder: '厨',
                    model: 'kitchen',
                    width: '14%'
                }, {
                    type: 'input',
                    placeholder: '阳台',
                    model: 'balcony',
                    width: '14%'
                }
            ],
        },
        buildingArea: {
            width: '200px',
            label: '建筑面积',
            type: 'input',
            unit: '平米',
            value: '',
            rules: [{required: true, message: '请输入建筑面积'}]
        },
        area: {
            width: '200px',
            label: '套内面积',
            type: 'input',
            unit: '平米',
            value: '',
            rules: [{required: true, message: '请输入套内面积'}]
        },
        purpose: {
            label: '用途',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请选择用途'}],
            options: [
                {
                    label: '住宅',
                    value: '住宅'
                },
                {
                    label: '公寓',
                    value: '公寓'
                },
                {
                    label: '别墅',
                    value: '别墅'
                },
                {
                    label: '商业',
                    value: '商业'
                }
            ]
        },
        rightNature: {
            label: '产权性质',
            value: '',
            type: 'select',
            rules: [{required: true, message: '请输入产权性质'}],
            options: [
                {
                    label: '商品房',
                    value: '商品房'
                },
                {
                    label: '安置房',
                    value: '安置房'
                },
                {
                    label: '经济适用房',
                    value: '经济适用房'
                },
                {
                    label: '联建房',
                    value: '联建房'
                }
            ]
        },
        rightAgeLimit: {
            label: '产权年限',
            value: '',
            rules: [{required: true, message: '请选择产权年限'}],
            type: 'select',
            options: [
                {
                    label: '70年',
                    value: '70年'
                },
                {
                    label: '50年',
                    value: '50年'
                },
                {
                    label: '40年',
                    value: '40年'
                }
            ]
        },
        priceSpace: {
            label: '价格空间',
            value: '',
            type: 'select',
            rules: [{required: true, message: '请选择价格空间'}],
            options: [
                {
                    label: '价格可谈',
                    value: '价格可谈'
                },
                {
                    label: '价格固定',
                    value: '价格固定'
                }
            ]
        },
        totalPrice: {
            width: '200px',
            label: '总价',
            type: 'input',
            unit: '万',
            value: '',
            rules: [{required: true, message: '请输入总价'}]
        },
        saleBasePrice: {
            width: '200px',
            label: '底价',
            type: 'input',
            unit: '万',
            value: '',
            rules: [{required: true, message: '请输入底价'}]
        },
        decoration: {
            label: '装修',
            type: 'select',
            rules: [{required: true, message: '请选择装修类型'}],
            value: '',
            options: [
                {
                    label: '精装修',
                    value: '精装修'
                },
                {
                    label: '简装',
                    value: '简装'
                }
            ]
        },
        lastDecoration: {
            label: '上次装修',
            value: '',
            type: 'input',
            rules: [{required: true, message: '请输入上次装修时间'}]
        },
        debt: {
            label: '是否欠款',
            type: 'input',
            rules: [{required: true, message: '请输入是否欠款'}],
            value: '',
        },
        elevator: {
            label: '有无电梯',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请输入是否有电梯'}],
            options: [
                {
                    label: '有电梯',
                    value: '电梯房'
                },
                {
                    label: '无电梯',
                    value: '楼梯房'
                }
            ]
        },
        age: {
            label: '房龄',
            type: 'input',
            rules: [{required: true, message: '请输入房龄'}],
            value: '',
        },
        buildingAge: {
            label: '建筑年代',
            type: 'input',
            rules: [{required: true, message: '请输入建筑年代'}],
            value: ''
        },
        houseCertificate: {
            label: '房产证',
            type: 'select',
            rules: [{required: true, message: '请选择房产证信息'}],
            options: [
                {
                    label: '银行抵押',
                    value: '银行抵押'
                },
                {
                    label: '证在手',
                    value: '证在手'
                }
            ]
        },
        sole: {
            label: '是否唯一',
            type: 'select',
            rules: [{required: true, message: '请选择是否唯一'}],
            options: [
                {
                    label: '唯一住房',
                    value: '唯一住房'
                },
                {
                    label: '非唯一住房',
                    value: '非唯一住房'
                }
            ]
        },
        tags: {
            label: '标签',
            type: 'select',
            rules: [{required: true, message: '请选择标签'}],
            value: '',
            options: [
                {
                    label: '标签1',
                    value: '1'
                },
                {
                    label: '标签2',
                    value: '2'
                },
                {
                    label: '标签3',
                    value: '3'
                },
            ]
        }
    },
    attachInfo: {
        ownerAttitude: {
            label: '业主态度',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请输入业主态度'}],
            options: [
                {
                    label: '很好说话',
                    value: '1'
                },
                {
                    label: '买卖随意',
                    value: '2'
                },
                {
                    label: '不好还价',
                    value: '3'
                }
            ]
        },
        mentality: {
            label: '业主心态',
            type: 'input',
            rules: [{required: true, message: '请输入业主心态'}],
            value: ''
        },
        remark: {
            label: '备注',
            type: 'input',
            rules: [{required: true, message: '请输入业主备注'}],
            value: ''
        },
        school: {
            label: '学位情况',
            type: 'select',
            rules: [{required: true, message: '请选择学位情况'}],
            value: '',
            options: [
                {
                    label: '未使用',
                    value: '未使用'
                },
                {
                    label: '已使用',
                    value: '已使用'
                }
            ]
        },
        stall: {
            label: '车位情况',
            type: 'select',
            rules: [{required: true, message: '请选择车位情况'}],
            value: '',
            options: [
                {
                    label: '公共车位',
                    value: '公共车位'
                },
                {
                    label: '私家车位',
                    value: '私家车位'
                },
                {
                    label: '无车位',
                    value: '无车位'
                }
            ]
        },
        waijing: {
            label: '外景',
            type: 'select',
            rules: [{required: true, message: '请选择外景'}],
            value: '',
            options: [
                {
                    label: '花园景',
                    value: '花园景'
                },
                {
                    label: '朝中庭',
                    value: '朝中庭'
                },
                {
                    label: '临街',
                    value: '临街'
                }
            ]
        },
        checkingCondition: {
            label: '看房情况',
            type: 'input',
            rules: [{required: true, message: '请输入看房情况'}],
            value: ''
        },
        checkingTime: {
            label: '看房时间',
            type: 'input',
            rules: [{required: true, message: '请输入看房时间'}],
            value: ''
        }
    }
}

export const newClientModel = {
    firstStepInfo: {
        shared: {
            label: '公有/私有',
            value: '',
            type: 'select',
            rules: [{required: true, message: '请选择公私有'}],
            options: [
                {
                    label: '公有',
                    value: '公有'
                },
                {
                    label: '私有',
                    value: '私有'
                }
            ]
        },
        /*owner: {
            label: '姓名',
            type: 'input',
            width: '100px',
            value: '',
            rules: [{required: true, message: '业主姓名'}]
        },
        title: {
            type: 'select',
            width:'140px',
            value: '',
            placeholder: '性别',
            rules: [{required: true, message: '性别'}],
            options: [
                {
                    label: '先生',
                    value: '男'
                },
                {
                    label: '女士',
                    value: '女'
                }
            ]
        },
        phone: {
            label: '联系方式',
            placeholder: '手机号',
            type: 'input',
            width: '160px',
            value: '',
            rules: [{required: true, message: '请输入手机号'}, {}]
        },
        relation: {
            type: 'select',
            value: '',
            width: '80px',
            rules: [{required: true, message: '关系'}],
            options: [
                {
                    label: '配偶',
                    value: '配偶'
                },
                {
                    label: '亲戚',
                    value: '亲戚'
                },
                {
                    label: '朋友',
                    value: '朋友'
                },
                {
                    label: '授权委托人',
                    value: '授权委托人'
                }
            ]
        }*/
    },
    baseInfo: {
        clientType: {
            label: '客源类型',
            type: 'select',
            value: '二手房',
            rules: [{required: true, message: '类型'}],
            options: [
                {
                    label: '二手房',
                    value: '二手房'
                },
                {
                    label: '租房',
                    value: '租房'
                },
                {
                    label: '新房',
                    value: '新房'
                },
                {
                    label: '新房/二手房',
                    value: '新房/二手房'
                }
            ]
        },
        source: {
            label: '客户来源',
            type: 'select',
            value: '上门客户',
            rules: [{required: true, message: '来源'}],
            options: [
                {
                    label: '上门客户',
                    value: '上门客户'
                },
                {
                    label: '房邻平台来电',
                    value: '房邻平台来电'
                },
                {
                    label: '贴条',
                    value: '贴条'
                },
                {
                    label: '朋友介绍',
                    value: '朋友介绍'
                },
                {
                    label: '其它平台来电',
                    value: '其它平台来电'
                },
                {
                    label: '其它',
                    value: '其它'
                }
            ]
        },
        account: {
            label: '户口信息',
            type: 'select',
            value: '本地',
            rules: [{required: true, message: '户口'}],
            options: [
                {
                    label: '本地',
                    value: '本地'
                },
                {
                    label: '外地',
                    value: '外地'
                }
            ]
        },
        needAddressDtos: {
            label: '需求位置',
            type: 'cascader',
            width: '240px',
            value: [],
            rules: [{required: true, message: '请选择需求位置'}],
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }]
        },
    },
    attachInfo: {
        minTotalPrice: {
            label: '最低总价',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最低总价'}]
        },
        maxTotalPrice: {
            label: '最高总价',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最高总价'}]
        },
        minArea: {
            label: '最小面积',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最低总价'}]
        },
        maxArea: {
            label: '最大面积',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最高总价'}]
        },
        decoration: {
            label: '装修',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请选择装修'}],
            options: [
                {
                    label: '毛坯',
                    value: '毛坯'
                },
                {
                    label: '简装',
                    value: '简装'
                },
                {
                    label: '豪装',
                    value: '豪装'
                },
                {
                    label: '精装',
                    value: '精装'
                },
                {
                    label: '清水',
                    value: '清水'
                },
                {
                    label: '准新房',
                    value: '准新房'
                },
                {
                    label: '中装',
                    value: '中装'
                },
                {
                    label: '不限',
                    value: '不限'
                }
            ]
        },
        purpose: {
            label: '用途',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请选择用途'}],
            options: [
                {
                    label: '住宅',
                    value: '住宅'
                },
                {
                    label: '公寓',
                    value: '公寓'
                },
                {
                    label: '写字楼',
                    value: '写字楼'
                },
                {
                    label: '商铺',
                    value: '商铺'
                },
                {
                    label: '别墅',
                    value: '别墅'
                },
                {
                    label: '厂房',
                    value: '厂房'
                },
                {
                    label: '仓库',
                    value: '仓库'
                },
                {
                    label: '不限',
                    value: '不限'
                },
            ]
        },
        roomType: {
            label: '户型',
            type: 'multi',
            required: true,
            value: {
                room: '',
                hall: '',
            },
            children: [
                {
                    type: 'input',
                    placeholder: '室',
                    unit: '室',
                    rules: [{required: true, message: '请输入室数'}],
                    model: 'room',
                    width: '25%'
                },
                {
                    type: 'input',
                    placeholder: '厅',
                    unit: '厅',
                    model: 'hall',
                    width: '25%'
                }
            ],
        },
        payWay: {
            label: '付款方式',
            type: 'select',
            value: '',
            rules: [{required: true, message: '付款方式'}],
            options: [
                {
                    label: '全款',
                    value: '全款'
                },
                {
                    label: '贷款',
                    value: '贷款'
                },
            ]
        }
    }
}

export const newClientRentModel = {
    firstStepInfo: {
        shared: {
            label: '公有/私有',
            value: '',
            type: 'select',
            rules: [{required: true, message: '请选择公私有'}],
            options: [
                {
                    label: '公有',
                    value: '公有'
                },
                {
                    label: '私有',
                    value: '私有'
                }
            ]
        },
        /*owner: {
            label: '姓名',
            type: 'input',
            width: '100px',
            value: '',
            rules: [{required: true, message: '业主姓名'}]
        },
        title: {
            type: 'select',
            width:'140px',
            value: '',
            placeholder: '性别',
            rules: [{required: true, message: '性别'}],
            options: [
                {
                    label: '先生',
                    value: '男'
                },
                {
                    label: '女士',
                    value: '女'
                }
            ]
        },
        phone: {
            label: '联系方式',
            placeholder: '手机号',
            type: 'input',
            width: '160px',
            value: '',
            rules: [{required: true, message: '请输入手机号'}, {}]
        },
        relation: {
            type: 'select',
            value: '',
            width: '80px',
            rules: [{required: true, message: '关系'}],
            options: [
                {
                    label: '配偶',
                    value: '配偶'
                },
                {
                    label: '亲戚',
                    value: '亲戚'
                },
                {
                    label: '朋友',
                    value: '朋友'
                },
                {
                    label: '授权委托人',
                    value: '授权委托人'
                }
            ]
        }*/
    },
    baseInfo: {
        clientType: {
            label: '客源类型',
            type: 'select',
            value: '二手房',
            rules: [{required: true, message: '类型'}],
            options: [
                {
                    label: '二手房',
                    value: '二手房'
                },
                {
                    label: '租房',
                    value: '租房'
                },
                {
                    label: '新房',
                    value: '新房'
                },
                {
                    label: '新房/二手房',
                    value: '新房/二手房'
                }
            ]
        },
        source: {
            label: '客户来源',
            type: 'select',
            value: '上门客户',
            rules: [{required: true, message: '来源'}],
            options: [
                {
                    label: '上门客户',
                    value: '上门客户'
                },
                {
                    label: '房邻平台来电',
                    value: '房邻平台来电'
                },
                {
                    label: '贴条',
                    value: '贴条'
                },
                {
                    label: '朋友介绍',
                    value: '朋友介绍'
                },
                {
                    label: '其它平台来电',
                    value: '其它平台来电'
                },
                {
                    label: '其它',
                    value: '其它'
                }
            ]
        },
        account: {
            label: '户口信息',
            type: 'select',
            value: '本地',
            rules: [{required: true, message: '户口'}],
            options: [
                {
                    label: '本地',
                    value: '本地'
                },
                {
                    label: '外地',
                    value: '外地'
                }
            ]
        },
        needAddressDtos: {
            label: '需求位置',
            type: 'cascader',
            width: '240px',
            value: [],
            rules: [{required: true, message: '请选择需求位置'}],
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }]
        },
    },
    attachInfo: {
        minMonth: {
            label: '最小月租金',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最小月租金'}]
        },
        maxMonth: {
            label: '最大月租金',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最大月租金'}]
        },
        minArea: {
            label: '最小面积',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最低总价'}]
        },
        maxArea: {
            label: '最大面积',
            type: 'input',
            value: '',
            rules: [{required: true, message: '最高总价'}]
        },
        decoration: {
            label: '装修',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请选择装修'}],
            options: [
                {
                    label: '毛坯',
                    value: '毛坯'
                },
                {
                    label: '简装',
                    value: '简装'
                },
                {
                    label: '豪装',
                    value: '豪装'
                },
                {
                    label: '精装',
                    value: '精装'
                },
                {
                    label: '清水',
                    value: '清水'
                },
                {
                    label: '准新房',
                    value: '准新房'
                },
                {
                    label: '中装',
                    value: '中装'
                },
                {
                    label: '不限',
                    value: '不限'
                }
            ]
        },
        purpose: {
            label: '用途',
            type: 'select',
            value: '',
            rules: [{required: true, message: '请选择用途'}],
            options: [
                {
                    label: '住宅',
                    value: '住宅'
                },
                {
                    label: '公寓',
                    value: '公寓'
                },
                {
                    label: '写字楼',
                    value: '写字楼'
                },
                {
                    label: '商铺',
                    value: '商铺'
                },
                {
                    label: '别墅',
                    value: '别墅'
                },
                {
                    label: '厂房',
                    value: '厂房'
                },
                {
                    label: '仓库',
                    value: '仓库'
                },
                {
                    label: '不限',
                    value: '不限'
                },
            ]
        },
        roomType: {
            label: '户型',
            type: 'multi',
            required: true,
            value: {
                room: '',
                hall: '',
            },
            children: [
                {
                    type: 'input',
                    placeholder: '室',
                    unit: '室',
                    rules: [{required: true, message: '请输入室数'}],
                    model: 'room',
                    width: '25%'
                },
                {
                    type: 'input',
                    placeholder: '厅',
                    unit: '厅',
                    model: 'hall',
                    width: '25%'
                }
            ],
        }
    }
}

export const searchClientModel = {
    ranges: {
        label: '单价区间',
        minTotalPrice: 100,
        maxTotalPrice: 1000,
    }
}
