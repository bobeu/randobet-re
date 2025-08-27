import React, { useState, useEffect } from 'react';
import { Timer, Users, DollarSign, TrendingUp, Zap } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState(45);
  const [totalPool, setTotalPool] = useState(12.847);
  const [playersCount, setPlayersCount] = useState(127);
  const [nextBetAmount, setNextBetAmount] = useState(0.1);
  const [isSpinning, setIsSpinning] = useState(true);
  const [particles, setParticles] = useState([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Reset for next round
          setTotalPool(prev => prev + Math.random() * 2);
          setPlayersCount(prev => prev + Math.floor(Math.random() * 5));
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate random particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBet = () => {
    setIsSpinning(true);
    setTotalPool(prev => prev + nextBetAmount);
    setPlayersCount(prev => prev + 1);
    
    // Add some visual feedback
    setTimeout(() => setIsSpinning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.1}s`,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Main Betting Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative">
            {/* Central Orb */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Outer Ring */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 ${isSpinning ? 'animate-spin' : ''}`} 
                   style={{ animationDuration: '3s' }}>
                <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent" />
              </div>
              
              {/* Inner Orb */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-black shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-500/50 to-transparent animate-pulse" />
                
                {/* Center Element */}
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full animate-bounce shadow-lg" />
                </div>
              </div>
              
              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                    left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Bet Button */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleBet}
                className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-300 hover:to-red-400 text-black font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  PLACE BET
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="w-80 bg-black/30 backdrop-blur-lg border-l border-yellow-500/20 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                CHAIN ROULETTE
              </h1>
              <p className="text-gray-300 text-sm mt-2">On-Chain Betting Protocol</p>
            </div>

            {/* Next Draw Timer */}
            <div className="bg-gradient-to-r from-red-900/40 to-yellow-900/40 rounded-xl p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Timer className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Next Draw</span>
              </div>
              <div className="text-3xl font-bold text-white">{formatTime(timeLeft)}</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-yellow-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Total Pool */}
              <div className="bg-gradient-to-br from-yellow-900/30 to-red-900/30 rounded-lg p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Total Pool</span>
                </div>
                <div className="text-xl font-bold text-yellow-400">{totalPool.toFixed(3)} ETH</div>
              </div>

              {/* Players */}
              <div className="bg-gradient-to-br from-red-900/30 to-black/50 rounded-lg p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300 text-sm">Active Players</span>
                </div>
                <div className="text-xl font-bold text-red-400">{playersCount}</div>
              </div>

              {/* Next Bet Amount */}
              <div className="bg-gradient-to-br from-black/50 to-yellow-900/30 rounded-lg p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Min Bet</span>
                </div>
                <div className="text-xl font-bold text-white">{nextBetAmount} ETH</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-black/40 to-red-900/20 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Recent Bets
              </h3>
              <div className="space-y-2">
                {[
                  { address: '0x1a2b...3c4d', amount: 0.25, time: '2s ago' },
                  { address: '0x5e6f...7g8h', amount: 0.15, time: '5s ago' },
                  { address: '0x9i0j...1k2l', amount: 0.30, time: '8s ago' },
                ].map((bet, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{bet.address}</span>
                    <div className="text-right">
                      <div className="text-yellow-400 font-semibold">{bet.amount} ETH</div>
                      <div className="text-gray-500 text-xs">{bet.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Status */}
            <div className="text-center text-xs text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Connected to Ethereum Mainnet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;