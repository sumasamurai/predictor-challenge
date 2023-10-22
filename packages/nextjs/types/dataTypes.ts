export interface RoundInfo {
    epoch: number;
    openPrice: number;
    closePrice: number;
    longAmount: number;
    shortAmount: number;
    totalAmount: number;
    rewardAmount: number;
    startTimestamp: number;
    closeTimestamp: number;
    lockTimestamp: number;
}

export type RoundData = {
    epoch: bigint;
    openPrice: bigint;
    closePrice: bigint;
    longAmount: bigint;
    shortAmount: bigint;
    totalAmount: bigint;
    rewardAmount: bigint;
    startTimestamp: bigint;
    closeTimestamp: bigint;
    lockTimestamp: bigint;
};
