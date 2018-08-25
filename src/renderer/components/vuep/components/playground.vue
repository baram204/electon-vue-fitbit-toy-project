<script>
  import Editor from './editor'
  import Preview from './preview'

  export default {
    name: 'Vuep',

    props: {
      template: String,
      options: {},
      keepData: Boolean,
      value: String,
      scope: Object,
      iframe: Boolean
    },

    data () {
      return {
        content: '',
        preview: '',
        styles: '',
        error: '',

        // require 에서 필요한 거
        cache: {},
        scopeDecl: ''
      }
    },

    render (h) {
      let win

      /* istanbul ignore next */
      if (this.error) {
        win = h('div', {
          class: 'vuep-error'
        }, [this.error])
      } else {
        win = h(Preview, {
          class: 'vuep-preview',
          props: {
            value: this.preview,
            styles: this.styles,
            keepData: this.keepData,
            iframe: this.iframe
          },
          on: {
            error: this.handleError
          }
        })
      }

      return h('div', {class: 'vuep'}, [
        h(Editor, {
          class: 'vuep-editor',
          props: {
            value: this.content,
            options: this.options
          },
          on: {
            change: [this.executeCode, val => this.$emit('input', val)]
          }
        }),
        win
      ])
    },

    watch: {
      value: {
        immediate: true,
        handler (val) {
          val && this.executeCode(val)
        }
      }
    },

    created () {
      /* istanbul ignore next */
      if (this.$isServer) return
      let content = this.template

      if (/^[.#]/.test(this.template)) {
        const html = document.querySelector(this.template)
        if (!html) throw Error(`${this.template} is not found`)

        /* istanbul ignore next */
        content = html.innerHTML
      }

      if (content) {
        this.executeCode(content)
        this.$emit('input', content)
      }
    },

    methods: {
      handleError (err) {
        /* istanbul ignore next */
        this.error = err
      },
      executeCode (code) {
        this.error = ''
        const result = this.parser(code)

        /* istanbul ignore next */
        if (result.error) {
          this.error = result.error.message
        }

        const compiledCode = this.compiler(result, this.scope)

        /* istanbul ignore next */
        if (compiledCode.error) {
          this.error = compiledCode.error.message
        }

        this.content = result.content
        this.preview = compiledCode.result
        if (compiledCode.styles) this.styles = compiledCode.styles
      },
      compiler ({template, script = 'module.exports={}', styles}, scope = {}) {
        try {
          if (script === 'module.exports={}' && !template) throw Error('no data')
          const result = this.evalJS(script, scope)
          this.test()
          if (template) {
            result.template = template
          }
          return {
            result: result,
            styles: styles && styles.join(' ')
          }
        } catch (error) {
          return {error}
        }
      },
      test () {
        console.log('test')
      },
      evalJS (script, scope = {}) {
        // https://www.npmjs.com/package/babel-standalone
        /* istanbul ignore next */

        if (typeof Babel !== 'undefined') {
          const plugins = []

          // Register jsx plugin
          if (window['babel-plugin-transform-vue-jsx']) {
            if (!Babel.availablePlugins['transform-vue-jsx']) { // eslint-disable-line
              Babel.registerPlugin('transform-vue-jsx', window['babel-plugin-transform-vue-jsx']) // eslint-disable-line
            }
            plugins.push('transform-vue-jsx')
          }

          script = Babel.transform(script, { // eslint-disable-line
            presets: [['es2015', {'loose': true}], 'stage-2'],
            plugins,
            comments: false
          }).code
        }

        console.log(scope)
        const aScope = [...scope]
        aScope.map(variable => {
          this.scopeDecl += scope.hasOwnProperty(variable)
            ? 'var ' + variable + ' = __vuep[\'' + variable + '\'];'
            : ''
        })
        script = `(function(exports){var module={};module.exports=exports;${this.scopeDecl};${script};return module.exports.__esModule?module.exports.default:module.exports;})({})`
        const result = new Function('__vuep', 'return ' + script)(scope) || {} // eslint-disable-line
        return result
      },
      require (url) {
        // 이건 안 들어가도 될 거 같은데?
        window.require = this.require
        const JSMODULE_REG = /\.((js)|(jsx))$/

        if (JSMODULE_REG.test(url)) {
          return this.getAndCache(url)
        }
      },
      /**
       * Simple ajax get
       * @param {string} url
       * @return { then(resolve, reject), abort }
       */
      // modify from docsify: https://github.com/QingWei-Li/docsify/blob/master/src/core/fetch/ajax.js
      getAndCache (url) {
        const xhr = new XMLHttpRequest() // eslint-disable-line
        const cache = this.cache

        if (cache[url]) {
          return cache[url]
        }

        xhr.open('GET', url, false)
        xhr.send()
        const script = xhr.responseText
        cache[url] = this.evalJS(script)
        return cache[url]
      },
      parser (input) {
        const html = document.createElement('div')
        const content = html.innerHTML = input.trim()

        try {
          const template = html.querySelector('template')
          const script = html.querySelector('script')
          const styles = Array.prototype.slice.call(html.querySelectorAll('style')).map(n => n.innerHTML)

          console.log(!template && !script && !styles.length)
          if (!template && !script && !styles.length) {
            return {
              content,
              script: content
            }
          }

          return {
            content: /<\/script>$/g.test(content) ? content : (content + `<//script>`),
            template: template ? template.innerHTML : '',
            script: script ? script.innerHTML : '',
            styles: styles
          }
        } catch (error) {
          /* istanbul ignore next */
          return {error}
        }
      }
    }
  }
</script>
