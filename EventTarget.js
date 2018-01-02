// EventTarget是一个可以接受事件的对象实现,并且可以为它们创建监听器(listener)
// 其中包括Element元素, Document文档, 以及window窗口,其他的对象也可为事件目标,从webAPI提供的事件类型的说明中就可以看到
// 例如: XMLHttpRequest, AudioNode, AudioContext
// EventTarget.addEventListener():注册特定类型的事件处理程序
// EventTarget.removeEventListener():删除事件侦听器
// EventTarget.dispatchEventListener():将时间分派到此EventTarget
var EventTarget = function() {
  this.listeners = {};
}

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if(!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if(!(type in this.listener)) {
    return;
  }
  var stack = this.listeners[type];
  for(var i = 0, l = stack.length; i < l; i++) {
    if(stack[i] === callback) {
      stack.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }
};

EventTarget.prototype.dispatchEvent = function(event){
  if(!(event.type in this.listeners)) {
    return;
  }
  var stack = this.listeners[event.type];
  event.target = this;
  for( var i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }
};  
