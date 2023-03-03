const KEY = "redux";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;

    const globalState = JSON.parse(serializedState);
    if (globalState.ui.modalState.isActive) {
      globalState.ui.modalState.isActive = false;
      const newSerializedState = JSON.stringify(globalState)
      localStorage.setItem(KEY, newSerializedState);
    }
    return globalState
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}