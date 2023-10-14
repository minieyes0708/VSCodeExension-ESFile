import * as fs from 'fs';
import * as  iconvlite from 'iconv-lite';
import * as childProcess from 'child_process';
import { workspace, window, Uri } from 'vscode';

export function execute(command: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        childProcess.exec(command, function (error, standardOutput, standardError) {
            if (error) { reject(); return; }
            if (standardError) { reject(standardError); return; }
            resolve(standardOutput);
        });
    });
}

export function readFile(filepath: string, encoding: string = 'utf8'): Promise<string> {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, function (error, data) {
            if (error) { reject(); return; }
            resolve(iconvlite.decode(data, encoding));
        });
    });
}

export function readDir(filepath: string): Promise<string[]> {
    return new Promise(function (resolve, reject) {
        fs.readdir(filepath, function (error, data) {
            if (error) { reject(); return; }
            resolve(data);
        });
    });
}

export function openFile(filepath: string): void {
    const fileUri = Uri.parse("file:///" + filepath);
    workspace.openTextDocument(fileUri).then(doc => {
        window.showTextDocument(doc);
    });
}

export async function selectItem(items: Array<string>, prompt: string | undefined = undefined): Promise<string | undefined> {
    const result = await window.showQuickPick(items.filter(item => item !== ''), {
        placeHolder: prompt,
    });
    return result;
}

export async function selectItemFromFile(filename: string, prompt: string | undefined = undefined): Promise<string | undefined> {
    const items: string[] = (await readFile(filename)).split(/\r?\n/);
    return selectItem(items, prompt);
}