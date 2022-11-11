<template>
    <div>
        <!-- <h1>Main</h1> -->
        <el-container>
            <el-aside width="200px">
                <common-aside></common-aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </div>
</template>
<script>
import CommonAside from '../components/CommonAside.vue'
export default {
    data() {
        return {}
    },
    components: {
        CommonAside
    }
}
</script>
<style lang="less" scoped>
.el-aside::-webkit-scrollbar {
    display: none;
}
</style>