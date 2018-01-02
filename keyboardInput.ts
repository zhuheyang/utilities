export class keyboardInput {
  // 键盘框的输入管理
  inputNum: string; integer = 0; decimal = 0; decimalPoint = false;
  // 相关警告信息以及图标的设置
  minWarning = '';
  minWarningIcon = '';
  maxWarning = '';
  maxWarningIcon = '';
  pageInfo = {
    desc: '发送请求获得的页面信息,为对象',
    limitAmount: 40,
  };
  
  keyboardInput(input: string): void {
    switch (input) {
      case '.':
        this.decimalPoint = true;
        break;
      default:
        if (this.decimalPoint) {
          if (input === '5' || input === '0') {
            this.decimal = Number(input) * 10;
          } else {
            // 默认用户想输入0.5元,以免无相关操作显示
            this.decimal = Number(5) * 10;
            this.warningActive(this.minWarning, this.minWarningIcon);
          }
        } else {
          const tmpResult = this.integer * 10 + Number(input);
          if (tmpResult <= this.pageInfo.limitAmount) {
            this.integer = tmpResult;
          } else {
            this.warningActive(this.maxWarning, this.maxWarningIcon);
          }
        }
        break;
    }
    this.formatAmount();
  }
  
  // 格式化最终金额用于显示
  formatAmount(): void {
    let resultAdd: string = this.integer.toString();
    if (this.decimalPoint && this.decimal === 50) {
      resultAdd += '.' + this.decimal.toString();
    } else {
      resultAdd += '.00';
    }
    this.inputNum = resultAdd;
  }

  // 重置键盘金额
  resetKeyboard(): void {
    this.inputNum = null;
    this.integer = 0;
    this.decimal = 0;
    this.decimalPoint = false;
  }

  // 弹出对应的警告提示, 不能超过最大金额与最小金额
  warningActive(warningMessage, warningIcon):void {
  }
}