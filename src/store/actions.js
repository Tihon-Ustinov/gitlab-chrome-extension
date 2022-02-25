import * as types from './mutation-types';
import store from './index'
export const setEnabledApp = ({ commit }, payload) => {
  commit(types.SET_EXTENSIONS_STATE, payload);
};

export const addProject = async ({ commit }, payload) => {
  try {
    let membersRequest = await fetch(payload.url + '/-/project_members')
    if (membersRequest.ok) {
      let html = await membersRequest.text()
      let doc =  document.createElement('div')
      doc.innerHTML = html
      let usersInfo = Array.from(doc.querySelectorAll('li[data-qa-selector="member_row"]'))
      let countPage = 1
      Array.from(doc.querySelectorAll('.page-link'))
        .forEach(item => {
          let itemNumber = parseInt(item.textContent)
          if (!isNaN(itemNumber) && itemNumber > countPage) countPage = itemNumber
        })
      for (let page = 2; page <= countPage; page++) {
        membersRequest = await fetch(payload.url + '/-/project_members?page='+page)
        if (membersRequest.ok) {
          html = await membersRequest.text()
          doc.innerHTML = html
          usersInfo.push(...Array.from(doc.querySelectorAll('li[data-qa-selector="member_row"]')))
        }
      }
      let users = []
      for (let i = 0; i < usersInfo.length; i++) {
        let avatar = usersInfo[i].querySelector('img.avatar').dataset.src
        if (avatar.length && !~avatar.indexOf('http')) {
          avatar = payload.url.substring(0, payload.url.indexOf(payload.host)) + payload.host + avatar
        }
        let user = Object.assign({}, store.getters.newMember)
        user.enabled = true
        user.name = usersInfo[i].querySelector('a[data-user-id]').textContent
        user.nickname = usersInfo[i].querySelector('span.cgray').textContent
        user.avatar = avatar
        users.push(user)
      }
      payload.members = users
    }
  } catch (e) {
    console.log(e)
  }
  commit(types.ADD_PROJECT, payload);
};
export const addMemberInProject = ({ commit }, payload) => {
  commit(types.ADD_MEMBER_IN_PROJECT, payload);
};
export const deleteProject = ({ commit }, payload) => {
  commit(types.REMOVE_PROJECT, payload);
};
export const toggleProject = ({ commit }, payload) => {
  commit(types.TOGGLE_PROJECT, payload);
};

export const deleteMember = ({ commit }, payload) => {
  commit(types.REMOVE_MEMBER, payload);
};
export const toggleEnabledMember = ({ commit }, payload) => {
  payload.prop = 'enabled'
  commit(types.SET_MEMBER_PROP, payload);
};
export const toggleMergeMember = ({ commit }, payload) => {
  if (payload.value) {
    payload.value = ['*']
  } else {
    payload.value = []
  }
  payload.prop = 'merge'
  commit(types.SET_MEMBER_PROP, payload);
};
export const toggleBranchesMember = ({ commit }, payload) => {
  if (payload.value) {
    payload.value = ['*']
  } else {
    payload.value = []
  }
  payload.prop = 'branches'
  commit(types.SET_MEMBER_PROP, payload);
};
export const toggleTagMember = ({ commit }, payload) => {
  if (payload.value) {
    payload.value = ['*']
  } else {
    payload.value = []
  }
  payload.prop = 'tags'
  commit(types.SET_MEMBER_PROP, payload);
};
export const removeNotification = ({ commit }, id) => {
  commit(types.REMOVE_NOTIFICATION, id);
};
export const setMembersStatus = ({ commit }, payload) => {
  commit(types.SET_MEMBERS_STATUS, payload);
};
