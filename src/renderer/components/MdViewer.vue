<template>
    <vue-markdown :source="mdText"></vue-markdown>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  // import axios from 'axios'
  import path from 'path'
  import {remote} from 'electron'
  import fs from 'fs'

  export default {
    name: 'md-viewer',
    props: ['src'],
    components: {
      VueMarkdown
    },
    data: function () {
      return ({
        'mdText': '',
        filePath: path.join(remote.app.getAppPath(), `/src/renderer/views/${this.src}`)
      })
    },
    mounted () {
      // axios.get(this.path).then(response => {
      //   this.mdText = response.data
      // })
      // fetch(this.path, {mode: 'no-cors'}).then(response => {
      //   this.mdText = response.data
      // })
      if (this.src === undefined) {
        console.log('No file selected')
      }

      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        if (err) {
          alert(`파일 읽는 중 오류 발생! : ${err.message}`)
        } else {
          this.mdText = data
        }
      })

      // callback 이 필요 없으면 readFileSync 메소드를 써도 됨
      // fs.readFileSync(path.join(__static, '/someFile.txt'), 'utf8')
    }
  }
</script>

<style lang="scss" scoped>

</style>
