interface IDom {
  html: (html?: string) => string | this | undefined
  clear: () => this
  append: (node: Dom|HTMLElement|undefined|string) => this | undefined
  on: (eventType: string, fn: ()=>void) => void
  off: (evenType: string, fn: ()=>void) => void
  css: (style: typeCss) => this
  findAll: (selection: string) => NodeList
  closest: (selection: string) => Dom
  getCoords: () => DOMRect
  attr: (name: string, value: string) => void
  getStyles: (styles: string[]) => void
  text: (text?: string) => void
  addClass: (className: string) => void
  removeClass: (className: string) => void
  id: (parse?: boolean) => string | { row: number; col: number; } | undefined
  find: (selector: string) => void
  onFocus: () => void
}

type typeCss = {
  width?: string
  height?: string
  opacity?: number
  right?: string
  zIndex?: number
  bottom?: string
  textAlign?: string
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
}

export class Dom implements IDom {
  private $el: HTMLElement | null | Element | undefined;
  constructor(selector: HTMLElement | string | Element | null | undefined) {
    this.$el = typeof selector === 'string' ?
        document.querySelector(selector) :
        selector;
  }
  html(html?:string) {
    if (typeof html === 'string') {
      if (this.$el) {
        this.$el.innerHTML = html;
        return this;
      }
    }
    return this.$el?.outerHTML.trim();
  }

  getStyles(styles: string[] = []) {
    return styles.reduce((res, s: string) => {
      // @ts-ignore
      if ('style' in this.$el) {
        (res as any)[s] = this.$el.style[(s as any)];
      }
      return res;
    }, {});
  }

  text(text?: string) {
    if ( typeof text !== 'undefined') {
      if (this.$el) {
        this.$el.textContent = text;
        return this;
      }
    }
    if (this.$el?.tagName.toLowerCase() === 'input') {
      // @ts-ignore
      return this.$el.value.trim();
    }
    // @ts-ignore
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node: Dom|HTMLElement|undefined|string) {
    if (node instanceof Dom) {
      if (node.$el) {
        this.$el?.append(node.$el);
      }
    }
    return this;
  }

  on(evenType: string, fn: ()=>void) {
    this.$el?.addEventListener(evenType, fn);
  }

  off(evenType: string, fn: ()=>void) {
    this.$el?.removeEventListener(evenType, fn);
  }

  get data() {
    if (this.$el) {
      if ('dataset' in this.$el) {
        return this.$el.dataset;
      }
    }
  }

  css(styles: typeCss = {}) {
    Object.keys(styles)
        .forEach((el: string) => {
          if ( this.$el) {
            if ('style' in this.$el) {
              // @ts-ignore
              this.$el.style[el] = styles[el];
            }
          }
        });
    return this;
  }

  addClass(className: string) {
    this.$el?.classList.add(className);
  }

  removeClass(className: string) {
    this.$el?.classList.remove(className);
  }

  id(parse?: boolean): string | { row: number; col: number; } | undefined {
    if (this.data) {
      if (parse) {
        // @ts-ignore
        const parsed: string[] = this.id().split(':');
        if (parsed) {
          return {
            row: +parsed[0],
            col: +parsed[1],
          };
        }
      }
      return this.data.id;
    }
  }

  find(selector: string) {
    if (this.$el) {
      return $(this.$el.querySelector(selector));
    }
  }
  // @ts-ignore
  findAll(selector: string): NodeList {
    if (this.$el) {
      return this.$el?.querySelectorAll(selector);
    }
  }

  closest(selector: string) {
    return $(this.$el?.closest(selector));
  }
  // @ts-ignore
  getCoords(): DOMRect {
    if (this.$el) {
      return this.$el?.getBoundingClientRect();
    }
  }

  onFocus() {
    if (this.$el) {
      if ('focus' in this.$el) {
        this.$el.focus();
      }
    }
    return this;
  }

  attr(name: string, value: string) {
    if (value) {
      this.$el?.setAttribute(name, value);
      return this;
    }
    return this.$el?.getAttribute(name);
  }
}
export const $ = (
    selector: HTMLElement | string | Element | null | undefined
) => {
  return new Dom(selector);
};

$.create = (tag: string, classes?: string) => {
  const el = document.createElement(tag);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
