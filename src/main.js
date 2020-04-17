import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';

import './api/index'
import './components/index'
import moment from 'moment';
Vue.prototype.$moment = moment;
import './assets/css/base.css'
import * as dd from 'dingtalk-jsapi';

import ddapi from "./auth/ddapi"
Vue.prototype.$ddapi = ddapi;

Vue.use(Vant, Toast);

Vue.config.productionTip = false;

// // 引入钉钉
import {
	dingTalkM
} from 'dingtalk-auth'

// 钉钉鉴权需要的jsapi列表
let jsApiList = [
	'device.launcher.checkInstalledApps',
	'biz.contact.choose',
	'biz.util.uploadImage',
	"biz.user.get",
	'device.launcher.launchApp',
	"device.launcher.checkInstalledApps",
	'biz.chat.openSingleChat',
	'biz.calendar.chooseOneDay',
	'biz.util.share',
	'biz.contact.complexPicker',
	'biz.util.uploadImageFromCamera',
	'biz.util.datepicker',
	'biz.map.search',
	'biz.map.view',
	'biz.map.locate',
	'device.geolocation.get',
	'biz.telephone.showCallMenu',
]

// 鉴权免登调试

///*********************** */
// /api/ddadapter/dingding/tZero/getJsTicketMob
// /api/ddadapter/dingding/tZero/getJsTicketPc
// 测试环境的corpid：ding7da0a93f20669022ee0f45d8e4f7c288
//生产 ding5da63018b1631f1b35c2f4657eb6378f
dingTalkM.authLogin('ding7da0a93f20669022ee0f45d8e4f7c288', '/api/ddadapter/dingding/timeReport/getUserCode').then(res => {
	console.log("进入免登")
	// Toast("进入免登")
	console.log(res)
	sessionStorage.setItem("warinfo", JSON.stringify(res.warinfo));//战区
	sessionStorage.setItem("baseinfo", JSON.stringify(res.baseinfo));//基地
	sessionStorage.setItem("userid", res.userid);//当前登录人id
	sessionStorage.setItem("username", res.username);//当前登录人
	sessionStorage.setItem("roleid", res.roleid);

	if (res.errcode == 0) {
		// router.replace("/dealersList")
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	} else {
		Toast(res.errmsg);
	}
	dd.error(function (res) {
		console.log(res)
	})
}, err => {
	Toast("免登失败")
	console.log(err)
})

// axios.interceptors.request.use(config => {
//   config.headers.tokenid = sessionStorage.getItem("tokenid");//正式的
//   // config.headers.tokenid ="123";//测试的死数据
//   return config;
// }, err => {
//   return Promise.reject(err);
// });
//************************** */


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
