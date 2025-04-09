import { contextBridge } from 'electron'
import { require } from '@electron/remote'

contextBridge.exposeInMainWorld('electron', {
  require: require
})