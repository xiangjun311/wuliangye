<template>
  <div class="collapse" :style="{height:!isUnfold?'133px':'initial'}">
    <!-- <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
  <van-cell > -->
    <div class="top">
      <slot name="contentTop"></slot>
      <slot name="contentBottom" v-if="isUnfold"></slot>
      <slot name="more" v-if="isUnfold"></slot>
    </div>
    <div class="unfold" @click="unfold(slotscope)">
      <span>{{!isUnfold?'展开明细':'收起明细'}}</span>
      <van-icon :name="!isUnfold?'arrow-down':'arrow-up'" />
    </div>
  <!-- </van-cell> -->
<!-- </van-list> -->
    
  </div>
</template>
<script>
export default {
  name: "Collapse",
  data() {
    return {
      loading:false,
      finished:false,
      collapseHeight: "133px",
      isUnfold: false
    };
  },
  props: {
    isunfold: {
      type: Boolean,
      default: false
    },
    slotscope: {
      type: Object,
      default: null
    }
  },
  watch: {
    isunfold(a, b) {
      // this.isUnfold = this.isunfold
      // console.log(this.isUnfold,a,b)
    }
  },
  created() {
    // console.log(this.slotscope);
  },
  methods: {
    unfold(slot) {
      this.isUnfold = !this.isUnfold;
      // console.log(this.isUnfold,slot);
      this.$emit('unfold',slot,this.isUnfold)
    },
    onLoad(){
      this.$emit('onLoad')
    }
  }
};
</script>
<style lang="less" scoped>
.collapse {
  background-color: #ffffff;
  // height: 133px;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  .top {
    // height: 88px;
    flex: 1;
  }
  .unfold {
    height: 45px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 13px;
      color: #333333;
    }
    i {
      color: #b2b2b2;
    }
  }
  .van-list{
    height: 100%;
  }
  .van-cell{
    padding: 0;
  }
}
</style>