const fs = require('fs')
let versionCode = '0.0.1'
try {
  const execSync = require('child_process').execSync // 同步子进程
  const commit = execSync('git show -s --format=%d').toString().trim()
  versionCode = String(commit.match(/\d+(?:\.\d+)*\b/))
} catch (e) {
  versionCode = '0.0.1'
}
console.log('读取git版本号:' + versionCode)
/**
 * 环境publicPath配置
 * prod----线上
 * qa----测试
 * @type {{qa: string, prod: string}}
 */
const paths = {
  qa: './',
  prod: './'
}
console.log('当前：' + process.env.VUE_APP_ENV)
const publicPath = process.env.VUE_APP_ENV === 'online' ? paths.prod : paths.qa
const data = {
  name: 'uni-module',
  appid: '',
  description: '',
  versionName: '0.0.1',
  versionCode: '100',
  transformPx: false,
  'app-plus': { /* 5+App特有相关 */
    nvueCompiler: 'uni-app',
    usingComponents: true,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0
    },
    // "safearea": {
    //   "background": "#CCCCCC",
    //   "bottom": {
    //     "offset": "none | auto"
    //   }
    // },
    modules: { /* 模块配置 */

    },
    distribute: { /* 应用发布信息 */
      android: { /* android打包配置 */
        permissions: ['<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.READ_CONTACTS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.WRITE_CONTACTS"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.RECORD_AUDIO"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.CALL_PHONE"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>'
        ]
      },
      ios: { /* ios打包配置 */

      },
      sdkConfigs: { /* SDK配置 */

      }
    }
  },
  quickapp: { /* 快应用特有相关 */

  },
  'mp-weixin': { /* 微信小程序特有相关 */
    appid: 'wx034aaee15d2dee77',
    setting: {
      urlCheck: false
    },
    usingComponents: true
  },
  'mp-alipay': {
    usingComponents: true
  },
  'mp-baidu': {
    usingComponents: true
  },
  'mp-toutiao': {
    usingComponents: true
  },
  'mp-qq': {
    usingComponents: true
  },
  h5: {
    /* "publicPath": "https://www.name.com/alioss/0.0.1" */
    devServer: {
      port: 2021,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/api': {
          target: 'https://api.ixiaowai.cn', // 请求的目标域名
          changeOrigin: true,
          secure: false,
          pathRewrite: { // 使用代理； 告诉他你这个连接要用代理
            '^/api': '/'
          }
        }
      }
    },
    publicPath: publicPath,
    title: '咸鱼日记',
    router: {
      mode: 'history',
      base: './'
    },
    optimization: {
      treeShaking: {
        enable: false
      }
    }
  }
}
const name = process.env.VUE_APP_ENV === 'online' ? '正式环境' : '测试环境'
console.log(`uni-app: publicPath-${name}:${publicPath}`)
fs.writeFile(
  `${__dirname}/manifest.json`,
  JSON.stringify(data),
  e => (e ? console.error(e) : console.log('manifest.json 配置文件更新成功'))
)
