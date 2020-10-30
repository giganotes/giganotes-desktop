
export class LinkTreeItem {
    title: string;
    value?: string;    
    menu?: LinkTreeItem[];

    constructor(title:string) {
        this.title = title;        
    }    
}