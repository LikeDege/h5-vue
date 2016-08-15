exports.install = function (Vue, options) {
    const DEFAULT_URL = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='
    if (!options) {
        options = {
          error: DEFAULT_URL,
          loading: DEFAULT_URL,
          try: 3
        }
    }
    const init = {
        error: options.error ? options.error : DEFAULT_URL,
        loading: options.loading ? options.loading : DEFAULT_URL,
        hasbind: false,
        isInChild: false,
        childEl: null,
        try: options.try ? options.try : 1
    }

    const listeners = []

    const debounce = function (action, idle) {
        let last
        return function () {
            let args = arguments
            clearTimeout(last)
            last = setTimeout(() => {
                action.apply(this, args)
            }, idle)
        }
    }

    const lazyLoadHandler = debounce(() => {
        for(let i = 0; i < listeners.length; ++i) {
            const listener = listeners[i]
            checkCanShow(listener)
        }
    }, 80)

    const checkCanShow = function (listener) {
        let winH
        let top
        if (listener.parentEl) {
            winH = listener.parentEl.offsetHeight
            top = listener.parentEl.scrollTop
        } else {
            winH = window.screen.availHeight
            top = document.documentElement.scrollTop || document.body.scrollTop
        }
        
        let height = top + winH;
        if (listener.y < height) {
            render(listener)
        }
    }

    const render = function (item) {
        if (item.try >= init.try) {
            return false
        }
        item.try++

        loadImageAsync(item)
        .then((url) => {
            let index = listeners.indexOf(item)
            if (index !== -1) {
                listeners.splice(index, 1)
            }
            if (!item.bindType) {
                item.el.setAttribute('src', item.src)
            } else {
                item.el.setAttribute('style', item.bindType + ': url(' + item.src + ')')
            }
            item.el.setAttribute('lazy', 'loaded')

        })
        .catch((error) => {
            if (!item.bindType) {
                item.el.setAttribute('src', init.error)
            } else {
                item.el.setAttribute('style', item.bindType + ': url(' + init.error + ')')
            }
            item.el.setAttribute('lazy', 'error')
        })
    }

    const loadImageAsync = function (item) {
        if (!item.bindType) {
            item.el.setAttribute('src', init.loading)
        } else {
            item.el.setAttribute('style', item.bindType + ': url(' + init.loading + ')')
        }

        return new Promise(function(resolve, reject) {
            let image = new Image()
            image.src = item.src

            image.onload = function() {
                resolve(item.src)
            }

            image.onerror = function() {
                reject()
            }

        })
    }

    const componentWillUnmount = function (el) {
        let i
        let len = listeners.length
        for (i=0; i<len; i++) {
            if (listeners[i].el == el) {
                listeners.splice(i,1)
            }
        }

        if (listeners.length == 0 && init.hasbind) {
            init.hasbind = false;
            window.removeEventListener('scroll', lazyLoadHandler)
            window.removeEventListener('resize', lazyLoadHandler)
        }
      }

    Vue.directive('lazy', {
        bind: function() {
            if (!init.hasbind) {
                init.hasbind = true;
                Vue.nextTick(() => {
                    if(document.getElementById(Object.keys(this.modifiers)[0])) {
                      init.isInChild = true
                      init.childEl = document.getElementById(Object.keys(this.modifiers)[0])
                    }
                    if(init.isInChild) {
                      init.childEl.addEventListener('scroll', lazyLoadHandler)
                    }
                    window.addEventListener('scroll', lazyLoadHandler)
                    window.addEventListener('resize', lazyLoadHandler)
                    lazyLoadHandler()
                })
            }
        },
        update: function(newValue, oldValue) {
            this.el.setAttribute('lazy', 'loading')
            if (!this.arg) {
                this.el.setAttribute('src', init.loading)
            } else {
                this.el.setAttribute('style', this.arg + ': url(' + init.loading + ')')
            }
            let parentEl = null
            this.vm.$nextTick(() => {
                if(document.getElementById(Object.keys(this.modifiers)[0])) {
                  parentEl = document.getElementById(Object.keys(this.modifiers)[0])
                }
                listeners.push({
                    bindType: this.arg,
                    try: 0,
                    parentEl: parentEl,
                    el: this.el,
                    src: newValue,
                    y: this.el.y,
                })
                lazyLoadHandler()
            })
        },
        unbind: function (src) {
            if (!this.el) return
            componentWillUnmount(this.el)
        }
    })
}
