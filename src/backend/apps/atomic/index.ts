import { command } from "../../_shared/cmd/cmd";
import { createFolder, fileExists, getFileList, readFile, readFilesRecursively, writeFileSync } from "../../_shared/fs/fs"
import { DEBUG, ERROR, LOG, OK } from "../../_shared/log/log";


// icons: C:\Users\Robert Willemelis\.vscode\extensions\icons

const check4ImportantFiles = (files: string[]) => {
    LOG(DEBUG, 'check for important files');
    for(const file of files){
        if(!fileExists(file)){
            LOG(ERROR, `File ${file} not found`);
        } else {
            LOG(OK, `File ${file} found`);
        }
    }
}




const getNewFolderSettings = (settings: any, folderPath: string, typePath: string, iconPath: string) => {
    if(folderPath.includes(typePath)){
        const subFolder = folderPath.split('/')[folderPath.split('/').length - 1];
        if(!settings['material-icon-theme.folders.associations']){
            settings['material-icon-theme.folders.associations'] = {};
            LOG(OK, `Added folders.associations to settings`)
        }
        
        if(!settings['material-icon-theme.folders.associations'][subFolder]){
            settings['material-icon-theme.folders.associations'][subFolder] = iconPath;
            LOG(OK, `Added ${subFolder} to settings`)
        }
    }
}

check4ImportantFiles(['.eleventy.js', '.gitignore', '.nvmrc', '.vscode/settings.json']);
// .eleventyignore, .gitignore, .nvmrc
// if(!fileExists('.eleventy.js')){
//     LOG(ERROR, 'no eleventy config found');
// }

if(!fileExists('.vscode/settings.json')){
    if(!fileExists('.vscode')){
        createFolder('.vscode');
    }
    if(!fileExists('.vscode/settings.json')){
        writeFileSync('.vscode/settings.json', '{}');
    }
}

// read vscode settings file and get the value of the key
const vscodeSettings = readFile('.vscode/settings.json') || '{}';
if(vscodeSettings){
    try {

        const settings = JSON.parse(vscodeSettings);
        
        // file list of src/frontend
        const folderList = readFilesRecursively('src/frontend').filter((folder: any) => folder.type === 'folder');
        // console.log(folderList)
        for(const folder of folderList){
            if(folder.path.indexOf('src/frontend/components/') !== -1){
                getNewFolderSettings(settings, folder.path, 'src/frontend/components/atoms/', '../../../../icons/folder-atom');
                getNewFolderSettings(settings, folder.path, 'src/frontend/components/molecules/', '../../../../icons/folder-molecule');
                getNewFolderSettings(settings, folder.path, 'src/frontend/components/organisms/', '../../../../icons/folder-organism');
            } else if(folder.path.indexOf('src/frontend/pages/') !== -1){
                getNewFolderSettings(settings, folder.path, 'src/frontend/pages/', '../../../../icons/folder-page');
            } else if(folder.path.indexOf('src/frontend/templates/') !== -1){
                getNewFolderSettings(settings, folder.path, 'src/frontend/templates/', '../../../../icons/folder-template');
            }
        }
        writeFileSync('.vscode/settings.json', JSON.stringify(settings, null, 4), '', true);
        LOG(OK, 'Settings updated');
    } catch(e) {
        LOG(ERROR, `${e}`)
    }
}
