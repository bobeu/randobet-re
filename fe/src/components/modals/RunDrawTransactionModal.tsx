"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, RefreshCw } from "lucide-react";

export interface RunDrawTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDraw: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export default function RunDrawTransactionModal({
  isOpen,
  onClose,
  onRunDraw,
  isLoading,
  error,
}: RunDrawTransactionModalProps) {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleRunDraw = async () => {
    try {
      await onRunDraw();
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      setRetryCount(prev => prev + 1);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setRetryCount(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-stone-900/80 backdrop-blur-sm border border-stone-600">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-400 spooky-text text-center">
            Run Draw
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Spinning Logo */}
          <motion.div
            className="flex justify-center items-center py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <img 
                src="/logo.png" 
                alt="Randobet Logo" 
                className="w-24 h-24 object-contain filter drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))',
                  fontWeight: 'bold'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-red-900/20 border border-red-500/30 rounded-lg p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-300 text-sm text-center">
                {error}
              </p>
              {retryCount > 0 && (
                <p className="text-red-400 text-xs text-center mt-1">
                  Retry attempt: {retryCount}/{maxRetries}
                </p>
              )}
            </motion.div>
          )}

          {/* Action Button */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleRunDraw}
                disabled={isLoading || retryCount >= maxRetries}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Running Draw...
                  </>
                ) : retryCount >= maxRetries ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Max Retries Reached
                  </>
                ) : retryCount > 0 ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Retry ({retryCount}/{maxRetries})
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Run Draw
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Close Button */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="bg-stone-900/50 border-purple-500/20 text-purple-200 hover:bg-transparent hover:text-violet-600"
            >
              Close
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
