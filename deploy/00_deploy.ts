import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { config as dotconfig } from "dotenv";
import { parseUnits } from 'ethers';

dotconfig();
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
	const {deploy, getNetworkName, execute} = deployments;
	const {deployer, identityVerificationHub,  } = await getNamedAccounts();

  const networkName = getNetworkName();
  console.log("Network Name", networkName); 
  const INITIAL_BET = parseUnits('0.001', 18);
  const FLAT = 100;
  const OTHERFEE = 20;

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
  console.log(`RandoInstant deployed to: ${verifier.address}`)
  
  // Update VrfSetUp address in RandoFutures
  await execute("RandoFutures", {from: deployer}, "setVerifier", verifier.address);
};

export default func;

func.tags = ["RandoFutures"];
