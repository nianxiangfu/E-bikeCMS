<template>
  <!-- <el-row :gutter="30">
    <el-col :span="12">
      <div class="grid-content bg-white">
        <el-card class="box-card" id="stationInfoCard" >
          <div slot="header" class="clearfix"><span>充电区域</span></div>
          <el-row :gutter="20" v-for="m in 2">
            <el-col :span="6" v-for="n in 4">
              <div class="grid-content bg-white">
                <el-button @click="selectStation((m-1)*4+n-1)">{{stationList[(m-1)*4+n-1]}}</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" id="numInfoCard" >
          <div slot="header" class="clearfix"><span>{{stationList[displayStation]}}充电桩</span></div>
          <el-row :gutter="20" v-for="m in 10">
            <el-col :span="6" v-for="n in 6">
              <div class="grid-content bg-white"> -->
  <!-- <el-button v-if="getStatus(displayStation,(m-1)*4+n-1)===0" type="info" disabled >{{ (m-1)*4+n }}</el-button> -->
  <!-- <el-button v-if="getStatus(displayStation,(m-1)*6+n-1)===1" @click="bookEvent((m-1)*6+n)">{{ (m-1)*6+n }}</el-button>
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
              <el-radio-button :label="(m - 1) * 4 + n - 1">{{ stationList[(m - 1) * 4 + n - 1] }}</el-radio-button>
            </div>
          </el-col>
        </el-row>
      </el-radio-group>
    </el-card>
    <el-card class="box-card" id="numInfoCard">
      <div slot="header" class="clearfix">
        <span>{{ stationList[selectedArea] }}充电桩</span>
        <!-- <el-button type="success" plain style="float: right; margin-right: 30px;">按时间筛选</el-button> -->
        <span style="float: right; margin-right: 30px;">按时间筛选：
          <el-date-picker v-model="queryTime" type="datetimerange" range-separator="至" start-placeholder="开始时期"
            format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" popper-class="tpc" end-placeholder="结束时期"
            @change="getPileStatus" :disabled="selectedArea === ''">
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
        <el-date-picker v-model="selectedTime" type="datetimerange" range-separator="至" start-placeholder="开始时期"
          format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" popper-class="tpc" end-placeholder="结束时期">
        </el-date-picker>
        <el-button type="primary" plain style="float: right; margin-right: 50px;"
          :disabled="((selectedArea === '') || (selectedPileNum === '') || (selectedTime === ''))" @click="bookEvent">预约</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { stationList } from '@/main'
import { queryPiles, bookPile } from '@/api'
import Cookie from 'js-cookie'
export default {

  data() {
    return {
      queryTime: '',
      selectedTime: '',
      rowNum: 6,
      colNum: 8,
      status: Array(48).fill(1),
      selectedArea: "",
      selectedPileNum: "",
      stationList : stationList
    }
  },
  methods: {
    getPileStatus() {
      var startTime = this.queryTime[0]
      var endTime = this.queryTime[1]
      queryPiles({
        "area": this.selectedArea,
        "startTime": startTime,
        "endTime": endTime,
        "token": Cookie.get("token")
      }).then(({data}) => {
        if(data.info.code === '0'){
          this.stationList = data.data.statusList
          this.$message.success("已根据时间筛选")
        }else{
          this.$message.error("筛选失败，请稍后重试")
        }
      })
      // Vue.set(this.status, 2, 0)
      // this.$forceUpdate();

    },
    bookEvent() {
      var startTime = this.selectedTime[0]
      var endTime = this.selectedTime[1]
      bookPile({
        "area": this.selectedArea,
        "no": this.selectedPileNum,
        "startTime": startTime,
        "endTime": endTime,
        "token": Cookie.get("token")
      }).then(({data}) => {
        if(data.info.code === '0'){
          this.$message.success("预约成功")
        }else{
          this.$message.error("预约失败，请稍后重试")
        }
      })
    },
    
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