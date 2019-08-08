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
        .catch(err => {
          if (err === "422") {
            rootStore.toolsUiStore.addInvalidTool(tool, new Map().set("name", error));
          }
        })
        .finally(() => {
          toolsUiStore.setLoadingStatus(false);
        });

    });


  }

}

const toolsService = new ToolsService();
export default toolsService;