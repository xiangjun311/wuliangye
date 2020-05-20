<!-- 经销商列表 -->
<template>
  <div style="margin-top: 64px;padding: 0 8px;height: 100%;">
    <!-- <Header title="经销商列表"></Header> -->
    <form action="/" class="search_form">
      <van-search v-model="value" placeholder="搜索" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :immediate-check="true"
        offset="50"
      >
        <van-cell
          v-for="(item,index) in dealersList"
          style="flex-direction: column;"
          :key="index"
          :title="item.orderCustomerName"
          @click="goDetail(item)"
        >
          <!-- <div>姓名：{{item.name}}</div> -->
          <!-- <div>姓名：{{item.userName}}</div> -->
          <!-- <div>经销商编码：{{item.distributorId}}</div> -->
          <!-- <div>经销商手机号：{{item.phone}}</div> -->
          <div>经销商编码：{{item.orderCustomerCode}}</div>
          <!-- <div>经销商手机号：{{item.phone}}</div> -->
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: "dealersList",
  data() {
    return {
      value: "",
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      dealersList: [],
      index: 0,
      params: {
        code: "00715FY44",
        data: {
          name: "",
          phone: "",
          khname:'',
          pagesize: 20,
          pageindex: 0
        }
      }
    };
  },
  created() {
    this.$ddapi.setTitle("经销商列表");
    this.$ddapi.navigationSetRight("", false, false);
    // if (process.env.NODE_ENV === 'development') { //||sessionStorage.getItem("username")=="向俊"
    //   console.log('本地测试');
    //   // this.params.data.phone = "13608293629"
    //   // this.params.data.name = "刘力"
    // }else{
    //   console.log("正式环境");
    //   this.params.data.phone = sessionStorage.getItem("userphone").slice(4);
    //   this.params.data.name = sessionStorage.getItem("username");
    // }
    this.phone = sessionStorage.getItem("userphone")
     if (!this.phone) {
      this.$toast('没有获取到电话号码，请联系后台处理！')
    }
    console.log(this.phone.substring(this.phone.length-11,this.phone.length));
    let plm = this.phone.substring(this.phone.length-11,this.phone.length)
    this.params.data.phone = plm;
    this.params.data.name = sessionStorage.getItem("username");
  },
  methods: {
    getList() {
      console.log(this.params);
      this.$ddapi.showLoading("加载中");
      this.$Axios
        .post("/api/ddadapter/openApi/data/", this.params)
        .then(res => {
          // 加载状态结束
          this.$ddapi.hidePreloader();

          this.loading = false;
          let result = res.data.data;
          if (result.success) {
            if (this.refreshing) {
              //下拉刷新重置
              this.dealersList = [];
              this.refreshing = false;
            }
            result.result.receiveItem.map(item => {
              this.dealersList.push(item);
            });
            console.log(result.result.receiveItem);

            // this.dealersList = this.$uniqueArray(this.dealersList,'distributorId') //去重
            console.log(this.dealersList);

            // 数据全部加载完成
            if (this.dealersList.length >= result.result.pagenum) {
            // if (!result.result.receiveItem.length) {
              //等于数据总条数total
              this.finished = true;
            }
          } else {
            this.$toast(result.errorMsg);
            this.dealersList = [];
            this.finished = true;
            this.isError = true;
            this.error = true;
          }
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          this.$ddapi.hidePreloader();
          this.error = true;
          this.isError = true;
        });
    },

    onSearch(val) {
      // this.$toast("暂未开放查询功能");
      // return

      this.dealersList = [];
      this.params.data.khname = val;
      this.getList();
    },
    onCancel() {
      this.$toast("取消");
    },
    onLoad() {
      // 异步更新数据
      if (this.isError) {
        this.params.data.pageindex = 1;
      } else {
        this.params.data.pageindex++;
      }
      this.getList();
    },
    onRefresh() {
      // 清空列表数据刷新
      this.params.data.pageindex = 1;

      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.getList();
    },
    goDetail(item) {
      //点击列表进入详情
      console.log(item, "公司");
      this.$router.push({
        path: "/dealersDetail",
        query: {
          // distributorId: item.distributorId,
          // distributorName: item.distributorName
          distributorId: item.orderCustomerCode,
          distributorName: item.orderCustomerName
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.search_form {
  width: 100%;
  position: fixed;
  height: 56px;
  top: 0px;
  z-index: 99;
  left: 0;
}

.van-search {
  height: 56px;
}

.van-search__content {
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
}

.list .van-cell {
  /* width: 359px; */
  // height: 110px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  margin: 8px 0;
  padding: 17px 16px;
  flex-direction: column;
  align-items: flex-start;

  .van-cell__title {
    font-weight: 900;
    font-size: 15px;
    flex: none;
    color: #333333;
  }

  .van-cell__value {
    text-align: left;
    font-size: 13px;
    color: #999999;
    line-height: 18px;
  }
}
</style>