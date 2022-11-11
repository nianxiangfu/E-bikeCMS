<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#137C5D" text-color="#fff" active-text-color="#ffd04b" :default-active="this.$route.path.substr(1)">
        <h3>标题</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in allowShowItem" :key="item.name" :index="item.name">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
    </el-menu>

</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu {
    height: 100vh;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 20px;
        font-weight: 600;
    }
}

</style>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            menuData: [
                {
                    path: "/",
                    name: "personinfo",
                    label: "个人信息管理",
                    icon: "el-icon-user-solid",
                    url: "Home/Home"
                },
                {
                    path: "/charging",
                    name: "charging",
                    label: "充电桩预约",
                    icon: "el-icon-document-add",
                    url: "Charging/Charging"
                },
                {
                    path: "/administrate",
                    name: "administrate",
                    label: "充电桩管理",
                    icon: "el-icon-s-management",
                    url: "Administrate/Administrate"
                },
                {
                    path: "/bulletin",
                    name: "bulletin",
                    label: "公告栏",
                    icon: "el-icon-data-board",
                    url: "Bulletin/Bulletin"
                },
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            if(this.$route.path != item.path && !(this.$route.path === "/personinfo" && item.path === '/')){
                this.$router.push(item.path);
            }
        }
    },
    computed: {
        allowShowItem() {
            const isAdmin = true;
            return isAdmin ? this.menuData : this.menuData.filter(item => item.name != "administrate");
        }
    }
}
</script>