import * as iconv from 'iconv-lite';
import childProcess = require("child_process");
import { window, workspace, Uri } from 'vscode';

function execute(command: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        childProcess.exec(command, function (error, standardOutput, standardError) {
            if (error) { reject(); return; }
            if (standardError) { reject(standardError); return; }
            resolve(standardOutput);
        });
    });
}

async function pickFile(searchString: string | undefined) {
    const esfiles = await execute(`es ${searchString}`);
    // const esfilesEncode = iconv.encode(esfiles, 'big5');
    const esfilesDecode = iconv.decode(Buffer.from(esfiles), 'utf-8');
    const result = await window.showQuickPick(esfilesDecode.split('\n'), {
        placeHolder: 'Select File',
    });
    return result;
}

async function getSearchString() {
    const result = await window.showInputBox({
        placeHolder: 'input search string',
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