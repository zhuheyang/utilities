export function getCookie(c_name: string) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      // 以前是用unescape来解码excape()函数编码的字符串的
      // 现在使用更好的decodeURI与decodeURIComponent来进行了
      return decodeURIComponent(document.cookie.substring(c_start, c_end));
    }
  } else {
    return '';
  }
}