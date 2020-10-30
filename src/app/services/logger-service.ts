import * as fs from 'async-file';
import {Injectable} from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import * as path from 'path';

@Injectable()
export class LoggerService {
    
    logFileName = 'thetapad.log';    

    constructor(private electronService : ElectronService) {        
    }

    getLogFileName() : string {
        return this.electronService.getUserDataPath() + path.sep + this.logFileName
    }
    
    info(message : string) {     
        const fullMessage = new Date().toLocaleString() + ' : ' + message + '\n'         
        fs.appendFile(this.getLogFileName(), fullMessage)
        console.log(fullMessage)
    }

    debug(message : string) {        
    }    

    error(message : string) {
    }    
}