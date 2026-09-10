import { readFile, writeFile } from 'node:fs/promises'

const generatedPath = new URL('../src/rootTypes/generated.ts', import.meta.url)
const hooksPath = new URL('../src/rootTypes/apolloHooks.ts', import.meta.url)
const barrelPath = new URL('../src/rootTypes/compositionFunctions.ts', import.meta.url)

const source = await readFile(generatedPath, 'utf8')
const documents = [...source.matchAll(/export const (\w+)Document = /g)].map(
    (match) => match[1]
)

const typeNames = documents.flatMap((name) => {
    const isMutation = source.includes(`export type ${name}Mutation `)
    return isMutation
        ? [`${name}Mutation`, `${name}MutationVariables`]
        : [`${name}Query`, `${name}QueryVariables`]
})

const lines = [
    `import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react'`,
    `import type { LazyQueryHookOptions, MutationHookOptions, QueryHookOptions } from '@apollo/client/react'`,
    `import {`,
    ...documents.flatMap((name) => {
        const isMutation = source.includes(`export type ${name}Mutation `)
        const resultType = isMutation ? `${name}Mutation` : `${name}Query`
        const variablesType = isMutation
            ? `${name}MutationVariables`
            : `${name}QueryVariables`
        return [`    ${name}Document,`, `    type ${resultType},`, `    type ${variablesType},`]
    }),
    `} from './generated'`,
    ``,
    `export {`,
    ...documents.map((name) => `    ${name}Document,`),
    `} from './generated'`,
    `export type {`,
    ...typeNames.map((name) => `    ${name},`),
    `} from './generated'`,
    ``,
]

for (const name of documents) {
    const isMutation = source.includes(`export type ${name}Mutation `)
    if (isMutation) {
        lines.push(
            `export function use${name}Mutation(`,
            `    options?: MutationHookOptions<${name}Mutation, ${name}MutationVariables>,`,
            `) {`,
            `    return useMutation(${name}Document, options as any)`,
            `}`,
            ``
        )
        continue
    }

    lines.push(
        `export function use${name}Query(`,
        `    options?: QueryHookOptions<${name}Query, ${name}QueryVariables>,`,
        `) {`,
            `    return useQuery(${name}Document, options as any)`,
            `}`,
            ``,
            `export function use${name}LazyQuery(`,
            `    options?: LazyQueryHookOptions<${name}Query, ${name}QueryVariables>,`,
            `) {`,
            `    return useLazyQuery(${name}Document, options as any)`,
        `}`,
        ``
    )
}

await writeFile(hooksPath, lines.join('\n'))
await writeFile(
    barrelPath,
    `export * from './schemaTypes'\nexport * from './apolloHooks'\n`
)

const schemaSource = await readFile(new URL('../src/rootTypes/schemaTypes.ts', import.meta.url), 'utf8')
const schemaExports = [...schemaSource.matchAll(/^export (?:enum|type) (\w+)/gm)].map((match) => match[1])
const uniqueSchemaExports = [...new Set(schemaExports)].filter((name) => name !== 'Maybe' && name !== 'InputMaybe' && name !== 'Scalars')

let patchedGenerated = source
for (const name of uniqueSchemaExports) {
    patchedGenerated = patchedGenerated.replace(
        new RegExp(`\\nexport type ${name} =[\\s\\S]*?(?=\\nexport (?:type|const|enum) )`, 'g'),
        '\n'
    )
}
if (!patchedGenerated.includes("from './schemaTypes'")) {
    patchedGenerated = `// @ts-nocheck\nimport type { ${uniqueSchemaExports.join(', ')} } from './schemaTypes'\n${patchedGenerated}`
}
await writeFile(generatedPath, patchedGenerated)

console.log(`Generated ${documents.length} Apollo document wrappers`)
