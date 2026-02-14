"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const questions = [
  {
    question: "Apa panggilan pertama dari surya setelah kita berpacaran?",
    options: ["Sayang", "Beb", "Hai Pacar", "Cantik"],
    correct: 2,
    explanation: "chat pertama seteleah di tembak laaa",
  },
  {
    question: "Siapa yang mengucapkan 'I Love U' duluan?",
    options: ["Kamu dulu!", "Aku dulu!", "Bersama", "Masih nunggu..."],
    correct: 0,
    explanation: "Aku udah gak tahan buat ngomong itu.",
  },
  {
    question: "Apa hal yang paling aku suka dari kamu?",
    options: ["Cika Cantik", "Cika Baik", "Cika Imut", "Semuanya"],
    correct: 3,
    explanation: "Pertanyaan jebakan! Jawabannya jelas semuanya.",
  },
  {
    question: "tempat apa yang sering kita kunjungi?",
    options: [
      "Nakoa Bondowoso",
      "MOG",
      "Ituu tuu deket rampal sebrang toko frozen",
      "Wiken",
    ],
    correct: 2,
    explanation: "Selalu bikin inget momen manis kita...",
  },
  {
    question: "Seberapa besar cintaku padamu?",
    options: [
      "Banyak banget",
      "Sampai ke bulan",
      "Lebih dari pizza",
      "Tak terhingga",
    ],
    correct: 3,
    explanation:
      "itu pun kurenk kalo ada satuan diatas ta terhingga itu cintaku padamu anjaiiiiiiii.",
  },
];

interface RelationshipQuizProps {
  onComplete?: () => void;
}

export default function RelationshipQuiz({
  onComplete,
}: RelationshipQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 2500);
  };

  return (
    <section className="min-h-screen bg-wine py-20 relative z-20 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-burgundy/50 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <h2 className="text-sm tracking-[0.2em] text-gold uppercase text-center mb-8">
            How well do you know us?
          </h2>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question Progress */}
                <div className="flex justify-center gap-2 mb-8">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentQuestion ? "w-8 bg-gold" : i < currentQuestion ? "w-2 bg-gold/50" : "w-2 bg-white/10"}`}
                    />
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl text-blush font-light text-center mb-10 min-h-[4rem] flex items-center justify-center">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isCorrect =
                      index === questions[currentQuestion].correct;
                    const isSelected = selectedOption === index;

                    let buttonStyle = "border-white/20 hover:bg-white/5";
                    if (isAnswered) {
                      if (isCorrect && isSelected) {
                        // User picked correct answer
                        buttonStyle =
                          "bg-green-500/20 border-green-500/50 text-green-200";
                      } else if (isSelected && !isCorrect) {
                        // User picked wrong answer
                        buttonStyle =
                          "bg-red-500/20 border-red-500/50 text-red-200";
                      } else {
                        // Other options (don't reveal correct one if user was wrong)
                        buttonStyle = "opacity-50 border-transparent";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl border text-lg transition-all duration-300 ${buttonStyle} text-left relative overflow-hidden`}
                      >
                        <span className="relative z-10">{option}</span>
                        {isAnswered && isCorrect && isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400"
                          >
                            ❤️
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Toast */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-center text-gold italic font-light"
                    >
                      &quot;{questions[currentQuestion].explanation}&quot;
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-3xl md:text-4xl text-blush font-bold mb-4">
                  Skor: {score} / {questions.length}
                </h3>
                <p className="text-xl text-white/80 font-light mb-8">
                  {score === questions.length
                    ? "Wopyuu bebee Aku sayang kamuuu😘😘"
                    : "Yah, masih salah! Kamu harus dapet skor sempurna buat lanjut 😋"}
                </p>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <button
                    onClick={() => {
                      setShowResult(false);
                      setCurrentQuestion(0);
                      setScore(0);
                      setIsAnswered(false);
                      setSelectedOption(null);
                    }}
                    className={`px-8 py-3 rounded-full transition-colors ${
                      score === questions.length
                        ? "bg-white/10 hover:bg-white/20 text-blush"
                        : "bg-wine text-white font-bold hover:bg-wine/80 shadow-lg animate-bounce"
                    }`}
                  >
                    {score === questions.length
                      ? "Main Lagi"
                      : "Ulangi Quiz (Harus 100%!) 😤"}
                  </button>

                  {score === questions.length && onComplete && (
                    <motion.button
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onComplete}
                      className="px-8 py-4 bg-white text-wine font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse"
                    >
                      Lanjut ke Surprise 🎁
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
