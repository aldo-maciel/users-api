export type Pagination = {
    start: number
    step: number
}

export type Props = {
    onChange(pagination: Pagination): void,
    step: number
}
