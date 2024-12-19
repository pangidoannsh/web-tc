export const inputLabel = (label: string, required: boolean = true) => (
    <div className='flex gap-2 items-center'>
        {required && <span className='text-red-500'>*</span>}
        <span className='font-medium'>{label}</span>
    </div>
)