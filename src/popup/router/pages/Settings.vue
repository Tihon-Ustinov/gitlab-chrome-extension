<template>
    <div class="row">
        <breaker class="center" :defaultState="enabledApp" @toggle="toggleState"></breaker>
        <h3 style="text-align: center; margin-bottom: unset; margin-top: 5px">{{ enabledApp ? 'Включено' : 'Выключено'
            }}</h3>
        <div class="empty-projects" :class="{'add-project-not-view': !!projects.length && !viewAddProject}">
            <h3 v-if="projects.length === 0">у вас еще нет добавленных проектов</h3>
            <custom-input :placeholder="'URL проекта'" v-if="renderComponent" @change="inputProject"></custom-input>
            <h3 v-if="newDomain.length && (viewAddProject || !projects.length)" style="margin-top: 20px">host: {{ newDomain }}</h3>
            <h3 v-if="newProject.length && (viewAddProject || !projects.length)">path: {{ newProject }}</h3>
            <h3 v-if="newProjectStatus.length && (viewAddProject || !projects.length)">status: {{ newProjectStatus }}</h3>
            <div style="margin-bottom: 14px; margin-top: 7px" class="btn btn-success center" @click="addProject" :style="{visibility: urlProject.length ? 'visible' : 'hidden'}"><span
                    class="icon icon-plus"></span>&nbsp;&nbsp;<span>добавить</span></div>
            <span v-if="projects.length" class="open-add-project-wrap">
                    <h3 class="open-add-project" v-if="!viewAddProject" @click="viewAddProject = true"><span class="icon icon-arrow-up"></span>&nbsp;&nbsp;добавить проект</h3>
                    <span v-else>
                        <br>
                        <h3 class="btn btn-success center" @click="viewAddProject = false"><span>отмена</span></h3>
                    </span>
                </span>
        </div>
        <div class="projects">

            <div :class="{hidden: !(!!projects.length && !viewAddProject)}">
                <project v-for="project in projects" :project="project"></project>
            </div>
        </div>
    </div>
</template>

<script>
  import breaker from "./ui/breaker";
  import customInput from "./ui/customInput";
  import project from "./ui/project";
  import store from '../../../store';

  const projectRegex = /(https?:\/\/)([0-9a-z\.\-]+)\/(.+)/gm;
  export default {
    name: "Settings",
    components: {
      breaker,
      customInput,
      project
    },
    data() {
      return {
        enabledApp: store.getters.enabledApp,
        addProjectProcess: false,
        newDomain: '',
        newProject: '',
        urlProject: '',
        newProjectStatus: '',
        renderComponent: true,
        viewAddProject: false
      };
    },
    methods: {
      forceRerender () {
        this.renderComponent = false
        this.$nextTick().then(() => {
          this.renderComponent = true
        })
      },
      toggleState(state) {
        this.enabledApp = state
        store.dispatch('setEnabledApp', state);
      },
      inputProject(url) {
        this.newProjectStatus = 'проверяется'
        if (url.length) {
          while (url.length && (url[url.length - 1] === '/' || url[url.length - 1] === '#')) {
            if (url[url.length - 1] === '/') {
              url = url.substring(0, url.length - 1)
              continue
            }
            if (url[url.length - 1] === '#') {
              url = url.substring(0, url.length - 1)
            }
          }
          fetch(url + '/pipelines.json?scope=all&page=1')
            .then(result => {
              let isAddUrl = true
              if (result.status === 200) {
                this.newProjectStatus = 'доступен'
                result.json().then(res => console.log(res))
              } else {
                isAddUrl = false
                this.newProjectStatus = 'не доступен'
              }
              let match = Array.from(url.matchAll(projectRegex))
              if (match.length) {
                match = match[0]
                if (match[2]) {
                  this.newDomain = match[2]
                } else {
                  isAddUrl = false
                  this.newDomain = 'не найден'
                }
                if (match[3]) {
                  this.newProject = match[3]
                } else {
                  isAddUrl = false
                  this.newProject = 'не найден'
                }
              } else {
                isAddUrl = false
                this.newDomain = 'не найден'
                this.newProject = 'не найден'
              }
              if (isAddUrl) {
                this.urlProject = url
              }
            }).catch(err => {
            this.urlProject = ''
            this.newDomain = 'не найден'
            this.newProject = 'не найден'
            this.newProjectStatus = 'не доступен'
          })
        } else {
          this.newDomain = ''
          this.newProject = ''
        }
      },
      addProject () {
        let project = Object.assign({}, store.getters.newProject)
        project.url = this.urlProject
        project.host = this.newDomain
        project.project = this.newProject
        store.dispatch('addProject', project);
        this.newDomain = ''
        this.newProject = ''
        this.urlProject = ''
        this.newProjectStatus = ''
        this.viewAddProject = false
        this.forceRerender()
      }
    },
    computed: {
      projects: function () {
        return store.getters.projects
      }
    }
  }
</script>

<style lang="sass" scoped>
    .hidden
        display: none
    .row
        width: 100%
        /*height: 100%*/
        display: block
        overflow: auto

        .center
            margin: auto

        .projects
            display: inline-block
            height: 365px
            border-radius: 15px
            width: 100%
            overflow-y: auto
            position: relative

        .empty-projects
            z-index: 999
            position: absolute
            top: 25%
            display: inline-block
            width: 96%
            overflow: hidden
            text-align: center
            transition: 0.5s
        .add-project-not-view
            bottom: 0
            top: unset
            height: 30px
            div
                display: none
            .open-add-project-wrap
                position: absolute
                padding: 5px 0
                bottom: 0
                left: 0
                height: fit-content
                display: block
                width: 100%
                -moz-box-shadow: 0 0 10px #403368
                -webkit-box-shadow: 0 0 10px #403368
                box-shadow: 0 0 10px #403368
            .open-add-project
                width: fit-content
                display: inline-block
                margin: 0
                padding: 0 5px
                cursor: pointer
                transition: 0.3s
                .icon
                    transition: 0.3s
                &:hover
                    color: #21E76E
                    .icon
                        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MS45OTYgNDkxLjk5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkxLjk5NiA0OTEuOTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ4NC4xMzIsMTI0Ljk4NmwtMTYuMTE2LTE2LjIyOGMtNS4wNzItNS4wNjgtMTEuODItNy44Ni0xOS4wMzItNy44NmMtNy4yMDgsMC0xMy45NjQsMi43OTItMTkuMDM2LDcuODZsLTE4My44NCwxODMuODQ4ICAgIEw2Mi4wNTYsMTA4LjU1NGMtNS4wNjQtNS4wNjgtMTEuODItNy44NTYtMTkuMDI4LTcuODU2cy0xMy45NjgsMi43ODgtMTkuMDM2LDcuODU2bC0xNi4xMiwxNi4xMjggICAgYy0xMC40OTYsMTAuNDg4LTEwLjQ5NiwyNy41NzIsMCwzOC4wNmwyMTkuMTM2LDIxOS45MjRjNS4wNjQsNS4wNjQsMTEuODEyLDguNjMyLDE5LjA4NCw4LjYzMmgwLjA4NCAgICBjNy4yMTIsMCwxMy45Ni0zLjU3MiwxOS4wMjQtOC42MzJsMjE4LjkzMi0yMTkuMzI4YzUuMDcyLTUuMDY0LDcuODU2LTEyLjAxNiw3Ljg2NC0xOS4yMjQgICAgQzQ5MS45OTYsMTM2LjkwMiw0ODkuMjA0LDEzMC4wNDYsNDg0LjEzMiwxMjQuOTg2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMjFFNzZFIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=)
        .btn
            display: inline-block
            max-height: 50px
            padding: 5px 7px
            cursor: pointer
            border: solid 1px #ccc
            border-radius: 5px
            background-color: #ADAFB6
            font-weight: bold
            font-size: 12px
            text-transform: uppercase
            transition: 0.3s

            .icon
                height: 12px
                width: 12px
                vertical-align: middle

        .btn-success
            background-color: #21E76E
            border: solid 1px #68e782

            &:hover
                -moz-box-shadow: 0 0 10px #68e782
                -webkit-box-shadow: 0 0 10px #68e782
                box-shadow: 0 0 10px #68e782
</style>
