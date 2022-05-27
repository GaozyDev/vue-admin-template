<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1653532874051" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3803" width="20" height="20"><path d="M512 96c-229.76 0-416 186.24-416 416s186.24 416 416 416 416-186.24 416-416-186.24-416-416-416zM577.248 665.056c-31.392 47.136-63.328 83.456-117.056 83.456-36.672-5.984-51.744-32.256-43.808-59.04l69.12-228.928c1.696-5.6-1.12-11.584-6.24-13.408-5.088-1.792-15.072 4.832-23.712 14.304l-41.792 50.272c-1.12-8.448-0.128-22.4-0.128-28.032 31.392-47.136 82.976-84.32 117.952-84.32 33.248 3.392 48.992 29.984 43.2 59.2l-69.6 230.048c-0.928 5.184 1.824 10.464 6.528 12.128 5.12 1.792 15.872-4.832 24.544-14.304l41.76-50.24c1.12 8.448-0.768 23.232-0.768 28.864zM567.936 366.048c-26.432 0-47.872-19.264-47.872-47.616s21.44-47.584 47.872-47.584 47.872 19.264 47.872 47.584c0 28.384-21.44 47.616-47.872 47.616z" p-id="3804" fill="#cdcdcd"></path></svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg t="1653534204770" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15886" width="16" height="16"><path d="M536.567 105.568l0.492 0.525 265.885 289.451c15.303 16.66 14.204 42.57-2.456 57.874-16.493 15.15-42.054 14.224-57.412-1.96l-0.462-0.496-193.75-210.923v652.889c0 22.622-18.338 40.96-40.96 40.96s-40.96-18.338-40.96-40.96V238.307L273.277 450.422c-15.1 16.539-40.643 17.858-57.362 3.083l-0.504-0.452c-16.54-15.1-17.859-40.644-3.084-57.363l0.453-0.504 263.864-289.001c16.047-17.576 43.593-17.793 59.922-0.617z" fill="#1afa29" p-id="15887"></path></svg>
      <svg t="1653534113835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9236" width="16" height="16"><path d="M511.654912 57.344c24.096768 0 43.630592 19.533824 43.630592 43.630592V824.6272l216.389632-216.389632c16.869376-16.868352 44.11392-17.037312 61.18912-0.505856l0.515072 0.505856c16.868352 16.868352 17.037312 44.11392 0.505856 61.18912l-0.505856 0.514048L552.79104 950.528c-22.49216 22.49216-58.81856 22.716416-81.586176 0.67584l-0.68608-0.67584L189.93152 669.939712c-17.03936-17.03936-17.03936-44.663808 0-61.703168 16.868352-16.868352 44.112896-17.037312 61.18912-0.505856l0.514048 0.505856 216.388608 216.388608V100.974592c0-24.096768 19.534848-43.630592 43.63264-43.630592z" p-id="9237" fill="#1afa29"></path></svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
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
        type: 'category'
      },
      yAxis: {
        //隐藏y轴
        show: false
      },
      //系列
      series: [
        {
          type: 'line',
          data: [10, 7, 45, 89, 23,52,12,32,45],
          //拐点样式设置
          itemStyle: {
            opacity: 0
          },
          //线条的样式
          lineStyle: {
            color: 'blue'
          },
          //填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'blue' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          //设置平滑的线
          smooth:true
        }
      ],
      //调试布局
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
  .header{
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
  }
  .search-header{
    margin-right: 20px;
  }
  .main-title{
    margin-right: 30px;
  }
  .main{
    margin: 10px 0px;
  }
  .main-content{
    margin-right: 10px;
  }
  .charts{
    width: 100%;
    height: 50px;
  }
</style>
