<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!--第一个card-->
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67%<svg t="1653534204770" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15886" width="16" height="16"><path d="M536.567 105.568l0.492 0.525 265.885 289.451c15.303 16.66 14.204 42.57-2.456 57.874-16.493 15.15-42.054 14.224-57.412-1.96l-0.462-0.496-193.75-210.923v652.889c0 22.622-18.338 40.96-40.96 40.96s-40.96-18.338-40.96-40.96V238.307L273.277 450.422c-15.1 16.539-40.643 17.858-57.362 3.083l-0.504-0.452c-16.54-15.1-17.859-40.644-3.084-57.363l0.453-0.504 263.864-289.001c16.047-17.576 43.593-17.793 59.922-0.617z" fill="#1afa29" p-id="15887"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96%<svg t="1653534113835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9236" width="16" height="16"><path d="M511.654912 57.344c24.096768 0 43.630592 19.533824 43.630592 43.630592V824.6272l216.389632-216.389632c16.869376-16.868352 44.11392-17.037312 61.18912-0.505856l0.515072 0.505856c16.868352 16.868352 17.037312 44.11392 0.505856 61.18912l-0.505856 0.514048L552.79104 950.528c-22.49216 22.49216-58.81856 22.716416-81.586176 0.67584l-0.68608-0.67584L189.93152 669.939712c-17.03936-17.03936-17.03936-44.663808 0-61.703168 16.868352-16.868352 44.112896-17.037312 61.18912-0.505856l0.514048 0.505856 216.388608 216.388608V100.974592c0-24.096768 19.534848-43.630592 43.63264-43.630592z" p-id="9237" fill="#1afa29"></path></svg></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!--第二个card-->
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!--第三个card-->
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barChart></barChart>
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!--第四个card-->
          <Detail title="运营活动效果" count="78%">
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;56.67%<svg t="1653534204770" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15886" width="16" height="16"><path d="M536.567 105.568l0.492 0.525 265.885 289.451c15.303 16.66 14.204 42.57-2.456 57.874-16.493 15.15-42.054 14.224-57.412-1.96l-0.462-0.496-193.75-210.923v652.889c0 22.622-18.338 40.96-40.96 40.96s-40.96-18.338-40.96-40.96V238.307L273.277 450.422c-15.1 16.539-40.643 17.858-57.362 3.083l-0.504-0.452c-16.54-15.1-17.859-40.644-3.084-57.363l0.453-0.504 263.864-289.001c16.047-17.576 43.593-17.793 59.922-0.617z" fill="#1afa29" p-id="15887"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96%<svg t="1653534113835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9236" width="16" height="16"><path d="M511.654912 57.344c24.096768 0 43.630592 19.533824 43.630592 43.630592V824.6272l216.389632-216.389632c16.869376-16.868352 44.11392-17.037312 61.18912-0.505856l0.515072 0.505856c16.868352 16.868352 17.037312 44.11392 0.505856 61.18912l-0.505856 0.514048L552.79104 950.528c-22.49216 22.49216-58.81856 22.716416-81.586176 0.67584l-0.68608-0.67584L189.93152 669.939712c-17.03936-17.03936-17.03936-44.663808 0-61.703168 16.868352-16.868352 44.112896-17.037312 61.18912-0.505856l0.514048 0.505856 216.388608 216.388608V100.974592c0-24.096768 19.534848-43.630592 43.63264-43.630592z" p-id="9237" fill="#1afa29"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import barChart from "@/views/dashboard/Card/barChart/barChart";
import lineChart from "@/views/dashboard/Card/lineChart/lineChart";
import Detail from "@/views/dashboard/Card/Detail/detail";
export default {
  name: 'Card',
  components:{
    Detail,
    lineChart,
    barChart
  }
}
</script>

<style scoped>

</style>
