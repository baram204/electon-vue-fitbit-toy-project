<template>
    <div class="wrapper">
        <slot name="sidebar-header"></slot>

        <nav id="sidebar" ref="sidebar">
            <p class="heading" v-if="heading" v-html="heading"></p>
            <tree-menu :nodes="links">sdfsdf</tree-menu>
        </nav>

        <div id="main">
            <nav class="navbar navbar-expand navbar-light bg-light" v-if="showHeader">

                <a href="#" @click.prevent="toggleSidebar"><span class="navbar-toggler-icon"></span></a>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <slot name="header-links">
                        <ul class="navbar-nav ml-auto">
                            <li v-for="link in headerLinks" class="nav-item" :class="{dropdown: !!link.links}">
                                <template v-if="link.links">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="false">{{link.label}}</a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <div v-for="item in link.links" :class="{'dropdown-divider': item.separator}">
                                            <dyna-link :link="item" v-if="!item.separator"
                                                       class="dropdown-item"></dyna-link>
                                        </div>
                                    </div>
                                </template>
                                <dyna-link :link="link"
                                           :class="{'nav-link': !link.button, ['btn btn-sm my-sm-1 ' + (link.buttonClass || 'btn-success')]: link.button}"
                                           v-else></dyna-link>
                            </li>
                        </ul>
                    </slot>
                </div>
            </nav>

            <div id="content">
                <slot>
                    <div v-for="i in 100">
                        <h3>Lorem Ipsum Dolor</h3>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of
                            type and scrambled it to make a type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised
                            in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                            recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.</p>
                    </div>
                </slot>
            </div>
        </div>
    </div>

</template>

<script>
  import TreeMenu from './TreeMenu'
  import DynaLink from './DynaLink'

  export default {
    props: {
      heading: {type: String},
      links: {type: Array},
      'show-header': {type: Boolean, default: true},
      'header-links': {type: Array}
    },
    components: {DynaLink, TreeMenu},
    methods: {
      toggleSidebar () {
        this.$refs.sidebar.classList.toggle('active')
      }
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: stretch;
        width: 100%;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        background: #7386D5;
        color: #fff;
        transition: all 0.3s;
    }

    #sidebar p.heading {
        padding: 10px 10px 0;
        font-size: 1.5em;
    }

    #sidebar.active {
        margin-left: -250px;
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background: #6d7fcc;
    }

    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    /* ---------------------------------------------------
        CONTENT STYLE
    ----------------------------------------------------- */
    #main {
        min-height: 100vh;
        flex-grow: 1;
        transition: all 0.3s ease;
    }

    #content {
        padding: 20px;
    }

    /* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */
    @media (max-width: 768px) {
        #sidebar {
            margin-left: -250px;
        }

        #sidebar.active {
            margin-left: 0;
        }

        #sidebarCollapse span {
            display: none;
        }
    }
</style>
