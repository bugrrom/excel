type selector = string | HTMLElement | null | undefined | Element | IDom

interface IStyle {
   width? : string | number,
   height? : string | number,
   opacity? : number,
   right? : string | number,
   bottom? : string | number
}

export interface IDom {
    text: (text?: string) => string | this | undefined
    html: (html?:string) => string | this | undefined
    clear: () => this
    on: (eventType: string, callback: ()=>void) => void
    off: (eventType: string, callback: ()=>void) => void
    append: (node: HTMLElement | Element | null | undefined | Node | IDom)
        => this
    readonly data : DOMStringMap | null | undefined
    closest: (selector: string) => IDom
    getCoords: () => DOMRect | undefined
    find: (selector: string) => IDom | HTMLElement | Element | undefined
    findAll: (selector: string) => NodeListOf<Element> | undefined
    css: (style: IStyle) => void
    addClass: (className: string) => this | undefined
    removeClass: (className: string) => void
    id: (parse?: boolean | undefined) =>
        string | { row: number; col: number; } | undefined
    focus: () => this
    attr: (name: string, value: string) => this
}

class Dom implements IDom {
    $el: HTMLElement | Element | null | undefined | IDom ;
    constructor(selector: selector) {
      this.$el = typeof selector === 'string' ?
          document.querySelector(selector) : selector;
    }

    text(text?: any) {
      if (this.$el) {
        if ('textContent' in this.$el) {
          if (typeof text !== 'undefined') {
            if (this.$el) {
              this.$el.textContent = text;
            }
            return this;
          }
          if (this.$el?.tagName.toLocaleLowerCase() === 'input') {
            return (<HTMLInputElement> this.$el).value.trim();
          }
          return this.$el?.textContent?.trim();
        }
      }
    }

    html(html?: string) {
      if (this.$el) {
        if (typeof html === 'string') {
          if ('innerHTML' in this.$el) {
            this.$el.innerHTML = html;
          }
          return this;
        } else {
          return 'outerHTML' in this.$el ? this.$el.outerHTML.trim() : '';
        }
      }
    }

    clear() {
      this.html('');
      return this;
    }

    on(eventType: string, callback: ()=>void) {
      if (this.$el) {
        if ('addEventListener' in this.$el) {
          this.$el.addEventListener(eventType, callback);
        }
      }
    }

    off(eventType: string, callback: ()=>void) {
      if (this.$el) {
        if ('removeEventListener' in this.$el) {
          this.$el.removeEventListener(eventType, callback);
        }
      }
    }

    append(node: HTMLElement | Element | null | undefined | Node | IDom) {
      if (node instanceof Dom) {
        node = node.$el;
      }
      if (this.$el) {
        if (node) {
          if (!Element.prototype.append) {
            if ('appendChild' in this.$el) {
              this.$el.appendChild(<Node>node);
            }
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
      if (this.$el) {
        if ('getBoundingClientRect' in this.$el) {
          return this.$el?.getBoundingClientRect();
        }
      }
    }

    find(selector: string) {
      if (this.$el) {
        if ('querySelector' in this.$el) {
          return $(this.$el?.querySelector(selector));
        }
      }
    }

    findAll(selector: string) {
      if (this.$el) {
        if ('querySelectorAll' in this.$el) {
          return this.$el?.querySelectorAll(selector);
        }
      }
    }

    css(style: IStyle = {}) {
      Object.keys(style).forEach((el: string) =>{
        if (this.$el) {
          if ('style' in this.$el) {
            this.$el.style[el] = style[el];
          }
        }
      });
    }

    addClass(className: string) {
      if (this.$el) {
        if ('classList' in this.$el) {
                this.$el?.classList.add(className);
                return this;
        }
      }
    }

    removeClass(className:string) {
      if (this.$el) {
        if ('classList' in this.$el) {
                this.$el?.classList.remove(className);
                return this;
        }
      }
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

    getStyles(styles: string[] = []) {
      return styles.reduce((res, s: string) => {
        if (this.$el) {
          if ('style' in this.$el) {
            res[s] = this.$el.style[s];
          }
        }
        return res;
      }, {});
    }

    attr(name: string, value: string) {
      if (value) {
        if (this.$el) {
          if ('setAttribute' in this.$el) {
            this.$el.setAttribute(name, value);
            return this;
          }
        }
      }
      if (this.$el) {
        if ('getAttribute' in this.$el) {
          return this.$el.getAttribute(name);
        }
      }
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
