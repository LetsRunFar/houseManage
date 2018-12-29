import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {title: '403'}
                },
                {
                    path: '/ershoufang',
                    component: resolve => require(['../pages/ershoufang.vue'], resolve),
                    meta: {title: '二手房源'}
                },
                {
                    path: '/yishoufang',
                    component: resolve => require(['../pages/yishoufang.vue'], resolve),
                    meta: {title: '一手房源'}
                },
                {
                    path: '/keyuan',
                    component: resolve => require(['../pages/keyuan.vue'], resolve),
                    meta: {title: '客源管理'}
                },
                {
                    path: '/ysf/detail',
                    component: resolve => require(['../pages/yishoudetail.vue'], resolve),
                    meta: {
                        title: '房屋详情'
                    }
                },
                {
                    path: '/client/detail',
                    component: resolve => require(['../pages/keyuandetail.vue'], resolve),
                    meta: {
                        title: '客源详情'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
