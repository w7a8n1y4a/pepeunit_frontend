export function stringToFormat(input: string | undefined): string | undefined {
    return input ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase() : undefined
}