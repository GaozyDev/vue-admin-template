<template>
  <div>
    <card></card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Observe from "@/views/dashboard/Observe/observe";
import Sale from "@/views/dashboard/sale/sale";
import Card from "@/views/dashboard/Card/card";
export default {
  name: '',
  components:{
    Card,
    Sale,
    Observe
  },
  mounted() {
    this.$store.dispatch('getData')
  }
}
</script>

<style scoped>

</style>
