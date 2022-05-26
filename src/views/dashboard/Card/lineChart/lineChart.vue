<template>
  <!--容器-->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import echarts from 'echarts'
export default {
  name: 'lineChart',
  mounted() {
    //初始化echarts实例
    let lineChart = echarts.init(this.$refs.charts)
    //配置数据
    lineChart.setOption({
      xAxis:{},
      yAxis:{},
      //系列
      series:[
        {
          type:'line',
          data:[10,7,45,89,23]
        }
      ]
    })
  }
}
</script>

<style scoped>
  .charts{
    width: 100%;
    height: 100%;
  }
</style>
