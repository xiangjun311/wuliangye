<template>
  <div class="header">
    <van-nav-bar
      :title="title"
      :right-text="rightText"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    rightText: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClickLeft() {
      console.log(12);
      this.goBack();
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onClickRight() {
      console.log(1223,dd);
    //   dd.biz.util.datepicker({
    //     format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
    //     value: "2015-04-17", //默认显示日期
    //     onSuccess: function(result) {
    //       //onSuccess将在点击完成之后回调
    //       /*{
    //         value: "2015-02-10"
    //     }
    //     */
    //     },
    //     onFail: function(err) {}
    //   });
    }
  }
};
</script>
<style scoped>
.van-nav-bar {
  background-color: #f13d3d;
  height: 42px;
  line-height: 42px;
}

.van-nav-bar__title,
.van-nav-bar__left .van-icon,
.van-nav-bar__text {
  color: #ffffff;
}
</style>