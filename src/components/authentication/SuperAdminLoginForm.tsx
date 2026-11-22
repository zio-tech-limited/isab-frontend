'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Eye, EyeOff, Lock, Loader2, AlertCircle, Shield,
    ArrowRight, Crown, Sparkles, Fingerprint,
    Database, Server, Cpu, Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { shareWithCookies } from '@/utils/helper/shareWithCookies';
import { appConfiguration } from '@/utils/constant/appConfiguration';
import { useEnterpriseLoginMutation } from '@/redux/api/authentication/authApi';

// Super Admin login schema validation
const superAdminLoginSchema = z.object({
    email: z.string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    twoFactorCode: z.string().optional(),
});

type LoginFormData = z.infer<typeof superAdminLoginSchema>;

export default function SuperAdminLoginForm() {
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Form state
    const [showPassword, setShowPassword] = useState(false);
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Moving particles and stars state
    const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: number; duration: number; delay: number; glowDelay: number }>>([]);
    const [gridLines, setGridLines] = useState<Array<{ id: number; type: 'horizontal' | 'vertical'; position: string }>>([]);

    // API hook
    const [superAdminLogin, { isLoading: loginLoading }] = useEnterpriseLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginFormData>({
        resolver: zodResolver(superAdminLoginSchema),
        defaultValues: {
            email: '',
            password: '',
            twoFactorCode: '',
        },
        mode: 'onChange',
    });

    const emailValue = watch('email');

    // Generate animated particles
    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 60; i++) {
                newParticles.push({
                    id: i,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    size: Math.random() * 4 + 1,
                    duration: Math.random() * 15 + 10,
                    delay: Math.random() * 8,
                    glowDelay: Math.random() * 3,
                });
            }
            setParticles(newParticles);
        };

        const generateGridLines = () => {
            const newGridLines = [];
            // Horizontal lines
            for (let i = 0; i < 12; i++) {
                newGridLines.push({
                    id: `h-${i}`,
                    type: 'horizontal',
                    position: `${(i / 12) * 100}%`,
                });
            }
            // Vertical lines
            for (let i = 0; i < 12; i++) {
                newGridLines.push({
                    id: `v-${i}`,
                    type: 'vertical',
                    position: `${(i / 12) * 100}%`,
                });
            }
            setGridLines(newGridLines);
        };

        generateParticles();
        generateGridLines();
    }, []);

    // Handle theme mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    const onSubmit = async (data: LoginFormData) => {
        setErrorMessage(null);

        // Remove twoFactorCode if not provided
        const loginData = {
            email: data.email,
            password: data.password,
        };

        try {
            const response = await superAdminLogin(loginData).unwrap();

            if (response.success) {
                if (response.data?.tokens?.accessToken) {
                    const { accessToken, refreshToken } = response.data.tokens;

                    // Set tokens in cookies
                    const tokenName = `${appConfiguration.appCode}token`;
                    const refreshTokenName = `${appConfiguration.appCode}refreshToken`;

                    shareWithCookies("set", tokenName, 1440, accessToken); // 1 day
                    shareWithCookies("set", refreshTokenName, 10080, refreshToken); // 7 days

                    toast.success('Welcome back, Super Admin!', {
                        icon: '👑',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });

                    // Redirect to super admin dashboard
                    router.push(`/redirect?to=/admin/dashboard`);
                }
            }
        } catch (error: any) {
            console.error('Super Admin login error:', error);

            // Increment login attempts
            setLoginAttempts(prev => prev + 1);

            const errorMessage = error?.data?.message || error?.message || 'Invalid email or password';
            setErrorMessage(errorMessage);
            toast.error(errorMessage);

            // If 3 failed attempts, show two-factor option
            if (loginAttempts >= 4) {
                setShowTwoFactor(true);
                toast('Multiple failed attempts detected. Two-factor authentication recommended.');
            }
        }
    };

    // Don't render theme-dependent UI until mounted
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
                <div className="animate-pulse">
                    <div className="h-12 w-64 bg-gray-700 rounded-lg mb-4" />
                    <div className="h-96 w-96 bg-gray-800 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={cn(
                "min-h-screen mt-16 flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden",
                "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
            )}>
                {/* Animated Tech Grid Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {gridLines.map((line) => (
                        <div
                            key={line.id}
                            className={cn(
                                "absolute bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20",
                                line.type === 'horizontal' ? 'w-full h-px' : 'h-full w-px'
                            )}
                            style={{
                                [line.type === 'horizontal' ? 'top' : 'left']: line.position,
                                animation: `pulse 4s ease-in-out infinite`,
                            }}
                        />
                    ))}
                </div>

                {/* Animated Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                left: particle.left,
                                top: particle.top,
                                boxShadow: `0 0 ${particle.size * 2}px rgba(168, 85, 247, 0.6)`,
                            }}
                            animate={{
                                x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
                                y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
                                opacity: [0, 1, 0.5, 1, 0],
                                scale: [0, 1.5, 0.8, 1.2, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Animated Gradient Orbs */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
                    />
                </div>

                {/* Main Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        animate={{
                            boxShadow: isHovered
                                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(168, 85, 247, 0.3)"
                                : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300",
                            "bg-white/10 border border-white/20",
                        )}
                    >
                        {/* Header with Crown Animation */}
                        <div className="p-8 pb-6 relative">
                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-purple-400/50 rounded-tl-2xl" />
                            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-400/50 rounded-tr-2xl" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-400/50 rounded-bl-2xl" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-400/50 rounded-br-2xl" />

                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex flex-col items-center mb-6"
                            >
                                {/* Logo with rotating border */}
                                <div className="relative mb-4">
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-75 blur-xl"
                                    />
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className={cn(
                                            "relative w-28 h-28 rounded-full flex items-center justify-center border-2 shadow-lg",
                                            "bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-purple-400/50 backdrop-blur-sm"
                                        )}
                                    >
                                        <Crown className="w-12 h-12 text-yellow-400" />
                                        <div className="absolute -top-2 -right-2">
                                            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                                        </div>
                                    </motion.div>
                                </div>

                                <h2 className={cn(
                                    "text-2xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent",
                                )}>
                                    Super Admin Portal
                                </h2>
                                <p className={cn(
                                    "text-sm text-center",
                                    "text-gray-300",
                                )}>
                                    System Administrator Access Only
                                </p>

                                {/* Security badge */}
                                <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <Shield className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-gray-400">Secure Encrypted Connection</span>
                                </div>
                            </motion.div>

                            {/* Error Message with Animation */}
                            <AnimatePresence>
                                {errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -20 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -20 }}
                                        className={cn(
                                            "mb-4 p-3 rounded-lg border",
                                            "bg-red-500/10 border-red-500/30 backdrop-blur-sm",
                                        )}
                                    >
                                        <div className="flex items-center gap-2 text-red-400">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-sm">{errorMessage}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        "text-gray-200",
                                    )}>
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className={cn(
                                                "w-5 transition-colors",
                                                "text-gray-400 group-focus-within:text-purple-400",
                                            )} />
                                        </div>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            disabled={loginLoading}
                                            className={cn(
                                                "block w-full pl-10 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                                "bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                                                "backdrop-blur-sm"
                                            )}
                                            placeholder="admin@company.com"
                                        />
                                        {emailValue && emailValue.includes('@') && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            </motion.div>
                                        )}
                                    </div>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.email.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        "text-gray-200",
                                    )}>
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className={cn(
                                                "w-5 transition-colors",
                                                "text-gray-400 group-focus-within:text-purple-400",
                                            )} />
                                        </div>
                                        <input
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            disabled={loginLoading}
                                            className={cn(
                                                "block w-full pl-10 pr-10 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                                "bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                                                "backdrop-blur-sm"
                                            )}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 text-gray-400 hover:text-gray-200" />
                                            ) : (
                                                <Eye className="w-5 text-gray-400 hover:text-gray-200" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.password.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Two-Factor Code Field (Conditional) */}
                                <AnimatePresence>
                                    {showTwoFactor && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <label className={cn(
                                                "block text-sm font-medium mb-2",
                                                "text-gray-200",
                                            )}>
                                                Two-Factor Authentication Code
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Fingerprint className={cn(
                                                        "w-5 transition-colors",
                                                        "text-gray-400 group-focus-within:text-purple-400",
                                                    )} />
                                                </div>
                                                <input
                                                    {...register('twoFactorCode')}
                                                    type="text"
                                                    maxLength={6}
                                                    disabled={loginLoading}
                                                    className={cn(
                                                        "block w-full pl-10 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                                        "bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                                                        "backdrop-blur-sm text-center tracking-widest"
                                                    )}
                                                    placeholder="000000"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Forgot Password Link */}
                                <div className="flex justify-end">
                                    <Link
                                        href="/super-admin/forgot-password"
                                        className={cn(
                                            "text-sm font-medium transition-all duration-200 hover:scale-105",
                                            "text-purple-400 hover:text-purple-300",
                                        )}
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button with Enhanced Effects */}
                                <motion.button
                                    type="submit"
                                    disabled={loginLoading}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                        transition: { duration: 0.1 }
                                    }}
                                    className={cn(
                                        "w-full px-6 py-3 hover:cursor-pointer text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group",
                                        "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600",
                                        "bg-[length:200%_100%] animate-shimmer"
                                    )}
                                >
                                    <motion.span
                                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                        }}
                                        style={{ pointerEvents: "none" }}
                                    />
                                    {loginLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                                            <span className="relative z-10">Authenticating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Access Super Admin Panel</span>
                                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>

                        {/* Footer with System Stats */}
                        <div className={cn(
                            "px-8 py-5 border-t",
                            "bg-black/20 border-white/10 backdrop-blur-sm",
                        )}>
                            <p className={cn(
                                "text-center text-xs",
                                "text-gray-400",
                            )}>
                                <Shield className="inline w-3 h-3 mr-1" />
                                This area is restricted to authorized personnel only
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% {
                        background-position: 0% 0%;
                    }
                    100% {
                        background-position: 200% 0%;
                    }
                }
                
                .animate-shimmer {
                    animation: shimmer 3s ease infinite;
                    background-size: 200% 100%;
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.1;
                    }
                    50% {
                        opacity: 0.3;
                    }
                }
            `}</style>
        </>
    );
}


