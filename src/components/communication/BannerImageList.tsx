"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Image as ImageIcon,
    Loader2,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Check,
    AlertCircle,
    X,
    GripVertical,
    Eye,
    Upload,
    Camera,
} from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    BannerImage,
    useCreateBannerImageMutation,
    useDeleteBannerImageMutation,
    useGetActiveBannerImagesQuery,
    useGetAllBannerImagesQuery,
    useGetBannerStatsQuery,
    useSetActiveBannerImageMutation,
    useToggleBannerImagesActiveMutation,
    useUpdateBannerImageMutation
} from "@/redux/api/communication/bannerApi";
import { useAddThumbnailMutation } from "@/redux/features/file/fileApi";
import { cn } from "@/lib/utils";

// Professional Toggle Switch Component
function ToggleSwitch({ isActive, onToggle, label }) {
    return (
        <button
            onClick={onToggle}
            className={cn(
                "relative inline-flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer group",
                isActive 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/30 hover:shadow-lg hover:shadow-green-500/40" 
                    : "bg-gray-200 text-gray-600 shadow-sm hover:bg-gray-300"
            )}
        >
            <span className="text-sm font-medium whitespace-nowrap">
                {label || (isActive ? "Active" : "Inactive")}
            </span>
            <span className="relative inline-flex h-6 w-12 flex-shrink-0 rounded-full transition-colors duration-300 ease-in-out bg-white/30">
                <span
                    className={cn(
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out",
                        isActive ? "translate-x-6" : "translate-x-0.5"
                    )}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: isActive ? 'translate(6px, -50%)' : 'translate(0.5px, -50%)',
                    }}
                />
            </span>
        </button>
    );
}


// Sortable Item Component
function SortableItem({ image, index, onEdit, onDelete, onToggle, isActive }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <tr ref={setNodeRef} style={style} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-gray-700 text-gray-400">
                    <GripVertical className="w-4 h-4" />
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-500">{index + 1}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                            src={image.image}
                            alt={image.altText}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {image.altText}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]" title={image.image}>
                        {image.image.length > 30 ? image.image.substring(0, 30) + "..." : image.image}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <ToggleSwitch
                    isActive={isActive}
                    onToggle={() => onToggle(image)}
                    label="Banner Show"
                />
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">
                    {new Date(image.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onEdit(image)}
                        className="p-2 cursor-pointer rounded-lg hover:bg-purple-100 transition-colors"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                        onClick={() => onDelete(image)}
                        className="p-2 cursor-pointer rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default function BannerImageList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<BannerImage | null>(null);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        image: "",
        altText: "",
        isActive: false,
        order: 0,
    });
    const [imagePreview, setImagePreview] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    // Queries
    const { data, isLoading, refetch } = useGetAllBannerImagesQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
    });

    const { data: activeImagesData } = useGetActiveBannerImagesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const { data: statsData } = useGetBannerStatsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    // Mutations
    const [createImage, { isLoading: isCreating }] = useCreateBannerImageMutation();
    const [updateImage, { isLoading: isUpdating }] = useUpdateBannerImageMutation();
    const [deleteImage, { isLoading: isDeleting }] = useDeleteBannerImageMutation();
    const [setActiveImage, { isLoading: isActivating }] = useSetActiveBannerImageMutation();
    const [toggleActiveImages, { isLoading: isToggling }] = useToggleBannerImagesActiveMutation();
    const [addThumbnail, { isLoading: isThumbnailUploading }] = useAddThumbnailMutation();

    const images = data?.data || [];
    const pagination = data?.pagination;
    const activeImages = activeImagesData?.data as BannerImage[] || [];
    const stats = statsData?.data;

    // Debounced search
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        refetch();
    }, [debouncedSearchTerm, currentPage, refetch]);

    // Drag and drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = () => {
        setIsEditing(false);
        setFormData({
            image: "",
            altText: "",
            isActive: false,
            order: 0,
        });
        setImagePreview("");
        setUploadedImages([]);
        setFormModalOpen(true);
    };

    const handleEdit = (image: BannerImage) => {
        setIsEditing(true);
        setFormData({
            image: image.image,
            altText: image.altText,
            isActive: image.isActive,
            order: image.order,
        });
        setImagePreview(image.image);
        setUploadedImages([]);
        setSelectedImage(image);
        setFormModalOpen(true);
    };

    const handleDelete = (image: BannerImage) => {
        setSelectedImage(image);
        setDeleteModalOpen(true);
    };

    // Handle image file upload (multiple)
    const handleImageUpload = async (files: FileList) => {
        try {
            setIsUploadingImage(true);
            const uploadedUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('image', file);

                const response = await addThumbnail(formData).unwrap();

                if (response.success && response.data && response.data[0]) {
                    const fileUrl = response.data[0];
                    uploadedUrls.push(fileUrl);
                }
            }

            if (uploadedUrls.length > 0) {
                // If editing, only update the first image
                if (isEditing) {
                    const fileUrl = uploadedUrls[0];
                    setFormData(prev => ({ ...prev, image: fileUrl }));
                    setImagePreview(fileUrl);
                    toast.success('Image uploaded successfully!');
                } else {
                    // For new upload, store all uploaded URLs
                    setUploadedImages(prev => [...prev, ...uploadedUrls]);
                    // Set the first image as the main image
                    if (!formData.image && uploadedUrls.length > 0) {
                        setFormData(prev => ({ ...prev, image: uploadedUrls[0] }));
                        setImagePreview(uploadedUrls[0]);
                    }
                    toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload failed. Please try again.');
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            // Check if all files are images
            const allImages = Array.from(files).every(file => file.type.startsWith('image/'));
            if (allImages) {
                handleImageUpload(files);
            } else {
                toast.error('Please upload image files only');
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleImageUpload(files);
        }
    };

    const handleToggleActive = async (image: BannerImage) => {
        try {
            const newStatus = !image.isActive;
            await updateImage({
                id: image.id,
                isActive: newStatus,
            }).unwrap();
            toast.success(`Image ${newStatus ? 'activated' : 'deactivated'} successfully!`);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to toggle image status");
        }
    };

    const handleSubmit = async () => {
        try {
            if (!formData.image) {
                toast.error("Image URL is required");
                return;
            }

            if (isEditing && selectedImage) {
                await updateImage({
                    id: selectedImage.id,
                    image: formData.image,
                    altText: formData.altText,
                    isActive: formData.isActive,
                    order: formData.order,
                }).unwrap();
                toast.success("Banner image updated successfully!");
            } else {
                // Create multiple images if multiple uploaded
                if (uploadedImages.length > 1) {
                    // Create each uploaded image
                    for (const imageUrl of uploadedImages) {
                        await createImage({
                            image: imageUrl,
                            altText: formData.altText || `Banner ${uploadedImages.indexOf(imageUrl) + 1}`,
                            isActive: false,
                            order: 0,
                        }).unwrap();
                    }
                    toast.success(`${uploadedImages.length} banner images created successfully!`);
                } else {
                    // Create single image
                    await createImage({
                        image: formData.image,
                        altText: formData.altText,
                        isActive: formData.isActive,
                        order: formData.order,
                    }).unwrap();
                    toast.success("Banner image created successfully!");
                }
            }

            setFormModalOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to save banner image");
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedImage) return;

        try {
            await deleteImage(selectedImage.id).unwrap();
            toast.success("Banner image deleted successfully!");
            setDeleteModalOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete banner image");
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = images.findIndex((item) => item.id === active.id);
            const newIndex = images.findIndex((item) => item.id === over.id);
            const newOrder = arrayMove(images, oldIndex, newIndex);

            // Update order in database
            newOrder.forEach(async (item, index) => {
                try {
                    await updateImage({
                        id: item.id,
                        order: index,
                    }).unwrap();
                } catch (error) {
                    console.error("Failed to update order:", error);
                }
            });

            refetch();
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading banner images...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Home Banner Images
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your home page banner images. Toggle the &quot;Banner Show&quot; switch to activate/deactivate images.
                        </p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="px-5 cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        Add Image
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Images</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Active Images</p>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Inactive Images</p>
                                <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <XCircle className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Images Preview */}
            {activeImages.length > 0 && (
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-blue-600" />
                            <h3 className="text-sm font-semibold text-gray-700">Active Banner Images (Banner Show)</h3>
                        </div>
                        <span className="text-xs text-gray-500">{activeImages.length} image(s) active</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {activeImages.map((image) => (
                            <div key={image.id} className="relative group">
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200">
                                    <Image
                                        src={image.image}
                                        alt={image.altText}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs text-center px-2">{image.altText}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by alt text..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setCurrentPage(1);
                        }}
                        className="px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>
                </div>

                {searchTerm && images.length > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                        Found {pagination?.totalItems || images.length} result(s) for &quot;{searchTerm}&quot;
                    </div>
                )}
                {searchTerm && images.length === 0 && !isLoading && (
                    <div className="mt-2 text-sm text-yellow-600">
                        No results found for &quot;{searchTerm}&quot;
                    </div>
                )}
            </div>

            {/* Banner Images Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-12">Order</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-12">#</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">URL</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Banner Show</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Added On</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {images.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <ImageIcon className="w-12 h-12 text-gray-400" />
                                                <p className="text-gray-500">
                                                    {searchTerm ? `No banner images found for "${searchTerm}"` : "No banner images found"}
                                                </p>
                                                {!searchTerm && (
                                                    <button
                                                        onClick={handleAdd}
                                                        className="mt-2 cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Add your first banner image
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <SortableContext
                                        items={images.map(item => item.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {images.map((image: BannerImage, index: number) => (
                                            <SortableItem
                                                key={image.id}
                                                image={image}
                                                index={index}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                onToggle={handleToggleActive}
                                                isActive={image.isActive}
                                            />
                                        ))}
                                    </SortableContext>
                                )}
                            </tbody>
                        </table>
                    </DndContext>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {((pagination.currentPage - 1) * itemsPerPage) + 1} to{" "}
                            {Math.min(pagination.currentPage * itemsPerPage, pagination.totalItems)} of {pagination.totalItems} images
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                                disabled={currentPage === pagination.totalPages}
                                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal with Multiple Image Upload */}
            {formModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <ImageIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {isEditing ? "Edit Banner Image" : "Add Banner Image"}
                                </h3>
                            </div>
                            <button
                                onClick={() => setFormModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Image Upload Area */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Image {!isEditing && "(Multiple)"} *
                                </label>
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    className={cn(
                                        "relative border-2 border-dashed rounded-lg p-6 transition-all duration-200",
                                        formData.image
                                            ? "border-green-300 bg-green-50"
                                            : "border-gray-300 hover:border-blue-400 bg-gray-50"
                                    )}
                                >
                                    {formData.image ? (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={formData.image}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Image Uploaded
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {!isEditing && uploadedImages.length > 1 ? `${uploadedImages.length} images uploaded` : 'Click to replace'}
                                                    </p>
                                                </div>
                                            </div>
                                            {!isEditing && uploadedImages.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                        {uploadedImages.length} images
                                                    </span>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, image: "" }));
                                                    setImagePreview("");
                                                    setUploadedImages([]);
                                                }}
                                                className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                            >
                                                <X className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="mx-auto w-10 h-10 text-gray-400 mb-3" />
                                            <p className="text-sm text-gray-600">
                                                Drag & drop or{' '}
                                                <label className="text-blue-500 hover:text-blue-600 cursor-pointer font-medium">
                                                    browse
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileSelect}
                                                        disabled={isUploadingImage || isThumbnailUploading}
                                                        multiple={!isEditing}
                                                    />
                                                </label>
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {!isEditing ? 'Select multiple images (JPG, PNG, WEBP)' : 'JPG, PNG, WEBP (Max 10MB)'}
                                            </p>
                                        </div>
                                    )}
                                    {(isUploadingImage || isThumbnailUploading) && (
                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                        </div>
                                    )}
                                </div>
                                {formData.image && (
                                    <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Image uploaded successfully
                                    </p>
                                )}
                                {!isEditing && uploadedImages.length > 1 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {uploadedImages.map((url, index) => (
                                            <div key={index} className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200">
                                                <Image
                                                    src={url}
                                                    alt={`Upload ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}

                            {/* Alt Text Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alt Text
                                </label>
                                <input
                                    type="text"
                                    value={formData.altText}
                                    onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                                    placeholder="Enter alt text for accessibility"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    This text will be used for accessibility and SEO
                                </p>
                            </div>

                            {!isEditing && uploadedImages.length > 1 && (
                                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                                    <p className="text-sm text-blue-700">
                                        <CheckCircle className="w-4 h-4 inline mr-1" />
                                        {uploadedImages.length} images will be created with this alt text
                                    </p>
                                </div>
                            )}

                            {/* Active Checkbox */}
                            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    disabled={!isEditing && uploadedImages.length > 1}
                                />
                                <label htmlFor="isActive" className="text-sm text-gray-700 cursor-pointer">
                                    Set as active immediately
                                </label>
                            </div>

                            {!isEditing && uploadedImages.length > 1 && (
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 border border-yellow-200">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-700">
                                        Multiple images will be created as inactive. You can activate them individually using the &quot;Banner Show&quot; toggle.
                                    </p>
                                </div>
                            )}

                            {formData.isActive && (
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 border border-yellow-200">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-700">
                                        This will deactivate all other banner images. You can have multiple active images.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setFormModalOpen(false)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isCreating || isUpdating || !formData.image}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {(isCreating || isUpdating) && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                {isEditing ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && selectedImage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Delete Banner Image
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this banner image?
                                {selectedImage.isActive && " This image is currently active and will be removed from the homepage."}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



