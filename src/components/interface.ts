export interface IEvent {
    target: HTMLInputElement,
    ctrlKey?: KeyboardEvent,
    shiftKey? : KeyboardEvent,
}

export interface IEmitter {
    emit:(event: string, ...args: any) => void,
    subscribe: (event: string, fn: (text: string) => void) => () => void
}

export interface IOptional {
    name?: string,
    listeners?: string[]
    emitter: IEmitter
}