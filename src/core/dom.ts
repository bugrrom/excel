class Dom {
    $el: HTMLElement | null ;
    constructor(selector: string|HTMLElement) {
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
}

export function $(selector: string|HTMLElement) {
  return new Dom(selector);
}

$.create = (tagName: string, classes: string = '') => {
  const el: HTMLElement = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
