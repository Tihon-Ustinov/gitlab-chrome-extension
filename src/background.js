let appId = chrome.runtime.id;
let appData = JSON.parse(window.localStorage.getItem(appId)) || {
  enabled: false
};
let intervals = [];
let pipelines = {};
const MAX_PIPELINE_COUNT = 100;
chrome.runtime.onMessage.addListener(async function(message) {
  if (message === "update") {
    appData = JSON.parse(window.localStorage.getItem(appId)) || {
      enabled: false
    };
    await init();
  }
});

chrome.notifications.onClicked.addListener(function(id) {
  for (let project of Object.keys(pipelines)) {
    let pipeline = pipelines[project].find(pipeline => pipeline.id === id);
    if (pipeline) {
      let projectInfo = appData.projects.find(
        project => project.url === project
      );
      if (projectInfo) {
        chrome.tabs.create({
          url:
            projectInfo.url.substring(
              0,
              projectInfo.url.indexOf(projectInfo.host)
            ) +
            projectInfo.host +
            projectInfo.path
        });
      }
    }
  }
});

async function init() {
  intervals.forEach(id => clearInterval(id));
  intervals = [];
  if (appData.enabledApp) {
    for (let project of appData.projects) {
      if (project.enabled) {
        // Добавляем текущие отработанные pipelines
        let p = await getPipelines(project.url);
        if (p.ok) {
          pipelines[project.url] = p.pipelines;
        } else {
          pipelines[project.url] = [];
        }
        if (pipelines[project.url].length > MAX_PIPELINE_COUNT) {
          pipelines[project.url].splice(MAX_PIPELINE_COUNT, pipelines.length);
        }
        // Стартуем мониторинг pipelines
        intervals.push(await startProjectMonitor(project));
      }
    }
  }
}
async function getPipelines(url) {
  try {
    let request = await fetch(url + "/pipelines.json?scope=all&page=1");
    if (request.ok) {
      let response = await request.json();
      return {
        ok: true,
        message: "",
        pipelines: response.pipelines
      };
    } else {
      return {
        ok: false,
        message: "Don't have access to project",
        pipelines: []
      };
    }
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: e.message,
      pipelines: []
    };
  }
}
async function startProjectMonitor(project, timeout = 5000) {
  return setInterval(async function() {
    try {
      let currentPipelines = await getPipelines(project.url);
      if (currentPipelines.ok) {
        if (pipelines[project.url].length === 0) {
          pipelines[project.url] = currentPipelines.pipelines;
        }
        for (let pipeline of currentPipelines.pipelines) {
          if (
            pipelines[project.url].every(
              p =>
                p.id !== pipeline.id ||
                (p.id === pipeline.id && p.updated_at !== pipeline.updated_at)
            )
          ) {
            let oldPipelineIndex = pipelines[project.url].findIndex(
              p => p.id === pipeline.id
            );
            if (~oldPipelineIndex) {
              pipelines[project.url].unshift(pipeline);
            }
            if (pipelines[project.url].length > MAX_PIPELINE_COUNT) {
              pipelines[project.url].splice(
                MAX_PIPELINE_COUNT,
                pipelines[project.url].length
              );
            }
            if (project.enabled) {
              if (checkActivatorPipeline(project, pipeline)) {
                createNotification(project, pipeline);
              }
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, timeout);
}

function checkActivatorPipeline(project, pipeline) {
  if (project.members.length === 0) return true;
  let userInfo = project.members.find(
    user => getNickname(user.nickname) === pipeline.user.username
  );
  if (userInfo) {
    if (!userInfo.enabled) return false;
    // TODO: indexOf заменить на проверку тега
    if (pipeline.ref.tag && ~userInfo.tags.indexOf("*")) return true;
    if (pipeline.ref.branch && ~userInfo.branches.indexOf("*")) return true;
    if (pipeline.ref.merge_request && ~userInfo.merge.indexOf("*")) return true;
  }
  return false;
}
function fix2Symbols(text) {
  if (text.toString().length === 1) {
    return "0" + text;
  }
  return text;
}
function createNotification(project, pipeline) {
  let title = "";
  let items = [];
  let date = new Date(pipeline.updated_at);
  date = `${fix2Symbols(date.getHours())}:${fix2Symbols(
    date.getMinutes()
  )}-${fix2Symbols(date.getDate())}.${fix2Symbols(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
  items.push({ title: "Time", message: date });
  items.push({ title: "Author", message: pipeline.user.username });
  if (pipeline.ref.tag) {
    items.push({ title: "Type", message: "tag" });
  }
  if (pipeline.ref.merge_request) {
    items.push({ title: "Type", message: "merge request" });
  }
  if (pipeline.ref.branch) {
    items.push({ title: "Type", message: "branch" });
  }
  if (pipeline.commit) {
    items.push({ title: "Message", message: pipeline.commit.message });
  }
  title = pipeline.ref.name;
  let icon = ~pipeline.details.status.favicon.indexOf("http")
    ? pipeline.details.status.favicon
    : project.url.substring(0, project.url.indexOf(project.host)) +
      project.host +
      pipeline.details.status.favicon;

  // Для винды выводим списком
  if (~window.navigator.platform.indexOf("Win")) {
    chrome.notifications.create(
      pipeline.id.toString() + pipeline.commit.committed_date,
      {
        type: "basic",
        title: pipeline.project.name + "/" + title,
        message: items.map(item => item.title + ": " + item.message).join("\n"),
        iconUrl: icon,
        requireInteraction: true
      }
    );
  } else {
    // Для линукса выводим кратко
    chrome.notifications.create(
      pipeline.id.toString() + pipeline.commit.committed_date,
      {
        type: "basic",
        title: pipeline.project.name + "/" + title,
        message: "@" + pipeline.user.username + " " + date,
        iconUrl: icon,
        requireInteraction: true
      }
    );
  }

  // сохраняем для popup
  if (appData.notifications) {
    let indexPipe = appData.notifications.findIndex(p => p.id === pipeline.id);
    if (~indexPipe) {
      appData.notifications.splice(indexPipe, 1);
    }
    pipeline.project.protocol = project.url.substring(
      0,
      project.url.indexOf(project.host)
    );
    pipeline.project.host = project.host;

    appData.notifications.unshift({
      id: pipeline.id,
      project: pipeline.project,
      branch: pipeline.ref.name,
      author: pipeline.user,
      details: pipeline.details,
      path:
        pipeline.path[0] === "/"
          ? pipeline.project.protocol + pipeline.project.host + pipeline.path
          : pipeline.path,
      commit: {
        title: pipeline.commit ? pipeline.commit.title : "Not commit",
        message: pipeline.commit ? pipeline.commit.message : "Not commit"
      }
    });
    if (appData.notifications.length > 10) {
      appData.notifications.splice(10, appData.notifications.length);
    }
    window.localStorage.setItem(appId, JSON.stringify(appData));
  }
}

function getNickname(nickname) {
  if (nickname.length && nickname[0] === "@")
    return nickname.substring(1, nickname.length);
  return nickname;
}

// Start monitor
(async () => {
  try {
    await init();
  } catch (e) {
    console.log(e);
  }
})();
