import toolsApi from "../api/ToolsApi";
import rootStore from "../store/RootStore";

const {notificationsStore, toolsStore, toolsUiStore} = rootStore;

class ToolsService {

  loadTools() {
    toolsUiStore.setLoadingStatus(true);

    toolsApi.getAllTools()
      .then((tools) => {
        toolsStore.receiveTools(tools);
        notificationsStore.show("success", "Tools loaded");
      })
      .catch(() => {
        notificationsStore.show("error", "failed to load tools");
      })
      .finally(() => {
        // todo from performance point of view this is bad: non transactional
        toolsUiStore.setLoadingStatus(false);
      });

  }

  saveTool(tool) {
    return new Promise(resolve => {
      toolsUiStore.setLoadingStatus(true);

      toolsApi.saveTool(tool)
        .then(saved => {
          toolsStore.replaceTool(tool, saved);
          resolve();
        })
        .catch(() => {
          tool.setServerValidationResult(new Map().set("name", ["Server: Contains 422"]));
        })
        .finally(() => {
          toolsUiStore.setLoadingStatus(false);
        });

    });


  }

  removeTool(tool) {
    toolsStore.removeTool(tool);
  }

}

const toolsService = new ToolsService();
export default toolsService;