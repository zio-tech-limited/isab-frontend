// src/app/redirect/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Create a separate component for the content that uses searchParams
function RedirectContent() {
  const searchParams = useSearchParams();
  const to = searchParams.get('to') || '/admin/dashboard';
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const validationSteps = [
    { id: 0, title: "Initializing Secure Connection", icon: "🔐", description: "Establishing encrypted channel" },
    { id: 1, title: "Verifying Credentials", icon: "✅", description: "Checking authentication tokens" },
    { id: 2, title: "Loading Certificate Registry", icon: "📜", description: "Fetching validation data" },
    { id: 3, title: "Preparing Dashboard", icon: "📊", description: "Setting up your workspace" },
    { id: 4, title: "Almost Ready", icon: "⚡", description: "Finalizing configurations" },
  ];

  // Get window dimensions safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    console.log('ISAB Redirect: Redirecting to', to);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          
          // Update steps progress
          setCurrentStep(validationSteps.length - 1);
          
          // Final redirect with a smooth transition
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = to;
            }
          }, 500);
          return 100;
        }
        
        // Update current step based on progress
        const stepIndex = Math.floor((prev / 100) * validationSteps.length);
        if (stepIndex < validationSteps.length && stepIndex !== currentStep) {
          setCurrentStep(stepIndex);
        }
        
        return prev + 1;
      });
    }, 20); // Complete in ~2 seconds

    return () => clearInterval(progressInterval);
  }, [to, validationSteps.length, currentStep]);

  // Get random position for particles
  const getRandomPosition = (max: number) => {
    return windowSize.width > 0 ? Math.random() * max : 0;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '30px',
        }} />
      </div>

      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px]"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: getRandomPosition(windowSize.width),
              y: getRandomPosition(windowSize.height),
              opacity: 0,
            }}
            animate={{
              x: getRandomPosition(windowSize.width),
              y: getRandomPosition(windowSize.height),
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        {/* ISAB Logo Container */}
        <div className="mb-8 sm:mb-12">
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            {/* Outer Rings */}
            <motion.div
              className="absolute -inset-8 border-4 border-blue-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-4 border-2 border-purple-400/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-0 border border-cyan-400/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Main Logo */}
            <motion.div
              className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center shadow-2xl"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.3)",
                  "0 0 60px rgba(59, 130, 246, 0.6)",
                  "0 0 30px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <motion.div
                  className="text-white font-bold text-3xl sm:text-4xl md:text-5xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ISAB
                </motion.div>
                <motion.div
                  className="text-white/80 text-[8px] sm:text-[10px] mt-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CERTIFIED
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Main Heading */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Secure Redirect in Progress
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Establishing secure connection to your ISAB Certificate Management Dashboard
          </p>
        </motion.div>

        {/* Progress Bar Section */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mb-8 sm:mb-10">
          <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-2">
            <span>Processing</span>
            <motion.span
              key={progress}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="font-mono text-blue-400"
            >
              {progress}%
            </motion.span>
          </div>
          
          <div className="relative h-2 sm:h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12" />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Progress Percentage Circle */}
          <motion.div
            className="absolute right-0 -top-8 text-right"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Validation Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 w-full max-w-4xl mb-8 sm:mb-10">
          {validationSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: progress >= (index / validationSteps.length) * 100 ? 1 : 0.3,
                y: 0,
                scale: currentStep === index ? 1.05 : 1,
              }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`
                text-center p-3 sm:p-4 rounded-xl transition-all duration-300
                ${currentStep === index ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/50' : 'bg-gray-800/30'}
                ${progress >= (index / validationSteps.length) * 100 ? 'backdrop-blur-sm' : ''}
              `}>
                <div className="text-2xl sm:text-3xl mb-2">
                  {step.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {step.description}
                </p>
                
                {/* Step Status Indicator */}
                {currentStep > index && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
                
                {currentStep === index && progress < 100 && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-400 rounded-full"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Metrics */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mb-8 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "Encryption", value: "256-bit SSL", icon: "🔒" },
            { label: "Status", value: "Secure", icon: "🛡️" },
            { label: "Server", value: "Active", icon: "⚡" },
            { label: "Latency", value: `${Math.floor(Math.random() * 50 + 20)}ms`, icon: "📡" },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xl sm:text-2xl mb-1">{metric.icon}</div>
              <div className="text-[10px] sm:text-xs text-gray-400">{metric.label}</div>
              <div className="text-xs sm:text-sm font-semibold text-blue-400">{metric.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Loading Dots */}
        <motion.div
          className="flex space-x-2 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.p
          className="text-center text-gray-400 text-xs sm:text-sm max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="inline-block animate-pulse">🔐</span> Secure connection established • 
          Certificate validation in progress • Please wait
        </motion.p>

        {/* Footer */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-[10px] sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© 2024 ISAB - International Standard Accreditation Body. All rights reserved.</p>
          <p className="mt-1">Ensuring Global Certificate Standards Since 2024</p>
        </motion.div>
      </div>

      {/* Particle Explosion Effect on Completion */}
      <AnimatePresence>
        {progress === 100 && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`explosion-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${['#3B82F6', '#8B5CF6', '#06B6D4'][Math.floor(Math.random() * 3)]}, transparent)`,
                }}
                initial={{
                  x: windowSize.width / 2,
                  y: windowSize.height / 2,
                  scale: 0,
                }}
                animate={{
                  x: windowSize.width / 2 + (Math.random() - 0.5) * 400,
                  y: windowSize.height / 2 + (Math.random() - 0.5) * 400,
                  scale: [0, 2, 0],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: Math.random() * 0.3,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Success Confetti Effect */}
      <AnimatePresence>
        {progress === 100 && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-2 h-2"
                style={{
                  backgroundColor: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                }}
                initial={{
                  x: windowSize.width / 2,
                  y: windowSize.height / 2,
                  rotate: 0,
                }}
                animate={{
                  x: windowSize.width / 2 + (Math.random() - 0.5) * windowSize.width,
                  y: windowSize.height / 2 + (Math.random() - 0.5) * windowSize.height,
                  rotate: Math.random() * 720,
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 1,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main export with Suspense boundary
export default function RedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-300">Initializing ISAB secure redirect...</p>
        </div>
      </div>
    }>
      <RedirectContent />
    </Suspense>
  );
}