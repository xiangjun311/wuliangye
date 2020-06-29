<template>
  <div style="height: 100%;" class="dealersDetail">
    <!-- <Header title="经销商详情" rightText="筛选"></Header> -->
    <div class="detailTop" :style="{height:isUp?'140px':'83px'}">
      <div class="comp fontWeight color_3 fontSize_15">{{distributorName}}</div>
      <div class="storageRecord">
        <div class="cell">
          <div class="fontSize_18 color_3">{{storageRecord.startingInventoryNum}}</div>
          <div class="fontSize_13 color_9">期初库存</div>
        </div>
        <div class="cell">
          <div class="fontSize_18 color_3">{{storageRecord.endingInventoryNum}}</div>
          <div class="fontSize_13 color_9">库存量</div>
        </div>
        <div class="cell">
          <div class="fontSize_18 color_3">{{storageRecord.inventoryDifferenceNum}}</div>
          <div class="fontSize_13 color_9">盘点差异量</div>
        </div>
        <div class="cell">
          <div class="fontSize_18 color_3">{{storageRecord.inboundNum}}</div>
          <div class="fontSize_13 color_9">入库量</div>
        </div>
        <div class="cell">
          <div class="fontSize_18 color_3">{{storageRecord.outboundNum}}</div>
          <div class="fontSize_13 color_9">出库量</div>
        </div>
        <!-- <div class="cell">
          <div class="fontSize_18 color_3">{{storageRecord.inventory}}</div>
          <div class="fontSize_13 color_9">
            实时库存量
            <van-icon name="info" size="10" @click="infoClick" />
          </div>
        </div> -->
      </div>
    </div>
    <div class="topUp color_9 fontSize_10" @click="isUp=!isUp"><van-icon :name="isUp?'arrow-up':'arrow-down'" />{{!isUp?'展开':'收起'}}</div>

    <van-tabs v-model="active" animated color="#F13D3D" @click="tabsClick" :style="{height:!isUp?'calc(100% - 26px)':'calc(100% - 83px)'}">
      <van-tab title="计划执行">
        <div class="panelBtn" style="background: #ffffff;margin:0 0 8px 0;padding:0">
          <div
            class="orderButton color_3"
            style="border-right:1px solid #E5E5E5"
            @click="pickerYear"
          >
            {{currentYear}}
            <van-icon name="arrow-down" />
          </div>
          <div class="orderButton color_3" @click="categoryClick">
            {{category}}
            <van-icon name="arrow-down" />
          </div>
        </div>
        <div class="panelContent" style="height: calc(100% - 52px)">
          <Table :tableHead="tableHead" :data="tableData"></Table>
          <div
            class="none_dataImg flex_column_center"
            v-if="!tableData.length"
            style="height: calc(100% - 44px);margin:0"
          >
            <img style="width:188px;height:100px" src="../../assets/img/none_data@2x.png" alt />
            <span style="color:#b2b2b2;font-size:15px;line-height:31px;">暂无报表~</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="订单执行">
        <div class="panelBtn" style="background: #ffffff;margin:0;padding:0">
          <div
            class="orderButton color_3"
            @click="orderClick('type')"
            style="border-right:1px solid #E5E5E5"
          >
            <span>{{orderType}}</span>
            <van-icon name="arrow-down" />
          </div>
          <div class="orderButton color_3" @click="orderClick('status')">
            <span>{{orderStatus}}</span>
            <van-icon name="arrow-down" />
          </div>
        </div>

        <div class="panelContent">
          <div class="none_dataImg flex_column_center" v-if="!OrderFulfillment.length">
            <img style="width:188px;height:100px" src="../../assets/img/none_data@2x.png" alt />
            <span style="color:#b2b2b2;font-size:15px;line-height:31px;">暂无报表~</span>
          </div>
          <div class="collapseList" v-else>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finishedOrder"
                finished-text="没有更多了"
                @load="onLoadTerminal('00715FY35')"
                :immediate-check="false"
                offset="50"
              >
                <van-cell v-for="(item,index) in OrderFulfillment" :key="index">
                  <Collapse :key="index">
                    <div slot="contentTop">
                      <div class="title">
                        <span class="detailCell">
                          <span class="fontSize_15 fontWeight color_3">订单号：{{item.orderid}}</span>
                          <span class="fontSize_15 fontWeight color_red">{{item.orderstatus}}</span>
                        </span>
                        <span class="fontSize_13 color_9">订单类型：{{item.ordertype}}</span>
                        <span class="fontSize_13 color_9">订单时间：{{item.orderdate}}</span>
                      </div>
                    </div>
                    <div class="detail" slot="contentBottom">
                      <div
                        class="detailCell"
                        style="height:34px"
                        v-for="(product,idx) in item.item"
                        :key="idx"
                      >
                        <span class="fontSize_13 color_3">产品：{{product.productdescription}}</span>
                        <span class="fontSize_13 color_3">数量：{{product.quantity}}</span>
                      </div>
                    </div>
                  </Collapse>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-tab>
      <van-tab title="出库明细">
        <div class="paneInput">
          <van-search v-model="PlaceName" label="渠道名称" @search="onSearchChannel" placeholder="请输入" />
        </div>
        <div class="panelContent">
          <div class="none_dataImg flex_column_center" v-if="!PlaceList.length">
            <img style="width:188px;height:100px" src="../../assets/img/none_data@2x.png" alt />
            <span style="color:#b2b2b2;font-size:15px;line-height:31px;">暂无报表~</span>
          </div>
          <div class="collapseList" v-else>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finishedPlace"
                finished-text="没有更多了"
                :immediate-check="false"
                offset="50"
              >
                <van-cell v-for="(item,index) in PlaceList" :key="index">
                  <Collapse :isunfold="isUnfold" :slotscope="item" @unfold="unfoldDetail">
                    <div slot="contentTop">
                      <div class="title">
                        <span class="detailCell">
                          <span class="fontSize_15 fontWeight color_3">渠道：{{item.channelId}}</span>
                        </span>
                        <span class="fontSize_13 color_9">产品：{{item.inbound}}</span>
                        <span class="fontSize_13 color_9">合规：{{item.inboundViolation}}</span>
                        <span class="fontSize_13 color_9">地址：{{item.address}}</span>
                      </div>
                    </div>
                    <div
                      class="detail"
                      slot="contentBottom"
                      v-for="(product,idx) in channel[item.channelId]"
                      :key="idx"
                    >
                      <div class="flex_column" style="height:85px;padding: 12px 0;">
                        <span class="fontSize_13 detailCell">
                          <span class="color_3">物流码：{{product.barcode}}</span>
                        </span>
                        <span class="fontSize_13 color_9">{{product.exceptions}}</span>
                        <span class="fontSize_13 color_9">扫码时间：{{product.scanTime}}</span>
                      </div>
                    </div>
                    <div
                      slot="more"
                      style="background:#F0F1F3;text-algin:center;"
                      @click="moreClick('00715FY38')"
                    >点击更多...</div>
                  </Collapse>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-tab>
      <van-tab title="下游明细">
        <div class="paneInput">
          <van-search
            v-model="TerminalName"
            label="终端名称"
            @search="onSearchTerminalName"
            placeholder="请输入"
          />
        </div>
        <div class="panelContent">
          <div class="none_dataImg flex_column_center" v-if="!downstreamList.length">
            <img style="width:188px;height:100px" src="../../assets/img/none_data@2x.png" alt />
            <span style="color:#b2b2b2;font-size:15px;line-height:31px;">暂无报表~</span>
          </div>
          <div class="collapseList" v-else>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                @load="onLoadTerminal('00715FY39')"
                :finished="finishedTerminal"
                finished-text="没有更多了"
                :immediate-check="false"
                offset="50"
              >
                <van-cell v-for="(item,index) in downstreamList" :key="index">
                  <Collapse :slotscope="item" @unfold="unfoldDetail01" :isunfold="isUnfold">
                    <div slot="contentTop">
                      <div class="title">
                        <span class="detailCell">
                          <span class="fontSize_15 fontWeight color_3">终端：{{item.terminalName}}</span>
                        </span>
                        <span class="fontSize_13 color_9">正常：{{item.inbound}}</span>
                        <span class="fontSize_13 color_9">违规：{{item.inboundViolation}}</span>
                      </div>
                    </div>
                    <div
                      class="detail"
                      slot="contentBottom"
                      v-for="(product,idx) in terminal[item.terminalId]"
                      :key="idx"
                    >
                      <div class="flex_column" style="height:85px;padding: 12px 0;">
                        <span class="fontSize_13 detailCell">
                          <span class="color_3">物流码：{{product.barcode}}</span>
                        </span>
                        <span class="fontSize_13 color_9">{{product.exceptions}}</span>

                        <span class="fontSize_13 color_9">扫码时间：{{product.scanTime}}</span>
                      </div>
                    </div>
                    <div
                      slot="more"
                      style="background:#F0F1F3;text-algin:center;"
                      @click="moreClick('00715FY40')"
                    >点击更多...</div>
                  </Collapse>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 遮罩 -->

    <van-popup v-model="showOverlay" position="right" :style="{ height: '100%' }">
      <van-cell-group>
        <div class="color_9 fontSize_15" style="padding:16px">时间区间</div>
        <van-cell title="开始时间" :value="paramsData.from" is-link @click="showStartEndDate(0)" />
        <van-cell title="结束时间" :value="paramsData.to" is-link @click="showStartEndDate(1)" />
        <van-cell title="产品选择" :value="paramsData.productName" is-link @click="showProduct=true" />
      </van-cell-group>
      <div
        class="flex_center"
        style="width:100%;position:absolute;bottom:0;border-top:1px solid #F13D3D"
      >
        <van-button style="width:50%;border:0;" @click="reset">重置</van-button>
        <van-button style="width:50%" type="danger" @click="screenSearch">确定</van-button>
      </div>
    </van-popup>
    <!-- 日历面板 -->
    <van-calendar
      v-model="showDate"
      @confirm="onConfirmDate"
      :max-date="maxDate"
      :min-date="minDate"
      :default-date="currentDate"
    />
    <!-- 选择年度 -->
    <van-action-sheet v-model="showYear" :round="false">
      <div class="content">
        <van-picker
          show-toolbar
          :columns="columnsYear"
          @cancel="showYear=false"
          @confirm="onConfirmYear"
        />
      </div>
    </van-action-sheet>
    <!-- 选择品类 -->
    <van-action-sheet v-model="showCategory" :round="false">
      <div class="content">
        <van-picker
          show-toolbar
          :columns="columnsCategory"
          @cancel="showCategory=false"
          @confirm="onConfirmCategory"
        />
      </div>
    </van-action-sheet>
    <!-- 选择产品 -->
    <van-action-sheet v-model="showProduct" :round="false">
      <div class="content">
        <van-picker
          show-toolbar
          :columns="columnsProduct"
          @cancel="showProduct=false"
          @confirm="onConfirmProduct"
          :default-index="defaultIndex" 
        />
      </div>
    </van-action-sheet>
    <!-- 选择订单类型和状态 -->
    <van-action-sheet v-model="showOrder" :round="false">
      <div class="content">
        <van-picker
          show-toolbar
          :columns="columnsOrder"
          @cancel="showOrder=false"
          @confirm="onConfirmOrder"
        />
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
var currDate = new Date();
var currYear = currDate.getFullYear();
var yearArr = [];
for (let index = 1990; index <= currYear; currYear--) {
  yearArr.push(currYear);
}

export default {
  name: "dealersDetail",
  data() {
    return {
      distributerId: "", //经销商ID
      distributorName: "",
      code: "00715FY36",
      showOverlay: false, //遮罩
      showDate: false,
      showYear: false, //选择年
      showCategory: false, //选择品类
      showProduct: false, //选择产品
      showOrder: false,
      columnsYear: yearArr,
      columnsCategory: [
        //品类列表来源后台
        // { text: "品类0", id: "0" },
      ],
      columnsProduct: [],
      defaultIndex:null,//默认选中产品的下标
      columnsOrder: [],
      columnsOrderType: [
        //写死数据
        { text: "配额酒销售订单", id: "ZS01" },
        { text: "非配额销售订单", id: "ZS02" },
        { text: "批条酒销售订单", id: "ZS03" }
      ],
      columnsOrderStatus: [
        //写死数据
        { text: "新建", id: "E0001" },
        { text: "已保存，待提交", id: "E0002" },
        { text: "已提交，待审核", id: "E0003" },
        { text: "审核通过", id: "E0004" },
        { text: "审核拒绝", id: "E0005" },
        { text: "已取消", id: "E0006" }
      ],
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      storageRecord: {
        inventoryDifferenceNum: "--",//差异
        inboundNum: "--",
        outboundNum: "--",
        startingInventoryNum:"--", //期初
        endingInventoryNum: "--" //期末
      },
      active: 0, //tabs
      activeNames: [1], //展开面板
      PlaceName: "", //输入渠道名称
      TerminalName: "", //输入终端名称
      tableHead: [
        { lable: "月份", prop: "monat", width: 80 },
        { lable: "计划量", prop: "planquantity", width: 80 },
        { lable: "执行量", prop: "execquantity", width: 80 }
      ],
      tableData:[],
      OrderFulfillment: [], //订单执行
      loading: false,
      refreshing: false,
      PlaceList: [], //出库明细
      PlaceListDetail: [],
      channel: {}, //渠道扫码
      error: false,
      finishedOrder: false, //订单全部加载完
      downstreamList: [], //下游明细
      finishedTerminal: false, //下游全部加载完
      finishedPlace: false, //出库明细全部加载完
      downstreamListDetail: [], //下游明细
      terminal: {}, //下游扫码
      currentYear: this.$moment(new Date()).format("YYYY"),
      category: "品类", //品类
      orderType: "订单类型",
      orderStatus: "订单状态",
      isUnfold: false,
      paramsData: {
        distributerid: "",
        distributerId: "",
        productId: "",
        productName: "",
        year: "",
        from: "2019-11-26",
        to: this.$moment(new Date()).format("YYYY-MM-DD"),
        pagination: {
          pageSize: 20, //每页多少条
          //   pageNumber: 1,
          currentPage: 0 //当前多少页
        },
        page: 1, //订单执行的分页
        pagesize: 20
      },
      detailPage: {
        //扫码明细分页
        page: 0,
        currentPage: 1
      },
      isUp: false //是否展开库存信息
    };
  },
  created() {
    console.log(this.$route.query);
    this.distributerId = this.$route.query.distributorId;
    this.distributorName = this.$route.query.distributorName;
    this.paramsData.year = this.currentYear;
    this.paramsData.distributerid = this.distributerId;
    this.paramsData.distributerId = this.distributerId;
    this.orderType = this.columnsOrderType[0].text;
    this.orderStatus = this.columnsOrderStatus[3].text;
    let params41 = {
      code: "00715FY41",
      data: {}
    };
    let params36 = {
      code: "00715FY36",
      data: {
        distributerid: this.distributerId,
        year: this.currentYear
      }
    };
    let params45 = {
      code: "00715FY45",
      data: {
        type: 1
      }
    };
    this.$ddapi.showLoading("加载中");
    this.getDetail(params36); //计划执行
    this.getDetail(params41); //产品分类列表成功后查询出入库等信息
    // this.getDetail(params45);//品类列表
  },
  mounted() {
    let that = this;
    this.$ddapi.setTitle("经销商详情");
    dd.biz.navigation.setRight({
      show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
      control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
      text: "筛选", //控制显示文本，空字符串表示显示默认文本
      onSuccess: result => {
        //如果control为true，则onSuccess将在发生按钮点击事件被回调
        that.showOverlay = true;
      },
      onFail: function(err) {}
    });
  },

  methods: {
    infoClick() {
      //实时库存说明
      this.$toast("此库存量为实时库存量");
    },
    reset() {
      //重置
      this.paramsData.from = "2019-11-26";
      this.paramsData.to = this.$moment(new Date()).format("YYYY-MM-DD");
      this.paramsData.productId = this.columnsProduct[this.columnsProduct.length-1].id;
      this.paramsData.productName = this.columnsProduct[this.columnsProduct.length-1].name;
      this.defaultIndex = this.columnsProduct.length-1
    },
    screenSearch() {
      //筛选查询
      this.$ddapi.showLoading("加载中");
      console.log(this.paramsData, "筛选");
      this.paramsData.begdate = this.$moment(this.paramsData.from).format(
        "YYYYMMDD"
      );
      this.paramsData.enddate = this.$moment(this.paramsData.to).format(
        "YYYYMMDD"
      );
      let params = {
        code: this.code,
        data: this.paramsData
      };
      this.getDetail(params);
      let params47 = {
        //博智出入库等信息
        code: "00715FY47",
        data: {
          orderDistributorId: this.distributerId,
          productId: this.paramsData.productId,
          startTime: this.paramsData.from+' 00:00:00',
          endTime: this.paramsData.to+' 23:59:59'
        }
      };
      this.getDetail(params47); //库存等信息
      this.showOverlay = false;
    },
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.show = false;
      if (!this.type) {
        this.paramsData.from = this.formatDate(date);
      } else {
        this.paramsData.to = this.formatDate(date);
      }
      this.showDate = false;
    },
    showStartEndDate(type) {
      this.showDate = true;
      this.type = type;
    },
    pickerYear() {
      this.showYear = true;
    },
    categoryClick() {
      //选择品类
      this.$toast("暂未开放");
      return;
      this.showCategory = true;
    },
    onConfirmYear(value, index) {
      //确定年度
      //   this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.currentYear = value;
      this.showYear = false;
      let params36 = {
        code: this.code,
        data: {
          distributerid: this.distributerId,
          year: value,
          category: this.categoryId //品类
        }
      };
      this.getDetail(params36);
    },
    onConfirmCategory(value, index) {
      //确定品类
      this.categoryId = value.id;
      this.category = value.text;
      this.showCategory = false;
      let params36 = {
        code: this.code,
        data: {
          distributerid: this.distributerId,
          year: this.currentYear,
          category: this.categoryId //品类
        }
      };
      this.getDetail(params36);
    },
    onConfirmProduct(value, index) {
      //确定产品
      this.showProduct = false;
      // this.$toast(`当前值Pr：${value}, 当前索引：${index}`);
      this.paramsData.productId = this.columnsProduct[index].id;
      this.paramsData.productName = this.columnsProduct[index].name;
      this.defaultIndex = index
      this.showDate = false;

      // let params = {
      //   code: this.code,
      //   data: this.paramsData
      // };
      // this.getDetail(params);
      // console.log(value);
    },
    onConfirmOrder(value, index) {
      //确认订单类型和订单状态
      this.finishedOrder = true;
      this.showOrder = false;
      console.log(value);
      this.paramsData.page = 1;
      this.OrderFulfillment = [];
      // 选择订单类型和状态
      //   this.$toast(`当前值order：${value}, 当前索引：${index}`);
      if (this.orderClickType == "type") {
        this.paramsData.ordertype = this.columnsOrderType[index].id;
        this.orderType = value.text;
      } else {
        this.paramsData.orderstutus = this.columnsOrderStatus[index].id;
        this.orderStatus = value.text;
      }
      let params = {
        code: this.code,
        data: this.paramsData
      };
      this.getDetail(params);
    },
    tabsClick(value) {
      //卡片切换
      this.loading = false; //才可触发onLoad
     
      this.detailPage.currentPage = 1;
      this.detailPage.page = 0;
      this.paramsData.page = 1; //1开始35接口用的page
      this.paramsData.pagination.currentPage = 0; //0开始37,39用

      if (value == 0) {
        //计划执行
        this.code = "00715FY36";
        this.paramsData.year = this.currentYear;
        this.params = {
          code: this.code,
          data: {
            distributerid: this.distributerId,
            year: this.currentYear
          }
        };
        if (this.tableData.length > 0) {
          return;
        }
      } else if (value == 1) {
        //订单执行
        this.code = "00715FY35";
        this.paramsData.ordertype = this.columnsOrderType[0].id;
        this.paramsData.orderstutus = this.columnsOrderStatus[3].id;
        this.paramsData.begdate = this.$moment(this.paramsData.from).format(
          "YYYYMMDD"
        );
        this.paramsData.enddate = this.$moment(this.paramsData.to).format(
          "YYYYMMDD"
        );
        this.params = {
          code: this.code,
          data: this.paramsData
        };
        if (this.OrderFulfillment.length > 0) {
          return;
        }
      } else if (value == 2) {
        //出库明细
        this.code = "00715FY37";
        this.params = {
          code: this.code,
          data: this.paramsData
        };
        if (this.productLoading) {
          this.$toast("正在获取产品列表，请稍等...");
          return;
        }
        if (this.columnsProduct.length <= 0) {
          this.$toast("产品列表获取失败，请刷新页面或重新进入页面");
          return;
        }
        if (this.PlaceList.length > 0) {
          return;
        }
      } else {
        //下游明细
        // this.downstreamList = []
        this.code = "00715FY39";
        // this.code = "00715FY40"; //扫码明细
        this.params = {
          code: this.code,
          data: this.paramsData
        };
        if (this.productLoading) {
          this.$toast("正在获取产品列表，请稍等...");
          return;
        }
        if (this.columnsProduct.length <= 0) {
          this.$toast("产品列表获取失败，请刷新页面或重新进入页面...");
          return;
        }
        if (this.downstreamList.length > 0) {
          return;
        }
      }
      this.$ddapi.showLoading("加载中");
      this.getDetail(this.params);
    },
    getDetail(params) {
      // this.loading = true
      if (params.code == "00715FY41") {
        //判断产品列表是否请求回来
        this.productLoading = true;
      }
      this.$Axios
        .post("/api/ddadapter/openApi/data/", params)
        .then(res => {
          this.loading = false;
          this.$ddapi.hidePreloader();
          let result = res.data.data;
          if (result.success) {
            this.formatData(result, params.code);
          } else {
            // this.$toast(result.errorMsg);
            this.resetDefault(result, params.code);
          }
        })
        .catch(e => {
          this.loading = false;
          this.$ddapi.hidePreloader();
          console.log(e);
        });
    },
    resetDefault(res, code) {
      console.log(res,'error');
      
      if (code == "00715FY36") {
        if (!res.result) {
          this.tableData = [];
        }
      }
      if (code == "00715FY35") {
        if (!res.result) {
          this.OrderFulfillment = [];
        }
      }
      if (code == "00715FY37") {
        //出库明细
        if (!res.result) {
          this.PlaceList = [];
        }
      }
      if (code == "00715FY38") {
        //出库明细扫码明细
      }
      if (code == "00715FY39") {
        //下游明细
        // this.downstreamList = res.result.detail;
        if (!res.result.detail) {
          this.downstreamList = [];
        }
      }
      if (code == "00715FY40") {
        //下游明细扫码明细
      }
      if (code == "00715FY41") {
        //产品选择列表
        this.productLoading = false;
        this.$toast("产品列表请求失败，请刷新页面或重新进入页面");
      }
      if (code == "00715FY42") {
      }
      if (code == "00715FY47") {
        //出入库量
        this.$toast(res.errorMsg);

      }
    },

    formatData(res, code) {
      //data数据格式化
      if (code == "00715FY36") {
        //计划执行
        let planquantityTotal = 0;
        let execquantityTotal = 0;
        this.tableData = res.result;
        this.tableData.map(item => {
          planquantityTotal = planquantityTotal + item.planquantity;
          execquantityTotal = execquantityTotal + item.execquantity;
        });
        this.tableData.push({
          monat: "合计",
          planquantity: planquantityTotal,
          execquantity: execquantityTotal
        });
      }
      if (code == "00715FY35") {
        //订单执行
        // this.OrderFulfillment = res.result
        if (this.refreshing) {
          //下拉刷新重置
          this.OrderFulfillment = [];
          this.refreshing = false;
        }
        res.result.map(item => {
          this.OrderFulfillment.push(item);
        });
        // console.log(this.uniqueArray(this.OrderFulfillment,'orderid'));
        this.OrderFulfillment = this.$uniqueArray(
          this.OrderFulfillment,
          "orderid"
        );

        // 这里去重

        // 数据全部加载完成 订单执行没有分页信息返回，所以需要多请求一次以判断是否请求完
        if (res.result && !res.result.length) {
          this.finishedOrder = true;
        }
      }
      if (code == "00715FY37") {
        //出库明细   无分页
        if (this.refreshing) {
          //下拉刷新重置
          this.PlaceList = [];
          this.refreshing = false;
        }
        this.PlaceList = res.result;
        if (res.result) {
          this.finishedPlace = true;
        }
      }
      if (code == "00715FY38") {
        //出库明细扫码明细
        if (res.result.detail.length == 0) {
          this.$toast("暂无更多明细");
        } else {
          if (res.result.pagination.currentPage) {
            res.result.detail.map((item, index) => {
              this.PlaceListDetail.push(item);
            });
          } else {
            this.PlaceListDetail = res.result.detail;
          }
          this.$set(this.channel, this.paramsData.channelId, [
            ...this.PlaceListDetail
          ]);
        }
        console.log(this.channel, "channel回来");
      }
      if (code == "00715FY39") {
        //下游明细
        // this.paramsData.pagination.currentPage++; //成功以后加一页
        if (this.refreshing) {
          //下拉刷新重置
          this.downstreamList = [];
          this.refreshing = false;
        }
        if (res.result.pagination.currentPage) {
          res.result.detail.map((item, index) => {
            this.downstreamList.push(item);
          });
          this.downstreamList = this.$uniqueArray(
            this.downstreamList,
            "terminalId"
          );
        } else {
          this.downstreamList = res.result.detail;
        }

        // 数据全部加载完成
        if (
          this.downstreamList.length >=
          res.result.pagination.totalNumberOfResults
        ) {
          //等于数据总条数total
          this.finishedTerminal = true;
        }
      }
      if (code == "00715FY40") {
        //下游明细扫码明细
        if (res.result.detail.length == 0) {
          this.$toast("暂无更多明细");
        }
        if (res.result.pagination.currentPage) {
          res.result.detail.map((item, index) => {
            this.downstreamListDetail.push(item);
          });
        } else {
          this.downstreamListDetail = res.result.detail;
        }
        this.$set(this.terminal, this.paramsData.terminalId, [
          ...this.downstreamListDetail
        ]);
      }
      if (code == "00715FY41") {
        this.productLoading = false;
        //产品选择列表
        res.result.map(item => {
          item.text = item.name;
          return item;
        });
        this.columnsProduct = res.result;

        this.paramsData.productName = this.columnsProduct[this.columnsProduct.length-1].text;
        this.paramsData.productId = this.columnsProduct[this.columnsProduct.length-1].id;
        this.defaultIndex = this.columnsProduct.length-1
        console.log(this.columnsProduct);
        let params47 = {
          //博智出入库等信息
          code: "00715FY47",
          data: {
            orderDistributorId: this.distributerId,
            productId: this.paramsData.productId,
            startTime: this.paramsData.from+' 00:00:00',
            endTime: this.paramsData.to+' 23:59:59'
          }
        };
        this.getDetail(params47); //库存等信息
      }
      // if (code == "00715FY42") {
      //   this.storageRecord.inventory = String(res.result);
      // }
      if (code == "00715FY47") {
        //出入库量
        this.storageRecord = res.result;
      }
      if (code == "00715FY45") {
        //品类
        res.result.map(item => {
          item.text = item.name;
          return item;
        });
        this.columnsCategory = res.result;
      }
    },
    unfoldDetail(slot, isUnfold) {
      //   this.isUnfold = true;
      //展开出库明细
      //   this.channel[slot.channelId] = [];
      //   this.$set(this.channel, {});
      //   this.channel[slot.channelId] = [];
      console.log(this.channel, "channel");
      this.paramsData.pagination.currentPage = 0;
      if (!isUnfold) return;
      console.log(slot, isUnfold);
      this.paramsData.channelId = slot.channelId;
      let params38 = {
        code: "00715FY38",
        data: this.paramsData
      };
      this.getDetail(params38);
    },
    unfoldDetail01(slot, isUnfold) {
      //展开下游扫码
      //   this.terminal[slot.terminalId] = [];
      //   this.$set(this.terminal, {});
      //   this.terminal[slot.terminalId] = [];
      this.paramsData.pagination.currentPage = 0;

      console.log(this.terminal, "terminal01");

      if (!isUnfold) return;
      console.log(slot);
      this.paramsData.terminalId = slot.terminalId;
      //   this.paramsData.pagination = this.detailPage
      let params40 = {
        code: "00715FY40",
        data: this.paramsData
      };
      this.getDetail(params40);
      console.log(this.terminal, "terminal02");
    },
    moreClick(code) {
      //   this.$toast("more");
      //   this.detailPage.currentPage++;

      this.paramsData.pagination.currentPage = this.detailPage.currentPage++;

      let params = {
        code: code,
        data: this.paramsData
      };
      this.getDetail(params);
    },
    orderClick(type) {
      this.showOrder = true;

      if (type == "status") {
        this.columnsOrder = this.columnsOrderStatus;
        this.orderClickType = "status";
        // this.paramsData.orderstatus = "";
      } else {
        this.orderClickType = "type";

        this.columnsOrder = this.columnsOrderType;
        // this.paramsData.ordertype = "";
      }
    },
    onLoadTerminal(type) {
      //   this.$toast(type);
      type == "00715FY35"
        ? this.paramsData.page++
        : this.paramsData.pagination.currentPage++;

      let params = {
        code: type,
        data: this.paramsData
      };
      this.getDetail(params);
    },
    onRefresh() {
      // 清空列表数据
      this.finishedOrder = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = false;
      this.paramsData.page = 1;
      this.paramsData.pagination.currentPage = 0;
      let params = {
        code: this.code,
        data: this.paramsData
      };
      this.getDetail(params);
    },
    onSearchChannel(val) {
      //出库(渠道)搜索
      this.paramsData.channelId = val;
      let params = {
        code: this.code,
        data: this.paramsData
      };
      this.getDetail(params);
    },
    onSearchTerminalName(val) {
      //下游搜索val
      this.finishedTerminal = false;
      this.paramsData.pagination.currentPage = 0;
      this.paramsData.terminalName = val;
      let params = {
        code: this.code,
        data: this.paramsData
      };
      this.getDetail(params);
    }
  }
};
</script>
<style scoped lang="less">
.detailTop {
  background-color: #ffffff;
  text-align: left;
  padding: 16px 25px 0 25px;
  // margin-bottom: 8px;
  height: 124px;
  overflow: hidden;
  .comp {
    padding-bottom: 15px;
    line-height: 15px;
  }
}
.topUp{
  margin-bottom: 8px;
  background: #ffffff;
  text-align: center;
  padding: 14px;
}
.storageRecord {
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  // text-align: center;
  .cell {
    width: 33.3333333%;
    height: 53px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
  }
}

.van-tabs__content {
  height: 100%;
  .van-tab__pane {
    background-color: #ffffff;
    margin: 8px;
    height: 100%;
  }
}

.van-tabs {
  height: calc(100% - 26px);

  .panelContent {
    .none_dataImg {
      height: calc(100% - 24px) ;
      background-color: #ffffff;
      margin-top: 8px;
    }
  }

  .panelBtn {
    height: 44px;
    margin: 0 8px;
    padding: 8px 0;
    display: flex;
  }

  .paneInput {
    height: 44px;
    // margin-bottom: 8px;
  }
  .panelContent {
    overflow-y: auto;
    height: calc(100% - 27px);
  }
  .button {
    width: 74px;
    height: 26px;
    background: #ffffff;
    border-radius: 18px;
    text-align: center;
    line-height: 26px;
    margin-right: 30px;

    span {
      font-size: 13px;
    }
  }
  .orderButton {
    text-align: center;
    line-height: 44px;
    width: 50%;
  }
}
.collapseList {
  padding: 8px;
  .collapse {
    margin-bottom: 8px;
    border-radius: 2px;
    box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
    .detailCell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 21px;
    }
  }
  .title {
    display: flex;
    height: 88px;
    flex-direction: column;
    justify-content: center;
    span {
      line-height: 21px;
    }
  }
  .detail {
    border-top: 1px solid #e5e5e5;
  }
}
.van-popup--right {
  width: 315px;
}
.yearSelect {
  top: 30px;
  background: #ffffff;
  height: 100px;
  position: fixed;
  left: 16px;
  overflow: auto;
}
.van-search {
  padding: 0;
  height: 44px;
  .van-cell {
    padding: 5px 16px 5px 0;
  }
}

.van-search__content {
  //   border: 1px solid #e5e5e5;
  background-color: #ffffff;
}
</style>