// import moment from 'moment'
import * as dd from 'dingtalk-jsapi';

export class Ddapi {
  //钉钉签名设置
  config(cfg) {
    dd.config(cfg);
  }
  //钉钉容器设置
  ready() {
    return new Promise(function (resolve) {
      dd.ready(function () {
        resolve();
      });
    })
  }

  //钉钉图片显示
  previewImage(urls, thisUrl) {
    dd.biz.util.previewImage({
      urls: urls, //图片地址列表
      current: thisUrl, //当前显示的图片链接
      onSuccess: function (result) {
        /**/
      },
      onFail: function (err) {}
    })
  }


  //钉钉扫码功能
  utilscan() {
    return new Promise(function (resolve) {
      dd.biz.util.scan({
        type: String,
        onSuccess: function (data) {
          // alert(data)
        },
        onFail: function (err) {
          alert(JSON.stringify(err))
        }
      })
    })
  }

  //免登CODE获取
  requestAuthCode(corpId) {
    // runtime.permission.requestOperateAuthCode
    return new Promise(function (resolve, reject) {
      console.log('requestAuthCode mobile');
      dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: function (result) {
          console.log('requestAuthCode', result.code);
          resolve(result.code);
        },
        onFail: function (err) {
          reject(err);
        }
      });
    });
  }

  // 获取微应用反馈式操作的临时授权码
  requestAppAuthCode(corpId, agentId) {
    return new Promise(function (resolve, reject) {
      dd.runtime.permission.requestOperateAuthCode({
        corpId: corpId,
        agentId: agentId,
        onSuccess: function (result) {
          resolve(result.code);
        },
        onFail: function (err) {
          reject(err);
        }
      });
    });
  }
  //钉钉TITLE设置
  setTitle(title) {
    dd.biz.navigation.setTitle({
      title: title, //控制标题文本，空字符串表示显示默认文本
      onSuccess: function (result) {

      },
      onFail: function (err) {

      }
    });
  }

  //钉钉错误信息设置
  error() {
    return new Promise(function (resolve) {
      dd.error(function (error) {
        resolve(error);
      });
    });
  }
  //钉钉alert项目提示框
  alert(msgtext) {
    return new Promise(function (resolve) {
      dd.device.notification.alert({
        message: msgtext,
        title: "提示", //可传空
        buttonName: "确认",
        onSuccess: function () {},
        onFail: function (err) {}
      });

    })
  }
  //钉钉confirm项目提示框
  confirm(msgtext) {
    return new Promise(function (resolve) {
      dd.device.notification.confirm({
        message: msgtext,
        title: "提示",
        buttonLabels: ['确定', '取消'],
        onSuccess: function (result) {
          resolve(result.buttonIndex)
        },
        onFail: function (err) {}
      });
    })
  }

  //钉钉提示信息
  toast(text, duration, delay = 0) {
    dd.device.notification.toast({
      icon: '', //icon样式，有success和error，默认为空 0.0.2
      text: text, //提示信息
      duration: duration || 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
      delay: delay || 0, //延迟显示，单位秒，默认0
      onSuccess: function (result) {},
      onFail: function (err) {}
    });
  }

  //启用下拉刷新
  enableRefresh() {
    return new Promise((resolve, reject) => {
      dd.ui.pullToRefresh.enable({
        onSuccess: function (result) {
          resolve(result);
        },
        onFail: function (err) {
          reject(err);
        }
      })
    })
  }

  //禁用刷新
  disabRefresh() {
    dd.ui.pullToRefresh.disable({
      onSuccess: function () {},
      onFail: function () {}
    })
  }

  //单个按钮设置
  navigationSetRight(name, show = true, control = true) {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setRight({
        show: show, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: control, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: name, //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          resolve(result);
        },
        onFail: function (err) {
          reject(err);
        }
      });
    })
  }
  //单个按钮设置
  setRightFalse(name, show = true, control = true) {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setRight({
        show: show, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: control, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: name, //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          resolve(result);
        },
        onFail: function (err) {
          reject(err);
        }
      });
    })
  }

  //钉钉左测按钮控制
  navigationsetLeft() {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setLeft({
        show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        showIcon: true, //是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
        text: '我工模压要', //控制显示文本，空字符串表示显示默认文本
        onSuccess: function () {
          alert(result)
          /*
          {}
          */
          //如果control为true，则onSuccess将在发生按钮点击事件被回调
        },
        onFail: function (err) {}
      });
    });
  }
  destroyedSetMenu() {
    dd.biz.navigation.setMenu({
      backgroundColor: '#ffffff',
      textColor: '#ffffff',
      items: [{
          id: "1",
          text: " ",
          showRedDot: false,
          badge: ""
        },
        {
          id: "2",
          text: " ",
          showRedDot: false,
          badge: ""
        }
      ],
      onSuccess: function (data) {
        resolve(JSON.stringify(data));
      },
      onFail: function (err) {}
    });
  }
  //钉钉多个按钮设置
  setMenu(items, backColor = "#ffffff", textColor = "#000000") {
    return new Promise((resolve, reject) => {
      dd.biz.navigation.setMenu({
        backgroundColor: backColor,
        textColor: textColor,
        items : [
          {
              "id":"1",//字符串
          "iconId":"file",//字符串，图标命名
            "text":"帮助"
          },
          {
              "id":"2",
          "iconId":"photo",
            "text":"dierge"
          },
          {
              "id":"3",
          "iconId":"setting",
            "text":"disange",
          },
          {
              "id":"4",
          "iconId":"time",
            "text":"disige"
          }
      ],
        onSuccess: function (data) {
          resolve(JSON.stringify(data));
        },
        onFail: function (err) {}
      });

    })
  }

  //获取钉钉个人信息[头像，名称]
  getUserInfo() {
    return new Promise((resolve, reject) => {
      dd.biz.user.get({
        onSuccess: function (info) {
          resolve(info);
        },
        onFail: function (err) {
          reject(err);
        }
      });
    });
  }

  //钉钉企业,用户、部门、信息多选  
  complexPicker(userids, departs, title) {
    return new Promise((resolve, reject) => {
      dd.biz.contact.complexPicker({
        title: title, //标题
        corpId: localStorage.getItem('corpId'), //企业的corpId
        multiple: true, //是否多选
        limitTips: "It is more than", //超过限定人数返回提示
        maxUsers: 1500, //最大可选人数
        pickedUsers: userids, //已选用户
        pickedDepartments: departs, //已选部门
        disabledUsers: [], //不可选用户
        disabledDepartments: [], //不可选部门
        requiredUsers: [], //必选用户（不可取消选中状态）
        requiredDepartments: [], //必选部门（不可取消选中状态）
        appId: localStorage.getItem('agentId'), //微应用的Id
        permissionType: "GLOBAL", //选人权限，目前只有GLOBAL这个参数
        responseUserOnly: true, //单纯返回人，或者返回人和部门
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {
          resolve(err)
        }
      });
    })
  }

  openContact(userids, local = false, multiple = true) {
    return new Promise((resolve, reject) => {
      this.ready().then(() => {
        let obj = {
          startWithDepartmentId: 0, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
          multiple: multiple, //是否多选： true多选 false单选； 默认true
          users: userids, //默认选中的用户列表，userid；成功回调中应包含该信息
          disabledUsers: [], // 不能选中的用户列表，员工userid
          // corpId: this.corpId, //企业id
          // max: 5, //人数限制，当multiple为true才生效，可选范围1-1500
          // limitTips: "最多选5人", //超过人数限制的提示语可以用这个字段自定义
          isNeedSearch: true, // 是否需要搜索功能
          title: "联系人", // 如果你需要修改选人页面的title，可以在这里赋值
          local: 'true', // 是否显示本地联系人，默认false
          onSuccess: function (data) {
            resolve(data);
          },
          onFail: function (err) {
            rejectr(err);
          }
        };
        dd.biz.contact.choose(obj);
      });
    })
  }
  //钉钉组织内人员多选。
  contactChoose(userids, title) {
    return new Promise(function (resolve, reject) {
      dd.biz.contact.choose({
        startWithDepartmentId: -1, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
        multiple: true, //是否多选： true多选 false单选； 默认true
        users: userids, //默认选中的用户列表，userid；成功回调中应包含该信息
        disabledUsers: [], // 不能选中的用户列表，员工userid
        corpId: localStorage.getItem('corpId'), //企业id
        max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
        limitTips: "你好，已经超出人数限制", //超过人数限制的提示语可以用这个字段自定义
        isNeedSearch: true, // 是否需要搜索功能
        title: title, // 如果你需要修改选人页面的title，可以在这里赋值 
        local: true, // 是否显示本地联系人，默认false
        onSuccess: function (data) {
          resolve(data)
        },
        onFail: function (err) {
          alert(JSON.stringify(err))
        }
      });

    })

  }
  //拍照上传图片  
  uploadCamerImages(username, address) {
    // let time = moment().format('YYYY-MM-DD HH:mm')
    return new Promise(function (resolve, reject) {
      dd.biz.util.uploadImageFromCamera({
        compression: true, //(是否压缩，默认为true)
        quality: 50, // 图片压缩质量, 
        resize: 50, // 图片缩放率
        stickers: { // 水印信息
          time: time,
          dateWeather: " ",
          username: username,
          address: address
        },
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {
          reject(err)
        }
      });
    })
  }
  //获取地理位置
  getLocation() {
    return new Promise(function (resolve, reject) {
      dd.ready(() => {
        dd.device.geolocation.get({
          targetAccuracy: 200,
          coordinate: 1,
          withReGeocode: Boolean,
          useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess: function (result) {
            // alert(JSON.stringify(result))  
            resolve(result)
            if (result.errorCode == 4) {
              alert('请打开定位权限')
            }
          },
          onFail: function (err) {
            // alert(JSON.stringify(err))
            alert('GPS信号较弱')
          }
        });
      })

    })

  }

  //地图展示位置
  viewMap(latitude, longitude) {
    return new Promise((resolve, reject) => {
      dd.biz.map.view({
        latitude: latitude, // 纬度
        longitude: longitude, // 经度
        title: "" // 地址/POI名称
      });
    });
  }
  //地图定位
  location(latitude, longitude) {
    return new Promise((resolve, reject) => {
      dd.biz.map.locate({
        latitude: latitude, // 纬度，非必须
        longitude: longitude, // 经度，非必须
        onSuccess: function (result) {
          /* result 结构 */
          {
            // province: 'xxx', // POI所在省会，可能为空
            // provinceCode: 'xxx', // POI所在省会编码，可能为空
            // city: 'xxx', // POI所在城市，可能为空
            // cityCode: 'xxx', // POI所在城市，可能为空
            // adName: 'xxx', // POI所在区名称，可能为空
            // adCode: 'xxx', // POI所在区编码，可能为空
            // distance: 'xxx', // POI与设备位置的距离
            // postCode: 'xxx', // POI的邮编，可能为空
            // snippet: 'xxx', // POI的街道地址，可能为空
            // title: 'xxx', // POI的名称
            // latitude: 39.903578, // POI的纬度
            // longitude: 116.473565, // POI的经度
          }
        },
        onFail: function (err) {}
      });
    });
  }
  //地图搜索
  searchMap(latitude, longitude) {
    return new Promise((resolve, reject) => {
      dd.biz.map.search({
        latitude: latitude, // 纬度
        longitude: longitude, // 经度
        scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径

        onSuccess: function (poi) {
          /* result 结构 */
          {
            // province: 'xxx', // POI所在省会，可能为空
            // provinceCode: 'xxx', // POI所在省会编码，可能为空
            // city: 'xxx', // POI所在城市，可能为空
            // cityCode: 'xxx', // POI所在城市，可能为空
            // adName: 'xxx', // POI所在区名称，可能为空
            // adCode: 'xxx', // POI所在区编码，可能为空
            // distance: 'xxx', // POI与设备位置的距离
            // postCode: 'xxx', // POI的邮编，可能为空
            // snippet: 'xxx', // POI的街道地址，可能为空
            // title: 'xxx', // POI的名称
            // latitude: 39.903578, // POI的纬度
            // longitude: 116.473565, // POI的经度
          }
        },
        onFail: function (err) {}
      });
    });
  }
  //打开http跳转
  openLink(url) {
    dd.biz.util.openLink({
      "url": url,
      "enableShare": true
    });
  }
  // 分享
  share(url, title, content) {
    return new Promise(function (resolve, reject) {
      dd.biz.util.share({
        type: 1, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
        url: url,
        title: title,
        content: content,
        image: '',
        onSuccess: function () {},
        onFail: function (err) {
          reject(err)
        }
      })
    })

  }
  // 能拍照和能选择照片
  uploadImages(maxNum) {
    return new Promise(function (resolve, reject) {
      dd.biz.util.uploadImage({
        multiple: false, //是否多选，默认false
        max: 1, //最多可选个数
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {
          reject("取消上传图片");
        }
      })
    })

  }


  choose(title, arry) {
    return new Promise(function (resolve, reject) {
      dd.device.notification.actionSheet({
        title: title, //标题
        cancelButton: '取消', //取消按钮文本
        otherButtons: arry,
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {}
      })
    })

  }

  //钉钉标题
  setTitle(title) {
    dd.biz.navigation.setTitle({
      title: title, //控制标题文本，空字符串表示显示默认文本
      onSuccess: function (result) {},
      onFail: function (err) {}
    });
  }


  //loading
  showLoading(title) {
    dd.device.notification.showPreloader({
      text: title, //loading显示的字符，空表示不显示文字
      showIcon: true, //是否显示icon，默认true
      onSuccess: function (result) {
        /*{}*/
      },
      onFail: function (err) {}
    })
  }

  //禁用加载
  hidePreloader() {
    dd.device.notification.hidePreloader({
      onSuccess: function (result) {},
      onFail: function (err) {}
    })
  }

  complexChoose(users, depts) {
    return new Promise((resolve, reject) => {
      dd.biz.contact.complexChoose({
        startWithDepartmentId: 0, //-1表示从自己所在部门开始, 0表示从企业最上层开始，其他数字表示从该部门开始
        selectedUsers: users, //预选用户
        disabledUsers: [], // 不能选中的用户列表，员工userid
        selectedDepartments: depts, // 预选中的部门列表，部门id
        disabledDepartments: [], // 不能选中的部门列表，部门id
        // max: Number, //人数限制，当multiple为true才生效，可选范围1-1500
        // limitTips: "xxx", //超过人数限制的提示语可以用这个字段自定义
        local: "true", // 是否显示本地联系人，默认false
        isNeedSearch: true, // 是否需要搜索功能
        corpId: this.corpId, //企业id
        onSuccess: function (data) {
          resolve(data);
        },
        onFail: function (err) {
          reject(err)
        }
      });
    })
  }

  //弹窗
  setAlert(message, btnMessage) {
    dd.device.notification.alert({
      message: message,
      title: "提示", //可传空
      buttonName: btnMessage,
      onSuccess: function () {},
      onFail: function (err) {}
    });
  }
  //日期
  datetimepicker(format, value) {
    return new Promise((resolve, reject) => {
      dd.biz.util.datepicker({
        format: format,
        value: value, //默认显示
        onSuccess: function (data) {
          // alert(JSON.stringify(data))
          resolve(data.value)
        },
        onFail: function (err) {
          reject.error(err);
        }
      });
    });
  }
  timepicker(value) {
    return new Promise((resolve, reject) => {
      dd.biz.util.datetimepicker({
        format: "yyyy-MM-dd HH:mm",
        value: value, //默认显示
        onSuccess: function (data) {
          // alert(JSON.stringify(data))
          resolve(data.value)
        },
        onFail: function (err) {
          reject.error(err);
        }
      });
    });
  }
  timeOneDay(value) {
    return new Promise((resolve, reject) => {
      dd.biz.calendar.chooseOneDay({
        default: "",
        onSuccess: function (result) {
          resolve(result.chosen)
        },
        onFail: function (err) {}
      })
    });
  }
  launchApp(androidurl) {
    return new Promise((resolve, reject) => {
      dd.device.launcher.launchApp({
        app: androidurl, //iOS:应用scheme;Android:应用包名
        activity: "", //仅限Android，打开指定Activity，可不传。如果为空，就打开App的Main入口Activity
        onSuccess: function (data) {
          resolve(data);
          if (!data.result) {
            alert("请确定是否有安装该app");
          }
        },
        onFail: function (err) {

          reject(err);

        }
      });
    });
  }
  //
  chosen(source) {
    return new Promise((resolve, reject) => {
      dd.biz.util.chosen({
        source: source,
        selectedKey: '', //默认显示
        onSuccess: function (data) {
          // alert(JSON.stringify(data))
          resolve(data)
        },
        onFail: function (err) {
          reject.error(err);
        }
      });
    });
  }
  // 下拉底部控件
  scrollLoad(name) {
    return new Promise(function (resolve) {
      document.getElementById('allListData').onscroll = function () {
        if (this.scrollTop < 2) {
          resolve(0)
          alert("0")
        }
        if (this.scrollTop > 2) {
          alert("1")
          dd.ui.pullToRefresh.disable()
        }
        if (this.scrollHeight - this.scrollTop - this.offsetHeight < 2) {
          resolve(1)
          alert("2")
        }
      }
    })
  }
}

let ddapi = new Ddapi();
export default ddapi;
