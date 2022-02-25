<template>
    <div class="overlay" :class="{disable: !project.enabled}">
        <span class="project-name">{{ project.project }}</span>
        <div class="setting-btn" @click="openSettings = !openSettings"><span class="icon icon-settings"></span></div>
        <div class="remove-btn" @click="removeProject"><span class="icon icon-trash"></span></div>
        <div class="project-info" :style="{display: openSettings ? 'inline-block' : 'none'}">
            <hr>
            <p>уведомления:
                <span style="display: inline-block; vertical-align: middle">
                    <custom-checkbox @change="toggleProject" :defaultValue="project.enabled" :groupName="project.project"></custom-checkbox>
                </span>
            </p>
            <p>адрес: {{ project.host }}</p>
            <p>участники: {{ project.members.filter(m => m.enabled).length }} / {{ project.members.length }} <span class="icon-plus" style="cursor: pointer" @click="openAddMember = !openAddMember"></span></p>
            <span v-if="openAddMember" class="add-member">
                <custom-input v-if="renderComponent" :placeholder="'Имя участника'" @change="inputNewMemberName" ></custom-input>
                <custom-input v-if="renderComponent" :placeholder="'Никнейм'" @change="inputNewMemberNickname" ></custom-input>
                <p style="text-align: center"><span @click="addNewMember" class="btn center btn-success">добавить</span></p>
            </span>
            <span style="margin-top: 7px" @click="setAllMemberStatus(false)" class="btn center btn-red">отключить всех</span>
            <span style="margin-top: 7px; float: right" @click="setAllMemberStatus(true)" class="btn center btn-success">включить всех</span>
            <hr>
            <div class="members">
                <member v-for="member in project.members" :project="project" :member="member"></member>
            </div>
        </div>
    </div>
</template>
<script>
  import Swal from 'sweetalert2/dist/sweetalert2.min.js'
  import store from '../../../../store';
  import member from "./member";
  import customCheckbox from "./customCheckbox";
  import customInput from "./customInput";
  import md5 from 'md5'
  export default {
    name: "project",
    components: {
      member,
      customCheckbox,
      customInput
    },
    props: {
      project: Object
    },
    data () {
      return {
        openSettings: false,
        openAddMember: false,
        newMemberName: '',
        newMemberNickname: '',
        renderComponent: true
      }
    },
    methods: {
      forceRerender() {
        this.renderComponent = false
        this.$nextTick().then(() => {
          this.renderComponent = true
        })
      },
      setAllMemberStatus (value) {
        store.dispatch('setMembersStatus', {project: this.project, value: value});
      },
      inputNewMemberName (newValue) {
        this.newMemberName = newValue
      },
      inputNewMemberNickname (newValue) {
        if (newValue.length && newValue[0] !== '@') {
          newValue = '@' + newValue
        }
        this.newMemberNickname = newValue
      },
      addNewMember () {
        if (this.newMemberNickname.length > 1 && this.newMemberNickname[0] === '@' && this.newMemberName.length) {
          let newMember = Object.assign({}, store.getters.newMember)
          newMember.name = this.newMemberName
          newMember.nickname = this.newMemberNickname
          newMember.avatar = `https://www.gravatar.com/avatar/${md5(this.newMemberName + this.newMemberNickname)}?s=80&d=identicon#/`
          newMember.enabled = true
          store.dispatch('addMemberInProject', {project: this.project, member: newMember});
          this.forceRerender()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ошибка!',
            text: 'Ввидете корректные данные!',
          })
        }
      },
      removeProject() {
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
            store.dispatch('deleteProject', this.project);
            Swal.fire(
              'Успешно!',
              'Проект удален',
              'success'
            )
          }
        })
      },
      toggleProject (value) {
        store.dispatch('toggleProject', {project: this.project, value: value});
      }
    }
  }
</script>

<style lang="sass" scoped>
    p
        margin: unset
        vertical-align: middle
        font-weight: 100
        font-size: 14px
        padding: 0 5px
    .overlay
        transition: 0.3s
        border-radius: 10px
        margin: 10px auto 10px auto
        padding: 5px
        width: 90%
        height: fit-content
        overflow-x: hidden
        -moz-box-shadow: 0 0 5px #68e782
        -webkit-box-shadow: 0 0 5px #68e782
        box-shadow: 0 0 5px #68e782
        &:hover
            -moz-box-shadow: 0 0 10px #68e782
            -webkit-box-shadow: 0 0 10px #68e782
            box-shadow: 0 0 10px #68e782
    .disable
        -moz-box-shadow: 0 0 5px #EB2C59
        -webkit-box-shadow: 0 0 5px #EB2C59
        box-shadow: 0 0 5px #EB2C59
        &:hover
            -moz-box-shadow: 0 0 10px #EB2C59
            -webkit-box-shadow: 0 0 10px #EB2C59
            box-shadow: 0 0 10px #EB2C59
    .project-name
        display: inline-block
        overflow-x: hidden
        font-weight: 100
        font-size: 14px
        transition: 0.3s
        cursor: pointer
        width: calc(100% - 50px)
    .remove-btn
        margin-left: 5px
    .setting-btn, .remove-btn
        display: inline-block
        width: 18px
        height: 18px
        vertical-align: top
        cursor: pointer
        .icon
            width: 100%
            height: 100%
    .project-info
        transition: 0.3s
        width: 100%
    .add-member
        width: 100%
        display: inline-block
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
    .btn-success
        background-color: #21E76E
        border: solid 1px #68e782

        &:hover
            -moz-box-shadow: 0 0 10px #68e782
            -webkit-box-shadow: 0 0 10px #68e782
            box-shadow: 0 0 10px #68e782
    .btn-red
        background-color: #EB2C59
        border: solid 1px rgba(235, 44, 89, 0.61)

        &:hover
            -moz-box-shadow: 0 0 10px #EB2C59
            -webkit-box-shadow: 0 0 10px #EB2C59
            box-shadow: 0 0 10px #EB2C59
</style>
