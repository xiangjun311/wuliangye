import Vue from "vue";
import App from "./App.vue";
// import Error from "@/views/error.vue"
import router from "./router";
import store from "./store";

import Vant, {
	Toast
} from 'vant';
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

// import Vconsole from 'vconsole'


if (process.env.NODE_ENV === 'development') {
	console.log('本地环境', new Date().getTime());
	// new Vue({
	// 	router,
	// 	store,
	// 	render: h => h(App)
	// }).$mount("#app");
	// router.replace({
	// 	path: '/dealersList'
	// })

} else if (process.env.NODE_ENV === 'test') {
	console.log("测试环境", new Date().getTime());
} else {
	console.log("正式环境", new Date().getTime());
}
// if (process.env.NODE_ENV !== 'production') {
// 	const vConsole = new Vconsole()
// 	Vue.use(vConsole)
// }
Vue.config.productionTip = false;

// // 引入钉钉
import {
	dingTalkM
} from 'dingtalk-auth'


Vue.prototype.$uniqueArray = function (array, key) { //JSON去重
	var result = [array[0]];
	for (var i = 1; i < array.length; i++) {
		var item = array[i];
		var repeat = false;
		for (var j = 0; j < result.length; j++) {
			if (item[key] == result[j][key]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			result.push(item);
		}
	}
	return result;
}

// 鉴权免登调试
sessionStorage.clear()
///*********************** */
// /api/ddadapter/dingding/tZero/getJsTicketMob
// /api/ddadapter/dingding/tZero/getJsTicketPc
console.log(process.env.NODE_ENV);
const devID = 'ding7da0a93f20669022ee0f45d8e4f7c288'
const proID = 'ding5da63018b1631f1b35c2f4657eb6378f'
const corpId = process.env.NODE_ENV !== 'production' ? devID : proID
dingTalkM.authLogin(corpId, '/api/ddadapter/dingding/timeReport/getUserCode').then(res => {
	console.log("进入免登")
	// Toast("进入免登")
	console.log(res)
	// console.log(code,75)
	sessionStorage.setItem("code", res.code)
	sessionStorage.setItem("userphone", res.userMobile); //当前登录人电话
	sessionStorage.setItem("username", res.username); //当前登录人
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount("#app");
	if (res.errcode == '0') {
		router.replace({
			path: '/dealersList'
		})

	} else {
		console.log(res);

		location.href = '#/error?type=getCodeErr'
	}
	dd.error(function (res) {
		console.log(res)
	})
}, err => {
	Toast("免登失败")
	location.href = '#/error?type=getCodeErr'
	console.log(err)
})