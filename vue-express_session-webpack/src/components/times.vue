<template lang="html">
  <div class="">
    {{res}}
    <br>
    <br>
    <router-link :to="{path:'/'}"></router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        res: ''
      }
    },
    //声明周期函数  钩子  组件挂载到页面上去了  可见
    //是发送ajax请求的最佳时机
    mounted() {
      axios.get('users')
        .then(response => {
          this.res = response.data.msg
        })
    }
  }

</script>

<style lang="css">

</style>