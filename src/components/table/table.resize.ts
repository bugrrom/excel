import {$} from '../../core/dom';

export function tableResize($root: any, event:any) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  let value: string;
  $resizer.css({opacity: 1});
  const cells: HTMLElement[] =
        $root.findAll(`[data-col="${$parent.data.col}"]`);
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
      cells.forEach((el: HTMLElement) => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }

    $resizer.css({opacity: 0, bottom: 0, right: 0});
  };
}
