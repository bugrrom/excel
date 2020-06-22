import {IDom} from '../../core/dom';

export interface ITableSelection {
    current: DOMRect | Element | IDom | null;
    select: ($el: DOMRect | HTMLElement | IDom | Element) => void,
    selectGroup: ($group: HTMLElement[]) => void,
    clear: () => void
    applyStyle: (style: any) => void
}


export class TableSelection implements ITableSelection {
    static className = 'selected';
    private group: HTMLElement[];
    current: DOMRect | Element | IDom | null;
    constructor() {
      this.group = [];
      this.current = null;

    }

    select($el: DOMRect | HTMLElement | IDom | Element) {
      this.clear();
      if ('focus' in $el) {
        if ('addClass' in $el) {
          $el.focus().addClass(TableSelection.className);
        }
      }

      this.group.push(<HTMLElement>$el);
      this.current = $el;
    }

    clear() {
      this.group.forEach((el: HTMLElement | IDom) =>
          'removeClass' in el ?
              el.removeClass(TableSelection.className) : null);

      this.group = [];
    }

    get selectedIds() {
      return this.group.map(($el) => $el.id());
    }

    selectGroup($group: HTMLElement[]) {
      this.clear();
      this.group = $group;
      this.group.forEach( (el: HTMLElement | IDom) =>
          'addClass' in el ? el.addClass(TableSelection.className) : null);
    }

    applyStyle(style: any) {
      this.group.forEach(($el)=>$el.css(style));
    }
}
