import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageDropZoneProps {
    value: string;
    onChange: (dataUrl: string) => void;
    label?: string;
    maxSizeMB?: number;
    className?: string;
}

export const ImageDropZone: React.FC<ImageDropZoneProps> = ({
    value,
    onChange,
    label = 'Image',
    maxSizeMB = 5,
    className = '',
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processFile = useCallback((file: File) => {
        setError(null);

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file (JPG, PNG, WEBP, etc.)');
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size exceeds ${maxSizeMB}MB limit.`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            onChange(reader.result as string);
        };
        reader.onerror = () => {
            setError('Failed to read file. Please try again.');
        };
        reader.readAsDataURL(file);
    }, [maxSizeMB, onChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
        // Reset so the same file can be selected again
        e.target.value = '';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
        setError(null);
    };

    return (
        <div className={className}>
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {value ? (
                /* Preview state */
                <div className="relative group">
                    <div className="h-40 w-full rounded-lg bg-dark border border-white/10 overflow-hidden">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={() => setError('Failed to load image preview.')}
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition-colors"
                            title="Replace image"
                        >
                            <Upload size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-500 backdrop-blur-sm transition-colors"
                            title="Remove image"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                /* Drop zone state */
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
            relative flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed cursor-pointer transition-all
            ${isDragging
                            ? 'border-gold bg-gold/10 scale-[1.02]'
                            : 'border-white/10 hover:border-gold/50 hover:bg-gold/5'
                        }
          `}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${isDragging ? 'bg-gold/20' : 'bg-dark border border-white/10'}`}>
                        <ImageIcon className={`${isDragging ? 'text-gold' : 'text-gray-500'}`} size={20} />
                    </div>
                    <p className="text-sm text-gray-400">
                        {isDragging ? (
                            <span className="text-gold font-medium">Drop image here</span>
                        ) : (
                            <>
                                <span className="text-gold font-medium">Click to upload</span> or drag & drop
                            </>
                        )}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">JPG, PNG, WEBP up to {maxSizeMB}MB</p>
                </div>
            )}

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};
