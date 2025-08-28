// SPDX-License-Identifier: MIT 

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IProvider.sol";

pragma solidity 0.8.28;

/**@title Provider : is a title given to the users who vested their interest 
  in supporting the RandoBet project. They make financial commitment to support
  and boost the success of the project which in turn earn them a fraction of the 
  reward accrued to the project. The reward comes in form of accumulated fees. 
  However, this excludes all forms of income not expressly specified in the 
  providers agreement book. 
  Owning to the functionalities of this contract, it is able to do perform the following
  
  - Whitelist users. {Successfully Whitelisted users are providers}
  - Blacklist providers. {This task can be performed by the deployer upon ratification by at least one other provider}. Note that the deployer does not have power to take funds out of this contract or perform action that can cause potential damage to the contract or other providers.
  - Inititate a transaction request. {Any provider can initiate a transaction provided there is no pending trxn}. The type of trxn that can be initiated or executed are described in the "TxType" enum. The first type in the list are by default excluded. (SETTOKEN, SETFEERECEIVER, BLACKLIST).
  - Sign a transaction request.
  - Execute transaction. Upon signing a trxn, if the required number of signers are achieved, the corresponding trxn request is immediately executed.

  Error code: To reduce contract size, error codes are provided for easy filter on the frontend.
  
  101 - User was whitelisted
  102 - User already signed
  103 - Sig completed
  104 - FeeTo is zero address
  105 - Eth transfer failed
  106 - Approval to spend token failed
  107 - Provided liquidity too low
  108 - Provided allowance too low
  109 - Function restricted
  110 - Minimum of one signature is required
  111 - Cannot contend disputed or resolved transaction
  112 - 

  @author : Bobeu
  Github: https://github.com/bobeu
  Contact: dev.qcontrib@ gmail.com
  X formerly twitter: https://twitter.com/bobman7000
 */

contract Providers is IProvider, Context {
  error ThereIsPendingTrxn();
  error TrxnWasDisputed(uint64 timedisputed);

  event Whitelisted(address indexed user, uint256 liquidity);
  event NewPendingTrxn(uint8 selector, bool status);
  event TrxnExecuted(TxnType txnType, address param);

  /**@dev TxnType allowed by this contract.
    They can only be initiated and signed by the providers. 
  */ 
  enum TxnType { NONE, SETTOKEN, SETFEERECEIVER, BLACKLIST, SETMINLIQINETH, SETMINLIQINTOKEN }

  // Status of a trxn at any time
  enum Status { INACTIVE, ACTIVE }

  /**@dev Pending trxn
    Note: There can only be one pending or initiated trxn at 
          any time.
  */
  TransactionData public transaction;

  // Tracks total providers
  uint8 public providersCount;

  /**@dev Providers signature count.
    This signature is required to make a non-trivia changes
   */
  uint8 public providersSig;

  // The amount of liquidity that can be provided in ETH cannot go 
  // below this threshold if ETH was set.
  uint256 public minimumLiquidityInETH;

  // The amount of liquidity that can be provided in Token cannot go 
  // below this threshold if token was set.
  uint256 public minimumLiquidityInToken;

  // Whether to accept providers or not
  bool public acceptingProviders;

  /**@dev Base token for payment. If this is set to address(0),
    it will switch to using ETH i.e platform coin/token 
   */
  address public token;

  // Fee receiver
  address public feeReceiver;

  /**Dev address has privilege to blacklist a provider.
    It can execute only this task. 
   */
  address private devAddr;

  // Provider data
  struct Provider {
    uint256 liquidity; // The amount of liquidity provided.
    uint64 date; // Date or time it was provided
  }

  /**@dev Contain transaction txnType
    i.e Trxns awaiting approval and status
  */
  struct TransactionData {
    TxnType txnType;
    Status status;
    bool disputed;
    uint64 timedisputed;
    uint64 txId;
    uint256 minLiquidity;
    address param;
    address opposer;
  }

  // Mapping of address {key} to Provider {value}
  mapping(address => Provider) private providers;

  // Tracks if provider have signed or not
  mapping(address => mapping(uint64 => bool)) private sigTracker;

  /**@dev Testing condition based on flag.
    Note {flag} is an internal input
   */  
  modifier filterAddress(address caller, uint8 flag, bool furtherCheck) {
    Provider memory pvd = providers[caller];
    bool whitelistUser = false;
    flag == 0? _requireCondition(pvd.date == flag, "101") : _requireCondition(pvd.date > 0, "User not whitelisted");
    if(furtherCheck) {
      _requireCondition(!sigTracker[caller][transaction.txId], "102");
      _requireCondition(providersSig < providersCount, "103");
    }
    _;
  }

  constructor(address _token, address _feeReceiver) {
    acceptingProviders = true;
    devAddr = _msgSender();
    _setToken(_token);
    _setFeeReceiver(_feeReceiver);
  }

  receive() payable external {
    address to = feeReceiver;
    if(feeReceiver == address(0)) {
      revert("Null");
    }
    _forwardFee(true, msg.value, to);
  }

  // /////////////////////// Utils ///////////////

  function _requireCondition(bool condition, string memory errorMessage) internal pure {
    require(condition, errorMessage);
  }

  // Update token address
  function _setToken(address _token) private {
    _requireCondition(_token != address(0), "104");
    token = _token;
  }

  function _now() internal view returns(uint64 currentUnix) {
    currentUnix = uint64(block.timestamp);
  }

  // Forward fee
  function _forwardFee(bool isETH, uint256 amt, address to) private {
    _requireCondition(to != address(0), "104");
    if(isETH) {
      (bool done,) = to.call{value: amt}("");
      _requireCondition(done, "105");
    } else {
      _requireCondition(IERC20(token).transferFrom(_msgSender(), to, amt), "106");
    }     
  }

  // Resets trxnn data
  function _resetTrxnRequest() private {
    providersSig = 0;
    transaction = TransactionData(
      TxnType(0),
      Status(0),
      false,
      0,
      transaction.txId,
      0,
      address(0),
      address(0)
    );
  }
  /////////////////////////////////////////////////

  // Update feeReceiver address
  function _setFeeReceiver(address _feeReceiver) private {
    _requireCondition(_feeReceiver != address(0), "104");
    feeReceiver = _feeReceiver;
  }

  
  // Update minimum liquidityy in Eth
  function _setMinimumLiquidityInEth(uint256 _minimumLiquidityInEth) private {
    minimumLiquidityInETH = _minimumLiquidityInEth;
  }

  // Update minimum liquidityy in Token
  function _setMinimumLiquidityInToken(uint256 _minimumLiquidityInToken) private {
    minimumLiquidityInToken = _minimumLiquidityInToken;
  }

  /**@dev Add caller as provider
    If token address is empty, the contract assumes to use ETH, otherwise,
    it uses custom token.
    Note: Whitelisted users are advised to be sure of investing as token or fund
          sent to this contract are non-refundable.
   */
  function whitelistMe() public payable filterAddress(_msgSender(), 0, false) returns(bool) {
    address caller = _msgSender();
    uint256 liquidity = msg.value;
    bool isETH = true;
    if(token == address(0)) {
      _requireCondition(liquidity >= minimumLiquidityInETH, "107");
    }

    if(token != address(0)) {
      isETH = false;
      liquidity = IERC20(token).allowance(caller, address(this));
      _requireCondition(liquidity >= minimumLiquidityInToken, "108");
    }

    providers[caller] = Provider(liquidity, _now());
    providersCount ++;
    _forwardFee(isETH, liquidity, feeReceiver);
    emit Whitelisted(caller, liquidity);

    return true;
  }

  /**@dev Address with special right can blacklist a provider
    Note: Blacklist is one-way. Not reversible.
  */
  function blacklistProvider() public returns(bool) {
    _requireCondition(_msgSender() == devAddr, "109");
    _requireCondition(providersSig > 0, "110");
    providers[transaction.param].date = 0;
    _resetTrxnRequest(); 

    return true;
  }

  /**@dev Initiate a new transaction.
    Only a provider can initiate a transaction.
    Note: All providers have equal right.
    Caller should provider the parameter needed to execute the
    function when signatures are completed.
    @param selector : This should be number between 0 and 6 but not including 0 and 6 since enums are also represented 
                      in integer, it is easier to select the type of trxn using number between 0 and 6.
    @param param : Parameter of type address needed to invoke _setToken and _setFeeReiver functions.
    @param minLiquidity : Paramter of type og uint256 to invoke _setMinimumLiquidityInEth and _setMinimumLiquidityInToken functions.
   */
  function initiateNewTrxn(uint8 selector, address param, uint256 minLiquidity) public returns(bool) {
    _requireCondition(selector > 0 && selector < 6 && param != address(0), "Invalid txn selector or param");
    TransactionData memory txn = transaction;
    if(txn.status == Status.INACTIVE) {
      transaction = TransactionData(TxnType(selector), Status.ACTIVE, false, 0, txn.txId + 1, minLiquidity, param, address(0));
    } else {
      revert ThereIsPendingTrxn();
    }

    emit NewPendingTrxn(selector, true);
    return true;
  }

  /**@dev A provider can delay a pending trxn.
    This will send current pending transaction into coma
    but will not cancel it. Trxn can only be in coma for 
    a max period of 48hours after which will be excutable.
    Note: A provider cannot dispute an already disputed 
      trxn after 48hours has elapsed. 
   */
  function disputeCurrentPendingTrxn() public returns(bool) {
    TransactionData memory txn = transaction;
    _requireCondition(!txn.disputed, "111");
    txn.disputed = true;
    txn.timedisputed = _now();
    txn.opposer = _msgSender();
    transaction = txn;

    return true;
  }

  /**@dev Provider signs current pending trxn
    Note 'filterAddress(_msgSender(), 1)' is checking if the caller
        is indeed a provider via whitelist flag.
    If the required signature is met, trxn will be immediately executed.
  */
  function signTransaction() public filterAddress(_msgSender(), 1, true) returns(bool) {
    sigTracker[_msgSender()][transaction.txId] = true;
    uint8 _providersCount = providersCount;
    providersSig ++;
    bool execute = false;
    if(_providersCount == 2 || _providersCount == 3) {
      if(providersSig == 2) {
        execute = true;
      }
    }

    if(_providersCount > 2) {
      if(providersSig >= (_providersCount / 2)) {
        execute = true;
      }
    }
    TransactionData memory txn = transaction; 
    if(execute && txn.disputed) {
      if(_now() >= (txn.timedisputed + 48 hours)) {
        transaction.disputed = false;
      } else {
        revert TrxnWasDisputed(txn.timedisputed);
      }
    }

    if(execute) {
      if(!transaction.disputed) {
        if(txn.txnType == TxnType.SETTOKEN) {
          _setToken(txn.param);
        } else if(txn.txnType == TxnType.SETMINLIQINETH) {
          _setMinimumLiquidityInEth(txn.minLiquidity);
        } else if(txn.txnType == TxnType.SETMINLIQINETH) {
          _setMinimumLiquidityInEth(txn.minLiquidity);
        } else if(txn.txnType == TxnType.SETFEERECEIVER) {
          _setFeeReceiver(txn.param);
        } else {
          revert("109");
        }
        _resetTrxnRequest();
        emit TrxnExecuted(txn.txnType, txn.param);
      }
    }
    return true;
  }

  // Get provider data. 
  function getProvider(address providerAddr) external view returns(uint256 liquidity, bool isProvider) {
    Provider memory prv = providers[providerAddr];
    return(prv.liquidity, prv.date > 0? true : false);
  }

  // External call: Returns token address 
  function getToken() external view returns(address){
    return token;
  }

}