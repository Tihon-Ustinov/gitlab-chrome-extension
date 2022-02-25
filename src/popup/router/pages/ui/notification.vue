<template>
    <div class="overlay">
        <div class="status-icon">
            <img :src="getUrlIcon(notification.details.status.favicon)" :title="notification.details.status.text" >
        </div>
        <div class="notification-info">
            <p>title: <b>{{ notification.commit.title }}</b></p>
            <p>branch: <b>{{ notification.branch }}</b></p>
            <p>{{ notification.author.name }}</p>
            <p>(@{{ notification.author.username }})</p>
            <p>{{ getTimeFormat(notification.details.finished_at) }}</p>
            <p style="cursor: pointer" @click="openStageDetails = !openStageDetails" :style="!openStageDetails ? 'color: #21E76E' : ''">stages {{notification.details.stages.length}}</p>
        </div>
        <div class="notification-icon">
            <span class="icon icon-trash" @click="deleteNotification(notification)"></span>
            <span title="open pipeline" @click="openTab(notification.path)" class="icon icon-arrow-out"></span>
        </div>
        <div class="stage-info" v-if="openStageDetails">
            <div class="stage" v-for="stage in notification.details.stages">
                <div class="status-icon">
                    <img :src="getUrlIcon(stage.status.favicon)" :title="stage.status.text" >
                </div>
                <div class="notification-info" style="width: calc(100% - 99px);">
                    <p><b>{{ stage.name }}</b></p>
                    <p><b>{{ stage.title }}</b></p>
                </div>
                <div class="notification-icon">
                    <span title="open pipeline" @click="openTab((stage.path[0] === '/' ? notification.project.protocol + notification.project.host : '') + stage.path)" class="icon icon-arrow-out"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import store from "../../../../store";

  export default {
    name: "notification",
    props: {
      notification: Object,
      defaultExpand: {
        type: Boolean,
        defaultValue: false
      }
    },
    model: {
      event: 'removeNotification'
    },
    data () {
      return {
        openStageDetails: this.defaultExpand
      }
    },
    methods: {
      getUrlIcon: function (url) {
        if (!~url.indexOf('http')) {
          url = this.notification.project.protocol + this.notification.project.host + (url[0] === '/' ? '' : '/') + url
        }
        return url
      },
      getTimeFormat: function (stringDate) {
        let fix2Symbols = text => text.toString().length === 1 ? '0'+text : text
        let date = new Date(stringDate)
        return `${fix2Symbols(date.getHours())}:${fix2Symbols(date.getMinutes())} ${fix2Symbols(date.getDate())}.${fix2Symbols(date.getMonth()+1)}.${date.getFullYear()}`
      },
      openTab: function (url) {
        chrome.tabs.create({
          url,
          active: true
        })
      },
      deleteNotification: function (notification) {
        store.dispatch('removeNotification', notification.id);
        this.$emit('removeNotification')
      }
    }
  }
</script>

<style lang="sass" scoped>
    .overlay
        display: inline-block
        width: 100%
        height: fit-content
    .status-icon
        display: inline-block
        height: 32px
        width: 32px
        vertical-align: top
        img
            width: 32px
            height: 32px
    .notification-info
        display: inline-block
        padding-left: 5px
        height: fit-content
        width: calc(100% - 68px)
    .notification-icon
        vertical-align: top
        display: inline-block
        height: 18px
        width: 18px
        .icon
            width: 18px
            height: 18px
            cursor: pointer
            margin: 2px 0
    .stage-info
        display: block
        width: 100%
        padding-left: 32px
    p
        margin: 0
        padding: 0 1px
        font-weight: 100
        font-size: 12px
</style>
