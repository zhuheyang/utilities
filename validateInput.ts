export function sendQuickTask() {
  // 检测description是否存在(undefined), 是否为空, 是否输入空格以及字符串是否过长
  if (!this.desc || this.desc.length === 0 || !this.desc.trim() || this.desc.length > 20) {
    return;
  }
  this.quickTask.emit(this.desc);
  // 同时清空输入框内容
  this.desc = '';
}