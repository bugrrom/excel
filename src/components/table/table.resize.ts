import {$, IDom} from '../../core/dom';
import {IEvent} from '../interface';


// eslint-disable-next-line max-len
export function tableResize($root: HTMLElement | Element | IDom, event: IEvent) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data ? $resizer.data.resize : null;
    let value: string;
    $resizer.css({opacity: 1});
    let cells: NodeListOf<Element> | HTMLElement[] | undefined;
    if ('findAll' in $root) {
      cells =
          $root.findAll(`[data-col="${$parent.data ?$parent.data.col: ''}"]`);
    }
    document.onmousemove = (e) => {
      if (type === 'coll') {
        if (coords?.right) {
          const delta = Math.floor(e.pageX - coords.right);
          value = String(coords.width + delta);
          $resizer.css({right: -delta + 'px', bottom: '-5000px'});
        }
      } else {
        if (coords) {
          const delta = Math.floor(e.pageY - coords?.bottom);
          value = String(coords.height + delta);
          $resizer.css({bottom: -delta + 'px', right: '-5000px'});
        }
      }
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'coll') {
        $parent.css({width: value + 'px'});
        if (cells) {
          cells.forEach((el : Element) => el.style.width = value + 'px');
        }
      } else {
        $parent.css({height: value + 'px'});
      }
      $resizer.css({opacity: 0, bottom: 0, right: 0});
      resolve({
        value,
        type,
        id: type === 'coll'? $parent.data.col : $parent.data.row,
      });
    };
  });

}
