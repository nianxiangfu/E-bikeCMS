<template>
  <el-row :gutter="30">
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
          <el-row :gutter="20" v-for="m in 5">
            <el-col :span="6" v-for="n in 4">
              <div class="grid-content bg-white">
                <el-button v-if="getStatus(displayStation,(m-1)*4+n-1)===0" type="info" disabled >{{ (m-1)*4+n }}</el-button>
                <el-button v-if="getStatus(displayStation,(m-1)*4+n-1)===1" @click="book((m-1)*4+n)">{{ (m-1)*4+n }}</el-button>
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
  </el-row>
</template>

<script>
export default {

  data() {
    return {
      date: '',
      startTime:'',
      endTime:'',
      displayStation:0,
      selectedNum:0,
      stations:["湖滨","桂园","枫十四","信部竹园","经管院","医学部","枫五","工三"],
      status:[],
      allowCommit:false
    }

  },
  methods:{
    selectStation(station){
      this.displayStation=station;
    },
    getStatus(station,num){
      return this.status[station][num]
    },
    async book(num){
      this.selectedNum=num
      this.allowCommit=true
    },
    checkTime(){
      if(this.startTime===""||this.endTime===""){
        return false;
      }
      console.log(this.startTime);
      console.log(this.endTime);
      return true;
    },
    async confirmBook() {
      if(this.checkTime()){
        this.$confirm('确定预约吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              this.status[this.displayStation][this.selectedNum] = 0
              console.log(this.status)
              await fetch('api/status', {
                method: "put",
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(this.status),
              });
              await this.$router.push({path: "/userinfo"});
              done();
            } else {
              done();
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '预约成功!'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消预约'
          });

        });
      }
      else{
        this.$message({
          type: 'warning',
          message: '请选择正确的时间'
        });
      }
    }
  },
  async created(){
    const res=await fetch('api/status');
    const data=await res.json();
    this.status=data;
    // console.log(this.status)
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
#stationInfoCard {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 25px;
  height: 220px;
}
#numInfoCard {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 25px;
  height: 420px;
}
#timeInfoCard {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 25px;
  height: 220px;
}
</style>