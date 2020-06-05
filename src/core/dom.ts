type selector = string | HTMLElement | null | undefined | Element | IDom
type parse = {row: number, col: number}
type id = parse | string | undefined

export interface IDom {
    text: (text?: string) => string | this | undefined
    html: (html?:string) => string | this | undefined
    clear: () => this
    on: (eventType: string, callback: ()=>void) => void
    off: (eventType: string, callback: ()=>void) => void
    append: (node: HTMLElement | Element | null | undefined | Node | IDom) => this
    readonly data : DOMStringMap | null | undefined
    closest: (selector: string) => IDom
    getCoords: () => DOMRect | undefined
    find: (selector: string) => IDom | HTMLElement | Element
    findAll: (selector: string) => NodeListOf<Element> | undefined
    css: (style: any) => void
    addClass: (className: string) => void
    removeClass: (className: string) => void
    id: (parse?: boolean | undefined) =>
        string | { row: number; col: number; } | undefined
    focus: () => this
}

class Dom implements IDom {
    $el: HTMLElement | Element | null | undefined ;
    constructor(selector: selector) {
      this.$el = typeof selector === 'string' ?
          document.querySelector(selector) : selector;
    }

    text(text?: string) {
      if (typeof text === 'string') {
        if (this.$el) {
          this.$el.textContent = text;
          return this;
        }
      }
      if (this.$el?.tagName.toLocaleLowerCase() === 'input') {
        return (<HTMLInputElement> this.$el).value.trim();
      }
      return this.$el?.textContent?.trim();
    }

    html(html?: string) {
      if (typeof html === 'string') {
        if (this.$el) {
          this.$el.innerHTML = html;
          return this;
        }
      } else {
        if (this.$el) {
          return this.$el.outerHTML.trim();
        }
      }
    }

    clear() {
      this.html('');
      return this;
    }

    on(eventType: string, callback: ()=>void) {
      if (this.$el) {
        this.$el.addEventListener(eventType, callback);
      }
    }

    off(eventType: string, callback: ()=>void) {
      if (this.$el) {
        this.$el.removeEventListener(eventType, callback);
      }
    }

    append(node: HTMLElement | Element | null | undefined | Node | IDom) {
      if (node instanceof Dom) {
        node = node.$el;
      }
      if (this.$el) {
        if (node) {
          if (!Element.prototype.append) {
            this.$el.appendChild(<Node>node);
          } else {
            this.$el.append(<Node>node);
          }
        }
      }
      return this;
    }

    get data() {
      if (this.$el) {
        return 'dataset' in this.$el ? this.$el.dataset : null;
      }
    }

    closest(selector:string) {
      return $(this.$el?.closest(selector));
    }

    getCoords() {
      return this.$el?.getBoundingClientRect();
    }

    find(selector: string) {
      return $(this.$el?.querySelector(selector));
    }

    findAll(selector: string) {
      return this.$el?.querySelectorAll(selector);
    }

    css(style: any = {}) {
      Object.keys(style).forEach((el: any) =>{
        if (this.$el) {
          if ('style' in this.$el) {
            this.$el.style[el] = style[el];
          }
        }
      });
    }

    addClass(className: string) {
        this.$el?.classList.add(className);
        return this;
    }

    removeClass(className:string) {
        this.$el?.classList.remove(className);
        return this;
    }

    id(parse?: boolean): string | { row: number; col: number; } | undefined {
      if (this.data) {
        if (parse) {
          const parsed: string[] = (<string> this.id()).split(':');
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

    focus() {
      if (this.$el) {
        if ('focus' in this.$el) {
          this.$el.focus();
        }
      }
      return this;
    }
}

export function $(selector: selector): IDom {
  return new Dom(selector);
}

$.create = (tagName: string, classes = ''): IDom => {
  const el: HTMLElement = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
