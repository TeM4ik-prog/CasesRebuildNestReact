

export function RandInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min + 1))

}

export function RandElemFromAr(array: any[]): any {
    return array[RandInt(0, array.length - 1)]
}



