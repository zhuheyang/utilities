/**
 * 将url查询参数解析为字典。
 * @param {any} param 应为window.location对象或者url字符串，否则报错。
 */
export function query2Dict(param) {
  var pattern = /([^?&=]+)=([^&#]*)/g;
  var dict = {};
  var search = null;
  if (typeof param === "object" && param instanceof Location) {
      search = param.search;
  }
  else if (typeof param === "string") {
      search = param;
  }
  else {
      throw new Error("参数类型非法！请传入window.loaction对象或者url字符串。");
  }
  search.replace(pattern, function (rs, $1, $2) {
      var key = decodeURIComponent($1);
      var value = decodeURIComponent($2);
      dict[key] = value;
      return rs;
  });
  return dict;
}

//测试：
query2Dict(window.location);
query2Dict("abc.htlm??a=123&b?d=c&e=a!%3F%23eg&f=130#anchor");
query2Dict(123);