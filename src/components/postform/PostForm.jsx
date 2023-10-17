/* eslint-disable react/prop-types */
import  { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../appwrite/auth';

// eslint-disable-next-line react/prop-types
const PostForm = ({ post }) => {
  const { register, handleSubmit, control, watch, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || '',
        content: post?.content || '',
        slug: post?.slug || '',
        status: post?.status || 'active',
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        authService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = appwriteService.uploadFile(data.image[0]);
      //todo check weather file upload is needed or not
      //     const dbPost = await appwriteService.createPost({
      //         ...data,
      //         featuredImage: file.$id,
      // })
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, '-')
        .replace(/\s+/g, '-');
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
        if(name === 'title'){
            const slug = slugTransform(value.title, {shoulValidate: true})
            setValue('slug',slug)
        }
    })
    return () => {
      subscription.unsubscribe()
    }
  },[
    watch,slugTransform,setValue
  ])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        {/* this event sets the value on the slug, and adds the value from slug transform function */}
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            // eslint-disable-next-line react/prop-types
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            // eslint-disable-next-line react/prop-types
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  );
};

export default PostForm;
