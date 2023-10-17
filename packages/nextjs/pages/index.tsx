import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { TransactionReceipt, parseEther } from "viem";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Slider } from "~~/components/Slider";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

const getWeiToEther = (wei: bigint): string => {
  const etherValue = Number(wei) / 1e18;
  return etherValue.toString();
};

const Home: NextPage = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [betAmount, setBetAmount] = useState(".001");
  const [newBetLimits, setNewBetLimits] = useState<string[] | undefined>([]);

  console.log(parseEther(".001"));

  const { data: betLimits } = useScaffoldContractRead({
    contractName: "PredictorGame",
    functionName: "getBetLimits",
  });

  const { data: currentEpoch } = useScaffoldContractRead({
    contractName: "PredictorGame",
    functionName: "currentEpoch",
  });

  useEffect(() => {
    if (betLimits && betLimits.length === 2) {
      const minBetInEther = getWeiToEther(betLimits[0]);
      const maxBetInEther = getWeiToEther(betLimits[1]);

      setNewBetLimits([minBetInEther, maxBetInEther]);
    }
  }, [betLimits]);

  const onPlayLong = async () => {
    try {
      setIsLoading(true);
      console.log("Handle Play Long");
      handlePlayLong();
      setIsLoading(false);
    } catch (error) {
      console.error("Error at the beginning of the game.", error);
      setIsLoading(false);
    }
  };

  const onPlayShort = async () => {
    try {
      setIsLoading(true);
      console.log("Handle Play Short");
      handlePlayShort();
      setIsLoading(false);
    } catch (error) {
      console.error("Error at the beginning of the game.", error);
      setIsLoading(false);
    }
  };

  const onClaim = async () => {
    try {
      setIsLoading(true);
      console.log("Handle Claim");
      // handleClaim();
      setIsLoading(false);
    } catch (error) {
      console.error("Error during 'Claim' action.", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback((e: any) => {
    return setBetAmount(e);
  }, []);

  const { writeAsync: handlePlayLong } = useScaffoldContractWrite({
    contractName: "PredictorGame",
    functionName: "playLong",
    value: parseEther(betAmount),
    args: [currentEpoch],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: handlePlayShort } = useScaffoldContractWrite({
    contractName: "PredictorGame",
    functionName: "playShort",
    value: parseEther(betAmount),
    args: [currentEpoch],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 justify-center items-center">
        <div className="container mx-auto my-10">
          <div className="grid grid-cols-4 gap-8">
            <div className="board col-span-4 lg:col-span-3 rounded-3xl px-6 lg:px-8 py-4 light:shadow-lg shadow-base-300">
              <Slider />
            </div>

            <div className="panel col-span-4 lg:col-span-1">
              <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 mb-6 space-y-1">
                <div className="z-10">
                  <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                    <div className="text-base text-center p-2 h-[5rem] w-[7.1rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 shadow-lg shadow-base-300">
                      Bet Amount
                    </div>
                    <div className="p-5 divide-y divide-base-300">
                      <div className="flex flex-col gap-3 pb-4">
                        {newBetLimits && (
                          <>
                            <div className="flex gap-1 gap-1 items-center">
                              <span className="text-base font-light">Min Bet:</span>
                              <button
                                onClick={() => setBetAmount(newBetLimits[0])}
                                className="btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent px-0 h-1.5 min-h-[0.375rem]"
                              >
                                <div className="flex items-center justify-center">
                                  <span className="text-lg">{newBetLimits[0]}</span>
                                  <span className="text-[0.8em] font-bold ml-1">ETH</span>
                                </div>
                              </button>
                            </div>

                            <div className="flex gap-1 gap-1 items-center">
                              <span className="text-base font-light">Max Bet:</span>
                              <button
                                onClick={() => setBetAmount(newBetLimits[1])}
                                className="btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent px-0 h-1.5 min-h-[0.375rem]"
                              >
                                <div className="flex items-center justify-center">
                                  <span className="text-lg">{newBetLimits[1]}</span>
                                  <span className="text-[0.8em] font-bold ml-1">ETH</span>
                                </div>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 gap-1 py-5 first:pt-0 last:pb-1 items-center">
                        <EtherInput value={betAmount} onChange={handleInputChange} placeholder="value (ETH)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 mb-6 space-y-1">
                <div className="z-10">
                  <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                    <div className="text-center text-base w-fit-content p-2 h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 shadow-lg shadow-base-300">
                      Controls
                    </div>
                    <div className="p-5 divide-y divide-base-300">
                      <div className=" flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
                        <button
                          onClick={onPlayLong}
                          className="btn btn-secondary btn-sm min-h-[2.5rem]"
                          disabled={isLoading}
                        >
                          Play Long
                        </button>
                      </div>
                      <div className=" flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
                        <button
                          onClick={onPlayShort}
                          className="btn btn-secondary btn-sm min-h-[2.5rem]"
                          disabled={isLoading}
                        >
                          Play Short
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 space-y-1">
                <div className="z-10">
                  <div className="bg-base-100 text-center rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                    <div className="w-fit-content p-2 h-[5rem] w-[6.3rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 shadow-lg shadow-base-300">
                      Withdraw
                    </div>
                    <div className="p-5 divide-y divide-base-300">
                      <div className="flex gap-1 gap-1 py-5 first:pt-0 last:pb-1 items-center">
                        <span className="text-base font-light">Balance:</span>
                        <button className="btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent px-0 h-1.5 min-h-[0.375rem]">
                          <div className="w-full flex items-center justify-center">
                            <span className="text-lg">{getWeiToEther(BigInt(claimableAmount))}</span>
                            <span className="text-[0.8em] font-bold ml-1">ETH</span>
                          </div>
                        </button>
                      </div>

                      <div className=" flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
                        <button
                          onClick={onClaim}
                          className="btn btn-secondary btn-sm h-1.5 min-h-[2.5rem]"
                          disabled={isLoading}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
