<template>
    <div class="member-wrapper">
        <img v-if="showDefaultAvatar" :src="getDefaultAvatar()" class="member-avatar">
        <img v-else :src="member.avatar" class="member-avatar">
        <div class="member-info" :class="{green: member.enabled && project.enabled, red: !member.enabled && project.enabled, 'w-85': openSettings}">
            <span class="member-name">
                {{ member.name }}
            </span>
                <span class="member-nickname">
                {{ member.nickname }}
            </span>
        </div>
        <div class="remove-btn" v-if="openSettings" @click="removeMember">
            <span class="icon-trash"></span>
        </div>
        <div class="setting-btn" @click="openSettings = !openSettings"><span class="icon icon-settings"></span></div>
        <div class="member-setting" :class="{hidden: !openSettings}">
            <div class="item">
                <div class="item-checkbox">
                    <custom-checkbox @change="toggleEnabled" :defaultValue="member.enabled" :groupName="member.nickname + '-alert'"></custom-checkbox>
                </div>
                <div class="item-text">
                    уведомления
                </div>
            </div>
            <div class="item">
                <div class="item-checkbox">
                    <custom-checkbox @change="toggleMerge" :defaultValue="~member.merge.indexOf('*')" :groupName="member.nickname + '-merge'"></custom-checkbox>
                </div>
                <div class="item-text">
                    запросы на слияние
                </div>
            </div>
            <div class="item">
                <div class="item-checkbox">
                    <custom-checkbox @change="toggleBranches" :defaultValue="~member.branches.indexOf('*')" :groupName="member.nickname + '-branch'"></custom-checkbox>
                </div>
                <div class="item-text">
                    ветви
                </div>
            </div>
            <div class="item">
                <div class="item-checkbox">
                    <custom-checkbox @change="toggleTag" :defaultValue="~member.tags.indexOf('*')" :groupName="member.nickname + '-tag'"></custom-checkbox>
                </div>
                <div class="item-text">
                    теги
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import customCheckbox from "./customCheckbox";
    import store from "../../../../store";
    import Swal from 'sweetalert2/dist/sweetalert2.min.js'
    import md5 from 'md5'
  export default {
    name: "member",
    components: {
      customCheckbox
    },
    props: {
      project: Object,
      member: Object
    },
    data () {
      return {
        showDefaultAvatar: true,
        openSettings: false
      }
    },
    created() {
      console.log('created')
      fetch(this.member.avatar)
        .then(res => {
          res.blob().then(blob => {
            console.log(blob)
            if (~blob.type.indexOf('image')) {
              this.showDefaultAvatar = false
            }
          })
        })
    },
    methods: {
      getDefaultAvatar() {
        return `https://www.gravatar.com/avatar/${md5(this.member.name + this.member.nickname )}?s=80&d=identicon#/`
      },
      removeMember() {
        Swal.fire({
          title: 'Уверены?',
          text: "Отменить действие будет нельзя!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#68e782',
          cancelButtonColor: '#EB2C59',
          cancelButtonText: 'Нет',
          confirmButtonText: 'Да'
        }).then((result) => {
          if (result.value) {
            store.dispatch('deleteMember', {project: this.project, member: this.member});
            Swal.fire(
              'Успешно!',
              this.member.nickname + ' удален(а)',
              'success'
            )
          }
        })
      },
      toggleEnabled: function (nevVal) {
        store.dispatch('toggleEnabledMember', {
          project: this.project,
          member: this.member,
          value: nevVal
        });
      },
      toggleMerge: function (nevVal) {
        store.dispatch('toggleMergeMember', {
          project: this.project,
          member: this.member,
          value: nevVal
        });
      },
      toggleBranches: function (nevVal) {
        store.dispatch('toggleBranchesMember', {
          project: this.project,
          member: this.member,
          value: nevVal
        });
      },
      toggleTag: function (nevVal) {
        store.dispatch('toggleTagMember', {
          project: this.project,
          member: this.member,
          value: nevVal
        });
      }
    }
  }
</script>

<style lang="sass" scoped>
    .member-wrapper
        display: inline-block
        width: 100%
        padding-bottom: 5px
    .member-avatar
        display: inline-block
        width: 25px
        height: 25px
        border-radius: 50%
        vertical-align: top
    .member-info
        display: inline-block
        width: calc(100% - 60px)
        .member-nickname, .member-name
            display: inline-block
            width: 100%
            padding: 0
            font-size: 14px
            font-weight: 100
            transition: 0.3s
    .w-85
        width: calc(100% - 81px)
    .setting-btn
        display: inline-block
        height: 18px
        width: 18px
        vertical-align: top
        cursor: pointer
        .icon
            width: 100%
            height: 100%
    .member-setting
        transition: 0.3s
        padding-left: 28px
        .item
            display: inline-block
            width: 100%
            padding-bottom: 3px
            .item-text
                display: inline-block
                vertical-align: middle
                font-size: 14px
                font-weight: 100
            .item-checkbox
                display: inline-block
                vertical-align: middle
    .remove-btn
        display: inline-block
        vertical-align: top
        height: 18px
        width: 18px
        cursor: pointer
        .icon-trash
            width: 100%
            height: 100%
    .hidden
        visibility: hidden
        display: none
    .green
        color: #21E76E
    .red
        color: #EB2C59
</style>
