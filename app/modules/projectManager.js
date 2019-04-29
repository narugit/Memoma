'use strict';

let remote = require('electron').remote;
const { dialog } = require('electron');
let fs = require('fs');

const projectManager = class {
    constructor(dirName) {
        this.dirName = dirName;
    }

    /**
     * Create new project. 
     * @param {string} projectName name of project which the user input #projectName_txtbox
     * @param {string} projectPath path to project 
     */
    createProject(projectName, projectPath) {
        this.projectName = projectName;
        this.mdDir = this.dirName + '/.memoma/' + projectName;
        let projectFile = projectPath + '/' + projectName + '.mmm';

        let _mdDir = this.mdDir;

        // create files if the markdown directory does not exist
        fs.access(_mdDir, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.mkdir(_mdDir, (err) => {
                        if (err) {
                            console.warn(err.message);
                        }
                    });

                    // create .mmm file (project file)
                    let contentProjct = `{"projectName": "${projectName}",\n
                    "filePath": ".memoma/${projectName}"\n
                    }`;

                    fs.writeFile(projectFile, contentProjct, (errCreateProject) => {
                        if (errCreateProject) {
                            dialog.showErrorBox("An error ocurred creating the file", errCreateProject.message);
                        }
                    });

                    // create markdown files
                    let fnameTails = ['memo', 'note', 'todo'];
                    fnameTails.forEach(function (fnameTailsElment) {
                        fs.writeFile(_mdDir + '/' + projectName + '_' + fnameTailsElment + '.md', '', (errCreateFile) => {
                            if (errCreateFile) {
                                dialog.showErrorBox("An error ocurred creating the file", errCreateFile.message);
                            }
                        });
                    });

                    return;
                } else {
                    return;
                }
            }
        });
    }

    /**
     * Overwrite .md files. 
     *     Call from onSaveProject function from main.js.
     * @param {Object} data contents of markdown contents editing and 
     *     project name
     */
    saveProject(data) {
        // markdown contents
        let mdObject = [
            {
                type: 'memo',
                content: data.memo
            },
            {
                type: 'note',
                content: data.note
            },
            {
                type: 'todo',
                content: data.todo
            }
        ];

        let _mdDir = __dirname + '/../../.memoma/' + data.projectName;
        let _projectName = data.projectName;

        // overwrite markdown files
        mdObject.forEach(function (mdObj) {
            fs.writeFile(_mdDir + '/' + _projectName + '_' + mdObj.type + '.md', mdObj.content, function (errCreateFile) {
                if (errCreateFile) {
                    dialog.showErrorBox("An error ocurred creating the file", errCreateFile.message);
                }
            });
        });

    }

    /**
     * Open project by calling fileOpen method in fileIO.js.
     */
    openProject() {
        fileIO.fileOpen();
    }
};
module.exports = projectManager;