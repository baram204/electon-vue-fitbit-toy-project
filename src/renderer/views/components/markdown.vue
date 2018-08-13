<template>
    <div>
        <vue-markdown>## ddd</vue-markdown>
        <md-viewer src="components/markdown.md"></md-viewer>
    </div>
</template>

<script>
  export default {
    name: 'markdown',
    components: {'md-viewer': require('@/components/MdViewer').default}
  }
</script>

<style scoped>

</style>
