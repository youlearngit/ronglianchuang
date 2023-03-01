// component/search/search.js
import utils from '../../pages/utils';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Onclick:function(){
      this.triggerEvent('click', '');
    },
  }
})
