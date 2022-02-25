<template>
  <div class="container">
    <div class="background"></div>
    <div class="controls">
        <span>{{ currentPageName }}</span>
        <span class="setting-icon" @click="toggleSettings">
        </span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPageName: ''
    };
  },
  created() {
    this.routeName()
  },
  methods: {
    toggleSettings () {
      if (this.$router.currentRoute.path !== '/settings') {
        this.$router.push('/settings')
      } else {
        this.$router.push('/')
      }
      this.routeName()
    },
    routeName () {
      if (this.$router.currentRoute.path === '/') this.currentPageName = 'Уведомления'
      if (this.$router.currentRoute.path === '/settings') this.currentPageName = 'Настройки'
    }
  }
};
</script>
<style lang="sass">
    $red: #EB2C59
    $green: #21E76E
    *
        font-family: 'Open Sans', sans-serif
        user-select: none !important
        ::-webkit-scrollbar
            width: 3px
            height: 3px
            border-radius: 5px
        ::-webkit-scrollbar-button
            background-color: rgba(64, 51, 104, 0.71)
            border-radius: 5px
        ::-webkit-scrollbar-track
            background-color: #cccccc
        ::-webkit-scrollbar-track-piece
            background-color: #cccccc
        ::-webkit-scrollbar-thumb
            background-color: #403368
            border-radius: 5px
        ::-webkit-scrollbar-corner
            background-color: #cccccc
        ::-webkit-resizer
            background-color: rgba(252, 109, 38, 0.5)
            border-radius: 5px
    .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        display: block
        z-index: -1
        opacity: 80%
        background-color: #403368
        /*background-image: url('/icons/gitlab-icon-rgb.svg')*/
        background-repeat: no-repeat
        background-size: 100%
        background-position-x: left
    .controls > span
        display: inline-block
    .setting-icon
        background-image: url('/icons/setings.svg')
        background-repeat: no-repeat
        display: inline-block
        height: 15px
        width: 15px
        cursor: pointer
        background-size: cover
        float: right
        transition: 0.3s
        &:hover
            margin-top: -1px
            margin-right: -1px
            height: 18px
            width: 18px
    .container
        width: 300px !important
        height: 500px !important
        color: whitesmoke !important
    .icon-plus
        transition: 0.3s
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjUxMiI+PGc+PHBhdGggZD0ibTQwOCAxODRoLTEzNmMtNC40MTc5NjkgMC04LTMuNTgyMDMxLTgtOHYtMTM2YzAtMjIuMDg5ODQ0LTE3LjkxMDE1Ni00MC00MC00MHMtNDAgMTcuOTEwMTU2LTQwIDQwdjEzNmMwIDQuNDE3OTY5LTMuNTgyMDMxIDgtOCA4aC0xMzZjLTIyLjA4OTg0NCAwLTQwIDE3LjkxMDE1Ni00MCA0MHMxNy45MTAxNTYgNDAgNDAgNDBoMTM2YzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDh2MTM2YzAgMjIuMDg5ODQ0IDE3LjkxMDE1NiA0MCA0MCA0MHM0MC0xNy45MTAxNTYgNDAtNDB2LTEzNmMwLTQuNDE3OTY5IDMuNTgyMDMxLTggOC04aDEzNmMyMi4wODk4NDQgMCA0MC0xNy45MTAxNTYgNDAtNDBzLTE3LjkxMDE1Ni00MC00MC00MHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PC9nPiA8L3N2Zz4=)
        &:hover
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjUxMiI+PGc+PHBhdGggZD0ibTQwOCAxODRoLTEzNmMtNC40MTc5NjkgMC04LTMuNTgyMDMxLTgtOHYtMTM2YzAtMjIuMDg5ODQ0LTE3LjkxMDE1Ni00MC00MC00MHMtNDAgMTcuOTEwMTU2LTQwIDQwdjEzNmMwIDQuNDE3OTY5LTMuNTgyMDMxIDgtOCA4aC0xMzZjLTIyLjA4OTg0NCAwLTQwIDE3LjkxMDE1Ni00MCA0MHMxNy45MTAxNTYgNDAgNDAgNDBoMTM2YzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDh2MTM2YzAgMjIuMDg5ODQ0IDE3LjkxMDE1NiA0MCA0MCA0MHM0MC0xNy45MTAxNTYgNDAtNDB2LTEzNmMwLTQuNDE3OTY5IDMuNTgyMDMxLTggOC04aDEzNmMyMi4wODk4NDQgMCA0MC0xNy45MTAxNTYgNDAtNDBzLTE3LjkxMDE1Ni00MC00MC00MHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM2OEU3ODIiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PC9nPiA8L3N2Zz4=)
    .icon-minus
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIC0xOTIgNDY5LjMzMzMzIDQ2OSIgd2lkdGg9IjUxMiIgY2xhc3M9IiI+PGc+PHBhdGggZD0ibTQzNy4zMzIwMzEuMTY3OTY5aC00MDUuMzMyMDMxYy0xNy42NjQwNjIgMC0zMiAxNC4zMzU5MzctMzIgMzJ2MjEuMzMyMDMxYzAgMTcuNjY0MDYyIDE0LjMzNTkzOCAzMiAzMiAzMmg0MDUuMzMyMDMxYzE3LjY2NDA2MyAwIDMyLTE0LjMzNTkzOCAzMi0zMnYtMjEuMzMyMDMxYzAtMTcuNjY0MDYzLTE0LjMzNTkzNy0zMi0zMi0zMnptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PC9nPiA8L3N2Zz4=)
    .icon-trash
        transition: 0.3s
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJDYXBhXzEiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxNS41NTYgNTE1LjU1NiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTUuNTU2IDUxNS41NTYiIHdpZHRoPSI1MTIiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Im02NC40NDQgNDUxLjExMWMwIDM1LjUyNiAyOC45MDIgNjQuNDQ0IDY0LjQ0NCA2NC40NDRoMjU3Ljc3OGMzNS41NDIgMCA2NC40NDQtMjguOTE4IDY0LjQ0NC02NC40NDR2LTMyMi4yMjJoLTM4Ni42NjZ6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggZD0ibTMyMi4yMjIgMzIuMjIydi0zMi4yMjJoLTEyOC44ODl2MzIuMjIyaC0xNjEuMTExdjY0LjQ0NGg0NTEuMTExdi02NC40NDR6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PC9nPiA8L3N2Zz4=)
        &:hover
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJDYXBhXzEiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxNS41NTYgNTE1LjU1NiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTUuNTU2IDUxNS41NTYiIHdpZHRoPSI1MTIiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Im02NC40NDQgNDUxLjExMWMwIDM1LjUyNiAyOC45MDIgNjQuNDQ0IDY0LjQ0NCA2NC40NDRoMjU3Ljc3OGMzNS41NDIgMCA2NC40NDQtMjguOTE4IDY0LjQ0NC02NC40NDR2LTMyMi4yMjJoLTM4Ni42NjZ6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNFQjJDNTkiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggZD0ibTMyMi4yMjIgMzIuMjIydi0zMi4yMjJoLTEyOC44ODl2MzIuMjIyaC0xNjEuMTExdjY0LjQ0NGg0NTEuMTExdi02NC40NDR6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNFQjJDNTkiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PC9nPiA8L3N2Zz4=)
    .icon-arrow-down
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MS45OTYgNDkxLjk5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkxLjk5NiA0OTEuOTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ4NC4xMzIsMTI0Ljk4NmwtMTYuMTE2LTE2LjIyOGMtNS4wNzItNS4wNjgtMTEuODItNy44Ni0xOS4wMzItNy44NmMtNy4yMDgsMC0xMy45NjQsMi43OTItMTkuMDM2LDcuODZsLTE4My44NCwxODMuODQ4ICAgIEw2Mi4wNTYsMTA4LjU1NGMtNS4wNjQtNS4wNjgtMTEuODItNy44NTYtMTkuMDI4LTcuODU2cy0xMy45NjgsMi43ODgtMTkuMDM2LDcuODU2bC0xNi4xMiwxNi4xMjggICAgYy0xMC40OTYsMTAuNDg4LTEwLjQ5NiwyNy41NzIsMCwzOC4wNmwyMTkuMTM2LDIxOS45MjRjNS4wNjQsNS4wNjQsMTEuODEyLDguNjMyLDE5LjA4NCw4LjYzMmgwLjA4NCAgICBjNy4yMTIsMCwxMy45Ni0zLjU3MiwxOS4wMjQtOC42MzJsMjE4LjkzMi0yMTkuMzI4YzUuMDcyLTUuMDY0LDcuODU2LTEyLjAxNiw3Ljg2NC0xOS4yMjQgICAgQzQ5MS45OTYsMTM2LjkwMiw0ODkuMjA0LDEzMC4wNDYsNDg0LjEzMiwxMjQuOTg2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=)
    .icon-arrow-up
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        transform: rotate(180deg)
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MS45OTYgNDkxLjk5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkxLjk5NiA0OTEuOTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ4NC4xMzIsMTI0Ljk4NmwtMTYuMTE2LTE2LjIyOGMtNS4wNzItNS4wNjgtMTEuODItNy44Ni0xOS4wMzItNy44NmMtNy4yMDgsMC0xMy45NjQsMi43OTItMTkuMDM2LDcuODZsLTE4My44NCwxODMuODQ4ICAgIEw2Mi4wNTYsMTA4LjU1NGMtNS4wNjQtNS4wNjgtMTEuODItNy44NTYtMTkuMDI4LTcuODU2cy0xMy45NjgsMi43ODgtMTkuMDM2LDcuODU2bC0xNi4xMiwxNi4xMjggICAgYy0xMC40OTYsMTAuNDg4LTEwLjQ5NiwyNy41NzIsMCwzOC4wNmwyMTkuMTM2LDIxOS45MjRjNS4wNjQsNS4wNjQsMTEuODEyLDguNjMyLDE5LjA4NCw4LjYzMmgwLjA4NCAgICBjNy4yMTIsMCwxMy45Ni0zLjU3MiwxOS4wMjQtOC42MzJsMjE4LjkzMi0yMTkuMzI4YzUuMDcyLTUuMDY0LDcuODU2LTEyLjAxNiw3Ljg2NC0xOS4yMjQgICAgQzQ5MS45OTYsMTM2LjkwMiw0ODkuMjA0LDEzMC4wNDYsNDg0LjEzMiwxMjQuOTg2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=)
    .icon-settings
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OTAuNjY3LDQwNS4zMzNoLTU2LjgxMUM0MjQuNjE5LDM3NC41OTIsMzk2LjM3MywzNTIsMzYyLjY2NywzNTJzLTYxLjkzMSwyMi41OTItNzEuMTg5LDUzLjMzM0gyMS4zMzMgICAgQzkuNTU3LDQwNS4zMzMsMCw0MTQuODkxLDAsNDI2LjY2N1M5LjU1Nyw0NDgsMjEuMzMzLDQ0OGgyNzAuMTQ0YzkuMjM3LDMwLjc0MSwzNy40ODMsNTMuMzMzLDcxLjE4OSw1My4zMzMgICAgczYxLjkzMS0yMi41OTIsNzEuMTg5LTUzLjMzM2g1Ni44MTFjMTEuNzk3LDAsMjEuMzMzLTkuNTU3LDIxLjMzMy0yMS4zMzNTNTAyLjQ2NCw0MDUuMzMzLDQ5MC42NjcsNDA1LjMzM3ogTTM2Mi42NjcsNDU4LjY2NyAgICBjLTE3LjY0MywwLTMyLTE0LjM1Ny0zMi0zMnMxNC4zNTctMzIsMzItMzJzMzIsMTQuMzU3LDMyLDMyUzM4MC4zMDksNDU4LjY2NywzNjIuNjY3LDQ1OC42Njd6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OTAuNjY3LDY0aC01Ni44MTFjLTkuMjU5LTMwLjc0MS0zNy40ODMtNTMuMzMzLTcxLjE4OS01My4zMzNTMzAwLjczNiwzMy4yNTksMjkxLjQ3Nyw2NEgyMS4zMzMgICAgQzkuNTU3LDY0LDAsNzMuNTU3LDAsODUuMzMzczkuNTU3LDIxLjMzMywyMS4zMzMsMjEuMzMzaDI3MC4xNDRDMzAwLjczNiwxMzcuNDA4LDMyOC45NiwxNjAsMzYyLjY2NywxNjAgICAgczYxLjkzMS0yMi41OTIsNzEuMTg5LTUzLjMzM2g1Ni44MTFjMTEuNzk3LDAsMjEuMzMzLTkuNTU3LDIxLjMzMy0yMS4zMzNTNTAyLjQ2NCw2NCw0OTAuNjY3LDY0eiBNMzYyLjY2NywxMTcuMzMzICAgIGMtMTcuNjQzLDAtMzItMTQuMzU3LTMyLTMyYzAtMTcuNjQzLDE0LjM1Ny0zMiwzMi0zMnMzMiwxNC4zNTcsMzIsMzJDMzk0LjY2NywxMDIuOTc2LDM4MC4zMDksMTE3LjMzMywzNjIuNjY3LDExNy4zMzN6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OTAuNjY3LDIzNC42NjdIMjIwLjUyM2MtOS4yNTktMzAuNzQxLTM3LjQ4My01My4zMzMtNzEuMTg5LTUzLjMzM3MtNjEuOTMxLDIyLjU5Mi03MS4xODksNTMuMzMzSDIxLjMzMyAgICBDOS41NTcsMjM0LjY2NywwLDI0NC4yMjQsMCwyNTZjMCwxMS43NzYsOS41NTcsMjEuMzMzLDIxLjMzMywyMS4zMzNoNTYuODExYzkuMjU5LDMwLjc0MSwzNy40ODMsNTMuMzMzLDcxLjE4OSw1My4zMzMgICAgczYxLjkzMS0yMi41OTIsNzEuMTg5LTUzLjMzM2gyNzAuMTQ0YzExLjc5NywwLDIxLjMzMy05LjU1NywyMS4zMzMtMjEuMzMzQzUxMiwyNDQuMjI0LDUwMi40NjQsMjM0LjY2Nyw0OTAuNjY3LDIzNC42Njd6ICAgICBNMTQ5LjMzMywyODhjLTE3LjY0MywwLTMyLTE0LjM1Ny0zMi0zMnMxNC4zNTctMzIsMzItMzJjMTcuNjQzLDAsMzIsMTQuMzU3LDMyLDMyUzE2Ni45NzYsMjg4LDE0OS4zMzMsMjg4eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=)
        transition: 0.3s
        &:hover
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OTAuNjY3LDQwNS4zMzNoLTU2LjgxMUM0MjQuNjE5LDM3NC41OTIsMzk2LjM3MywzNTIsMzYyLjY2NywzNTJzLTYxLjkzMSwyMi41OTItNzEuMTg5LDUzLjMzM0gyMS4zMzMgICAgQzkuNTU3LDQwNS4zMzMsMCw0MTQuODkxLDAsNDI2LjY2N1M5LjU1Nyw0NDgsMjEuMzMzLDQ0OGgyNzAuMTQ0YzkuMjM3LDMwLjc0MSwzNy40ODMsNTMuMzMzLDcxLjE4OSw1My4zMzMgICAgczYxLjkzMS0yMi41OTIsNzEuMTg5LTUzLjMzM2g1Ni44MTFjMTEuNzk3LDAsMjEuMzMzLTkuNTU3LDIxLjMzMy0yMS4zMzNTNTAyLjQ2NCw0MDUuMzMzLDQ5MC42NjcsNDA1LjMzM3ogTTM2Mi42NjcsNDU4LjY2NyAgICBjLTE3LjY0MywwLTMyLTE0LjM1Ny0zMi0zMnMxNC4zNTctMzIsMzItMzJzMzIsMTQuMzU3LDMyLDMyUzM4MC4zMDksNDU4LjY2NywzNjIuNjY3LDQ1OC42Njd6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMyMUU3NkUiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OTAuNjY3LDY0aC01Ni44MTFjLTkuMjU5LTMwLjc0MS0zNy40ODMtNTMuMzMzLTcxLjE4OS01My4zMzNTMzAwLjczNiwzMy4yNTksMjkxLjQ3Nyw2NEgyMS4zMzMgICAgQzkuNTU3LDY0LDAsNzMuNTU3LDAsODUuMzMzczkuNTU3LDIxLjMzMywyMS4zMzMsMjEuMzMzaDI3MC4xNDRDMzAwLjczNiwxMzcuNDA4LDMyOC45NiwxNjAsMzYyLjY2NywxNjAgICAgczYxLjkzMS0yMi41OTIsNzEuMTg5LTUzLjMzM2g1Ni44MTFjMTEuNzk3LDAsMjEuMzMzLTkuNTU3LDIxLjMzMy0yMS4zMzNTNTAyLjQ2NCw2NCw0OTAuNjY3LDY0eiBNMzYyLjY2NywxMTcuMzMzICAgIGMtMTcuNjQzLDAtMzItMTQuMzU3LTMyLTMyYzAtMTcuNjQzLDE0LjM1Ny0zMiwzMi0zMnMzMiwxNC4zNTcsMzIsMzJDMzk0LjY2NywxMDIuOTc2LDM4MC4zMDksMTE3LjMzMywzNjIuNjY3LDExNy4zMzN6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMyMUU3NkUiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00OTAuNjY3LDIzNC42NjdIMjIwLjUyM2MtOS4yNTktMzAuNzQxLTM3LjQ4My01My4zMzMtNzEuMTg5LTUzLjMzM3MtNjEuOTMxLDIyLjU5Mi03MS4xODksNTMuMzMzSDIxLjMzMyAgICBDOS41NTcsMjM0LjY2NywwLDI0NC4yMjQsMCwyNTZjMCwxMS43NzYsOS41NTcsMjEuMzMzLDIxLjMzMywyMS4zMzNoNTYuODExYzkuMjU5LDMwLjc0MSwzNy40ODMsNTMuMzMzLDcxLjE4OSw1My4zMzMgICAgczYxLjkzMS0yMi41OTIsNzEuMTg5LTUzLjMzM2gyNzAuMTQ0YzExLjc5NywwLDIxLjMzMy05LjU1NywyMS4zMzMtMjEuMzMzQzUxMiwyNDQuMjI0LDUwMi40NjQsMjM0LjY2Nyw0OTAuNjY3LDIzNC42Njd6ICAgICBNMTQ5LjMzMywyODhjLTE3LjY0MywwLTMyLTE0LjM1Ny0zMi0zMnMxNC4zNTctMzIsMzItMzJjMTcuNjQzLDAsMzIsMTQuMzU3LDMyLDMyUzE2Ni45NzYsMjg4LDE0OS4zMzMsMjg4eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMjFFNzZFIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=)
    .icon-arrow-out
        display: inline-block
        min-height: 10px
        min-width: 10px
        background-size: cover
        max-width: 256px
        max-height: 256px
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDg4LjcyNywwSDMwMi41NDVjLTEyLjg1MywwLTIzLjI3MywxMC40Mi0yMy4yNzMsMjMuMjczYzAsMTIuODUzLDEwLjQyLDIzLjI3MywyMy4yNzMsMjMuMjczaDEyOS45OTdMMTkyLjk5OSwyODYuMDkgICAgYy05LjA4OSw5LjA4OS05LjA4OSwyMy44MjMsMCwzMi45MTJjNC41NDMsNC41NDQsMTAuNDk5LDYuODE2LDE2LjQ1NSw2LjgxNmM1Ljk1NiwwLDExLjkxMy0yLjI3MSwxNi40NTctNi44MTdMNDY1LjQ1NSw3OS40NTggICAgdjEyOS45OTdjMCwxMi44NTMsMTAuNDIsMjMuMjczLDIzLjI3MywyMy4yNzNjMTIuODUzLDAsMjMuMjczLTEwLjQyLDIzLjI3My0yMy4yNzNWMjMuMjczQzUxMiwxMC40Miw1MDEuNTgsMCw0ODguNzI3LDB6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zOTUuNjM2LDIzMi43MjdjLTEyLjg1MywwLTIzLjI3MywxMC40Mi0yMy4yNzMsMjMuMjczdjIwOS40NTVINDYuNTQ1VjEzOS42MzZIMjU2YzEyLjg1MywwLDIzLjI3My0xMC40MiwyMy4yNzMtMjMuMjczICAgIFMyNjguODUzLDkzLjA5MSwyNTYsOTMuMDkxSDIzLjI3M0MxMC40Miw5My4wOTEsMCwxMDMuNTExLDAsMTE2LjM2NHYzNzIuMzY0QzAsNTAxLjU4LDEwLjQyLDUxMiwyMy4yNzMsNTEyaDM3Mi4zNjQgICAgYzEyLjg1MywwLDIzLjI3My0xMC40MiwyMy4yNzMtMjMuMjczVjI1NkM0MTguOTA5LDI0My4xNDcsNDA4LjQ4OSwyMzIuNzI3LDM5NS42MzYsMjMyLjcyN3oiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+)
        transition: 0.3s
        &:hover
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDg4LjcyNywwSDMwMi41NDVjLTEyLjg1MywwLTIzLjI3MywxMC40Mi0yMy4yNzMsMjMuMjczYzAsMTIuODUzLDEwLjQyLDIzLjI3MywyMy4yNzMsMjMuMjczaDEyOS45OTdMMTkyLjk5OSwyODYuMDkgICAgYy05LjA4OSw5LjA4OS05LjA4OSwyMy44MjMsMCwzMi45MTJjNC41NDMsNC41NDQsMTAuNDk5LDYuODE2LDE2LjQ1NSw2LjgxNmM1Ljk1NiwwLDExLjkxMy0yLjI3MSwxNi40NTctNi44MTdMNDY1LjQ1NSw3OS40NTggICAgdjEyOS45OTdjMCwxMi44NTMsMTAuNDIsMjMuMjczLDIzLjI3MywyMy4yNzNjMTIuODUzLDAsMjMuMjczLTEwLjQyLDIzLjI3My0yMy4yNzNWMjMuMjczQzUxMiwxMC40Miw1MDEuNTgsMCw0ODguNzI3LDB6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMyMUU3NkUiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zOTUuNjM2LDIzMi43MjdjLTEyLjg1MywwLTIzLjI3MywxMC40Mi0yMy4yNzMsMjMuMjczdjIwOS40NTVINDYuNTQ1VjEzOS42MzZIMjU2YzEyLjg1MywwLDIzLjI3My0xMC40MiwyMy4yNzMtMjMuMjczICAgIFMyNjguODUzLDkzLjA5MSwyNTYsOTMuMDkxSDIzLjI3M0MxMC40Miw5My4wOTEsMCwxMDMuNTExLDAsMTE2LjM2NHYzNzIuMzY0QzAsNTAxLjU4LDEwLjQyLDUxMiwyMy4yNzMsNTEyaDM3Mi4zNjQgICAgYzEyLjg1MywwLDIzLjI3My0xMC40MiwyMy4yNzMtMjMuMjczVjI1NkM0MTguOTA5LDI0My4xNDcsNDA4LjQ4OSwyMzIuNzI3LDM5NS42MzYsMjMyLjcyN3oiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzIxRTc2RSIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+)
</style>
