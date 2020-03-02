

import CryptoJS from 'crypto-js' //加密js

const Utils = {}

// 加密Cookie
Utils.setCookieCry = function (name, value, days) {
    var text = CryptoJS.AES.encrypt(value, 'secret key 123');//使用CryptoJS方法加密
    var saveDays = new Date(); //获取时间
    saveDays.setTime(saveDays.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
    //字符串拼接存入cookie
    window.document.cookie = name + "=" + text + ";path=/;saveDays=" + saveDays.toGMTString();
}
//读取cookie
Utils.getCookieCry = function (name) {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            if (arr2[0] == name) {
                //拿到拿到加密后的密码arr2[1]并解密
                var bytes = CryptoJS.AES.decrypt(arr2[1].toString(), 'secret key 123');
                var plaintext = bytes.toString(CryptoJS.enc.Utf8); //拿到解密后的密码（登录时输入的密码）
                return plaintext
            }
        }
    } else {
        return ""
    }
    return ""
}
//清除cookie
Utils.delCookieCry = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = Utils.getCookieCry(name); //del（组合）： 删除cookies - 就是删除，别置空
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    }

}


export {
    Utils
}