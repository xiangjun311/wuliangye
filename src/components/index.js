import Vue from 'vue'
import Header from './Header'
import Table from './Table'
import Collapse from './Collapse'



let comp = {
	Header,
	Table,
	Collapse
}


function _forEachByObject(obj, projection) {
	try {
		Object.keys(obj).forEach((key) => {
			projection && projection(obj[key], key)
		})
	} catch (e) {
		console.log(e, 'error')
	}
}

// 全局注册公共组件
_forEachByObject(comp, (item) => {
	Vue.component(item.name, item)
})

export default {
	comp,
}
