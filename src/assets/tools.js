export default class tools {
  ifStorage() {
    //HTML5存储是否可用
    if (typeof Storage !== 'undefined') {
      return true
    } else {
      return false
    }
  }
}
