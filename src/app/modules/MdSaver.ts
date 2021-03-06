/**
 * ## Description
 *
 * Backend Modules
 *
 * ### Functions
 *
 * - Save markdown files.
 */

/**
 * Import modules
 */
import { Memoma } from './models/Memoma';

/**
 * A dependent module from `electron`.
 */
const msIpcRenderer: Electron.IpcRenderer = require('electron').ipcRenderer;

msIpcRenderer.on(
    'onSaveProject',
    (): void => {
        const memoMdField: HTMLInputElement = document.querySelector(
            '#memo-md-field'
        ) as HTMLInputElement;

        const noteMdField: HTMLInputElement = document.querySelector(
            '#note-md-field'
        ) as HTMLInputElement;

        const todoMdField: HTMLInputElement = document.querySelector(
            '#todo-md-field'
        ) as HTMLInputElement;

        const projectName: HTMLElement = document.querySelector(
            '#project-name'
        ) as HTMLElement;

        const name: string = projectName.dataset.projectName!;
        const path: string = projectName.dataset.projectPath!;

        const memomaData: Memoma = {
            memo: memoMdField.value,
            note: noteMdField.value,
            todo: todoMdField.value,
            projectName: name,
            projectPath: path
        };

        msIpcRenderer.send('onSendProjectData', memomaData);
    }
);
