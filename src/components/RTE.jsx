
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line react/prop-types
const RTE = ({name, control, label, defaultValue=''}) => {
  return (
    <div className="w-full">
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || 'content'}
        control={control}
        render={({field: {onChange}}) => (
            <Editor
            apiKey='6zq2k6d7x1c0j8k5q2q1u0x5v2x6k7z1q2x3w9f6m0v8z5q6'
            initialValue={defaultValue}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
            />
            
        )}></Controller>
    </div>
  )
}

export default RTE