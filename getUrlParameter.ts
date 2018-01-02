// window.location.search获取url中的请求参数, 也即"?xxx=xxx&xxx=xxx这一部分.
// 还需要考虑的问题是中文字符的转码,以及只有key没有value的boolean值转换.
// (大搜车小芋头的前端十道面试题中有提到)

// 使用initialValue为undefined, 造成的类型如下:
// reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
// 如果规范了返回类型, 其造成的类型变换如下:
// reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

export function getUrlParameter(sParam: string) {
  return decodeURIComponent(window.location.search.substring(1)).split('&')
    .map((v) => v.split('='))
    .filter((v) => v[0] === sParam )
    // curv[1]为string,但返回类型要求为string[], 但在webStorm中能正常运行.
    // 有一次使用yarn进行npm安装后, 突然就不能通过, 后来重新安装npm后才像之前一样正常通过.

    // 我们可以通过添加类型断言<string>, 或者在initialValue中将undefined改为<string>undefined,添加<string>类型断言, 可改变reduce方法中输入参数与输出参数的类型规定.
    // 譬如之前为T,T,T,T[], 则添加类型断言后就变为U,T,,T,T,T[], 同时输出也从T变为U了 
    // (键入断言: Type Assertion)来告诉编译器结果会是一个string类型, 或者指定reduce中的参数类型
    .reduce<string>((prev, curv, index, array) => curv[1], undefined);
}

export function getCookie(c_name: string) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return decodeURIComponent(document.cookie.substring(c_start, c_end));
    }
  } else {
    return '';
  }
}