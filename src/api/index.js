import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import Vant, { Toast } from 'vant';



Vue.use(VueAxios, Axios);
Vue.use(Toast);
const axiosConfig = {
	headers: {
		post: {
			"Content-Type": "application/json" //application/json;charset=UTF-8
		},
		get: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	},
	timeout: 10000
};
Object.assign(Axios.defaults, axiosConfig);

//拦截权限模块请求，携带token
Axios.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
// 响应拦截
Axios.interceptors.response.use(
	config => {
		// console.log(config);

		if (config.data && config.data.statusCode === 200) {
			// Toast('response请求成功')
		} else {
			Toast(config.data.message||'请求错误')
			return Promise.reject(config);
		}
		return config;
	},
	error => {
		console.log(error.response)
		Toast("请求错误");
		if (error.status === 200) {
			return error;
		} else if (error.response && error.response.status === 500) {
			return error;
		}
		return Promise.reject(error);
	}
);

Vue.prototype.$Axios = Axios;

