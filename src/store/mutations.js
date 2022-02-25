import * as types from './mutation-types';

export default {
  [types.INITIALISE_STORE](state) {
    let appData = JSON.parse(window.localStorage.getItem(chrome.runtime.id)) || {}
    if (!appData.hasOwnProperty('enabledApp')) {
      appData.enabledApp = false
    }
    if (!appData.hasOwnProperty('projects')) {
      appData.projects = []
    }
    if (!appData.hasOwnProperty('notifications')) {
      appData.notifications = []
    }
    if (appData) {
      this.replaceState(
        Object.assign(state, appData)
      );
    }
  },
  [types.SET_EXTENSIONS_STATE](state, status) {
    state.enabledApp = status;
  },
  [types.ADD_PROJECT](state, project) {
    let index = state.projects.find(p => p.url === project.url)
    if (index) {
      state.projects.splice(index, 1)
    }
    project.enabled = true
    state.projects.push(project)
  },
  [types.REMOVE_PROJECT](state, project) {
    let index = state.projects.findIndex(p => p.url === project.url)
    if (~index) {
      state.projects.splice(index, 1)
    }
  },
  [types.TOGGLE_PROJECT](state, project) {
    let index = state.projects.findIndex(p => p.url === project.project.url)
    if (~index) {
      state.projects[index].enabled = project.value
    }
  },
  [types.SET_MEMBER_PROP](state, values) {
    let indexProject = state.projects.findIndex(p => p.url === values.project.url)
    if (~indexProject) {
      let indexMember = state.projects[indexProject].members.findIndex(member => member.nickname === values.member.nickname)
      if (~indexMember) {
        state.projects[indexProject].members[indexMember][values.prop] = values.value
      }
    }
  },
  [types.REMOVE_MEMBER](state, values) {
    let indexProject = state.projects.findIndex(p => p.url === values.project.url)
    if (~indexProject) {
      let indexMember = state.projects[indexProject].members.findIndex(member => member.nickname === values.member.nickname)
      if (~indexMember) {
        state.projects[indexProject].members.splice(indexMember, 1)
      }
    }
  },
  [types.ADD_MEMBER_IN_PROJECT](state, values) {
    let indexProject = state.projects.findIndex(p => p.url === values.project.url)
    if (~indexProject) {
      let indexMember = state.projects[indexProject].members.findIndex(member => member.nickname === values.member.nickname)
      if (!~indexMember) {
        state.projects[indexProject].members.unshift(values.member)
      }
    }
  },
  [types.REMOVE_NOTIFICATION](state, id) {
    let index = state.notifications.find(n => n.id === id)
    if (~index) {
      state.notifications.splice(index, 1)
    }
  },
  [types.SET_MEMBERS_STATUS](state, values) {
    let indexProject = state.projects.findIndex(p => p.url === values.project.url)
    if (~indexProject) {
      for (let i = 0; i < state.projects[indexProject].members.length; i++) {
        state.projects[indexProject].members[i].enabled = values.value
      }
    }
  },
};
