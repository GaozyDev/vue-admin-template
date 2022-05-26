<template>
  <!--容器-->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'

export default {
  name: '',
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    //配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        //均分
        type: 'category'
      },
      yAxis: {
        //隐藏y轴
        show: false
      },
      //系列
      series: [
        {
          type: 'bar',
          data: [32, 63, 45, 89, 23,52,89,32,45],
        }
      ],
      //调试布局
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      tooltip:{},
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
