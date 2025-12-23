'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, Calendar as CalendarIcon } from 'lucide-react';

type CalculatorType = 'compound' | 'simple' | 'daily' | 'forex';
type Currency = '$' | '€' | '£' | '₹' | '¥';
type ContributionType = 'none' | 'deposits' | 'withdrawals';

const CURRENCIES: Currency[] = ['$', '€', '£', '₹', '¥'];
const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function formatCurrency(amount: number, currency: Currency): string {
  return `${currency}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>('daily');
  const [currency, setCurrency] = useState<Currency>('$');
  const [principal, setPrincipal] = useState<string>('3000');
  const [interestRate, setInterestRate] = useState<string>('1.3');
  const [years, setYears] = useState<string>('0');
  const [months, setMonths] = useState<string>('0');
  const [days, setDays] = useState<string>('60');
  const [includeAllDays, setIncludeAllDays] = useState<boolean>(false);
  const [reinvestRate, setReinvestRate] = useState<string>('100');
  const [selectedDays, setSelectedDays] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const [contributionType, setContributionType] = useState<ContributionType>('none');
  const [contributionAmount, setContributionAmount] = useState<string>('0');
  const [contributionFrequency, setContributionFrequency] = useState<string>('monthly');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const tabs: { id: CalculatorType; label: string }[] = [
    { id: 'compound', label: 'Compound Interest' },
    { id: 'simple', label: 'Simple Interest' },
    { id: 'daily', label: 'Daily Compound' },
    { id: 'forex', label: 'Forex Compound' },
  ];

  const toggleDay = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };

  const results = useMemo(() => {
    const principalNum = parseFloat(principal) || 0;
    const rateNum = parseFloat(interestRate) || 0;
    const yearsNum = parseInt(years) || 0;
    const monthsNum = parseInt(months) || 0;
    const daysNum = parseInt(days) || 0;
    const reinvestNum = parseFloat(reinvestRate) || 100;
    const contribAmount = parseFloat(contributionAmount) || 0;

    const totalDays = yearsNum * 365 + monthsNum * 30 + daysNum;

    // Calculate business days based on selected days
    const tradingDaysPerWeek = includeAllDays ? 7 : selectedDays.filter(Boolean).length;
    const businessDays = Math.floor(totalDays * (tradingDaysPerWeek / 7));

    let investmentValue = principalNum;
    let totalInterest = 0;

    const startDateObj = new Date(startDate);
    const endDate = new Date(startDateObj);
    endDate.setDate(endDate.getDate() + totalDays);

    switch (activeTab) {
      case 'simple': {
        // Simple Interest: I = P * r * t
        const dailyRate = rateNum / 100;
        totalInterest = principalNum * dailyRate * businessDays;
        investmentValue = principalNum + totalInterest;
        break;
      }
      case 'compound': {
        // Annual Compound Interest
        const annualRate = rateNum / 100;
        const timeInYears = totalDays / 365;
        investmentValue = principalNum * Math.pow(1 + annualRate, timeInYears);
        totalInterest = investmentValue - principalNum;
        break;
      }
      case 'daily': {
        // Daily Compound Interest
        const dailyRate = rateNum / 100;
        const reinvestFactor = reinvestNum / 100;

        let currentValue = principalNum;
        for (let i = 0; i < businessDays; i++) {
          const dayInterest = currentValue * dailyRate;
          const reinvestedAmount = dayInterest * reinvestFactor;
          currentValue += reinvestedAmount;
          totalInterest += dayInterest;

          // Add contributions
          if (contributionType === 'deposits' && contribAmount > 0) {
            if (contributionFrequency === 'daily') {
              currentValue += contribAmount;
            } else if (contributionFrequency === 'weekly' && i % 5 === 0) {
              currentValue += contribAmount;
            } else if (contributionFrequency === 'monthly' && i % 22 === 0) {
              currentValue += contribAmount;
            }
          } else if (contributionType === 'withdrawals' && contribAmount > 0) {
            if (contributionFrequency === 'daily') {
              currentValue = Math.max(0, currentValue - contribAmount);
            } else if (contributionFrequency === 'weekly' && i % 5 === 0) {
              currentValue = Math.max(0, currentValue - contribAmount);
            } else if (contributionFrequency === 'monthly' && i % 22 === 0) {
              currentValue = Math.max(0, currentValue - contribAmount);
            }
          }
        }
        investmentValue = currentValue;
        break;
      }
      case 'forex': {
        // Forex Compound (similar to daily but with pips calculation)
        const dailyRate = rateNum / 100;
        const reinvestFactor = reinvestNum / 100;

        let currentValue = principalNum;
        for (let i = 0; i < businessDays; i++) {
          const dayInterest = currentValue * dailyRate;
          const reinvestedAmount = dayInterest * reinvestFactor;
          currentValue += reinvestedAmount;
          totalInterest += dayInterest;
        }
        investmentValue = currentValue;
        break;
      }
    }

    const percentageProfit = principalNum > 0 ? ((investmentValue - principalNum) / principalNum) * 100 : 0;

    return {
      investmentValue,
      totalInterest,
      percentageProfit,
      totalDays,
      businessDays,
      dailyRate: rateNum,
      endDate,
      startDateObj,
      principal: principalNum,
    };
  }, [principal, interestRate, years, months, days, includeAllDays, selectedDays, reinvestRate, activeTab, startDate, contributionType, contributionAmount, contributionFrequency]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">
          {results.dailyRate}% Daily Return
        </h1>
        <p className="text-white/60">Calculate your potential investment returns</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gold text-navy'
                : 'bg-navy border border-gold/20 text-white/70 hover:text-white hover:border-gold/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-6"
      >
        {/* Currency Selector */}
        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-2">Currency:</label>
          <div className="flex gap-2">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currency === c
                    ? 'bg-gold text-navy'
                    : 'bg-navy-dark border border-gold/20 text-white/70 hover:border-gold/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Principal Amount */}
        <div className="mb-4">
          <label className="block text-sm text-white/70 mb-2">Principal amount:</label>
          <div className="flex">
            <span className="bg-navy-dark border border-r-0 border-gold/20 rounded-l-lg px-3 flex items-center text-white/50">
              {currency}
            </span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="flex-1 bg-navy-dark border border-gold/20 rounded-r-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="3000"
              min="0"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div className="mb-4">
          <label className="block text-sm text-white/70 mb-2">Interest rate:</label>
          <div className="flex gap-2">
            <div className="flex flex-1">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="flex-1 bg-navy-dark border border-gold/20 rounded-l-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
                placeholder="1.3"
                step="0.1"
                min="0"
              />
              <span className="bg-navy-dark border border-l-0 border-gold/20 rounded-r-lg px-3 flex items-center text-white/50">
                %
              </span>
            </div>
            <span className="bg-gold/20 border border-gold/30 rounded-lg px-4 flex items-center text-gold text-sm font-medium">
              daily
            </span>
          </div>
        </div>

        {/* Time Period */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-sm text-white/70 mb-2">Years:</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">Months:</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">Days:</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-navy-dark border border-gold/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
              placeholder="60"
              min="0"
            />
          </div>
        </div>

        {/* Include All Days Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">Include all days of week?</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIncludeAllDays(true);
                  setSelectedDays([true, true, true, true, true, true, true]);
                }}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                  includeAllDays
                    ? 'bg-gold text-navy'
                    : 'bg-navy-dark border border-gold/20 text-white/70'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIncludeAllDays(false);
                  setSelectedDays([true, true, true, true, true, false, false]);
                }}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                  !includeAllDays
                    ? 'bg-gold text-navy'
                    : 'bg-navy-dark border border-gold/20 text-white/70'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Daily reinvest rate:</span>
            <div className="flex">
              <input
                type="number"
                value={reinvestRate}
                onChange={(e) => setReinvestRate(e.target.value)}
                className="w-16 bg-navy-dark border border-gold/20 rounded-l-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-gold/50"
                placeholder="100"
                min="0"
                max="100"
              />
              <span className="bg-gold/20 border border-l-0 border-gold/30 rounded-r-lg px-2 flex items-center text-gold text-sm">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Days to Include */}
        {!includeAllDays && (
          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-2">Days to include:</label>
            <div className="flex gap-2">
              {DAYS_OF_WEEK.map((day, index) => (
                <button
                  key={index}
                  onClick={() => toggleDay(index)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    selectedDays[index]
                      ? 'bg-gold text-navy'
                      : 'bg-navy-dark border border-gold/20 text-white/50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Additional Contributions */}
        <div className="mb-4">
          <label className="block text-sm text-white/70 mb-2">Additional contributions: <span className="text-white/40">(optional)</span></label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setContributionType('none')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                contributionType === 'none'
                  ? 'bg-gold text-navy'
                  : 'bg-navy-dark border border-gold/20 text-white/70'
              }`}
            >
              None
            </button>
            <button
              onClick={() => setContributionType('deposits')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                contributionType === 'deposits'
                  ? 'bg-green-500 text-white'
                  : 'bg-navy-dark border border-gold/20 text-white/70'
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setContributionType('withdrawals')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                contributionType === 'withdrawals'
                  ? 'bg-orange-500 text-white'
                  : 'bg-navy-dark border border-gold/20 text-white/70'
              }`}
            >
              Withdrawals
            </button>
          </div>
          {contributionType !== 'none' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold/50"
                  placeholder="Amount"
                  min="0"
                />
              </div>
              <select
                value={contributionFrequency}
                onChange={(e) => setContributionFrequency(e.target.value)}
                className="bg-navy-dark border border-gold/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold/50"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>

        {/* Start Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">Start date?</span>
            <button className="text-gold text-sm hover:underline">today</button>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-gold/50"
              />
            </div>
            <button className="bg-gold text-navy font-semibold px-6 py-2 rounded-lg hover:bg-gold-light transition-colors">
              Calculate
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Projection for {results.totalDays} days
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-white/50 text-sm mb-1">Investment value</p>
              <p className="text-3xl font-bold text-gold">
                {formatCurrency(results.investmentValue, currency)}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Total interest / earnings</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(results.totalInterest, currency)}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Percentage profit</p>
              <p className="text-2xl font-bold text-green-400">
                {results.percentageProfit.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-white/50 text-sm mb-1">Total days / Business days</p>
              <p className="text-xl font-semibold text-white">
                {results.totalDays} / {results.businessDays}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Daily interest rate</p>
              <p className="text-xl font-semibold text-white">
                {results.dailyRate}%
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">End date</p>
              <p className="text-xl font-semibold text-white">
                {formatDate(results.endDate)}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Initial balance on {formatDate(results.startDateObj)}</p>
              <p className="text-xl font-semibold text-white">
                {formatCurrency(results.principal, currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Badge */}
        <div className="flex items-center justify-center mt-6 pt-6 border-t border-gold/10">
          <div className="flex items-center gap-2 text-white/40">
            <Calculator className="w-4 h-4" />
            <span className="text-sm">Calculator</span>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-4 bg-navy-dark/50 border border-gold/10 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/40 leading-relaxed">
            Note: This calculator is for illustrative purposes only and does not constitute financial advice. We do not offer investment opportunities, promise returns, or endorse any financial products.{' '}
            <a href="/terms-of-service" className="text-gold hover:underline">Terms & Conditions</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
