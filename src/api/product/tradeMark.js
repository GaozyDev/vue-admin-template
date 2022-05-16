//品牌管理数据模块
import request from "@/utils/request";
//获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit} get
export const reqTradeMarkList = (page, limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

//新增品牌接口
// /admin/product/baseTrademark/save post 携带两个参数：品牌名称、品牌LOGO
// 新增的品牌给服务器传递数据的时候不需要传递id，因为id是由服务器生成的

//修改品牌接口
// /admin/product/baseTrademark/update put 携带三个参数：id、名称、LOGO

export const reqAddOrUpdateTradeMark = (tradeMark)=>{
  //如果带给服务器的参数有id---就是修改品牌
  if(tradeMark.id) {
    return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
  }else {
    //新增品牌
    return request({url:'/admin/product/baseTrademark/update',method:'post',data:tradeMark})
  }
}

//删除品牌接口
// /admin/product/baseTrademark/remove/{id} get 携带三个参数：id、名称、LOGO

//接口
// /admin/product/baseTrademark/findBaseTrademarkByKeyword/{keyword} get

//接口
// /admin/product/baseTrademark/get/{id} get

//接口
// /admin/product/baseTrademark/getTrademarkList get

//接口
// /admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkList get
