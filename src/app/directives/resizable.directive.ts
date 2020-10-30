// https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73#.p13c6m1s8

import { Input, HostListener, ElementRef, AfterViewInit, Directive, Renderer2, Output, EventEmitter } from "@angular/core";

export enum SizerBarPosition {
    None = 0,
    Left = 1,
    Right = 2
    // Top = 3,
    // Bottom = 4
}

@Directive({
    selector: "[resizable]"
})
export class ResizableDirective implements AfterViewInit {

    contentOriginalSize = 0;
    sizer = { mouseOver: false, sizing: false, sizingStartPos: 0 };
    panelContentDiv: any;

    @Input() sizerBarPosition: SizerBarPosition = SizerBarPosition.Left;
    @Input() sizerBarColor: string = "#FAFAFA";

    /**
     * called when panel is resized, sends the new width as a parameter.
     */
    @Output() resized = new EventEmitter<number>();

    @HostListener("dragstart", ["$event"])
    onDragStart(event) {
        // disable drag and drop as it will confuse the splitter bars if text is highlighted
        // and mover clicked and the timing is right the mouse up event will never occur.
        event.preventDefault();
    }

    @HostListener("mousedown", ["$event"])
    onMouseDown(event) {
        if (this.sizer.mouseOver) {
            this.sizer.sizing = true;
            this.sizer.sizingStartPos = event.clientX;
        }
    }

    @HostListener("window:mouseout", ["$event"]) onMouseOut(event) {
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        // need to subtract 1 width window width since chrome will not detect the full width
        // in the cursor position. For example if innerWidth is 1000 the mouse out maximum pageX will only be 999.
        if ((mouseY > 0 && mouseY < window.innerHeight)
        && (mouseX > 0 && mouseX < window.innerWidth-1))
            return;

        this.sizer.sizing = false;
    }

    @HostListener("window:mouseup", ["$event"])
    onMouseUp(event) {
        this.sizer.sizing = false;
    }

    @HostListener("window:mousemove", ["$event"])
    onMouseMove(event) {
        // if mouse is over splitter and button is down then resize.
        if (this.sizer.sizing)
        {
            const movementX = (event.clientX - this.sizer.sizingStartPos);

            if (movementX !== 0) {
                this.sizer.sizingStartPos = event.clientX;

                this.resize(movementX);
            }    
        } 
    }
    
    constructor(private elRef: ElementRef,
        private renderer: Renderer2) {
    }
    
    ngAfterViewInit()
    {
        this.panelContentDiv = this.elRef.nativeElement.firstChild;

        this.contentOriginalSize = this.elRef.nativeElement.offsetWidth;

        var element = this.renderer.createElement("div");

        // CDB 6/11/17: Relative position is necessary so absolute positioned div is within container and not screen.        
        this.renderer.setStyle(this.elRef.nativeElement, "position", "relative");
        
        this.renderer.setStyle(element, "width", "8px");
        this.renderer.setStyle(element, "background-color", this.sizerBarColor);
        this.renderer.setStyle(element, "cursor", "ew-resize");
        this.renderer.setStyle(element, "position", "absolute");
        this.renderer.setStyle(element, "z-index", "90");
        this.renderer.listen(element, "dblclick", (event: any) => { this.sizerAction("dblclick", event); });
        this.renderer.listen(element, "mouseenter", (event: any) => { this.sizerAction("enter", event); });
        this.renderer.listen(element, "mouseleave", (event: any) => { this.sizerAction("leave", event); });
  

        if (this.sizerBarPosition === SizerBarPosition.Right)
        {
            this.renderer.setStyle(element, "top", "0");
            this.renderer.setStyle(element, "right", "-1px");
            this.renderer.setStyle(element, "height", "100%");
            this.renderer.setStyle(this.elRef.nativeElement, "padding-right", "7px");
        }
        else if (this.sizerBarPosition === SizerBarPosition.Left)
        {
            this.renderer.setStyle(element, "top", "0");
            this.renderer.setStyle(element, "left", "-1px");
            this.renderer.setStyle(element, "height", "100%");
            this.renderer.setStyle(this.elRef.nativeElement, "padding-left", "7px");
        }

        this.renderer.appendChild(this.elRef.nativeElement, element); 
    }

    sizerAction(action: string, event) {
        if (action === "leave")
            this.sizer.mouseOver = false;
        else if (action === "enter")
            this.sizer.mouseOver = true;
        else if (action === "dblclick")
        {
            const movementX = this.contentOriginalSize - this.elRef.nativeElement.offsetWidth;

            this.resize(movementX);
        }    
    };

    resize(newWidth: number) {
        // CDB 6/11/17: If sizing handle is on left then we need to reverse the motion.
        if (this.sizerBarPosition === SizerBarPosition.Left)
        {
            newWidth = newWidth * -1;
        }    
        const crepoExplorerWidth = this.elRef.nativeElement.offsetWidth + newWidth + "px";

        this.renderer.setStyle(this.elRef.nativeElement, "width", crepoExplorerWidth);
        this.renderer.setStyle(this.elRef.nativeElement, "min-width", crepoExplorerWidth);

        this.resized.emit(newWidth);
    }

}