"use client";
/* eslint-disable */
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, ExternalLink, Zap, Wallet, Shuffle, Shield, Settings, DollarSign, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfig, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { Address, FunctionName } from "@/types";

const CONFIMATION_BLOCK = 2;

export interface TransactionStep {
  id: string;
  title: string;
  description: string;
  functionName: FunctionName;
  contractAddress: Address;
  abi: any[];
  args: any[];
  value?: bigint;
}

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  getSteps: () => TransactionStep[];
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
  showAnimation?: boolean;
}

export default function TransactionModal({
  isOpen,
  onClose,
  title,
  // description,
  getSteps,
  onSuccess,
  onError,
  showAnimation = false,
}: TransactionModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [failedSteps, setFailedSteps] = useState<Set<string>>(new Set());
  const [txHashes, setTxHashes] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const config = useConfig()

  const steps = getSteps();
  const currentStep = steps[currentStepIndex];
  const isCompleted = completedSteps.has(currentStep.id);
  const isFailed = failedSteps.has(currentStep.id);
  const isLastStep = currentStepIndex === steps.length - 1;

  const waitForConfirmation = async(hash: `0x${string}`) => {
    const receipt = await waitForTransactionReceipt(config, {hash, confirmations: CONFIMATION_BLOCK});
    return receipt.transactionHash;
  } 

  const executeStep = async (step: TransactionStep) => {
    try {
      setIsProcessing(true);
      console.log("Executing step:", step);
      let hash = await writeContractAsync({
        address: step.contractAddress,
        abi: step.abi,
        functionName: step.functionName,
        args: step.args,
        value: step.value,
      });
      hash = await waitForConfirmation(hash);
      setTxHashes(prev => ({ ...prev, [step.id]: hash }));
      setCompletedSteps(prev => new Set([...prev, step.id]));
      
      if (isLastStep) {
        onSuccess?.(hash);
        setTimeout(() => {
          onClose();
          resetModal();
        }, 2000);
      } else {
        setCurrentStepIndex(prev => prev + 1);
      }
    } catch (error) {
      setFailedSteps(prev => new Set([...prev, step.id]));
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setFailedSteps(new Set());
    setTxHashes({});
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      resetModal();
    }
  };

  const getStepStatus = (stepId: string, index: number) => {
    if (completedSteps.has(stepId)) return "completed";
    if (failedSteps.has(stepId)) return "failed";
    if (index === currentStepIndex) return "current";
    if (index < currentStepIndex) return "completed";
    return "pending";
  };

  const getFunctionIcon = (functionName: string) => {
    switch (functionName) {
      case "placebet":
        return <Zap className="w-4 h-4 text-orange-400" />;
      case "withdraw":
        return <Wallet className="w-4 h-4 text-green-400" />;
      case "runDraw":
        return <Shuffle className="w-4 h-4 text-purple-400" />;
      case "setVerification":
        return <Shield className="w-4 h-4 text-blue-400" />;
      case "claimTriggerReward":
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case "setBetListUpfront":
        return <Settings className="w-4 h-4 text-red-400" />;
      case "setFee":
        return <DollarSign className="w-4 h-4 text-yellow-400" />;
      case "setverificationByOwner":
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
      default:
        return <Zap className="w-4 h-4 text-orange-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "current":
        return <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-purple-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      case "current":
        return <Badge className="bg-primary-100 text-primary-800 border-primary-200">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-stone-900/80 backdrop-blur-sm border border-stone-600 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-400 spooky-text">
            {title}
          </DialogTitle>
          {/* {description && (
            <p className="text-sm text-purple-200">
              {description}
            </p>
          )} */}
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Animation - Only for place bet */}
          {isProcessing && showAnimation && (
            <motion.div
              className="flex justify-center items-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-80 h-32">
                {/* Static Player Icon */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-stone-900 border-2 border-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    👤
                  </div>
                </div>
                
                {/* Money flying animation - continuous movement */}
                <motion.div
                  className="absolute left-8 top-1/2 transform -translate-y-1/2"
                  animate={{ 
                    x: [0, 200, 0],
                    y: [0, -30, 0, 30, 0],
                    rotate: [0, 360, 720]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <div className="w-10 h-10 bg-yellow-500 border-2 border-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    💰
                  </div>
                </motion.div>
                
                {/* Static Blockchain Icon */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-20 h-20 bg-violet-600 border-2 border-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-3xl">
                    ⛓️
                  </div>
                </div>
                
                {/* Connection line */}
                <div className="absolute top-1/2 left-8 right-10 h-0.5 bg-gradient-to-r from-yellow-400 via-violet-500 to-violet-600 transform -translate-y-1/2 opacity-50" />
              </div>
            </motion.div>
          )}

          {/* Progress Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id, index);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`border ${
                    status === "current" ? "border-orange-500 bg-orange-900/20" : 
                    status === "completed" ? "border-green-500 bg-green-900/20" :
                    status === "failed" ? "border-red-500 bg-red-900/20" :
                    "border-purple-500/20 bg-purple-900/10"
                  } `}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getFunctionIcon(step.functionName)}
                          {getStatusIcon(status)}
                        </div>
                        <div>
                          <h4 className="font-medium text-orange-200">
                            {step.title}
                          </h4>
                          <p className="text-sm text-purple-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(status)}
                        {txHashes[step.id] && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`https://explorer.celo.org/tx/${txHashes[step.id]}`, '_blank')}
                            className="gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex justify-end gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
                className="bg-stone-900/50 border-purple-500/20 text-purple-200 hover:bg-transparent hover:text-violet-600"
              >
                {isCompleted ? "Close" : "Cancel"}
              </Button>
            </motion.div>
            {!isCompleted && !isFailed && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => executeStep(currentStep)}
                  disabled={isProcessing}
                  className="bg-yellow-500 font-bold"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    isLastStep ? "Complete" : "Next Step"
                  )}
                </Button>
              </motion.div>
            )}
            {isFailed && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setFailedSteps(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(currentStep.id);
                      return newSet;
                    });
                    executeStep(currentStep);
                  }}
                  className="bg-yellow-500 font-bold"
                >
                  Retry
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
