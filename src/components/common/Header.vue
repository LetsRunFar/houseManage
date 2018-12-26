<template>
    <div class="header">
        <el-row>
            <el-col :span="4" class="logo">房邻科技</el-col>
            <el-col :span="16" class="nav">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#242f42"
                    text-color="#fff"
                    active-text-color="#409EFF">
                    <el-submenu index="2">
                        <template slot="title">房源管理</template>
                        <el-menu-item index="2-1" @click.native="$router.push('/ershoufang')">二手房源</el-menu-item>
                        <el-menu-item index="2-2" @click.native="$router.push('/yishoufang')">一手房源</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">客源管理</template>
                        <el-menu-item index="3-1" @click.native="$router.push('/mmkeyuan')">买卖客源</el-menu-item>
                        <el-menu-item index="3-2" @click.native="$router.push('/zlkeyuan')">租赁客源</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="4">订单管理</el-menu-item>
                </el-menu>
            </el-col>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 全屏显示 -->
                    <div class="btn-fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>
                    <!-- 消息中心 -->
                    <div class="btn-bell">
                        <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                            <router-link to="/tabs">
                                <i class="el-icon-bell"></i>
                            </router-link>
                        </el-tooltip>
                        <span class="btn-bell-badge" v-if="message"></span>
                    </div>
                    <!-- 用户头像 -->
                    <!--<div class="user-avator"><img src="static/img/img.jpg"></div>-->
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'admin',
                message: 2,
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            handleSelect(){

            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 50px;
    }
    .header .logo{
        font-size: 16px;
        float: left;
        line-height: 60px;
        padding-left: 10px;
    }
    .header-right{
        width: auto;
        float: right;
        padding-right: 10px;
    }
    .header-user-con{
        display: flex;
        height: 60px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .el-menu--horizontal{
        text-align: center;
    }
    .el-menu--horizontal>.el-menu-item{
        float: none;
        display: inline-block;
    }
    .el-menu--horizontal>.el-submenu{
        float: none;
        display: inline-block;
    }
</style>
