import { Icon } from '@iconify/react/dist/iconify.js';
import { Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, ReactNode } from 'react';

const { Dragger } = Upload;

interface Props {
  label?: string
  description?: string | ReactNode
  name?: string
  beforeUpload?: (file: RcFile) => boolean
}
const FileUpload: FC<Props> = ({ label, description, name, beforeUpload }) => {
  return (
    <div className='flex flex-col gap-1'>
      {label}
      <Dragger multiple={false} name={name} beforeUpload={beforeUpload}>
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