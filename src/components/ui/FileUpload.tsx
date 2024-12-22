import { Icon } from '@iconify/react/dist/iconify.js';
import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { HttpRequestHeader } from 'antd/es/upload/interface';
import { FC, ReactNode } from 'react';

const { Dragger } = Upload;

interface Props {
  label?: string | ReactNode
  description?: string | ReactNode
  name?: string
  beforeUpload?: (file: RcFile) => boolean
  multiple?: boolean
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
  action?: string
  headers?: HttpRequestHeader
}
const FileUpload: FC<Props> = ({ label, description, name, beforeUpload, multiple = false, onChange, headers, action }) => {
  return (
    <div className='flex flex-col gap-1'>
      {label}
      <Dragger headers={headers} action={action} multiple={multiple} name={name} beforeUpload={beforeUpload} onChange={onChange}>
        <Icon icon="ic:outline-cloud-upload" className='text-4xl text-primary-main mx-auto' />
        <p className="text-sm text-slate-800">Drag your file(s) or <span className='text-primary-main font-semibold'>browse</span></p>
        <p className="text-sm text-slate-600">
          {description}
        </p>
      </Dragger>
    </div>
  );
};

export default FileUpload;