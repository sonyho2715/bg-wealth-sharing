'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, TrendingUp, Target } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your primary investment goal?",
    options: [
      { text: "Preserve my capital with minimal risk", score: 1 },
      { text: "Generate steady income with moderate growth", score: 2 },
      { text: "Grow my wealth over the long term", score: 3 },
      { text: "Maximize returns, willing to accept high volatility", score: 4 },
    ],
  },
  {
    id: 2,
    question: "How would you react if your investment dropped 20% in a month?",
    options: [
      { text: "Sell everything immediately to prevent further losses", score: 1 },
      { text: "Sell some investments to reduce exposure", score: 2 },
      { text: "Hold and wait for recovery", score: 3 },
      { text: "Buy more at the lower price", score: 4 },
    ],
  },
  {
    id: 3,
    question: "What is your investment time horizon?",
    options: [
      { text: "Less than 1 year", score: 1 },
      { text: "1-3 years", score: 2 },
      { text: "3-5 years", score: 3 },
      { text: "More than 5 years", score: 4 },
    ],
  },
  {
    id: 4,
    question: "How much of your savings are you planning to invest?",
    options: [
      { text: "Less than 10%", score: 1 },
      { text: "10-25%", score: 2 },
      { text: "25-50%", score: 3 },
      { text: "More than 50%", score: 4 },
    ],
  },
  {
    id: 5,
    question: "How familiar are you with investment products?",
    options: [
      { text: "I'm a beginner with little knowledge", score: 1 },
      { text: "I understand the basics", score: 2 },
      { text: "I have moderate experience", score: 3 },
      { text: "I'm an experienced investor", score: 4 },
    ],
  },
];

interface RiskProfile {
  type: string;
  color: string;
  icon: typeof Shield;
  description: string;
  recommendation: string;
}

const riskProfiles: Record<string, RiskProfile> = {
  conservative: {
    type: "Conservative",
    color: "from-blue-500 to-blue-600",
    icon: Shield,
    description: "You prefer stability and capital preservation over high returns. You're uncomfortable with significant fluctuations in your portfolio value.",
    recommendation: "Consider starting with our lower-risk investment options. Our team can guide you through conservative strategies that protect your capital.",
  },
  moderate: {
    type: "Moderate",
    color: "from-green-500 to-green-600",
    icon: Target,
    description: "You seek a balance between growth and security. You can tolerate some volatility for potentially higher returns.",
    recommendation: "A balanced approach suits you well. Our diversified investment strategies can help you grow wealth while managing risk.",
  },
  growth: {
    type: "Growth-Oriented",
    color: "from-gold to-gold-light",
    icon: TrendingUp,
    description: "You're focused on long-term wealth building and comfortable with market fluctuations. You understand that higher returns often come with higher risks.",
    recommendation: "You're ready for growth-focused strategies. Join our team to explore opportunities that match your ambitious investment goals.",
  },
  aggressive: {
    type: "Aggressive",
    color: "from-orange-500 to-red-500",
    icon: AlertTriangle,
    description: "You're a risk-taker seeking maximum returns. You're prepared for significant volatility and potential losses in pursuit of higher gains.",
    recommendation: "You have the mindset for high-reward opportunities. Connect with our experienced traders to discuss advanced strategies.",
  },
};

export default function RiskAssessmentQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getProfile = (): RiskProfile => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const avgScore = totalScore / questions.length;

    if (avgScore <= 1.5) return riskProfiles.conservative;
    if (avgScore <= 2.5) return riskProfiles.moderate;
    if (avgScore <= 3.5) return riskProfiles.growth;
    return riskProfiles.aggressive;
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <section id="risk-quiz" className="py-20 bg-navy-dark">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-4">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Risk Assessment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Your <span className="gold-gradient">Investor Profile</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take our quick 5-question assessment to understand your risk tolerance
            and get personalized investment recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Find Your Risk Profile?</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Answer 5 simple questions to discover your investor type and receive tailored recommendations.
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-navy-dark font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                >
                  Start Assessment
                </button>
                <p className="text-gray-500 text-sm mt-4">Takes less than 2 minutes</p>
              </motion.div>
            ) : showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                {(() => {
                  const profile = getProfile();
                  const IconComponent = profile.icon;
                  return (
                    <>
                      <div className={`w-24 h-24 bg-gradient-to-br ${profile.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Your Risk Profile</h3>
                      <p className={`text-3xl font-bold bg-gradient-to-r ${profile.color} bg-clip-text text-transparent mb-6`}>
                        {profile.type}
                      </p>
                      <div className="bg-navy-dark/50 rounded-xl p-6 mb-6 text-left">
                        <p className="text-gray-300 mb-4">{profile.description}</p>
                        <div className="border-t border-navy-light/30 pt-4">
                          <p className="text-gold font-medium mb-2">Our Recommendation:</p>
                          <p className="text-gray-400">{profile.recommendation}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={restart}
                          className="px-6 py-3 border border-gold/30 text-gold font-medium rounded-xl hover:bg-gold/10 transition-all"
                        >
                          Retake Quiz
                        </button>
                        <a
                          href="/register"
                          className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-navy-dark font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all"
                        >
                          Join Our Next Live Session
                        </a>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-4"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <div className="h-2 bg-navy-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold to-gold-light"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-8">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full p-4 text-left bg-navy-dark/50 border border-navy-light/30 rounded-xl text-gray-300 hover:border-gold/50 hover:bg-navy/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold font-medium group-hover:bg-gold group-hover:text-navy-dark transition-all">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option.text}</span>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gold transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                {currentQuestion > 0 && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-gold mt-6 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Question
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
