export interface IUser {
    id: string,
    telegramId: string,
    money: number,
    username: string,
}


export interface ISellData {
    itemIdInDb: number,
    isSellAll: boolean
}




export interface ILootWithSellData {
    sellAll: number,
    sellOne: number
}



