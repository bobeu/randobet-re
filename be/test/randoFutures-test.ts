import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { BigNumber } from "bignumber.js"
import { parseEther, parseUnits } from "ethers";

describe("RandoFuturesTest", function () {
  async function deployContractsFixture() {
    const BET = parseEther('10') // $10 CELO
    const PLAYER_FEE = parseUnits('0.01', 16); // 0.01%
    const [deployer, player1, player2, player3, trigger, escape, identityVerifier] = await ethers.getSigners();
    const players = Array.from([player1, player2, player3]);
    const RandoFutures = await ethers.getContractFactory("RandoFutures");
    const randoFutures = await RandoFutures.connect(deployer).deploy(BET, 20, 100);
    const randoFuturesAddr = await randoFutures.getAddress();

    const FeeReceiver = await ethers.getContractFactory("FeeReceiver");
    const feeReceiver = await FeeReceiver.deploy(escape.address);
    const feeReceiverAddr = await feeReceiver.getAddress();

    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy(identityVerifier.address);
    const verifierAddr = await verifier.getAddress();

    await randoFutures.connect(deployer).setDataStruct(0, feeReceiverAddr, PLAYER_FEE);
    await randoFutures.connect(deployer).setVerifier(verifierAddr);

    const getData = async () => {
      return await randoFutures.getData();
    };

    const getBalanceOfFeeTo = async() => {
      const bal = await trigger.provider.getBalance(feeReceiverAddr);
      return bal;
    }
  
    const getBalanceOfTrigger = async() => {
      const triggerAddr = await trigger.getAddress();
      const bal = await randoFutures.triggereRewards(triggerAddr);
      return bal;
    }
  
    const placeBet = async () => {
      let totalBets = 0n;
      for (let i = 0; i < players.length; i++) {
        await verifier.connect(players[i]).setVerification()
        await randoFutures.connect(players[i]).placeBet({ value: PLAYER_FEE + BET });
        totalBets += BET;
      }
      const data = await getData();
      return { players, data, totalBets };
    };

    const withdraw = async ({players, bet, epoch}: {players: SignerWithAddress[], bet: bigint, epoch: bigint}) => {
      const approvedSender = deployer;
      const balancesB4 : bigint[] = [];
      const balancesAfter : bigint[] = [];
      let allBal : bigint = 0n;
      const epochBalance = await randoFutures.checkEpochBalance(bet, epoch);
      const contractBal = await players[0].provider.getBalance(randoFuturesAddr);
      // console.log("ContractBal: ", contractBal.toString());
      // console.log("EpochBalance:", epochBalance.toString());
      for (let i = 0; i < players.length; i++) {
        const recipient = players[i].address;
        const epochBal = await randoFutures.connect(players[i]).checkBalance(bet, epoch);
        allBal += epochBal;
        console.log(`Player ${i + 1} bal before = ${epochBal.toString()}`);
        const balancesB4Withdraw = await approvedSender.provider.getBalance(recipient);
        balancesB4.push(balancesB4Withdraw);
        await randoFutures.connect(approvedSender).withdraw(bet, epoch, recipient, recipient);
        const balance = await approvedSender.provider.getBalance(recipient);
        balancesAfter.push(balance);
        // console.log(`Bal done ${i}`);
      }
      const contractBalAfter = await players[0].provider.getBalance(randoFuturesAddr);
      // console.log("contractBalAfter withdraw: ", contractBalAfter.toString());
      return {balancesB4, balancesAfter, allBal};
    };

    const runDraw = async ({players} : {players: SignerWithAddress[]}) => {
      const nextBet = BET + parseEther('10');
      const randInputs : bigint[] = [];
      players.forEach((_, i) => {
        const base = new BigNumber(10);
        const power = new BigNumber(18);
        const exponential = base.exponentiatedBy(power);
        const randoPult = new BigNumber(Math.random().toString()).times(exponential).toString();
        // let rawRand = parseUnits(Math.random().toString(), 18);
        // console.log("randoPult: ", randoPult);
        randInputs.push(BigInt(randoPult));
      });
      console.log("randoPults", randInputs)
      await randoFutures.connect(deployer).runDraw(randInputs, nextBet, trigger.address);
      return nextBet;
    };

    const getTriggerReward = async (sender: SignerWithAddress) => {
      const balB4 = await trigger.provider.getBalance(trigger.address);
      await randoFutures.connect(sender).getTriggerReward(trigger.address, trigger.address);
      const balAfter = await trigger.provider.getBalance(trigger.address);
      return { balAfter, balB4 };
    };

    const getDeadBalance = async(epoch: bigint) => {
      const deadlBalance = await feeReceiver.deadBalances(epoch);
      return deadlBalance;
    }

    return {
      feeReceiver,
      BET,
      players,
      deployer,
      player1,
      player2,
      player3,
      verifier,
      randoFutures,
      feeReceiverAddr,
      getData,
      withdraw,
      placeBet,
      runDraw,
      getDeadBalance,
      getTriggerReward,
      getBalanceOfFeeTo,
      getBalanceOfTrigger,
      setInterval,
    };
  }

  describe("Testing RandoFutures", function () {
    it("Players should place bet successfully", async function () {
      const { BET, placeBet, feeReceiverAddr } = await loadFixture(deployContractsFixture);
      const { data, players, totalBets } = await placeBet();
      const { currentEpochBet, deadEpoch, state, nextEpochBet, spin } = data;
      expect( BET ).to.be.equal(spin.unit);
      expect( totalBets ).to.be.equal(spin.pool);
      expect( currentEpochBet ).to.equal(BET);
      expect( nextEpochBet ).to.be.equal(0n);
      expect( deadEpoch ).to.be.equal(0n);
      expect( state.epoches ).to.be.equal(0n);
      expect( state.data.drawInterval ).to.be.equal(0n);
      expect( state.data.lastDraw ).to.be.equal(0n);
      expect( state.data.feeTo ).to.be.equal(feeReceiverAddr);
      expect( spin.players.length ).to.be.equal(players.length);
      spin.players.forEach(({addr, bal}, i) => {
        expect( addr ).to.be.equal(players[i].address);
        expect( bal ).to.be.equal(0n);
      })
    });

    it("Should perfrom draw successfully", async function () {
      const { placeBet, runDraw, getData, randoFutures, BET } = await loadFixture(deployContractsFixture);
      const { players, totalBets } = await placeBet();
      console.log(`Pool balance b4 draw: `, (await getData()).spin.pool);
      const nextBet = await runDraw({players});
      const { currentEpochBet, nextEpochBet, spin } = await randoFutures.getDataByEpoch(0n);
      console.log(`Pool balance after draw: `, spin.pool.toString());
      spin.players.forEach(({addr, bal}, i) => console.log(`Player ${i + 1} : ${addr} bal is: `, bal.toString()))
      expect(currentEpochBet).to.be.equal(BET);
      expect(nextEpochBet).to.be.equal(nextBet);
      expect(spin.players.length).to.be.equal(players.length);
      expect(spin.pool < totalBets).to.be.true;
    });

    it("Should withdraw successfully", async function () {
      const { placeBet, runDraw, getData, withdraw, getBalanceOfFeeTo, getBalanceOfTrigger, randoFutures, BET } = await loadFixture(deployContractsFixture);
      const { players, data } = await placeBet();
      await runDraw({players});
      const dataB4 = await randoFutures.getDataByEpoch(0);
      console.log("pool bal", data.spin.pool);
      const { balancesAfter, balancesB4, allBal } = await withdraw({players, bet: BET, epoch: data.state.epoches});
      const dataAfter = await randoFutures.getDataByEpoch(0);
      // console.log(`Balance After: ${balancesAfter.toString()}`);
      // console.log(`Balance B4: ${balancesB4.toString()}`);
      const balanceFeeTo = await getBalanceOfFeeTo();
      const balTrigger = await getBalanceOfTrigger();
      const totalBals = balTrigger + balanceFeeTo + allBal
      console.log("balanceFeeT", balanceFeeTo.toString());
      console.log("balTrigger", balTrigger.toString());
      console.log("totalBals", totalBals.toString());
      if(balancesAfter > balancesB4) {
        expect(dataAfter.spin.pool < dataB4.spin.pool).to.be.true;
      }
    });
  });
});

// 0x87B2d348a876B813a754C8d4D6A05Ab568F3e044 claim withdraw
