import * as fs from 'fs';
import * as childProcess from 'child_process';

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