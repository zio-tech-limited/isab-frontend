'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    Eye, EyeOff, Lock, Mail, X, Loader2, AlertCircle, Shield,
    Smartphone, User, Calendar, Phone, Camera, Check,
    ArrowLeft, ArrowRight, UserCircle, CreditCard, Building,
    MapPin, Globe, Briefcase, Users, DollarSign, Home,
    FileText, Hash, Landmark, Banknote, MapPinned,
    CheckCircle2, Clock, ImageIcon, Upload, Save, Building2,
    Store, BadgeIndianRupee, PhoneCall, MapPinHouse
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAddThumbnailMutation } from '@/redux/features/file/fileApi';
import { useRegisterSubCompanyMutation } from '@/redux/api/authentication/subCompanyApi';
import { REGIONS_AND_COUNTRIES } from '@/utils/constant/regionsAndCountries';

type RegisterFormData = {
    // Company Information
    companyName?: string;
    tradeLicenseNo?: string;
    binNo?: string;
    tinNo?: string;

    // Owner Information
    ownerName?: string;
    ownerPhoto?: string;
    ownerNidOrPassportNo?: string;
    ownerNidFrontSide?: string;
    ownerNidBackSide?: string;

    // Contact Information
    phoneNo?: string;
    email?: string;
    website?: string;

    // Address Information
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;

    // Business Information
    businessType?: string;
    yearOfEstablishment?: string;
    numberOfEmployees?: string;

    // Bank Information
    bankName?: string;
    bankAccountNo?: string;
    bankBranch?: string;

    // Account Security
    password?: string;
    confirmPassword?: string;
};

// Steps configuration
const steps = [
    { id: 1, name: 'Company Info', icon: Building2, ref: 'step1' },
    { id: 2, name: 'Owner Details', icon: User, ref: 'step2' },
    { id: 3, name: 'Contact Info', icon: Phone, ref: 'step3' },
    { id: 4, name: 'Address', icon: MapPin, ref: 'step4' },
    { id: 5, name: 'Business Info', icon: Briefcase, ref: 'step5' },
    { id: 6, name: 'Bank Details', icon: Landmark, ref: 'step6' },
    { id: 7, name: 'Security', icon: Lock, ref: 'step7' },
];

export default function BrotherEnterpriseRegisterForm() {
    const router = useRouter();
    const [registerSubCompany, { isLoading: registerLoading }] = useRegisterSubCompanyMutation();
    const [addThumbnail] = useAddThumbnailMutation();

    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [animateBg, setAnimateBg] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<{
        ownerPhoto?: string;
        ownerNidFront?: string;
        ownerNidBack?: string;
    }>({});

    // Refs for each step section
    const step1Ref = useRef<HTMLDivElement>(null);
    const step2Ref = useRef<HTMLDivElement>(null);
    const step3Ref = useRef<HTMLDivElement>(null);
    const step4Ref = useRef<HTMLDivElement>(null);
    const step5Ref = useRef<HTMLDivElement>(null);
    const step6Ref = useRef<HTMLDivElement>(null);
    const step7Ref = useRef<HTMLDivElement>(null);

    const stepRefs = {
        1: step1Ref,
        2: step2Ref,
        3: step3Ref,
        4: step4Ref,
        5: step5Ref,
        6: step6Ref,
        7: step7Ref,
    };

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isUploading, setIsUploading] = useState({
        ownerPhoto: false,
        ownerNidFront: false,
        ownerNidBack: false,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Background animation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimateBg(prev => !prev);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
    } = useForm<RegisterFormData>({
        defaultValues: {
            companyName: '',
            tradeLicenseNo: '',
            binNo: '',
            tinNo: '',
            ownerName: '',
            ownerPhoto: '',
            ownerNidOrPassportNo: '',
            ownerNidFrontSide: '',
            ownerNidBackSide: '',
            phoneNo: '',
            email: '',
            website: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'Bangladesh',
            businessType: '',
            yearOfEstablishment: '',
            numberOfEmployees: '',
            bankName: '',
            bankAccountNo: '',
            bankBranch: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('Bangladesh');

    // Get countries based on selected region
    const availableCountries = selectedRegion
        ? REGIONS_AND_COUNTRIES.find(region => region.id === selectedRegion)?.countries || []
        : [];

    // Add this effect to set initial country when region changes
    useEffect(() => {
        if (selectedRegion) {
            const region = REGIONS_AND_COUNTRIES.find(r => r.id === selectedRegion);
            if (region && region.countries.length > 0) {
                const defaultCountry = region.countries.find(c => c.name === 'Bangladesh')?.name || region.countries[0].name;
                setSelectedCountry(defaultCountry);
                setValue('country', defaultCountry);
            }
        }
    }, [selectedRegion, setValue]);


    // Validate passwords whenever they change
    useEffect(() => {
        if (password || confirmPassword) {
            if (password && confirmPassword && password !== confirmPassword) {
                setPasswordError('Passwords do not match!');
            } else if (password && password.length < 6) {
                setPasswordError('Password must be at least 6 characters');
            } else if (password && !/[A-Z]/.test(password)) {
                setPasswordError('Password must contain at least one uppercase letter');
            } else if (password && !/[0-9]/.test(password)) {
                setPasswordError('Password must contain at least one number');
            } else {
                setPasswordError(null);
            }
        } else {
            setPasswordError(null);
        }
    }, [password, confirmPassword]);

    const handleFileUpload = async (file: File, type: 'ownerPhoto' | 'ownerNidFront' | 'ownerNidBack') => {
        try {
            setIsUploading(prev => ({ ...prev, [type]: true }));

            const formData = new FormData();
            formData.append('image', file);

            const response = await addThumbnail(formData).unwrap();

            if (response.success && response.data && response.data[0]) {
                const fileUrl = response.data[0];

                setUploadedFiles(prev => ({ ...prev, [type]: fileUrl }));

                if (type === 'ownerPhoto') {
                    setValue('ownerPhoto', fileUrl);
                } else if (type === 'ownerNidFront') {
                    setValue('ownerNidFrontSide', fileUrl);
                } else if (type === 'ownerNidBack') {
                    setValue('ownerNidBackSide', fileUrl);
                }

                toast.success(`${type === 'ownerPhoto' ? 'Owner Photo' : 'NID Document'} uploaded successfully!`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload failed. Please try again.');
        } finally {
            setIsUploading(prev => ({ ...prev, [type]: false }));
        }
    };

    const handleDrop = (e: React.DragEvent, type: 'ownerPhoto' | 'ownerNidFront' | 'ownerNidBack') => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
            handleFileUpload(file, type);
        } else {
            toast.error('Please upload an image or PDF file');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'ownerPhoto' | 'ownerNidFront' | 'ownerNidBack') => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file, type);
        }
    };

    const removeFile = (type: 'ownerPhoto' | 'ownerNidFront' | 'ownerNidBack') => {
        setUploadedFiles(prev => ({ ...prev, [type]: undefined }));
        if (type === 'ownerPhoto') {
            setValue('ownerPhoto', '');
        } else if (type === 'ownerNidFront') {
            setValue('ownerNidFrontSide', '');
        } else if (type === 'ownerNidBack') {
            setValue('ownerNidBackSide', '');
        }
    };

    const goToStep = (step: number) => {
        setCurrentStep(step);
        // Scroll to the step section with smooth animation
        setTimeout(() => {
            const stepRef = stepRefs[step as keyof typeof stepRefs];
            if (stepRef.current) {
                stepRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    const nextStep = () => {
        const nextStepValue = Math.min(currentStep + 1, 7);
        setCurrentStep(nextStepValue);
        // Scroll to the next step section
        setTimeout(() => {
            const stepRef = stepRefs[nextStepValue as keyof typeof stepRefs];
            if (stepRef.current) {
                stepRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    const prevStep = () => {
        const prevStepValue = Math.max(currentStep - 1, 1);
        setCurrentStep(prevStepValue);
        // Scroll to the previous step section
        setTimeout(() => {
            const stepRef = stepRefs[prevStepValue as keyof typeof stepRefs];
            if (stepRef.current) {
                stepRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    const validateForm = () => {
        // Check if password is provided
        if (!password || password.trim() === '') {
            setPasswordError('Password is required');
            toast('Please enter a password carefully and make sure to remember it for future logins.');
            return false;
        }

        // Check password length
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            toast.error('Password must be at least 6 characters');
            return false;
        }

        // Check for uppercase letter
        if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter');
            toast.error('Password must contain at least one uppercase letter');
            return false;
        }

        // Check for number
        if (!/[0-9]/.test(password)) {
            setPasswordError('Password must contain at least one number');
            toast.error('Password must contain at least one number');
            return false;
        }

        // Check if confirm password matches
        if (!confirmPassword || confirmPassword.trim() === '') {
            setPasswordError('Please confirm your password');
            toast.error('Please confirm your password');
            return false;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            toast.error('Passwords do not match!');
            return false;
        }

        return true;
    };

    const onSubmit = async (data: RegisterFormData) => {
        console.log('Form Data:', data);
        console.log('Submit button clicked!');

        // Clear previous errors
        setErrorMessage(null);

        // Validate password before submission
        if (!validateForm()) {
            return;
        }

        try {
            const payload = {
                companyName: data.companyName || '',
                tradeLicenseNo: data.tradeLicenseNo || '',
                binNo: data.binNo || '',
                tinNo: data.tinNo || '',
                ownerName: data.ownerName || '',
                ownerPhoto: data.ownerPhoto || '',
                ownerNidOrPassportNo: data.ownerNidOrPassportNo || '',
                ownerNidFrontSide: data.ownerNidFrontSide || '',
                ownerNidBackSide: data.ownerNidBackSide || '',
                phoneNo: data.phoneNo || '',
                email: data.email || '',
                website: data.website || '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                postalCode: data.postalCode || '',
                country: data.country || 'Bangladesh',
                businessType: data.businessType || '',
                yearOfEstablishment: data.yearOfEstablishment ? parseInt(data.yearOfEstablishment) : 0,
                numberOfEmployees: data.numberOfEmployees ? parseInt(data.numberOfEmployees) : 0,
                bankName: data.bankName || '',
                bankAccountNo: data.bankAccountNo || '',
                bankBranch: data.bankBranch || '',
                password: data.password || '',
                role: 'accreditation-body',
                status: 'pending',
            };

            const response = await registerSubCompany(payload).unwrap();
            console.log('Response:', response);

            if (response.success) {
                toast.success('Registration successful! Please login to continue.');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                throw new Error(response.message || 'Registration failed');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            const errorMessage = error?.data?.message || error?.message || 'Registration failed';
            setErrorMessage(errorMessage);
            toast.error(errorMessage);
        }
    };

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="animate-pulse">
                    <div className="h-12 w-64 bg-gray-200 rounded-lg mb-4" />
                    <div className="h-96 w-96 bg-gray-100 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 my-16 ">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -inset-2.5 opacity-30">
                    <div className={cn(
                        "absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob",
                        "bg-gradient-to-r from-blue-200 to-indigo-200",
                        animateBg && "animate-pulse"
                    )} />
                    <div className={cn(
                        "absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000",
                        "bg-gradient-to-r from-emerald-200 to-teal-200",
                        animateBg && "animate-pulse"
                    )} />
                    <div className={cn(
                        "absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000",
                        "bg-gradient-to-r from-amber-200 to-yellow-200",
                        animateBg && "animate-pulse"
                    )} />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-4xl"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="p-8 pb-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center mb-6"
                        >
                            <div className="relative mb-4">
                                <div className="absolute inset-0 rounded-full blur-lg opacity-75 bg-gradient-to-r from-blue-400 to-indigo-500" />
                                <div className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 bg-white border-gray-200 shadow-lg">
                                    <Building2 className="w-10 h-10 text-blue-600" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Register Your Business
                            </h1>
                            <p className="text-sm text-gray-500">
                                Register your business with submitting the informations below
                            </p>
                        </motion.div>

                        {/* Progress Steps - Clickable */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex-1 relative">
                                        <div className="flex flex-col items-center">
                                            {/* Step Circle - Made clickable */}
                                            <motion.button
                                                type="button"
                                                onClick={() => goToStep(step.id)}
                                                initial={false}
                                                animate={{
                                                    scale: currentStep >= step.id ? 1 : 0.95,
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className={cn(
                                                    "relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                                                    currentStep > step.id
                                                        ? "bg-green-500 text-white shadow-md"
                                                        : currentStep === step.id
                                                            ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-md"
                                                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                                )}
                                            >
                                                {currentStep > step.id ? (
                                                    <Check className="w-4 h-4" />
                                                ) : (
                                                    <step.icon className="w-4 h-4" />
                                                )}
                                            </motion.button>

                                            {/* Step Label - Made clickable */}
                                            <button
                                                type="button"
                                                onClick={() => goToStep(step.id)}
                                                className={cn(
                                                    "absolute top-10 text-xs font-medium whitespace-nowrap hidden md:block hover:text-blue-600 transition-colors",
                                                    currentStep >= step.id ? "text-gray-700" : "text-gray-400"
                                                )}
                                            >
                                                {step.name}
                                            </button>
                                        </div>

                                        {/* Connecting Line */}
                                        {index < steps.length - 1 && (
                                            <div className="absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2">
                                                <div
                                                    className={cn(
                                                        "h-full transition-all duration-500",
                                                        currentStep > step.id + 1
                                                            ? "bg-green-500"
                                                            : currentStep > step.id
                                                                ? "bg-blue-500"
                                                                : "bg-gray-200"
                                                    )}
                                                    style={{ width: '100%' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Step Labels - Made clickable */}
                            <div className="flex justify-between mt-8 md:hidden">
                                {steps.map((step) => (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => goToStep(step.id)}
                                        className={cn(
                                            "text-[10px] font-medium hover:text-blue-600 transition-colors",
                                            currentStep >= step.id ? "text-gray-700" : "text-gray-400"
                                        )}
                                    >
                                        {step.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200"
                                >
                                    <div className="flex items-center gap-2 text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">{errorMessage}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Company Information */}
                                {currentStep === 1 && (
                                    <motion.div
                                        ref={step1Ref}
                                        key="step1"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Company Name
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Building2 className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('companyName')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Enter company name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Trade License No
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FileText className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('tradeLicenseNo')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Enter trade license number"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    BIN No
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Hash className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('binNo')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Enter BIN number"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    TIN No (Optional)
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Banknote className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('tinNo')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Enter TIN number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Owner Details */}
                                {currentStep === 2 && (
                                    <motion.div
                                        ref={step2Ref}
                                        key="step2"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Owner Name
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('ownerName')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Enter owner name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Owner NID/Passport No
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <CreditCard className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('ownerNidOrPassportNo')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Enter NID or Passport number"
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Owner Photo
                                                </label>
                                                <div
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => handleDrop(e, 'ownerPhoto')}
                                                    className={cn(
                                                        "relative border-2 border-dashed rounded-lg p-4 transition-all duration-200",
                                                        uploadedFiles.ownerPhoto
                                                            ? "border-green-300 bg-green-50"
                                                            : "border-gray-300 hover:border-blue-400 bg-gray-50"
                                                    )}
                                                >
                                                    {uploadedFiles.ownerPhoto ? (
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                                                    <Image
                                                                        src={uploadedFiles.ownerPhoto}
                                                                        alt="Owner"
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        Owner Photo
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        Uploaded successfully
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile('ownerPhoto')}
                                                                className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                                            >
                                                                <X className="w-4 h-4 text-red-500" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            <Camera className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-600">
                                                                Drag & drop or{' '}
                                                                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                                    browse
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleFileSelect(e, 'ownerPhoto')}
                                                                        disabled={isUploading.ownerPhoto}
                                                                    />
                                                                </label>
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Support: JPG, PNG (Max 5MB)
                                                            </p>
                                                        </div>
                                                    )}
                                                    {isUploading.ownerPhoto && (
                                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    NID Front Side
                                                </label>
                                                <div
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => handleDrop(e, 'ownerNidFront')}
                                                    className={cn(
                                                        "relative border-2 border-dashed rounded-lg p-4 transition-all duration-200",
                                                        uploadedFiles.ownerNidFront
                                                            ? "border-green-300 bg-green-50"
                                                            : "border-gray-300 hover:border-blue-400 bg-gray-50"
                                                    )}
                                                >
                                                    {uploadedFiles.ownerNidFront ? (
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
                                                                    <Image
                                                                        src={uploadedFiles.ownerNidFront}
                                                                        alt="NID Front"
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        NID Front Side
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        Uploaded successfully
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile('ownerNidFront')}
                                                                className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                                            >
                                                                <X className="w-4 h-4 text-red-500" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            <ImageIcon className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-600">
                                                                Drag & drop or{' '}
                                                                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                                    browse
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*,application/pdf"
                                                                        onChange={(e) => handleFileSelect(e, 'ownerNidFront')}
                                                                        disabled={isUploading.ownerNidFront}
                                                                    />
                                                                </label>
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Support: JPG, PNG, PDF (Max 10MB)
                                                            </p>
                                                        </div>
                                                    )}
                                                    {isUploading.ownerNidFront && (
                                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    NID Back Side
                                                </label>
                                                <div
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => handleDrop(e, 'ownerNidBack')}
                                                    className={cn(
                                                        "relative border-2 border-dashed rounded-lg p-4 transition-all duration-200",
                                                        uploadedFiles.ownerNidBack
                                                            ? "border-green-300 bg-green-50"
                                                            : "border-gray-300 hover:border-blue-400 bg-gray-50"
                                                    )}
                                                >
                                                    {uploadedFiles.ownerNidBack ? (
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
                                                                    <Image
                                                                        src={uploadedFiles.ownerNidBack}
                                                                        alt="NID Back"
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        NID Back Side
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        Uploaded successfully
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile('ownerNidBack')}
                                                                className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                                            >
                                                                <X className="w-4 h-4 text-red-500" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            <ImageIcon className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-600">
                                                                Drag & drop or{' '}
                                                                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                                    browse
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*,application/pdf"
                                                                        onChange={(e) => handleFileSelect(e, 'ownerNidBack')}
                                                                        disabled={isUploading.ownerNidBack}
                                                                    />
                                                                </label>
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Support: JPG, PNG, PDF (Max 10MB)
                                                            </p>
                                                        </div>
                                                    )}
                                                    {isUploading.ownerNidBack && (
                                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Contact Information */}
                                {currentStep === 3 && (
                                    <motion.div
                                        ref={step3Ref}
                                        key="step3"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('phoneNo')}
                                                        type="tel"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="01XXXXXXXXX"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('email')}
                                                        type="email"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="company@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Website (Optional)
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Globe className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('website')}
                                                        type="url"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="https://www.example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Address Information */}
                                {currentStep === 4 && (
                                    <motion.div
                                        ref={step4Ref}
                                        key="step4"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPinHouse className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                </div>
                                                <input
                                                    {...register('address')}
                                                    type="text"
                                                    disabled={registerLoading}
                                                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                    placeholder="Street address, building, area"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <MapPin className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('city')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Dhaka"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    State/Division
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <MapPinned className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('state')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Dhaka"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Postal Code
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Hash className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('postalCode')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="1200"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Region
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Globe className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <select
                                                        value={selectedRegion}
                                                        onChange={(e) => {
                                                            setSelectedRegion(e.target.value);
                                                            setSelectedCountry('');
                                                            setValue('country', '');
                                                        }}
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white appearance-none"
                                                    >
                                                        <option value="">Select Region</option>
                                                        {REGIONS_AND_COUNTRIES.map((region) => (
                                                            <option key={region.id} value={region.id}>
                                                                {region.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Country Dropdown - Only shows when region is selected */}
                                            {selectedRegion && (
                                                <div className='col-span-2 '>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Country
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <MapPin className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                        </div>
                                                        <select
                                                            value={selectedCountry}
                                                            onChange={(e) => {
                                                                setSelectedCountry(e.target.value);
                                                                setValue('country', e.target.value);
                                                            }}
                                                            disabled={registerLoading || !selectedRegion}
                                                            className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white appearance-none"
                                                        >
                                                            <option value="">Select Country</option>
                                                            {availableCountries.map((country) => (
                                                                <option key={country.code} value={country.name}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 5: Business Information */}
                                {currentStep === 5 && (
                                    <motion.div
                                        ref={step5Ref}
                                        key="step5"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Business Type
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Briefcase className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('businessType')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="IT Services, Retail, Manufacturing"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Year of Establishment
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('yearOfEstablishment')}
                                                        type="number"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="2020"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Number of Employees
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Users className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('numberOfEmployees')}
                                                        type="number"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="10"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 6: Bank Details */}
                                {currentStep === 6 && (
                                    <motion.div
                                        ref={step6Ref}
                                        key="step6"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Bank Name
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Landmark className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('bankName')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Sonali Bank"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Bank Account No
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <CreditCard className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('bankAccountNo')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="1234567890"
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Bank Branch
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Building className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('bankBranch')}
                                                        type="text"
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="Singair Branch"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 7: Security (Password) */}
                                {currentStep === 7 && (
                                    <motion.div
                                        ref={step7Ref}
                                        key="step7"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Password *
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Lock className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('password')}
                                                        type={showPassword ? 'text' : 'password'}
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 text-gray-400 hover:text-gray-600" />
                                                        ) : (
                                                            <Eye className="w-5 text-gray-400 hover:text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm Password *
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Lock className="w-5 text-gray-400 group-focus-within:text-blue-500" />
                                                    </div>
                                                    <input
                                                        {...register('confirmPassword')}
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        disabled={registerLoading}
                                                        className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white"
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="w-5 text-gray-400 hover:text-gray-600" />
                                                        ) : (
                                                            <Eye className="w-5 text-gray-400 hover:text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Password Error Message */}
                                        {passwordError && (
                                            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                                <div className="flex items-center gap-2 text-red-600">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm">{passwordError}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Password Strength Indicator */}
                                        {password && password.length > 0 && (
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 mb-2">
                                                    Password Requirements:
                                                </p>
                                                <ul className="space-y-1 text-xs">
                                                    <li className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            (watch('password')?.length || 0) >= 6 ? "bg-green-500" : "bg-gray-300"
                                                        )} />
                                                        <span className={(watch('password')?.length || 0) >= 6 ? "text-green-600" : "text-gray-500"}>
                                                            At least 6 characters
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            /[A-Z]/.test(watch('password') || '') ? "bg-green-500" : "bg-gray-300"
                                                        )} />
                                                        <span className={/[A-Z]/.test(watch('password') || '') ? "text-green-600" : "text-gray-500"}>
                                                            At least one uppercase letter
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            /[0-9]/.test(watch('password') || '') ? "bg-green-500" : "bg-gray-300"
                                                        )} />
                                                        <span className={/[0-9]/.test(watch('password') || '') ? "text-green-600" : "text-gray-500"}>
                                                            At least one number
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="grid lg:flex gap-3 pt-4">
                                {currentStep > 1 && (
                                    <motion.button
                                        type="button"
                                        onClick={prevStep}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 cursor-pointer px-6 py-3 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back
                                    </motion.button>
                                )}

                                {currentStep < 7 ? (
                                    <motion.button
                                        type="button"
                                        onClick={nextStep}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 cursor-pointer px-6 py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    >
                                        Next
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        disabled={registerLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 cursor-pointer px-6 py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                    >
                                        {registerLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Register Business
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => router.push('/login')}
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" />
                        Your data is protected with 256-bit SSL encryption
                    </p>
                </div>
            </motion.div>

            {/* Animation styles */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}


