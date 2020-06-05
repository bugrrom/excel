
export interface ITableSelection {
    current: null | HTMLElement | DOMRect;
    select: ($el: DOMRect | HTMLElement) => void,
    selectGroup: ($group: HTMLElement[]) => void,
    clear: () => void
}


export class TableSelection implements ITableSelection {
    static className = 'selected';
    private group: HTMLElement[];
    current: null | HTMLElement | DOMRect;
    constructor() {
      this.group = [];
      this.current = null;
    }

    select($el: DOMRect | HTMLElement): void {
      this.clear();
      if ('focus' in $el) {
        $el.focus().addClass(TableSelection.className);
      }
      this.group.push(<HTMLElement>$el);
      this.current = $el;
    }

    clear() {
      this.group.forEach((el: HTMLElement)=> el.removeClass(TableSelection.className));
      this.group = [];
    }

    selectGroup($group: HTMLElement[]) {
      this.clear();
      this.group = $group;
      this.group.forEach( (el: HTMLElement) => el.addClass(TableSelection.className));
    }
}
