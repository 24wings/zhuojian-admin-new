import { Injectable } from '@angular/core';


@Injectable()
export class ElectronService {
  get remote(): Electron.Remote {
    // console.log(require('electron').remote);
    return window['remote']
  }

  constructor() { }

  dialogFile(openDialogOptions: OpenDialogOptions) {
    return new Promise<{ filePaths, bookmarks }>(resolve => this.remote.dialog.showOpenDialog(openDialogOptions, (filePaths: string[], bookmarks: string[]) => {
      resolve({ filePaths, bookmarks })
    }));
  }
}
