import { window, workspace } from 'vscode';
import * as Utils  from './Utils';

export async function pickFile(searchString: string, pathString: string | undefined = undefined) {
    // es.exe list files
    const pathArg = pathString ? `-path ${pathString}` : '';
    const esfiles = await Utils.execute(`cmd /c chcp 65001>nul && es ${pathArg} file:${searchString}`);
    
    // exlude folders
    let filelist = esfiles.split(/\r?\n/);
    const excludeFolders = workspace.getConfiguration('minieyes.esfile').get<string[]>('excludeFolders') ?? [];
    for (let folder of excludeFolders) {
        filelist = filelist.filter(path => !path.includes('\\' + folder + '\\'));
    }

    // pick file
    const result = await window.showQuickPick(filelist, {
        placeHolder: 'Select File',
    });
    return result;
}

export async function openFile() {
    // input search string
    const searchString = await window.showInputBox({
        placeHolder: 'input search string',
    });
    if (!searchString) { return; }

    Utils.openFile((await pickFile(searchString))?.trim() ?? '');
}