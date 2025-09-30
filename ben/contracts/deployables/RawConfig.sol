// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.28;

// import { SelfUtils } from "@selfxyz/contracts/contracts/libraries/SelfUtils.sol";

// contract RawConfig {
//     SelfUtils.UnformattedVerificationConfigV2 public rawConfig;

//     /**
//      * @dev Constructor
//      * @notice We set the scope to zero value hoping to set the real value immediately after deployment. This saves 
//      * us the headache of generating the contract address ahead of time 
//      */
//     constructor(
//         address hubV2, 
//         string memory scopeSeed,
//         bool ofacEnabled,
//         uint8 olderThan,
//         string[] memory forbiddenCountries
//     )
//         Ownable(_msgSender())
//     {
//         rawConfig = _generateRawVerificationConfig(
//             olderThan,
//             forbiddenCountries,
//             ofacEnabled
//         );
//     }

//     function _generateRawVerificationConfig(
//         uint8 olderThan,
//         string[] memory forbiddenCountries,
//         bool ofacEnabled
//     ) internal pure returns(SelfUtils.UnformattedVerificationConfigV2 memory rawConfig) {
//         // string[] memory forbiddenCountries = new string[](4);
//         // forbiddenCountries[0] = CountryCodes.UNITED_STATES;
//         rawConfig = SelfUtils.UnformattedVerificationConfigV2({
//             olderThan: olderThan,
//             forbiddenCountries: forbiddenCountries,
//             ofacEnabled: ofacEnabled
//         });
//     }
// }
