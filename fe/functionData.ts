// Mainnet contract configs
import placeBet42220 from "./contractsArtifacts/42220/placeBet.json";
import runDraw42220 from "./contractsArtifacts/42220/runDraw.json";
import checkBalance42220 from "./contractsArtifacts/42220/checkBalance.json";
import checkEpochBalance42220 from "./contractsArtifacts/42220/checkEpochBalance.json";
import getDataByEpoch42220 from "./contractsArtifacts/42220/getDataByEpoch.json";
import getData42220 from "./contractsArtifacts/42220/getData.json";
import isVerified42220 from "./contractsArtifacts/42220/isVerified.json";
import claimTriggerReward42220 from "./contractsArtifacts/42220/claimTriggerReward.json";
import isDrawNeeded42220 from "./contractsArtifacts/42220/isDrawNeeded.json";
import setBetListUpfront42220 from "./contractsArtifacts/42220/setBetListUpfront.json";
import setFee42220 from "./contractsArtifacts/42220/setFee.json";
import setVerification42220 from "./contractsArtifacts/42220/setVerification.json";
import withdraw42220 from "./contractsArtifacts/42220/withdraw.json";
import getBalanceFromCurrentEpoch42220 from "./contractsArtifacts/42220/getBalanceFromCurrentEpoch.json";
import setPermission42220 from "./contractsArtifacts/42220/setPermission.json";
import removePermission42220 from "./contractsArtifacts/42220/removePermission.json";
import isPermitted42220 from "./contractsArtifacts/42220/isPermitted.json";
import toggleUseWalletVerification42220 from "./contractsArtifacts/42220/toggleUseWalletVerification.json";

// Celo Sepolia contract configs
import placeBet11142220 from "./contractsArtifacts/11142220/placeBet.json";
import runDraw11142220 from "./contractsArtifacts/11142220/runDraw.json";
import checkBalance11142220 from "./contractsArtifacts/11142220/checkBalance.json";
import checkEpochBalance11142220 from "./contractsArtifacts/11142220/checkEpochBalance.json";
import getDataByEpoch11142220 from "./contractsArtifacts/11142220/getDataByEpoch.json";
import getData11142220 from "./contractsArtifacts/11142220/getData.json";
import isVerified11142220 from "./contractsArtifacts/11142220/isVerified.json";
import claimTriggerReward11142220 from "./contractsArtifacts/11142220/claimTriggerReward.json";
import isDrawNeeded11142220 from "./contractsArtifacts/11142220/isDrawNeeded.json";
import setBetListUpfront11142220 from "./contractsArtifacts/11142220/setBetListUpfront.json";
import setFee11142220 from "./contractsArtifacts/11142220/setFee.json";
import setVerification11142220 from "./contractsArtifacts/11142220/setVerification.json";
import withdraw11142220 from "./contractsArtifacts/11142220/withdraw.json";
import getBalanceFromCurrentEpoch11142220 from "./contractsArtifacts/11142220/getBalanceFromCurrentEpoch.json";
import setPermission11142220 from "./contractsArtifacts/11142220/setPermission.json";
import removePermission11142220 from "./contractsArtifacts/11142220/removePermission.json";
import isPermitted11142220 from "./contractsArtifacts/11142220/isPermitted.json";
import toggleUseWalletVerification11142220 from "./contractsArtifacts/11142220/toggleUseWalletVerification.json";

// Global data import
import globalData from "./contractsArtifacts/global.json";

const { chainIds, approvedFunctions } = globalData;
const functionData = [
    [
        { key: 'getDataByEpoch', value: { ...getDataByEpoch11142220} },
        { key: 'getData', value: { ...getData11142220} },
        { key: 'isVerified', value: { ...isVerified11142220} },
        { key: 'claimTriggerReward', value: { ...claimTriggerReward11142220} },
        { key: 'isDrawNeeded', value: { ...isDrawNeeded11142220} },
        { key: 'setBetListUpfront', value: { ...setBetListUpfront11142220} },
        { key: 'setVerification', value: { ...setVerification11142220} },
        { key: 'withdraw', value: { ...withdraw11142220} },
        { key: 'getData', value: { ...getData11142220} },
        { key: 'setPermission', value: { ...setPermission11142220} },
        { key: 'removePermission', value: { ...removePermission11142220} },
        { key: 'isPermitted', value: { ...isPermitted11142220} },
        { key: 'getBalanceFromCurrentEpoch', value: { ...getBalanceFromCurrentEpoch11142220} },
        { key: 'placeBet', value: { ...placeBet11142220} },
        { key: 'runDraw', value: { ...runDraw11142220} },
        { key: 'toggleUseWalletVerification', value: { ...toggleUseWalletVerification11142220} },
        { key: 'setFee', value: { ...setFee11142220} },
        { key: 'checkBalance', value: { ...checkBalance11142220} },
        { key: 'checkEpochBalance', value: { ...checkEpochBalance11142220} },
    ],
    [
        { key: 'getDataByEpoch', value: { ...getDataByEpoch42220} },
        { key: 'getData', value: { ...getData42220} },
        { key: 'isVerified', value: { ...isVerified42220} },
        { key: 'claimTriggerReward', value: { ...claimTriggerReward42220} },
        { key: 'isDrawNeeded', value: { ...isDrawNeeded42220} },
        { key: 'setBetListUpfront', value: { ...setBetListUpfront42220} },
        { key: 'setVerification', value: { ...setVerification42220} },
        { key: 'withdraw', value: { ...withdraw42220} },
        { key: 'getData', value: { ...getData42220} },
        { key: 'setPermission', value: { ...setPermission42220} },
        { key: 'removePermission', value: { ...removePermission42220} },
        { key: 'isPermitted', value: { ...isPermitted42220} },
        { key: 'getBalanceFromCurrentEpoch', value: { ...getBalanceFromCurrentEpoch42220} },
        { key: 'placeBet', value: { ...placeBet42220} },
        { key: 'runDraw', value: { ...runDraw42220} },
        { key: 'toggleUseWalletVerification', value: { ...toggleUseWalletVerification42220} },
        { key: 'setFee', value: { ...setFee42220} },
        { key: 'checkBalance', value: { ...checkBalance42220} },
        { key: 'checkEpochBalance', value: { ...checkEpochBalance42220} },
    ],
];

/**
 * @dev Fetch contract data related to a specific chain and function. By default it fetches data for celo mainnet if
 * no chainId is provided.
 * @param functionName : Function name
 * @param chainId : Connected chainId
 * @returns Contract data
 */
export const getFunctionData = (functionName: string, chainId: number = chainIds[0]) => {
    if(!approvedFunctions.includes(functionName)) {
        throw new Error(`${functionName} not supported`);
    }
    const chainIndex = chainIds.indexOf(chainId);
    // const found = functionData[0].filter(q => q.key.toLowerCase() === functionName.toLowerCase());
    const found = functionData[chainIndex].filter(q => q.key.toLowerCase() === functionName.toLowerCase());
    return found?.[0].value; 
}