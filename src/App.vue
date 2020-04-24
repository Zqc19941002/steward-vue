<template>
  <div id="app">
    <router-view/>
  </div>

</template>
<!--<script>-->
<!--  export default {-->
<!--    methods:{-->
<!--      parseUrl(url){-->
<!--        var params = {};-->
<!--        var urls = url.split("?");-->
<!--        if (urls.length > 1) {-->
<!--          var arr = urls[1].split("&");-->
<!--          for (var i = 0; i < arr.length; i++) {-->
<!--            var a = arr[i].split("=");-->
<!--            if (a.length > 1) {-->
<!--              if (a[1].indexOf("#/") != -1) {-->
<!--                a[1] = a[1].replace("#/","");-->
<!--              }-->
<!--            } else {-->
<!--              a[1] = "";-->
<!--            }-->
<!--            params[a[0]] = a[1];-->
<!--          }-->
<!--          return params;-->
<!--        } else {-->
<!--          return null;-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    mounted(){-->
<!--      let url = location.href;-->
<!--      let params = this.parseUrl(url);-->
<!--      if (params===undefined||params===''||params===null){-->
<!--        this.$router.push("index");-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
