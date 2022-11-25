/*
 * @Author: ss shangs@schbrain.com
 * @Date: 2022-05-23 11:24:31
 * @LastEditors: ss shangs@schbrain.com
 * @LastEditTime: 2022-08-08 11:00:45
 * @FilePath: /v2-uni-app/src/utils/tabBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = [
  {
    pagePath: 'pages/home/index',
    iconPath: '/static/image/home.png',
    selectedIconPath: '/static/image/home-active.png',
    text: '咸鱼',
    customIcon: false
  }, {
    pagePath: 'pages/profile/index',
    iconPath: '/static/image/me.png',
    selectedIconPath: '/static/image/me-active.png',
    text: '日记',
    customIcon: false
  }
]
