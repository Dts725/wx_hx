const url = 'https://xzfwzx.teda.gov.cn/v1';
const imgUrl = 'https://xzfwzx.teda.gov.cn';

import app from './app.js'

function tokens() { 

  return wx.getStorageSync('token')
}

function userid() {

  return wx.getStorageSync('userid')
}

// //校验非空
// function rules(e) {
//   let flag = false;

//   Object.keys(e).forEach(key => {
//     if (!e[key]) {
//       wx.showToast({
//         title: '请检查输入 ! ! !',
//         icon: 'none',
//       })
//       flag = true

//     }
//   })
//   return flag
// }


//uuid
function uuid(that, callBack) {
  let result = "";
  let data = {
    token: tokens(),
    userid: userid().userid
  };
  wx.request({
    url: detailUrl.uuidUrl,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: data,
    success: res => {
      result = res.data.res_data;
      callBack(that, res.data.res_data.uuid)

    }
  })

}

// 删除附件
function deleteField(data) {
  wx.request({
    url: url + `/taiji/framework/hn/common/plugins/upload/delFile.jsp?user_id=${userid().userid}&fid=${data}`,
  })
}


// //校验手机号 身份证号

// function rulesPhone(num) {
//   if (isNaN(num) || num.length !== 11) {
//     console.log('可以的')
//     if (num.length !== 11) {
//       wx.showToast({
//         title: '请输入正确手机号 ! ! !',
//         icon: 'none',
//       })
//       return true
//     }
//   }
// }
// //校验手机号 身份证号
// function rulesIdCard(num) {
//   if (num.length !== 18) {
//     console.log('可以的')
//     if (num.length !== 11) {
//       wx.showToast({
//         title: '请输入正确的身份证号 ! ! !',
//         icon: 'none',
//       })
//       return true
//     }
//   }
// }


const token = `&client_id=yhxcx&client_secret=880055513D7EF8FAF30E7DA7B03B9582&token=${tokens()}`

const detailUrl = {
  warrant: url + `/api?method=tjkfqExchange.tjoa.auth`, //授权接口
  registerUrl: url + `/api?method=tjkfqExchange.tjoa.register${token}`, //注册接口
  loginUrl: url + `/api?method=tjkfqExchange.yhxcx.login${token}`, //登录接口i
  submitApplicantBaseInfo: url + `/api?method=tjkfqExchange.yhxcx.submitApplicantBaseInfo`, //事项申办提交进本信息
  getMaterials: url + `/api?method=tjkfqExchange.yhxcx.getMaterials`, //事项申办申请材料信息
  submitEform2: url + '/api?method=tjkfqExchange.yhxcx.submitEform2', //电子表单提交信息
  updateEform2: url + '/api?method=tjkfqExchange.yhxcx.updateEform2', //修改电子表单提交信息
  fileuploadSqcl: url + `/taiji/framework/hn/common/plugins/upload/fileUp.jsp?file_types_code=hn.dict.sys.fileupload.sqcl&filetype=ts${token}`, //申请材料上传
  delFile: url + '/api?method=delFile.jsp', //删除附件
  submitMaterials: url + '/api?method=tjkfqExchange.yhxcx.submitMaterials', //材料列表提交
  getBjProcessing: url + '/api?method=tjkfqExchange.yhxcx.getBjProcessing', //办件查询
  subPjTs: url + '/api?method=tjkfqExchange.yhxcx.subPjTs', //评价接收端口
  onlineQuestion: url + '/api', //在线提问接口
  getpjid: url + '/api?method=tjkfqExchange.yhxcx.getpjid', //获取吐槽接口pjid
  downLoad: url + '/downloadFileHn.do?id=b1fdd8001e594897848c6be18e36c568', //下载地址
  imgUrl: imgUrl, //图片路径
  // rules: rules, //校验非空
  getCode: url + `/api?method=tjkfqExchange.yhxcx.getPhoneVerifyCodeForResetpw`, //验证码
  getToken: tokens,
  viewBJBZInfoAndMaterials: url + `/api?method=tjkfqExchange.yhxcx.viewBJBZInfoAndMaterials`,
  getBjInfo: url + `/api?method=tjkfqExchange.yhxcx.loadTjkfq_047_01_01_base`,//获取表单信息
  getBjInfoFiled: url + `/api?method=tjkfqExchange.yhxcx.getAttachmentsByObjid`, //获取附件信息
  retutnUrl: url + `/downloadFileHn.do`, //返回图片url
  uuidUrl: url + `/api?method=tjkfqExchange.yhxcx.getUUID`, //提交表单用uuid
  deleteField: deleteField,//删除附件接口
  uuid: uuid, //获取uuid
  // rulesPhone: rulesPhone, //校验手机号和身份证号
  // rulesIdCard: rulesIdCard, //校验手机号和身份证号
  getFiledEdit : url + `/api?`, //表单位置文件上传
  subBJBZInfo: url + `/api?method=tjkfqExchange.yhxcx.subBJBZInfo` //提交补证接口
};





module.exports = detailUrl;