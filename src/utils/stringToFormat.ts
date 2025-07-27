export function stringToFormat(input: string | undefined): string | null {
    return input ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase() : null
}