<template>
  <div>
       <div v-if="projectNotifications.every(project => project.notifications.length === 0)" class="empty-message">
           <h3>новых<br>уведомлений<br>нет</h3>
           <img src="/icons/neutral.svg" alt="">
       </div>
      <div v-else class="projects-viewer">
          <span v-for="group in projectNotifications.filter(g => g.notifications.length)">
            <div class="projects-wrapper">
                <div class="project-name" @click="toggleExpand(projectExpand, group)"><span class="icon" :class="{'icon-arrow-up': ~projectExpand.indexOf(group), 'icon-arrow-down': !~projectExpand.indexOf(group)}"></span> {{ group.project.name }}</div>
                <div class="project-notification" v-if="~projectExpand.indexOf(group)">
                    <span v-for="(notification, index) in group.notifications">
                        <notification :notification="notification" :defaultExpand="index === 0" @removeNotification="removeNotification(group, notification)"></notification>
                        <hr v-if="index !== group.notifications.length-1 && group.notifications.length > 1">
                    </span>
                </div>
            </div>
          </span>
      </div>
  </div>
</template>

<script>
  import store from '../../../store';
  import notification from "./ui/notification";
export default {
  data() {
    return {
      projectExpand: [],
      projectNotifications: []
    };
  },
  components: {
    notification
  },
  mounted () {
    this.projectNotifications = this.groupProject()
  },
  methods: {
    removeNotification (group, notification) {
      let index = group.notifications.indexOf(notification)
      console.log(index)
      if (~index) {
        group.notifications.splice(index, 1)
      }
    },
    groupProject () {
      let pipelines = store.getters.notifications
      let projects = []
      for (let pipeline of pipelines) {
        let project = projects.find(p =>
          (p.project.full_name + p.project.id) === (pipeline.project.full_name + pipeline.project.id)
        )
        if (!project) {
          project = {
            project: pipeline.project,
            notifications: []
          }
          projects.push(project)
          if (this.projectExpand.length === 0) {
            this.projectExpand.push(project)
          }
        }
        project.notifications.push(pipeline)
      }
      return projects
    },
    toggleExpand(arr, item) {
      let index = arr.indexOf(item)
      if (~index) {
        arr.splice(index, 1)
      } else {
        arr.push(item)
      }
    }
  }
};
</script>

<style lang="sass" scoped>
    .empty-message
        /*background-color: rgba(255, 255, 255, 0.3)*/
        width: 100%
        height: fit-content
        position: absolute
        top: 20%
        left: 0
        text-align: center
        h3
            font-size: 26px
        img
            width: 50%
    .projects-viewer
        display: block
        height: 483px
        width: 100%
        overflow-y: auto
        overflow-x: hidden
    .projects-wrapper
        padding: 5px
        display: block
        width: 96%
    .project-name
        transition: 0.3s
        display: block
        font-size: 14px
        font-weight: 100
        text-align: left
        cursor: pointer
        width: 100%
        padding: 0 5px
        .icon
            display: inline-block
            height: 14px
            width: 14px
            vertical-align: middle
        &:hover
            /*color: #21E76E*/
</style>
