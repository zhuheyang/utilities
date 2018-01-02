// Angular中加载webpack打包好的几个文件如inline.bundle.js, vendor.bundle.js等的时候
// 用的方法应该也与这个差不多.
// 以下为加载文件夹中的几个JavaScript文件.
let script2 = [
    '../js/mqtt/mqttws31.min.js', 
    '../js/app_mqtt.js?' + Math.random(),
    '../js/app_main.js?' + Math.random(),
];

function seriesLoadScripts(scripts: Array<string>, callback: Function) {
  if (typeof(scripts) !== 'object') { const script = [scripts]; }
  const HEAD = document.getElementsByTagName('head').item(0) || document.documentElement;
  const s = new Array();
  const last = scripts.length - 1;
  // 递归添加脚本标签
  const recursiveLoad = function (i) {  
      s[i] = document.createElement('script');
      s[i].setAttribute('type', "text/javascript");
      //Attach handlers for all browsers
      s[i].onload = s[i].onreadystatechange = function () { 
          if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
              this.onload = this.onreadystatechange = null;
              this.parentNode.removeChild(this);
              if (i != last) recursiveLoad(i + 1); else if (typeof(callback) == "function") callback();
          }
      };
      s[i].setAttribute("src", scripts[i]);
      HEAD.appendChild(s[i]);
  };
  recursiveLoad(0);
}