export class TreeItem {
    public name: string;
    public showMenuButton = false;
    public hasAddButton = false;
    public iconName: string;
    public subItems = Array<TreeItem>();
    public parent: TreeItem;
    public isSelected = false;
    public expanded = false;
    public onClick: (item: any) => void;

    clearSelectionRecursive() {
        this.isSelected = false
        this.subItems.forEach(item => item.clearSelectionRecursive());
    }    
}

export class TreeFolderItem extends TreeItem {
    public folderId: string;
}