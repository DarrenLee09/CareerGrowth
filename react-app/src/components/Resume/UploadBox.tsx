import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Resume.css';

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
        if (isDragReject) return 'upload-box reject';
        if (isDragActive) return 'upload-box active';
        return 'upload-box';
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
        <div className="upload-box-container">
            <div
                {...getRootProps()}
                className={getUploadBoxStyle()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDrop={() => setIsDragging(false)}
            >
                <input {...getInputProps()} />
                <div className="upload-content">
                    <div className="upload-icon">
                        {isDragActive ? '📄' : '📁'}
                    </div>
                    <div className="upload-text">
                        <p className="primary-text">
                            {isDragActive
                                ? 'Drop your resume here'
                                : 'Drag & drop your resume here'}
                        </p>
                        <p className="secondary-text">
                            or <span className="browse-text">browse files</span>
                        </p>
                        <p className="file-info">
                            Accepts PDF files up to {maxSize / 1024 / 1024}MB
                        </p>
                    </div>
                </div>
            </div>
            {getErrorMessage() && (
                <div className="upload-error">
                    {getErrorMessage()}
                </div>
            )}
        </div>
    );
};

export default UploadBox; 