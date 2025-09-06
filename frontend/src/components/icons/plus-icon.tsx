interface PlusIconProps {
    className?: string
    size?: number
}

export default function PlusIcon({ className = "w-6 h-6", size }: PlusIconProps) {
    const sizeStyle = size ? { width: size, height: size } : {}

    return (
        <svg className={className} style={sizeStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    )
}
