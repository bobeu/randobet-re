import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { config as dotconfig } from "dotenv";
import { parseUnits } from 'ethers';

dotconfig();

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
	const {deploy, getNetworkName, execute} = deployments;
	const {deployer, identityVerificationHub, escapeAddr, admin2 } = await getNamedAccounts();

  const networkName = getNetworkName();
  console.log("Network Name", networkName); 
	const scopeValue = (networkName === 'alfajores' || networkName === 'sepolia')? BigInt('4319350143269433159794381960787025219367868494733527217403510607184063126703') : BigInt('9186502517255327601873870048821518942839570257762675244524402438880947571356');
	const verificationConfig = '0x1f63a88cf024c83c7fcb50653a20dae7732c7cced406455a68e08a50bfa6a03d'; 

  const INITIAL_BET = parseUnits('0.001', 18);
  const PLAYER_FEE = parseUnits('0.001', 18);
  const FLAT = 20;
  const OTHERFEE = 100;
  const DRAW_INTERVAL_IN_MIN = 15; // 15 minutes

  const feeReceiver = await deploy("FeeReceiver", {
    from: deployer,
    args: [escapeAddr],
    log: true,
  });
  
  console.log(`FeeReceiver deployed to: ${feeReceiver.address}`);

  const randoFutures = await deploy("RandoFutures", {
    from: deployer,
    args: [INITIAL_BET, FLAT, OTHERFEE],
    log: true,
  });

  console.log(`RandoFutures deployed to: ${randoFutures.address}`)

  const verifier = await deploy("Verifier", {
    from: deployer,
    args: [identityVerificationHub],
    log: true,
  });
  console.log(`Verifier deployed to: ${verifier.address}`);

  const standingOrder = await deploy("StandingOrder", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log(`StandingOrder deployed to: ${standingOrder.address}`);
  
  // Update VrfSetUp address in RandoFutures
  
  // try {
	// 	await execute("RandoFutures", {from: deployer}, "setVerifier", verifier.address);
  //   console.log("setVerifier executed");
	// } catch (error) {
	// 	const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
	// 	console.error("Error executing setVerifier:", errorMessage?.stack || errorMessage?.slice(0, 100));
	// }

  // try {
	// 	await execute("RandoFutures", {from: deployer}, "setDataStruct", DRAW_INTERVAL_IN_MIN, feeReceiver.address, PLAYER_FEE);
  //   console.log("setDataStruct executed");
	// } catch (error) {
	// 	const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
	// 	console.error("Error executing setDataStruct:", errorMessage?.stack || errorMessage?.slice(0, 100));
	// }
  
  // try {
	// 	await execute('StandingOrder', {from: deployer}, 'setBetFactory', randoFutures.address);
  //   console.log("setBetFactory executed");
	// } catch (error) {
	// 	const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
	// 	console.error("Error executing setBetFactory:", errorMessage?.stack || errorMessage?.slice(0, 100));
	// }

  // try {
	// 	await execute('RandoFutures', {from: deployer}, 'setOrderBox', standingOrder.address);
  //   console.log("setOrderBox executed");
	// } catch (error) {
	// 	const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
	// 	console.error("Error executing setOrderBox:", errorMessage?.stack || errorMessage?.slice(0, 100));
	// }

  // try {
	// 	await execute('Verifier', {from: deployer}, 'setConfigId', verificationConfig);
  //   console.log("setConfigId executed");
	// } catch (error) {
	// 	const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
	// 	console.error("Error executing setConfigId:", errorMessage?.stack || errorMessage?.slice(0, 100));
	// }

	try {
		await execute('Verifier', {from: deployer}, 'setScope', scopeValue);
    console.log("Scope set successfully");
	} catch (error) {
		const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
		console.error("Error executing setScope:", errorMessage?.stack || errorMessage?.slice(0, 100));
	}
 
	// try {
	// 	await execute('RandoFutures', {from: deployer}, 'setPermission', admin2);
  //   console.log(`Admin2 address ${admin2} added to RandoFutures`);
	// } catch (error) {
	// 	const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
	// 	console.error("Error executing setPermission:", errorMessage?.stack || errorMessage?.slice(0, 100));
	// }

};

export default func;

func.tags = ["RandoFutures", "Verifier", "FeeReceiver"];
