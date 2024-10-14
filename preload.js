const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("singleWord", () => {
  console.log('XXXX')
  return ipcRenderer.invoke('singleWord', 4)
})
