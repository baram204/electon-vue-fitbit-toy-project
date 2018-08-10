<template>
    <b-list-group class="tree list-unstyled" :class="className || 'components'">

        <b-list-group-item v-for="(node, i) in nodes" :key="i"
                           :class="{[node.class]: node.class, cta: node.button, separator: node.separator}">

            <template v-if="!node.links">
                <template v-if="!node.separator">
                    <!--<i class="icon fa fa-fw" :class="{[node.icon]: true}" v-if="node.icon"></i>-->
                    <dyna-link :link="node"></dyna-link>
                </template>
            </template>


            <template v-else>
                <a :href="'#' + slug(i)" :ref="slug(i)"
                   data-toggle="collapse" aria-expanded="false"
                   v-html="node.label" role="button" @click="toggleAndActive(slug(i),$refs[slug(i)])">
                </a>
                <b-collapse :visible="slug(i) === expanded ? true : false">
                    <tree-menu :nodes="node.links" :id="slug(i)" :level="level + 1" className="nested"
                               style="padding-left: 20px;"></tree-menu>
                </b-collapse>

            </template>
        </b-list-group-item>
        <b-list-group-item>
            <p>{{$refs}}</p>
        </b-list-group-item>
    </b-list-group>

</template>

<script>
  import TreeMenu from './TreeMenu'
  import DynaLink from './DynaLink'

  export default {
    name: 'tree-menu',
    props: {nodes: {type: Array}, className: {type: String}, level: {type: Number, default: 0}},
    components: {DynaLink, TreeMenu},
    methods: {
      slug (i) {
        return 'node-' + this.level + '-' + i
      },
      toggleAndActive (slugI, el) {
        this.expanded = this.expanded === slugI ? '' : slugI
        alert(this.$refs[slugI].className)
        alert(this.$refs[slugI].className)
      }
    },
    data () {
      return {
        expanded: ''
      }
    }
  }
</script>

<style scoped>

    .list-group-item {
        border: 1px solid rgba(0, 0, 0, 0);
        padding: 0px;
    }

    .list-group.components {
        padding: 0 0 20px;
        border-bottom: 1px solid #47748b;
    }

    .list-group .list-group-item {
        position: relative;
        background-color: #7386D5;
    }

    .list-group .list-group-item a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
        color: #fff;
        transition: none;
    }

    .list-group .list-group-item a:hover {
        color: #7386D5;
        background: #fff;
    }

    .list-group .list-group-item:hover > i.fa {
        pointer-events: none;
    }

    .list-group .list-group-item:hover > i.fa {
        color: #7386D5;
    }

    .list-group .list-group-item.active > a, a[aria-expanded="true"] {
        color: #fff;
        background: #6d7fcc;
    }

    a[data-toggle="collapse"] {
        position: relative;
    }

    a[aria-expanded="false"]::before, a[aria-expanded="true"]::before {
        display: block;
        position: absolute;
        right: 20px;
        top: 20px;
        content: "";
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
        transition: transform 0.4s ease 0.1s;
    }

    a[aria-expanded="true"]::before {
        transform: rotate(180deg);
    }

    .nested a {
        /*font-size: 1em !important;*/
        /*background: #6d7fcc;*/
    }

    .list-group-item.separator {
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        height: 1px;
        margin: 10px 0 11px;
    }

    .list-group-item.cta {
        padding: 20px;
    }

    .list-group-item.cta a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
        background: #fff;
        color: #7386D5;
    }

    .tree >>> .icon {
        position: absolute;
        right: 15px;
        top: 15px;
    }

    >>> a.active {
        background: #98aaff;
    }
</style>
