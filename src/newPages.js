const fs = require('fs')
const pages = require('./router')
const tabBar = require('./utils/tabBar')
const data = {
  easycom: {
    '^s-(.*)': '@/components/s-$1/index.vue',
    '^u-(.*)': 'uview-ui/components/u-$1/u-$1.vue'
  },
  pages: pages,
  globalStyle: {
    maxWidth: 500,
    rpxCalcMaxDeviceWidth: 375,
    navigationStyle: 'default',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#FFF5E4',
    backgroundColor: '#FFF5E4'
  },
  tabBar: {
    color: '#B7C4CF',
    selectedColor: '#090300',
    borderStyle: 'white',
    fontSize: '12px',
    backgroundColor: '#FFF5E4',
    list: tabBar
  }
}
fs.writeFile(
  `${__dirname}/pages.json`,
  JSON.stringify(data),
  e => (e ? console.error(e) : console.log('pages.json 配置文件更新成功'))
)
