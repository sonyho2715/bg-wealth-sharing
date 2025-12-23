'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';

type CalculatorType = 'compound' | 'simple' | 'daily' | 'forex';
type Currency = '$' | '€' | '£' | '₹' | '¥';
type ContributionType = 'none' | 'deposits' | 'withdrawals';
type CompoundFrequency = 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';

const CURRENCIES: Currency[] = ['$', '€', '£', '₹', '¥'];
const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function formatCurrency(amount: number, currency: Currency): string {
  return `${currency}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Get compounding frequency number per year
function getCompoundingN(frequency: CompoundFrequency): number {
  switch (frequency) {
    case 'annually': return 1;
    case 'semi-annually': return 2;
    case 'quarterly': return 4;
    case 'monthly': return 12;
    case 'daily': return 365;
    default: return 12;
  }
}

// Check if a date is a trading day based on selected days
function isTradingDay(date: Date, selectedDays: boolean[], includeAllDays: boolean): boolean {
  if (includeAllDays) return true;
  const dayOfWeek = date.getDay();
  // Convert Sunday=0 to index 6, Monday=1 to index 0, etc.
  const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return selectedDays[adjustedIndex];
}

// Count actual trading days in a period
function countTradingDays(
  startDate: Date,
  totalCalendarDays: number,
  selectedDays: boolean[],
  includeAllDays: boolean
): number {
  if (includeAllDays) return totalCalendarDays;

  let tradingDays = 0;
  const currentDate = new Date(startDate);

  for (let i = 0; i < totalCalendarDays; i++) {
    if (isTradingDay(currentDate, selectedDays, includeAllDays)) {
      tradingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return tradingDays;
}

interface ChartDataPoint {
  day: number;
  date: string;
  balance: number;
  principal: number;
  interest: number;
  dailyInterest?: number;
}

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>('daily');
  const [currency, setCurrency] = useState<Currency>('$');
  const [principal, setPrincipal] = useState<string>('3000');
  const [interestRate, setInterestRate] = useState<string>('1.3');
  const [annualRate, setAnnualRate] = useState<string>('12');
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
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>('monthly');

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
    const dailyRateNum = parseFloat(interestRate) || 0;
    const annualRateNum = parseFloat(annualRate) || 0;
    const yearsNum = parseInt(years) || 0;
    const monthsNum = parseInt(months) || 0;
    const daysNum = parseInt(days) || 0;
    const reinvestNum = Math.min(100, Math.max(0, parseFloat(reinvestRate) || 100));
    const contribAmount = parseFloat(contributionAmount) || 0;

    const totalCalendarDays = yearsNum * 365 + monthsNum * 30 + daysNum;
    const startDateObj = new Date(startDate);

    // Calculate actual trading days
    const tradingDays = countTradingDays(startDateObj, totalCalendarDays, selectedDays, includeAllDays);

    const endDate = new Date(startDateObj);
    endDate.setDate(endDate.getDate() + totalCalendarDays);

    let investmentValue = principalNum;
    let totalInterest = 0;
    let totalContributions = 0;
    const chartData: ChartDataPoint[] = [];

    // Add initial data point
    chartData.push({
      day: 0,
      date: formatShortDate(startDateObj),
      balance: principalNum,
      principal: principalNum,
      interest: 0,
    });

    switch (activeTab) {
      case 'simple': {
        /**
         * SIMPLE INTEREST FORMULA
         * I = P × r × t
         * A = P + I = P(1 + rt)
         *
         * Where:
         * P = Principal
         * r = Interest rate per period (daily rate as decimal)
         * t = Number of periods (trading days)
         */
        const dailyRate = dailyRateNum / 100;

        // Generate chart data for simple interest (linear growth)
        let currentValue = principalNum;
        let accumulatedInterest = 0;
        const currentDate = new Date(startDateObj);
        let tradingDayCount = 0;

        for (let i = 1; i <= totalCalendarDays; i++) {
          currentDate.setDate(currentDate.getDate() + 1);
          const isTradingDayToday = isTradingDay(
            new Date(startDateObj.getTime() + (i - 1) * 24 * 60 * 60 * 1000),
            selectedDays,
            includeAllDays
          );

          if (isTradingDayToday) {
            tradingDayCount++;
            const dayInterest = principalNum * dailyRate; // Simple interest: always on principal
            accumulatedInterest += dayInterest;
            currentValue = principalNum + accumulatedInterest;
          }

          // Add data point every 5 days or last day
          if (i % Math.max(1, Math.floor(totalCalendarDays / 20)) === 0 || i === totalCalendarDays) {
            chartData.push({
              day: i,
              date: formatShortDate(new Date(startDateObj.getTime() + i * 24 * 60 * 60 * 1000)),
              balance: currentValue,
              principal: principalNum,
              interest: accumulatedInterest,
              dailyInterest: principalNum * dailyRate,
            });
          }
        }

        totalInterest = principalNum * dailyRate * tradingDays;
        investmentValue = principalNum + totalInterest;
        break;
      }

      case 'compound': {
        /**
         * COMPOUND INTEREST FORMULA
         * A = P(1 + r/n)^(nt)
         *
         * Where:
         * A = Final amount
         * P = Principal
         * r = Annual interest rate (decimal)
         * n = Number of times interest compounds per year
         * t = Time in years
         *
         * With regular contributions:
         * A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
         */
        const annualRateDecimal = annualRateNum / 100;
        const n = getCompoundingN(compoundFrequency);
        const timeInYears = totalCalendarDays / 365;
        const nt = n * timeInYears;

        // Handle contributions
        let totalWithContributions = principalNum;
        const periodsPerYear = n;
        const ratePerPeriod = annualRateDecimal / n;

        if (contributionType !== 'none' && contribAmount > 0) {
          // Convert contribution frequency to match compounding frequency
          let contributionPerPeriod = 0;
          const periodsPerMonth = n / 12;

          switch (contributionFrequency) {
            case 'daily':
              contributionPerPeriod = contribAmount * (365 / n);
              break;
            case 'weekly':
              contributionPerPeriod = contribAmount * (52 / n);
              break;
            case 'monthly':
              contributionPerPeriod = contribAmount * (12 / n);
              break;
          }

          if (contributionType === 'withdrawals') {
            contributionPerPeriod = -contributionPerPeriod;
          }

          // Future Value of Annuity formula
          const fvPrincipal = principalNum * Math.pow(1 + ratePerPeriod, nt);
          const fvContributions = contributionPerPeriod * ((Math.pow(1 + ratePerPeriod, nt) - 1) / ratePerPeriod);

          totalWithContributions = fvPrincipal + fvContributions;
          totalContributions = contributionPerPeriod * nt;
        } else {
          totalWithContributions = principalNum * Math.pow(1 + ratePerPeriod, nt);
        }

        investmentValue = Math.max(0, totalWithContributions);
        totalInterest = investmentValue - principalNum - totalContributions;

        // Generate chart data
        const dataPoints = 20;
        for (let i = 1; i <= dataPoints; i++) {
          const fraction = i / dataPoints;
          const currentT = timeInYears * fraction;
          const currentNT = n * currentT;

          let currentBalance;
          let currentContribs = 0;

          if (contributionType !== 'none' && contribAmount > 0) {
            let contributionPerPeriod = 0;
            switch (contributionFrequency) {
              case 'daily':
                contributionPerPeriod = contribAmount * (365 / n);
                break;
              case 'weekly':
                contributionPerPeriod = contribAmount * (52 / n);
                break;
              case 'monthly':
                contributionPerPeriod = contribAmount * (12 / n);
                break;
            }
            if (contributionType === 'withdrawals') {
              contributionPerPeriod = -contributionPerPeriod;
            }

            const fvPrincipal = principalNum * Math.pow(1 + ratePerPeriod, currentNT);
            const fvContributions = contributionPerPeriod * ((Math.pow(1 + ratePerPeriod, currentNT) - 1) / ratePerPeriod);
            currentBalance = Math.max(0, fvPrincipal + fvContributions);
            currentContribs = contributionPerPeriod * currentNT;
          } else {
            currentBalance = principalNum * Math.pow(1 + ratePerPeriod, currentNT);
          }

          const dayNum = Math.round(totalCalendarDays * fraction);
          chartData.push({
            day: dayNum,
            date: formatShortDate(new Date(startDateObj.getTime() + dayNum * 24 * 60 * 60 * 1000)),
            balance: currentBalance,
            principal: principalNum + currentContribs,
            interest: currentBalance - principalNum - currentContribs,
          });
        }
        break;
      }

      case 'daily': {
        /**
         * DAILY COMPOUND INTEREST FORMULA
         * A = P(1 + i)^d
         *
         * With partial reinvestment:
         * Each day: interest = balance × dailyRate
         * Reinvested = interest × (reinvestRate / 100)
         * Withdrawn = interest × (1 - reinvestRate / 100)
         * New balance = balance + reinvested
         *
         * Where:
         * P = Principal
         * i = Daily interest rate (decimal)
         * d = Number of trading days
         */
        const dailyRate = dailyRateNum / 100;
        const reinvestFactor = reinvestNum / 100;

        let currentBalance = principalNum;
        let accumulatedInterest = 0;
        let totalWithdrawn = 0;
        const currentDate = new Date(startDateObj);
        let tradingDayCount = 0;

        for (let i = 1; i <= totalCalendarDays; i++) {
          const checkDate = new Date(startDateObj.getTime() + (i - 1) * 24 * 60 * 60 * 1000);
          const isTradingDayToday = isTradingDay(checkDate, selectedDays, includeAllDays);

          if (isTradingDayToday) {
            tradingDayCount++;
            const dayInterest = currentBalance * dailyRate;
            const reinvestedAmount = dayInterest * reinvestFactor;
            const withdrawnAmount = dayInterest * (1 - reinvestFactor);

            currentBalance += reinvestedAmount;
            accumulatedInterest += dayInterest;
            totalWithdrawn += withdrawnAmount;

            // Handle contributions
            if (contributionType === 'deposits' && contribAmount > 0) {
              if (contributionFrequency === 'daily') {
                currentBalance += contribAmount;
                totalContributions += contribAmount;
              } else if (contributionFrequency === 'weekly' && tradingDayCount % 5 === 0) {
                currentBalance += contribAmount;
                totalContributions += contribAmount;
              } else if (contributionFrequency === 'monthly' && tradingDayCount % 22 === 0) {
                currentBalance += contribAmount;
                totalContributions += contribAmount;
              }
            } else if (contributionType === 'withdrawals' && contribAmount > 0) {
              if (contributionFrequency === 'daily') {
                currentBalance = Math.max(0, currentBalance - contribAmount);
                totalContributions -= contribAmount;
              } else if (contributionFrequency === 'weekly' && tradingDayCount % 5 === 0) {
                currentBalance = Math.max(0, currentBalance - contribAmount);
                totalContributions -= contribAmount;
              } else if (contributionFrequency === 'monthly' && tradingDayCount % 22 === 0) {
                currentBalance = Math.max(0, currentBalance - contribAmount);
                totalContributions -= contribAmount;
              }
            }
          }

          // Add data point every few days
          if (i % Math.max(1, Math.floor(totalCalendarDays / 20)) === 0 || i === totalCalendarDays) {
            chartData.push({
              day: i,
              date: formatShortDate(new Date(startDateObj.getTime() + i * 24 * 60 * 60 * 1000)),
              balance: currentBalance,
              principal: principalNum + totalContributions,
              interest: accumulatedInterest,
              dailyInterest: currentBalance * dailyRate,
            });
          }
        }

        investmentValue = currentBalance;
        totalInterest = accumulatedInterest;
        break;
      }

      case 'forex': {
        /**
         * FOREX COMPOUND FORMULA
         * Same as daily compound but specifically for trading:
         * - Weekdays only (Mon-Fri) by default
         * - Configurable trading days
         * - Partial reinvestment (take profits)
         *
         * Formula per trade/day:
         * Profit = Balance × (gain% / 100)
         * Reinvested = Profit × (reinvestRate / 100)
         * New Balance = Balance + Reinvested
         */
        const dailyGain = dailyRateNum / 100; // Daily gain percentage
        const reinvestFactor = reinvestNum / 100;

        let currentBalance = principalNum;
        let accumulatedProfit = 0;
        let profitsTaken = 0;
        const currentDate = new Date(startDateObj);
        let tradingDayCount = 0;

        for (let i = 1; i <= totalCalendarDays; i++) {
          const checkDate = new Date(startDateObj.getTime() + (i - 1) * 24 * 60 * 60 * 1000);
          const isTradingDayToday = isTradingDay(checkDate, selectedDays, includeAllDays);

          if (isTradingDayToday) {
            tradingDayCount++;

            // Calculate daily profit
            const dayProfit = currentBalance * dailyGain;
            const reinvestedProfit = dayProfit * reinvestFactor;
            const takenProfit = dayProfit * (1 - reinvestFactor);

            currentBalance += reinvestedProfit;
            accumulatedProfit += dayProfit;
            profitsTaken += takenProfit;

            // Handle additional deposits/withdrawals
            if (contributionType === 'deposits' && contribAmount > 0) {
              if (contributionFrequency === 'daily') {
                currentBalance += contribAmount;
                totalContributions += contribAmount;
              } else if (contributionFrequency === 'weekly' && tradingDayCount % 5 === 0) {
                currentBalance += contribAmount;
                totalContributions += contribAmount;
              } else if (contributionFrequency === 'monthly' && tradingDayCount % 22 === 0) {
                currentBalance += contribAmount;
                totalContributions += contribAmount;
              }
            } else if (contributionType === 'withdrawals' && contribAmount > 0) {
              if (contributionFrequency === 'daily') {
                currentBalance = Math.max(0, currentBalance - contribAmount);
                totalContributions -= contribAmount;
              } else if (contributionFrequency === 'weekly' && tradingDayCount % 5 === 0) {
                currentBalance = Math.max(0, currentBalance - contribAmount);
                totalContributions -= contribAmount;
              } else if (contributionFrequency === 'monthly' && tradingDayCount % 22 === 0) {
                currentBalance = Math.max(0, currentBalance - contribAmount);
                totalContributions -= contribAmount;
              }
            }
          }

          // Add data point every few days
          if (i % Math.max(1, Math.floor(totalCalendarDays / 20)) === 0 || i === totalCalendarDays) {
            chartData.push({
              day: i,
              date: formatShortDate(new Date(startDateObj.getTime() + i * 24 * 60 * 60 * 1000)),
              balance: currentBalance + profitsTaken,
              principal: principalNum + totalContributions,
              interest: accumulatedProfit,
              dailyInterest: currentBalance * dailyGain,
            });
          }
        }

        investmentValue = currentBalance + profitsTaken; // Include profits taken
        totalInterest = accumulatedProfit;
        break;
      }
    }

    const percentageProfit = principalNum > 0
      ? ((investmentValue - principalNum - totalContributions) / principalNum) * 100
      : 0;

    // Effective annual rate calculation
    const effectiveAnnualRate = principalNum > 0 && totalCalendarDays > 0
      ? (Math.pow(investmentValue / (principalNum + totalContributions), 365 / totalCalendarDays) - 1) * 100
      : 0;

    return {
      investmentValue,
      totalInterest,
      totalContributions,
      percentageProfit,
      totalCalendarDays,
      tradingDays,
      dailyRate: activeTab === 'compound' ? annualRateNum / 365 : dailyRateNum,
      annualRate: activeTab === 'compound' ? annualRateNum : dailyRateNum * 365,
      effectiveAnnualRate,
      endDate,
      startDateObj,
      principal: principalNum,
      chartData,
      reinvestRate: reinvestNum,
    };
  }, [principal, interestRate, annualRate, years, months, days, includeAllDays, selectedDays, reinvestRate, activeTab, startDate, contributionType, contributionAmount, contributionFrequency, compoundFrequency]);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-dark border border-gold/30 rounded-lg p-3 shadow-lg">
          <p className="text-white/70 text-sm mb-2">{payload[0]?.payload?.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-gold" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Investment Calculator
          </h1>
        </div>
        <p className="text-white/60">Calculate your potential investment returns with precision</p>
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

        {/* Interest Rate - Different for Compound vs Others */}
        {activeTab === 'compound' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm text-white/70 mb-2">Annual interest rate:</label>
              <div className="flex gap-2">
                <div className="flex flex-1">
                  <input
                    type="number"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="flex-1 bg-navy-dark border border-gold/20 rounded-l-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
                    placeholder="12"
                    step="0.1"
                    min="0"
                  />
                  <span className="bg-navy-dark border border-l-0 border-gold/20 rounded-r-lg px-3 flex items-center text-white/50">
                    %
                  </span>
                </div>
                <span className="bg-gold/20 border border-gold/30 rounded-lg px-4 flex items-center text-gold text-sm font-medium">
                  per year
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white/70 mb-2">Compound frequency:</label>
              <div className="flex flex-wrap gap-2">
                {(['annually', 'semi-annually', 'quarterly', 'monthly', 'daily'] as CompoundFrequency[]).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setCompoundFrequency(freq)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all capitalize ${
                      compoundFrequency === freq
                        ? 'bg-gold text-navy'
                        : 'bg-navy-dark border border-gold/20 text-white/70'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/40 mt-2">
                Compounds {getCompoundingN(compoundFrequency)}× per year
              </p>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-2">
              {activeTab === 'forex' ? 'Daily gain:' : 'Interest rate:'}
            </label>
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
            <p className="text-xs text-white/40 mt-2">
              ≈ {((parseFloat(interestRate) || 0) * 365).toFixed(1)}% annually (simple) |
              ≈ {((Math.pow(1 + (parseFloat(interestRate) || 0) / 100, 365) - 1) * 100).toFixed(1)}% APY (compounded)
            </p>
          </div>
        )}

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

        {/* Trading Days Options - Only for daily/forex/simple */}
        {activeTab !== 'compound' && (
          <>
            {/* Include All Days Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
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

              {/* Reinvest Rate - Only for daily/forex */}
              {(activeTab === 'daily' || activeTab === 'forex') && (
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
              )}
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
                      title={DAY_NAMES[index]}
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
                <p className="text-xs text-white/40 mt-2">
                  {selectedDays.filter(Boolean).length} trading days per week
                  ({selectedDays.map((s, i) => s ? DAY_NAMES[i].slice(0, 3) : '').filter(Boolean).join(', ')})
                </p>
              </div>
            )}
          </>
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
              <div className="flex flex-1">
                <span className="bg-navy-dark border border-r-0 border-gold/20 rounded-l-lg px-3 flex items-center text-white/50">
                  {currency}
                </span>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="flex-1 bg-navy-dark border border-gold/20 rounded-r-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold/50"
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">Start date:</span>
            <button
              onClick={() => setStartDate(new Date().toISOString().split('T')[0])}
              className="text-gold text-sm hover:underline"
            >
              today
            </button>
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
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Projection for {results.totalCalendarDays} days
          {activeTab !== 'compound' && ` (${results.tradingDays} trading days)`}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-white/50 text-sm mb-1">Final investment value</p>
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
              <p className="text-white/50 text-sm mb-1">Percentage profit (ROI)</p>
              <p className="text-2xl font-bold text-green-400">
                {results.percentageProfit.toFixed(2)}%
              </p>
            </div>
            {results.totalContributions !== 0 && (
              <div>
                <p className="text-white/50 text-sm mb-1">
                  Total {results.totalContributions > 0 ? 'deposits' : 'withdrawals'}
                </p>
                <p className={`text-xl font-semibold ${results.totalContributions > 0 ? 'text-green-400' : 'text-orange-400'}`}>
                  {formatCurrency(Math.abs(results.totalContributions), currency)}
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-white/50 text-sm mb-1">
                {activeTab === 'compound' ? 'Calendar days' : 'Total days / Trading days'}
              </p>
              <p className="text-xl font-semibold text-white">
                {activeTab === 'compound'
                  ? results.totalCalendarDays
                  : `${results.totalCalendarDays} / ${results.tradingDays}`
                }
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">
                {activeTab === 'compound' ? 'Annual rate' : 'Daily interest rate'}
              </p>
              <p className="text-xl font-semibold text-white">
                {activeTab === 'compound'
                  ? `${parseFloat(annualRate).toFixed(2)}%`
                  : `${results.dailyRate.toFixed(2)}%`
                }
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Effective annual yield (APY)</p>
              <p className="text-xl font-semibold text-white">
                {results.effectiveAnnualRate.toFixed(2)}%
              </p>
            </div>
            {(activeTab === 'daily' || activeTab === 'forex') && (
              <div>
                <p className="text-white/50 text-sm mb-1">Reinvestment rate</p>
                <p className="text-xl font-semibold text-white">
                  {results.reinvestRate}%
                </p>
              </div>
            )}
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

        {/* Growth Chart */}
        <div className="border-t border-gold/10 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Growth Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="date"
                  stroke="#ffffff50"
                  tick={{ fill: '#ffffff70', fontSize: 12 }}
                  tickLine={{ stroke: '#ffffff30' }}
                />
                <YAxis
                  stroke="#ffffff50"
                  tick={{ fill: '#ffffff70', fontSize: 12 }}
                  tickLine={{ stroke: '#ffffff30' }}
                  tickFormatter={(value) => `${currency}${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => <span style={{ color: '#ffffffcc' }}>{value}</span>}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  fill="url(#colorBalance)"
                  name="Total Balance"
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorInterest)"
                  name="Total Interest"
                />
                <Line
                  type="monotone"
                  dataKey="principal"
                  stroke="#6366f1"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Principal + Contributions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calculator Badge */}
        <div className="flex items-center justify-center mt-6 pt-6 border-t border-gold/10">
          <div className="flex items-center gap-2 text-white/40">
            <Calculator className="w-4 h-4" />
            <span className="text-sm">
              {tabs.find(t => t.id === activeTab)?.label} Calculator
            </span>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-4 bg-navy-dark/50 border border-gold/10 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/40 leading-relaxed">
            Note: This calculator is for illustrative purposes only and does not constitute financial advice.
            Actual returns may vary based on market conditions, fees, and other factors.
            Past performance is not indicative of future results.
            We do not offer investment opportunities, promise returns, or endorse any financial products.{' '}
            <a href="/terms-of-service" className="text-gold hover:underline">Terms & Conditions</a> |{' '}
            <a href="/disclaimer" className="text-gold hover:underline">Full Disclaimer</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
