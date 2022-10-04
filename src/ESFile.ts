import * as Utils  from './Utils';
import { window, workspace, Uri } from 'vscode';

async function getSearchString() {
    const result = await window.showInputBox({
        placeHolder: 'input search string',
    });
    return result;
}

export async function pickFile(searchString: string | undefined, pathString: string | undefined = undefined) {
    const pathArg = pathString ? `-path ${pathString}` : '';
    const esfiles = await Utils.execute(`cmd /c chcp 65001>nul && es ${pathArg} ${searchString}`);
    const result = await window.showQuickPick(esfiles.split('\n').filter(path => !path.includes('.git')), {
        placeHolder: 'Select File',
    });
    return result;
}

export async function openFile() {
    const searchString = await getSearchString();
    const file = await pickFile(searchString);
    const fileUri = Uri.parse("file:///" + file?.trim());
    workspace.openTextDocument(fileUri).then(doc => {
        window.showTextDocument(doc);
    });
}