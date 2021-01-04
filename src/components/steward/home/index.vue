<style lang='less'>
.app-home-vue {
  .home-part-body {
    height: 350px;
    .echarts-vue {
      height: 350px;
    }
  }

  .home-part-body2 {
    height: 420px;
    .echarts-vue {
      height: 420px;
    }
  }

  .progress-div {
    >p {
      padding: 8px 0;
    }
    .h-progress {
      &-title {
        color: @dark2-color;
        font-size: 15px;
      }
      &-text {
        width: 40px;
      }
    }
  }
}
</style>
<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='24' :lg='16' :xl='16'>
        <!--<div class="h-panel">
          <div class="relative">
            <Tabs class="common-panel-tabs" v-model="type" :datas="{type1: '数据走势', type2: '数据分布'}"></Tabs>
            <div class="middle-right" style="right: 25px;"><span class="text-hover" @click="openMore">查看更多</span></div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1" v-if="type=='type1'" key="type1"></Chart>
            <Chart :options="data3" v-if="type=='type2'" key="type2"></Chart>
          </div>
        </div>-->
        <commonNetTag></commonNetTag>
      </Cell>
      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <recentAccount></recentAccount>
      </Cell>
      <Cell :xs='24' :sm='24' :md='24' :lg='16' :xl='16'>
        <recentNote></recentNote>
      </Cell>

      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <hot-article></hot-article>
      </Cell>
    </Row>
  </div>
</template>
<script>
import data1 from '../../../components/demo-components/components/datas/data1';
import data2 from '../../../components/demo-components/components/datas/data2';
import data3 from '../../../components/demo-components/components/datas/data4';
import commonNetTag from "./components/commonNetTag";
import recentAccount from "./components/recentAccount";
import recentNote from "./components/recentNote";
import hotArticle from "./components/hotArticle";

export default {
  data() {
    return {
      data1,
      data2,
      data3,
      type: 'type1'
    };
  },
  components:{
    commonNetTag:commonNetTag,
    recentAccount:recentAccount,
    recentNote:recentNote,
    hotArticle:hotArticle
  },
  methods: {
    openMore() {
      this.$router.push({ name: 'Chart' });
    }
  }
};
</script>
