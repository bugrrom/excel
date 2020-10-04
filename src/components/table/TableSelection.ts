import {Dom} from '../../core/dom';

type typeTableSelection = {
    select: ($el: HTMLElement | Dom | undefined) => void
    clear: () => void
    selectGroup: ($group: (Dom | undefined)[]) => void
    applyStyle: (style: {
        textAlign?: string,
        fontWeight?: string,
        fontStyle?: string,
        textDecoration?: string}) => void
}

export class TableSelection implements typeTableSelection {
    static className = 'selected';
    private group: (HTMLElement | Dom | undefined)[];
    current: HTMLElement | Dom | undefined ;
    constructor() {
      this.group = [];
      this.current;
    }

    get selectedIds() {
      // @ts-ignore
      return this.group.map(($el) => $el.id());
    }

    select($el: HTMLElement | Dom | undefined) {
      this.clear();
      this.group.push($el);
      if ($el instanceof Dom) {
        $el.onFocus();
        $el.addClass(TableSelection.className);
      }
      this.current = $el;
    }
    clear() {
      this.group.forEach(($el) => {
        if ($el instanceof Dom) {
          $el.removeClass(TableSelection.className);
        }
      });
      this.group = [];
    }
    selectGroup($group: (Dom | undefined)[] = []) {
      this.clear();
      this.group = $group;
      this.group.forEach(($el) => {
        if ($el instanceof Dom) {
          $el.addClass(TableSelection.className);
        }
      });
    }
    applyStyle(style: {
        textAlign?: string,
        fontWeight?: string,
        fontStyle?: string,
        textDecoration?: string}) {
      this.group.forEach(($el) => {
        if ($el instanceof Dom) {
          $el.css(style);
        }
      });
    }
}
