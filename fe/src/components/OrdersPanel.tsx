import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Users, TrendingUp, Clock, Zap, AlertCircle } from 'lucide-react';
import useData from '@/hooks/useData';
import { formatValue } from './utilities/common';
import OpenOrder from './transactions/OpenOrder';
import CloseOrder from './transactions/CloseOrder';

export default function OrdersPanel() {
  const { orders, userOrder } = useData();

  const totalOrders = orders.length;
  const totalDeposits = orders.reduce((sum, order) => sum + order.balances, 0n);
  const totalDepositsFormatted = formatValue(totalDeposits).toStr;

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-6 md:p-8"
    >
      {/* Header */}
      <Card className="bg-violet-900 backdrop-blur-sm border border-stone-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-yellow-400 text-lg flex items-center gap-2">
            <Coins className="w-5 h-5" />
            Standing Orders
          </CardTitle>
          <p className="text-stone-300 text-sm">
            Set it and forget it! Automatically join every betting round with standing orders
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-stone-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-400">{totalOrders}</div>
              <div className="text-stone-400 text-xs">Active Orders</div>
            </div>
            <div className="bg-stone-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{totalDepositsFormatted}</div>
              <div className="text-stone-400 text-xs">Total Deposits (CELO)</div>
            </div>
            <div className="bg-stone-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {userOrder ? 'Active' : 'None'}
              </div>
              <div className="text-stone-400 text-xs">Your Status</div>
            </div>
          </div>

          {/* User Order Status */}
          {userOrder ? (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-2">
                <Zap className="w-4 h-4" />
                Your Standing Order
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-stone-400 text-xs">Deposited Amount</div>
                  <div className="text-green-400 font-bold text-lg">
                    {formatValue(userOrder.balances).toStr} CELO
                  </div>
                </div>
                <div>
                  <div className="text-stone-400 text-xs">Status</div>
                  <Badge className="bg-green-600 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Auto-Betting Active
                  </Badge>
                </div>
              </div>
              <div className="mt-3 text-stone-300 text-xs">
                💡 You'll automatically join every new betting round with this amount!
              </div>
            </div>
          ) : (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-300 text-sm font-medium mb-2">
                <AlertCircle className="w-4 h-4" />
                No Standing Order
              </div>
              <div className="text-stone-300 text-xs">
                Create a standing order to automatically join every betting round without manual intervention!
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OpenOrder />
        {(userOrder && userOrder.balances > 0n) && <CloseOrder />}
      </div>

      {/* Benefits Section */}
      <Card className="bg-stone-900/20 border border-stone-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-stone-300 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            Why Use Standing Orders?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <div className="text-stone-300 text-sm font-medium">Never Miss a Round</div>
                  <div className="text-stone-400 text-xs">Automatically join every new betting round without manual intervention</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <div className="text-stone-300 text-sm font-medium">Convenience</div>
                  <div className="text-stone-400 text-xs">Set it once and enjoy continuous betting action</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <div className="text-stone-300 text-sm font-medium">Flexible Control</div>
                  <div className="text-stone-400 text-xs">Close your order anytime to withdraw funds or change strategy</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-xs font-bold">4</span>
                </div>
                <div>
                  <div className="text-stone-300 text-sm font-medium">Maximize Opportunities</div>
                  <div className="text-stone-400 text-xs">Ensure you're always in the game when draws happen</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      {totalOrders > 0 && (
        <Card className="bg-stone-900/20 border border-stone-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-stone-300 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Community Standing Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-stone-400 text-xs">
              {totalOrders} players are using standing orders with a total of {totalDepositsFormatted} CELO committed to automatic betting.
              Join the community of smart bettors who never miss an opportunity!
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
