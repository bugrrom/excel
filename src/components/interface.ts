export interface IEvent {
    target: HTMLInputElement
    ctrlKey?: KeyboardEvent,
    shiftKey?: KeyboardEvent,
    key: string
}
