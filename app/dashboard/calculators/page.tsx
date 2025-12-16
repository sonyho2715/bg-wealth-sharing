'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  PieChart,
  DollarSign,
  Percent,
  Calendar,
  ArrowRight,
  Info,
} from 'lucide-react';

// Investment Return Calculator
function InvestmentReturnCalculator() {
  const [investment, setInvestment] = useState<string>('1000');
  const [dailyReturn, setDailyReturn] = useState<string>('0.5');
  const [days, setDays] = useState<string>('30');

  const investmentNum = parseFloat(investment) || 0;
  const dailyReturnNum = parseFloat(dailyReturn) || 0;
  const daysNum = parseInt(days) || 0;

  const dailyProfit = investmentNum * (dailyReturnNum / 100);
  const totalProfit = dailyProfit * daysNum;
  const totalValue = investmentNum + totalProfit;
  const percentageGain = investmentNum > 0 ? (totalProfit / investmentNum) * 100 : 0;

  return (
    <div className="bg-navy border border-gold/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Investment Return Calculator</h3>
          <p className="text-white/50 text-sm">Estimate your potential returns</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-white/70 mb-1">Investment Amount (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="1000"
              min="300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Daily Return Rate (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={dailyReturn}
              onChange={(e) => setDailyReturn(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="0.5"
              step="0.1"
              min="0"
              max="5"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Time Period (Days)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="30"
              min="1"
              max="365"
            />
          </div>
        </div>
      </div>

      <div className="bg-navy-dark/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Daily Profit</span>
          <span className="text-gold font-semibold">${dailyProfit.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Total Profit ({daysNum} days)</span>
          <span className="text-green-400 font-semibold">${totalProfit.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-gold/10 pt-3">
          <span className="text-white/60">Total Value</span>
          <span className="text-white font-bold text-lg">${totalValue.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Percentage Gain</span>
          <span className="text-green-400 font-semibold">+{percentageGain.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-white/40">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>This is an estimate only. Actual returns may vary based on market conditions and trading performance.</p>
      </div>
    </div>
  );
}

// Compound Growth Calculator
function CompoundGrowthCalculator() {
  const [principal, setPrincipal] = useState<string>('1000');
  const [monthlyReturn, setMonthlyReturn] = useState<string>('10');
  const [months, setMonths] = useState<string>('12');
  const [reinvest, setReinvest] = useState<boolean>(true);

  const principalNum = parseFloat(principal) || 0;
  const monthlyReturnNum = parseFloat(monthlyReturn) || 0;
  const monthsNum = parseInt(months) || 0;

  // Calculate compound growth
  const projections = [];
  let currentValue = principalNum;
  let totalContributed = principalNum;

  for (let i = 1; i <= monthsNum; i++) {
    const monthlyProfit = currentValue * (monthlyReturnNum / 100);
    if (reinvest) {
      currentValue += monthlyProfit;
    }
    projections.push({
      month: i,
      value: reinvest ? currentValue : principalNum + (monthlyProfit * i),
      profit: reinvest ? currentValue - principalNum : monthlyProfit * i,
    });
  }

  const finalValue = projections.length > 0 ? projections[projections.length - 1].value : principalNum;
  const totalProfit = finalValue - principalNum;

  return (
    <div className="bg-navy border border-gold/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Compound Growth Calculator</h3>
          <p className="text-white/50 text-sm">See the power of compounding</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-white/70 mb-1">Starting Investment (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="1000"
              min="300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Monthly Return Rate (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={monthlyReturn}
              onChange={(e) => setMonthlyReturn(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="10"
              step="1"
              min="0"
              max="50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Time Period (Months)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="12"
              min="1"
              max="60"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReinvest(!reinvest)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              reinvest ? 'bg-gold' : 'bg-navy-dark border border-gold/20'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                reinvest ? 'left-7' : 'left-1'
              }`}
            />
          </button>
          <span className="text-white/70 text-sm">Reinvest profits (compound)</span>
        </div>
      </div>

      <div className="bg-navy-dark/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Initial Investment</span>
          <span className="text-white font-semibold">${principalNum.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Total Profit ({monthsNum} months)</span>
          <span className="text-green-400 font-semibold">${totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex items-center justify-between border-t border-gold/10 pt-3">
          <span className="text-white/60">Final Value</span>
          <span className="text-gold font-bold text-lg">${finalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Total Return</span>
          <span className="text-green-400 font-semibold">+{((totalProfit / principalNum) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Mini Chart */}
      {projections.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-white/50 mb-2">Growth Projection</p>
          <div className="flex items-end gap-1 h-20">
            {projections.slice(0, 12).map((p, i) => (
              <div
                key={i}
                className="flex-1 bg-gold/60 rounded-t"
                style={{
                  height: `${(p.value / finalValue) * 100}%`,
                }}
                title={`Month ${p.month}: $${p.value.toFixed(0)}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>Month 1</span>
            <span>Month {Math.min(monthsNum, 12)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Profit Distribution Calculator
function ProfitDistributionCalculator() {
  const [fundSize, setFundSize] = useState<string>('1000000');
  const [monthlyProfit, setMonthlyProfit] = useState<string>('50000');
  const [yourInvestment, setYourInvestment] = useState<string>('1000');

  const fundSizeNum = parseFloat(fundSize) || 0;
  const monthlyProfitNum = parseFloat(monthlyProfit) || 0;
  const yourInvestmentNum = parseFloat(yourInvestment) || 0;

  // Distribution percentages
  const investorShare = 0.60; // 60%
  const bgShare = 0.30; // 30%
  const dsjexShare = 0.10; // 10%

  const totalToInvestors = monthlyProfitNum * investorShare;
  const toBG = monthlyProfitNum * bgShare;
  const toDSJEX = monthlyProfitNum * dsjexShare;

  // Your share based on your investment proportion
  const yourShareOfFund = fundSizeNum > 0 ? yourInvestmentNum / fundSizeNum : 0;
  const yourProfit = totalToInvestors * yourShareOfFund;
  const yourROI = yourInvestmentNum > 0 ? (yourProfit / yourInvestmentNum) * 100 : 0;

  return (
    <div className="bg-navy border border-gold/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
          <PieChart className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Profit Distribution Calculator</h3>
          <p className="text-white/50 text-sm">See how profits are shared</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-white/70 mb-1">Total Fund Size (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={fundSize}
              onChange={(e) => setFundSize(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="1000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Monthly Net Profit (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={monthlyProfit}
              onChange={(e) => setMonthlyProfit(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="50000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Your Investment (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={yourInvestment}
              onChange={(e) => setYourInvestment(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="1000"
              min="300"
            />
          </div>
        </div>
      </div>

      {/* Distribution Visualization */}
      <div className="mb-4">
        <p className="text-xs text-white/50 mb-2">Profit Distribution</p>
        <div className="h-4 rounded-full overflow-hidden flex">
          <div className="bg-green-500 h-full" style={{ width: '60%' }} />
          <div className="bg-blue-500 h-full" style={{ width: '30%' }} />
          <div className="bg-purple-500 h-full" style={{ width: '10%' }} />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-green-400">Investors 60%</span>
          <span className="text-blue-400">BG 30%</span>
          <span className="text-purple-400">DSJEX 10%</span>
        </div>
      </div>

      <div className="bg-navy-dark/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Total to Investors (60%)</span>
          <span className="text-green-400 font-semibold">${totalToInvestors.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">To BG (30%)</span>
          <span className="text-blue-400 font-semibold">${toBG.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">To DSJEX (10%)</span>
          <span className="text-purple-400 font-semibold">${toDSJEX.toLocaleString()}</span>
        </div>
        <div className="border-t border-gold/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Your Share of Fund</span>
            <span className="text-white font-semibold">{(yourShareOfFund * 100).toFixed(4)}%</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/60">Your Monthly Profit</span>
            <span className="text-gold font-bold text-lg">${yourProfit.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/60">Your Monthly ROI</span>
            <span className="text-green-400 font-semibold">{yourROI.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Referral Bonus Calculator
function ReferralBonusCalculator() {
  const [referrals, setReferrals] = useState<string>('5');
  const [avgInvestment, setAvgInvestment] = useState<string>('1000');
  const [bonusRate, setBonusRate] = useState<string>('5');

  const referralsNum = parseInt(referrals) || 0;
  const avgInvestmentNum = parseFloat(avgInvestment) || 0;
  const bonusRateNum = parseFloat(bonusRate) || 0;

  const totalReferredVolume = referralsNum * avgInvestmentNum;
  const totalBonus = totalReferredVolume * (bonusRateNum / 100);
  const bonusPerReferral = referralsNum > 0 ? totalBonus / referralsNum : 0;

  return (
    <div className="bg-navy border border-gold/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Referral Bonus Calculator</h3>
          <p className="text-white/50 text-sm">Estimate your referral earnings</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-white/70 mb-1">Number of Referrals</label>
          <input
            type="number"
            value={referrals}
            onChange={(e) => setReferrals(e.target.value)}
            className="w-full bg-navy-dark border border-gold/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
            placeholder="5"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Avg Investment per Referral (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={avgInvestment}
              onChange={(e) => setAvgInvestment(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="1000"
              min="300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Referral Bonus Rate (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="number"
              value={bonusRate}
              onChange={(e) => setBonusRate(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="5"
              step="0.5"
              min="0"
              max="20"
            />
          </div>
        </div>
      </div>

      <div className="bg-navy-dark/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Total Referred Volume</span>
          <span className="text-white font-semibold">${totalReferredVolume.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">Bonus per Referral</span>
          <span className="text-blue-400 font-semibold">${bonusPerReferral.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-gold/10 pt-3">
          <span className="text-white/60">Total Referral Bonus</span>
          <span className="text-gold font-bold text-lg">${totalBonus.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-white/40">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>Referral bonuses are typically paid when your referred members make their first investment.</p>
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-gold" />
          <h1 className="text-3xl font-bold text-white">Financial Calculators</h1>
        </div>
        <p className="text-white/60">
          Use these tools to estimate your potential returns and plan your investment strategy.
        </p>
      </motion.div>

      {/* Calculators Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <InvestmentReturnCalculator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CompoundGrowthCalculator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProfitDistributionCalculator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ReferralBonusCalculator />
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-300 mb-1">Disclaimer</h4>
            <p className="text-amber-200/70 text-sm">
              These calculators provide estimates only and are for educational purposes. Actual returns may vary significantly based on market conditions, trading performance, and other factors. Past performance does not guarantee future results. Only invest funds you can afford to lose.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
