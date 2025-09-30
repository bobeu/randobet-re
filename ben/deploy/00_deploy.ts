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
	const verificationConfig = '0xa41a1045059c44733742c2bacf094ab732c4b62c190734c7c3ba5574b3888c9a'; 

  const INITIAL_BET = parseUnits('0.001', 18);
  const PLAYER_FEE = parseUnits('0.001', 18);
  const FLAT = 100;
  const OTHERFEE = 20;
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
  console.log(`RandoFutures deployed to: ${verifier.address}`);
  
  // Update VrfSetUp address in RandoFutures
  await execute("RandoFutures", {from: deployer}, "setVerifier", verifier.address);
  await execute("RandoFutures", {from: deployer}, "setDataStruct", DRAW_INTERVAL_IN_MIN, feeReceiver.address, PLAYER_FEE);

  try {
		await execute('Verifier', {from: deployer}, 'setConfigId', verificationConfig);
    console.log("setConfigId executed");
	} catch (error) {
		const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
		console.error("Error executing setConfigId:", errorMessage?.stack || errorMessage?.slice(0, 100));
	}

	try {
		await execute('Verifier', {from: deployer}, 'setScope', scopeValue);
    console.log("Scope set successfully");
	} catch (error) {
		const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
		console.error("Error executing setScope:", errorMessage?.stack || errorMessage?.slice(0, 100));
	}

	try {
		await execute('RandoFutures', {from: deployer}, 'setPermission', admin2);
    console.log(`Admin2 address ${admin2} added to RandoFutures`);
	} catch (error) {
		const errorMessage = error?.message || error?.reason || error?.data?.message || error?.data?.reason;
		console.error("Error executing setPermission:", errorMessage?.stack || errorMessage?.slice(0, 100));
	}

};

export default func;

func.tags = ["RandoFutures", "Verifier", "FeeReceiver"];
