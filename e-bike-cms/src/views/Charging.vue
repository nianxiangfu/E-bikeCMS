<template>
  <!-- <el-row :gutter="30">
    <el-col :span="12">
      <div class="grid-content bg-white">
        <el-card class="box-card" id="stationInfoCard" >
          <div slot="header" class="clearfix"><span>充电区域</span></div>
          <el-row :gutter="20" v-for="m in 2">
            <el-col :span="6" v-for="n in 4">
              <div class="grid-content bg-white">
                <el-button @click="selectStation((m-1)*4+n-1)">{{stations[(m-1)*4+n-1]}}</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" id="numInfoCard" >
          <div slot="header" class="clearfix"><span>{{stations[displayStation]}}充电桩</span></div>
          <el-row :gutter="20" v-for="m in 10">
            <el-col :span="6" v-for="n in 6">
              <div class="grid-content bg-white"> -->
  <!-- <el-button v-if="getStatus(displayStation,(m-1)*4+n-1)===0" type="info" disabled >{{ (m-1)*4+n }}</el-button> -->
  <!-- <el-button v-if="getStatus(displayStation,(m-1)*6+n-1)===1" @click="book((m-1)*6+n)">{{ (m-1)*6+n }}</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" id="timeInfoCard" >
        <div slot="header" class="clearfix"> <span>预约时间</span></div>
        <div class="block" >
          <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="开始时间">
          </el-date-picker >
          <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="结束时间">
          </el-date-picker >
        </div>
        <div class="grid-content bg-white"></div>
        <div class="grid-content bg-white">
          <el-button v-if="allowCommit" @click="confirmBook" type="success">预约充电桩</el-button>
          <el-button v-else type="info" disabled>预约充电桩</el-button>
        </div>
      </el-card>

    </el-col>
  </el-row> -->
  <div>
    <el-card class="box-card" id="stationInfoCard">
      <div slot="header" class="clearfix"><span>充电区域</span></div>
      <el-radio-group v-model="selectedArea">
        <el-row :gutter="20" v-for="m in 2">
          <el-col :span="6" v-for="n in 4"  align="middle">
            <div class="grid-content bg-white">
              <el-radio-button :label="(m - 1) * 4 + n - 1">{{ stations[(m - 1) * 4 + n - 1] }}</el-radio-button>
            </div>
          </el-col>
        </el-row>
      </el-radio-group>
    </el-card>
    <el-card class="box-card" id="numInfoCard">
      <div slot="header" class="clearfix">
        <span>{{ stations[selectedArea] }}充电桩</span>
        <!-- <el-button type="success" plain style="float: right; margin-right: 30px;">按时间筛选</el-button> -->
        <span style="float: right; margin-right: 30px;">按时间筛选：
          <el-date-picker v-model="filterDate" type="datetimerange" range-separator="至" start-placeholder="开始时期"
            format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" popper-class="tpc" end-placeholder="结束时期"
            @change="filtratePile">
          </el-date-picker>
        </span>
      </div>
      <div>
        <el-radio-group v-model="selectedPileNum">
          <el-row :gutter="20" v-for="m in rowNum">
            <el-col :span="24 / colNum" v-for="n in colNum" align="middle">
              <div class="grid-content bg-white">
                <el-radio-button :disabled="((status[(m - 1) * colNum + n - 1] !== 1) || (selectedArea === ''))"
                  :label="(m - 1) * colNum + n - 1">{{ (m - 1) * colNum + n }}
                </el-radio-button>
              </div>
            </el-col>
          </el-row>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px" class="clearfix">
        <span>选择预约时间：</span>
        <el-date-picker v-model="selectedDate" type="datetimerange" range-separator="至" start-placeholder="开始时期"
          format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" popper-class="tpc" end-placeholder="结束时期"
          @change="filtratePile">
        </el-date-picker>
        <el-button type="primary" plain style="float: right; margin-right: 50px;"
          :disabled="((selectedArea === '') || (selectedPileNum === '') || (selectedDate === ''))" @click="book">预约</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
export default {

  data() {
    return {
      filterDate: '',
      selectedDate: '',
      stations: ["湖滨", "桂园", "枫十四", "信部竹园", "经管院", "医学部", "枫五", "工三"],
      rowNum: 6,
      colNum: 8,
      status: Array(48).fill(1),
      selectedArea: "",
      selectedPileNum: "",
    }
  },
  methods: {
    filtratePile() {
      var startTime = this.filterDate[0]
      var endTime = this.filterDate[1]
      Vue.set(this.status, 2, 0)
      // this.$forceUpdate();
      this.$message.success("已根据时间筛选")
    },
    book() {
      var startTime = this.selectedDate[0]
      var endTime = this.selectedDate[1]
    },
    // async confirmBook() {
    //   if (this.checkTime()) {
    //     this.$confirm('确定预约吗?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //       beforeClose: async (action, instance, done) => {
    //         if (action === 'confirm') {
    //           this.status[this.displayStation][this.selectedPileNum] = 0
    //           console.log(this.status)
    //           await fetch('api/status', {
    //             method: "put",
    //             headers: {
    //               'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify(this.status),
    //           });
    //           await this.$router.push({ path: "/userinfo" });
    //           done();
    //         } else {
    //           done();
    //         }
    //       }
    //     }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '预约成功!'
    //       });

    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消预约'
    //       });

    //     });
    //   }
    //   else {
    //     this.$message({
    //       type: 'warning',
    //       message: '请选择正确的时间'
    //     });
    //   }
    // }
  },
}
</script>
<style lang="less" scoped>
#stationInfoCard {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 25px;
  height: 220px;

  .el-row {
    margin-bottom: 20px;
  }
}

.el-radio-group {
  width: 100%
}

#numInfoCard {
  overflow-y: auto;
  overflow-x: hidden;
  // margin-bottom: 25px;
  height: 520px;

  .el-row {
    margin-bottom: 17px;
  }
}

.clearfix {
    font-weight: 800;
}
</style>