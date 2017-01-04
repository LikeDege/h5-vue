// not a good way but works well
if(typeof window != 'undefined') {
  window.__$vuxPopups = window.__$vuxPopups || {}
}
const popupDialog = function (option) {
  this.uuid = Math.random().toString(36).substring(3, 8)
  this.params = {}
  this.isShow = false
  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = {
      input: option.input || '',
      container: document.querySelector(option.input) || '',
      innerHTML: option.innerHTML || '',
      hideOnBlur: option.hideOnBlur,
      onOpen: option.onOpen || function () {},
      onClose: option.onClose || function () {}
    }
  }
  if (!!document.querySelectorAll('.popup-mask').length <= 0) {
    this.divMask = document.createElement('a')
    this.divMask.className = 'popup-mask'
    this.divMask.dataset.uuid = '' // 用于多个popup共享一个mask
    this.divMask.href = 'javascript:void(0)'
    document.body.appendChild(this.divMask)
  }
  let div
  if (!option.container) {
    div = document.createElement('div')
  } else {
    div = option.container
  }
  div.classList.add('popup-dialog')
  div.classList.add('popup-dialog-' + this.uuid);

  if (!option.container) {
    document.body.appendChild(div)
  }
  this.container = document.querySelector('.popup-dialog-' + this.uuid)
  this.mask = document.querySelector('.popup-mask')
  this.mask.dataset.uuid += `,${this.uuid}`
  this._bindEvents()
  option = null
  return this
}

popupDialog.prototype.onClickMask = function () {
  if (this.params.hideOnBlur && this.isShow) {
    this.hide(false)
  }
}

popupDialog.prototype._bindEvents = function () {
  this.params.hideOnBlur && this.mask.addEventListener('click', this.onClickMask.bind(this), false)
}

popupDialog.prototype.show = function () {
  this.mask.classList.add('popup-show')
  this.container.classList.add('popup-show')
  this.params.onOpen && this.params.onOpen(this)
  this.isShow = true
  window.__$vuxPopups[this.uuid] = 1
}

popupDialog.prototype.hide = function (shouldCallback = true) {
  this.container.classList.remove('popup-show')
  if (!document.querySelector('.popup-dialog.popup-show')) {
    this.mask.classList.remove('popup-show')
  }
  shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this)
  this.isShow = false
  delete window.__$vuxPopups[this.uuid]
}

popupDialog.prototype.html = function (html) {
  this.container.innerHTML = html
}

popupDialog.prototype.destroy = function () {
  this.mask.dataset.uuid = this.mask.dataset.uuid.replace(new RegExp(`,${this.uuid}`, 'g'), '')
  if (!this.mask.dataset.uuid) {
    this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
    this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
  } else {
    this.hide()
  }
  delete window.__$vuxPopups[this.uuid]
}

export default popupDialog
