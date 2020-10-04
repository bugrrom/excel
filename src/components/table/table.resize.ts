import {$, Dom} from '../../core/dom';
import {IEvent} from '../interface';


export function resizeHandler(event: IEvent, $root: Dom) {
  return new Promise(((resolve) => {
    const $resize = $(event.target);
    const $parent = $resize.closest('[data-type="resizable"]');
    const coords: DOMRect = $parent.getCoords();
    const type = $resize.data ? $resize.data.resize : null;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value: string;
    $resize.css({opacity: 1, [sideProp]: '-5000px'});
    document.onmousedown= () => {
      return false;
    };
    document.onmousemove = (e) => {
      if ( type === 'col') {
        const delta = e.pageX - coords?.right;
        value = String(coords?.width + delta);
        $resize.css({right: String(-delta) + 'px'});
      } else {
        const delta = e.pageY - coords?.bottom;
        value = String(coords?.height + delta);
        $resize.css({bottom: String(-delta)+ 'px'});
      }
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onmousedown = null;
      if (type === 'col') {
        $parent.css({width: value + 'px'});
        $root
            .findAll(
                `[data-col="${$parent.data ? $parent.data.col : null}"]`
            )
            // @ts-ignore
            .forEach((el) => el.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }
      resolve({
        value,
        type,
        id: $parent.data ? $parent.data[type?type:''] : null,
      });

      $resize.css({opacity: 0, bottom: '0', right: '0'});
    };
  }));
}
