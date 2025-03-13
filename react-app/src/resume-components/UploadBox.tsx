import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './UploadBox.module.css';

interface UploadBoxProps {
    onFileUpload: (file: File) => void;
    acceptedFileTypes?: string[];
    maxSize?: number;
}

const UploadBox: React.FC<UploadBoxProps> = ({
    onFileUpload,
    acceptedFileTypes = ['.pdf', 'application/pdf'],
    maxSize = 5242880 // 5MB
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            onFileUpload(file);
        }
    }, [onFileUpload]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections
    } = useDropzone({
        onDrop,
        accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
        maxSize,
        multiple: false
    });

    const getUploadBoxStyle = () => {
        if (isDragReject) return `${styles.uploadBox} ${styles.reject}`;
        if (isDragActive) return `${styles.uploadBox} ${styles.active}`;
        return styles.uploadBox;
    };

    const getErrorMessage = () => {
        if (fileRejections.length > 0) {
            const { errors } = fileRejections[0];
            if (errors[0]?.code === 'file-too-large') {
                return `File is too large. Max size is ${maxSize / 1024 / 1024}MB`;
            }
            if (errors[0]?.code === 'file-invalid-type') {
                return 'Please upload a PDF file';
            }
            return errors[0]?.message || 'Invalid file';
        }
        return null;
    };

    return (
        <div className={styles.uploadBoxContainer}>
            <div
                {...getRootProps()}
                className={getUploadBoxStyle()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDrop={() => setIsDragging(false)}
            >
                <input {...getInputProps()} />
                <div className={styles.uploadContent}>
                    <div className={styles.uploadIcon}>
                        {isDragActive ? '📄' : '📁'}
                    </div>
                    <div className={styles.uploadText}>
                        <p className={styles.primaryText}>
                            {isDragActive
                                ? 'Drop your resume here'
                                : 'Drag & drop your resume here'}
                        </p>
                        <p className={styles.secondaryText}>
                            or <span className={styles.browseText}>browse files</span>
                        </p>
                        <p className={styles.fileInfo}>
                            Accepts PDF files up to {maxSize / 1024 / 1024}MB
                        </p>
                    </div>
                </div>
            </div>
            {getErrorMessage() && (
                <div className={styles.uploadError}>
                    {getErrorMessage()}
                </div>
            )}
        </div>
    );
};

export default UploadBox; 