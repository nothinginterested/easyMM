<template>
    <div id="app" :style="`max-width:550px;height:${height}+'px'`" style="background: #EDEDED">

        <router-view/>
    </div>
</template>

<script lang="js">
  export default {
    data() {
      return {
        height: ''


      }
    },
    created() {
      console.log(window.innerHeight);
      this.height = window.innerHeight * 0.1;
      console.log(this.height);
      window.addEventListener('resize',this.onResize)



    },
    methods: {
      onResize(){
        this.height=window.innerHeight*0.1
      }
    }

  }


</script>

<style lang="scss">
    @import "~@/assets/_var.scss";
    @import "~@/assets/reset.scss";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }


    body {
        font-family: $font-hei;
        color: #333;
        font-size: 16px;
    }


</style>
