export function getCommitSummary(tag: undefined | null | string, commit: string, summary: string){
    let tagName = tag === null || tag === undefined ? '' : tag
    if (tagName.length != 0){
        tagName += ' - '
    }
    const length = 29 - tagName.length
    const name = summary.length <= length ? summary : summary.slice(0, length) + '...' 
    return tagName + commit.slice(0, 7) + ': ' + name 
}
