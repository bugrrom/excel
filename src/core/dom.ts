type selector = string | HTMLElement | null | undefined | Element

class Dom {
    $el: HTMLElement | Element | null | undefined ;
    constructor(selector: selector) {
      this.$el = typeof selector === 'string' ?
          document.querySelector(selector) : selector;
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


    append(node: any) {
      if (node instanceof Dom) {
        node = node.$el;
      }
      if (this.$el) {
        if (!Element.prototype.append) {
          this.$el.appendChild(node);
        } else {
          this.$el.append(node);
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

    findAll(selector: string) {
      return this.$el?.querySelectorAll(selector);
    }

    css(style = {}) {
      Object.keys(style).forEach((el) =>{
        if (this.$el) {
          if ('style' in this.$el) {
            this.$el.style[el] = style[el];
          }
        }
      });
    }
}

export function $(selector: selector) {
  return new Dom(selector);
}

$.create = (tagName: string, classes = '') => {
  const el: HTMLElement = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
