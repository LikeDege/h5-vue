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
        if (listener.el.y < height) {
            render(listener)
        }
    }

    const setElRender = (el, bindType, src, state) => {
        if (!bindType) {
            el.setAttribute('src', src)
        } else {
            el.setAttribute('style', bindType + ': url(' + src + ')')
        }
        el.setAttribute('lazy', state)
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
            setElRender(item.el, item.bindType, item.src, 'loaded')

        })
        .catch((error) => {
            setElRender(item.el, item.bindType, Init.error, 'error')
        })
    }

    const loadImageAsync = function (item) {
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

    const componentWillUnmount = function (el, binding, vnode, OldVnode) {
        if (!el) return
        let i
        let len = listeners.length
        for (i=0; i<len; i++) {
            if (listeners[i].el == el) {
                listeners.splice(i,1)
                break
            }
        }

        if (listeners.length == 0 && init.hasbind) {
            init.hasbind = false;
            window.removeEventListener('scroll', lazyLoadHandler)
            window.removeEventListener('resize', lazyLoadHandler)
        }
    }

    var addListener = (el, binding, vnode) => {
        if (el.getAttribute('lazy') === 'loaded') return
        let parentEl = null
        
        if (binding.modifiers) {
            parentEl = window.document.getElementById(Object.keys(binding.modifiers)[0])
        }

        setElRender(el, binding.arg, init.loading, 'loading')

        Vue.nextTick(() => {
            let listener = {
                bindType: binding.arg,
                try: 0,
                parentEl: parentEl,
                el: el,
                src: binding.value
            };
            listeners.push(listener)
            checkCanShow(listener)
            if (listeners.length > 0 && !init.hasbind) {
                init.hasbind = true
                window.addEventListener('scroll', lazyLoadHandler)
                window.addEventListener('resize', lazyLoadHandler)
            }
        })
    };

    Vue.directive('lazy', {
        bind: addListener,
        update: addListener,
        unbind:componentWillUnmount
    })
}
