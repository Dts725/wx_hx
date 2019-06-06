const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//校验手机号 身份证号

function isPhone(num) {
  if (isNaN(num) || num.length !== 11) {
    console.log('可以的')
    if (num.length !== 11) {
      wx.showToast({
        title: '请输入正确手机号 ! ! !',
        icon: 'none',
      })
      return true
    }
  }
}
//校验手机号 身份证号
function isCard(num) {
  if (num.length !== 18) {
    console.log('可以的')
    if (num.length !== 11) {
      wx.showToast({
        title: '请输入正确的身份证号 ! ! !',
        icon: 'none',
      })
      return true
    }
  }
}
//校验非空
function isVoid(e) {
  let flag = false;

  Object.keys(e).forEach(key => {
    if (!e[key]) {
      wx.showToast({
        title: '请检查输入 ! ! !',
        icon: 'none',
      })
      flag = true

    }
  })
  return flag
}

module.exports = {
  formatTime: formatTime,
  isPhone : isPhone,
  isCard : isCard,
  isVoid : isVoid
}
