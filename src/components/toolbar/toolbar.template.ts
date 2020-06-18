function toButton(button: button): string {
  const meta = ` 
    data-type="button" 
    data-value='${JSON.stringify(button.value)}'`;
  return `
        <div 
        class="button ${button.action ? 'active' : ''}" ${meta}>
        <i class="material-icons" ${meta}>${button.icon}</i>
      </div>
    `;
}

type button =
    { icon: string; action: boolean; value: { textAlign: string } } |
    { icon: string; action: boolean; value: { fontWeight: string } } |
    { icon: string; action: boolean; value: { fontStyle: string } } |
    { icon: string; action: boolean; value: { textDecoration: string } }

/* type button = {
    icon: string,
    action: string,
    value: {
        textAlign? : string,
        fontWeight? : string,
        fontStyle? : string,
        textDecoration? : string
    }
}*/


export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      action: state['textAlign'] === 'left',
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      action: state['textAlign'] === 'center',
      value: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      action: state['textAlign'] === 'right',
      value: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      action: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal': 'bold'},
    },
    {
      icon: 'format_italic',
      action: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal':'italic'},
    },
    {
      icon: 'format_underlined',
      action: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none':'underline'},
    },
  ];
  return buttons.map((el) => toButton(el)).join();
}
