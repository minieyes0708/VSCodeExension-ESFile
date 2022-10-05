import * as fs from 'fs';
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

export function readFile(filepath: string): Promise<Buffer> {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, function (error, data) {
            if (error) { reject(); return; }
            resolve(data);
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