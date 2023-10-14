import * as Utils from './Utils';
import * as ESFile from './ESFile';
import { window, workspace, Uri } from 'vscode';

async function selectBookmark(bookmarks: Array<string>) {
    const result = await window.showQuickPick(bookmarks.filter(bookmark => bookmark !== ''), {
        placeHolder: 'Select Bookmark',
    });
    return result;
}

export async function openFile() {
    // select bookmark
    const bookmarks: string[] = (await Utils.readFile(workspace.getConfiguration('minieyes.bookmarks').get<string>('path') as string)).split(/\r?\n/);
    let bookmark = await selectBookmark(bookmarks);
    if (!bookmark) { return; }

    // expand folders
    bookmark = bookmark.replace('\\', '/');
    const expandFolders = workspace.getConfiguration('minieyes.bookmarks').get<string[]>('expandFolders') ?? [];
    const forwardSlashFolders = expandFolders.map(path => path.replace('\\', '/'));
    while(forwardSlashFolders.includes(bookmark)) {
        const subfolder = await selectBookmark(await Utils.readDir(bookmark));
        if (!subfolder) { return; }

        bookmark = bookmark + '/' + await selectBookmark(await Utils.readDir(bookmark));
    }

    // pick file
    const file = await ESFile.pickFile('', bookmark);
    if (!file) { return; }

    Utils.openFile(file);
}