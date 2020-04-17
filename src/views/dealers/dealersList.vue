<!-- 经销商列表 -->
<template>
  <div style="margin-top: 64px;padding: 0 8px;height: 100%;">
    <!-- <Header title="经销商列表"></Header> -->
    <form action="/" class="search_form">
      <van-search v-model="value" placeholder="搜索" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
			  offset="50"

    >
      <van-cell
        v-for="(item,index) in dealersList"
        :key="index"
        :title="item.distributorName"
        @click="goDetail(item)"
      >
        <div>姓名：{{item.name}}</div>
        <div>经销商编码：{{item.distributorId}}</div>
        <div>经销商手机号：{{item.phone}}</div>
      </van-cell>
    </van-list>
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
      error: false,
      dealersList: [],
      index: 0,
      res: {
        code: 0,
        data: [
          {
            compName: "宜宾市辉煌贸易有限公司",
            name: "张三",
            code: 1,
            phone: "13900000000"
          },
          {
            compName: "宜宾市辉煌贸易有限公司",
            name: "张三",
            code: 2,
            phone: "13900000000"
          },
          {
            compName: "宜宾市辉煌贸易有限公司",
            name: "张三",
            code: 3,
            phone: "13900000000"
          }
        ],
        msg: ""
      },
      params: {
        code: "00715FY34", //00715FY34
        data: {
          distributorId: "",
          distributorName: "",
          name: "",
          pageNum: 0,
          pageSize: 15,
          phone: "",
          userId: "",
          userName: ""
        },
        // data: {
        //   distributerId: "4000007200", //经销商编码
        //   from: "2017-01-01", //开始时间
        //   to: "2022-04-01", //结束时间
        //   channelId: "S", //渠道名称
        //   productId: "4000000789", //产品ID
        //   pagination: {
        //     pageSize: 15, //每页多少条
        //     currentPage: 0 //当前多少页
        //   }
        // }
      }
    };
  },
  created() {
    this.$ddapi.setTitle("经销商列表");
    this.$ddapi.navigationSetRight("", false, false);
	  this.params.data.userId = sessionStorage.getItem('userid')
    
  },
  methods: {
    getList() {
    //   this.params.data.pagination.currentPage++;
      this.params.data.pageNum++;
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
            result.result.list.map(item => {
              this.dealersList.push(item);
            });
            // 数据全部加载完成
            if (this.dealersList.length >= result.result.total) {
              //等于数据总条数total
              this.finished = true;
            }
          } else {
            this.$toast(result.errorMsg);
            this.dealersList = []
          }

          //   if (result.success) {
          //     result.result.detail.map(item => {
          //       this.dealersList.push(item);
          //     });
          //     if (
          //       this.dealersList.length >=
          //       result.result.pagination.totalNumberOfResults
          //     ) {
          //       this.finished = true;
          //     }
          //     console.log(this.dealersList);
          //   } else {
          //     this.$toast(result.errorMsg);
          //   }
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          this.$ddapi.hidePreloader();
          this.error = true;
        });
    },

    onSearch(val) {
      // this.$toast(val);
      this.dealersList = []
      this.params.data.name = val;
      this.getList();
    },
    onCancel() {
      this.$toast("取消");
    },
    onLoad() {
      // 异步更新数据
      this.getList();
    },
    goDetail(item) {
      //点击列表进入详情
      console.log(item, "公司");
      this.$router.push({
        path: "/dealersDetail",
        query: {
          distributorId: item.distributorId,
          distributorName: item.distributorName
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
  height: 110px;
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