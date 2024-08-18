export interface IUser {
    id: string;
    telegramId: string;
    money: number;
    username: string;
}
export interface ISellData {
    itemIdInDb: number;
    isSellAll: boolean;
}
export interface ILootWithSellData {
    sellAll: number;
    sellOne: number;
}
export interface IBoostName {
    boostName: 'speed_boost' | 'time_boost' | 'money_boost' | 'focus_boost';
}
