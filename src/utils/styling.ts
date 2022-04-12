export function classNames(...args: (string | boolean | undefined)[]): string {
    return args.filter(Boolean).join(' ')
}
