export const inputLabel = (label: string) => (
    <div className='flex gap-2 items-center'>
        <span className='text-red-500 text-2xl'>*</span>
        <span className='font-medium'>{label}</span>
    </div>
)