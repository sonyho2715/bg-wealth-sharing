'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface CalculationResult {
  totalValue: number;
  totalReturns: number;
  monthlyReturns: number[];
}

export default function ROICalculator() {
  const [investment, setInvestment] = useState(10000);
  const [months, setMonths] = useState(12);
  const [monthlyRate, setMonthlyRate] = useState(5);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateROI = useCallback(() => {
    const monthlyReturns: number[] = [];
    let currentValue = investment;

    for (let i = 0; i < months; i++) {
      const monthReturn = currentValue * (monthlyRate / 100);
      currentValue += monthReturn;
      monthlyReturns.push(currentValue);
    }

    setResult({
      totalValue: currentValue,
      totalReturns: currentValue - investment,
      monthlyReturns,
    });
  }, [investment, months, monthlyRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const investmentOptions = [1000, 5000, 10000, 25000, 50000, 100000];

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-[#0a0a14] to-navy-dark">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-4">
            <Calculator className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Investment Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Calculate Your <span className="gold-gradient">Potential Returns</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how your investment could grow over time with our interactive calculator.
            Adjust the values to match your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-8"
          >
            {/* Investment Amount */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-white font-medium mb-4">
                <DollarSign className="w-5 h-5 text-gold" />
                Investment Amount
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {investmentOptions.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setInvestment(amount)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      investment === amount
                        ? 'bg-gold text-navy-dark'
                        : 'bg-navy-dark/50 text-gray-300 hover:bg-navy-light/30'
                    }`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-gold">{formatCurrency(investment)}</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-white font-medium mb-4">
                <Calendar className="w-5 h-5 text-gold" />
                Investment Period: <span className="text-gold">{months} months</span>
              </label>
              <input
                type="range"
                min="3"
                max="36"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>3 months</span>
                <span>36 months</span>
              </div>
            </div>

            {/* Monthly Return Rate */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-white font-medium mb-4">
                <TrendingUp className="w-5 h-5 text-gold" />
                Est. Monthly Return: <span className="text-gold">{monthlyRate}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(Number(e.target.value))}
                className="w-full h-2 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>1%</span>
                <span>10%</span>
              </div>
            </div>

            <button
              onClick={calculateROI}
              className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-navy-dark font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              Calculate Returns
            </button>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-8"
          >
            {result ? (
              <div className="h-full flex flex-col">
                <h3 className="text-xl font-bold text-white mb-6">Your Projected Returns</h3>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-navy-dark/50 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Initial Investment</p>
                    <p className="text-xl font-bold text-white">{formatCurrency(investment)}</p>
                  </div>
                  <div className="bg-navy-dark/50 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Total Returns</p>
                    <p className="text-xl font-bold text-green-400">+{formatCurrency(result.totalReturns)}</p>
                  </div>
                </div>

                {/* Final Value */}
                <div className="bg-gradient-to-r from-gold/20 to-gold-light/10 border border-gold/30 rounded-xl p-6 mb-8 text-center">
                  <p className="text-gray-300 mb-2">Projected Value After {months} Months</p>
                  <p className="text-4xl font-bold gold-gradient">{formatCurrency(result.totalValue)}</p>
                  <p className="text-green-400 text-sm mt-2">
                    +{((result.totalReturns / investment) * 100).toFixed(1)}% Total Return
                  </p>
                </div>

                {/* Growth Chart */}
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-4">Growth Over Time</p>
                  <div className="h-32 flex items-end gap-1">
                    {result.monthlyReturns.map((value, index) => {
                      const height = ((value - investment) / (result.totalValue - investment)) * 100;
                      return (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(height, 5)}%` }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="flex-1 bg-gradient-to-t from-gold/50 to-gold rounded-t"
                          title={`Month ${index + 1}: ${formatCurrency(value)}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Month 1</span>
                    <span>Month {months}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-navy-dark/50 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-gold/50" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">See Your Potential</h3>
                <p className="text-gray-400">
                  Adjust the sliders and click &quot;Calculate Returns&quot; to see your projected investment growth.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          * This calculator is for illustrative purposes only. Past performance does not guarantee future results.
          Investment involves risk and you may lose some or all of your investment.
        </p>
      </div>
    </section>
  );
}
