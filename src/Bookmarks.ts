import * as Utils from './Utils';
import * as ESFile from './ESFile';
import { window, workspace, Uri } from 'vscode';

export async function openFile() {
    // select bookmark
    let bookmark = await Utils.selectItemFromFile(workspace.getConfiguration('minieyes.bookmarks').get<string>('path') as string, 'Select Bookmark');
    if (!bookmark) { return; }

    // expand folders
    bookmark = bookmark.replace('\\', '/');
    const expandFolders = workspace.getConfiguration('minieyes.bookmarks').get<string[]>('expandFolders') ?? [];
    const forwardSlashFolders = expandFolders.map(path => path.replace('\\', '/'));
    while(forwardSlashFolders.includes(bookmark)) {
        const subfolder = await Utils.selectItem(await Utils.readDir(bookmark));
        if (!subfolder) { return; }

        bookmark = bookmark + '/' + await Utils.selectItem(await Utils.readDir(bookmark));
    }

    // pick file
    const file = await ESFile.pickFile('', bookmark);
    if (!file) { return; }

    Utils.openFile(file);
}