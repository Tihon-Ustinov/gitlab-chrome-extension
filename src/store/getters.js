export const enabledApp = state => state.enabledApp;

export const projects = state => state.projects;

export const notifications = state => state.notifications;

export const newProject = () => {
  return {
    enabled: false,
    url: '',
    host: '',
    project: '',
    members: [],
    code: '' // TODO: Идея для расширения функционала пользовательскими функциями
  }
}
export const newMember = () => {
  return {
    enabled: false,
    name: '',
    nickname: '',
    avatar: '',
    tags: ['*'],
    branches: ['*'],
    merge: ['*']
  }
}
