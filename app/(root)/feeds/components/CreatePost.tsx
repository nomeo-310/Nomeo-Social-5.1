'use client'

import React from 'react'
import Card from '@/components/Card'
import ImageAvatar from '@/components/ImageAvatar'
import TextArea from '@/components/TextArea'
import { HiCloudArrowUp, HiOutlineFaceSmile, HiOutlineMapPin, HiOutlinePhoto, HiXMark } from 'react-icons/hi2'
import Image from 'next/image'
import { rawUserData } from '@/types'
import { toast } from 'sonner'
import { uploadImage } from '@/hooks/uploadImage'
import { deleteImageOnCloudinary } from '@/actions/data.actions'
import { createPost } from '@/actions/post.action'

type createPostProps = {
  currentUser: rawUserData
}

const CreatePost = ({currentUser}: createPostProps) => {

  const [textContent, setTextContent] = React.useState('');
  const [imageSelected, setImageSelected] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageUrls, setImageUrls] = React.useState({public_id: '', secure_url: ''});
  const [location, setLocation] = React.useState('');
  const [checkedIn, setCheckedIn] = React.useState(false);
  const [mood, setMood] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageSelected(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrls({...imageUrls, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImageFile = async() => {
    let loadingImageToast = toast.loading("...Uploading post image");

    try {
      const data = await uploadImage(imageFile);
      const imageUrls = { public_id: data?.public_id, secure_url: data?.secure_url};
      setImageUrls(imageUrls);
      toast.dismiss(loadingImageToast);
      toast.success("Post image successfully uploaded");
    } catch (error) {
      toast.dismiss(loadingImageToast);
      toast.error("Error uploading image");
    }
  }

  const cancel = () => {

    if (imageUrls.public_id !== '') {
      deleteImageOnCloudinary(imageUrls.public_id)
    }

    setImageFile(null);
    setImageUrls({...imageUrls, secure_url: ''});
    setImageSelected(false);
  }

  const resetField = () => {
    setTextContent('')
    setImageFile(null);
    setImageUrls({...imageUrls, secure_url: ''});
    setImageSelected(false);
  }

  React.useEffect(() => {
    if (checkedIn) {
      setLocation(`${currentUser?.state}, ${currentUser?.country}`);
    } 

  }, [checkedIn, currentUser?.country, currentUser?.state])

  const postData = {
    postAuthor: currentUser?._id,
    postText: textContent,
    postImage: imageUrls,
    postLocation: location,
    mood: mood,
  };

  const handleCreatePost = async() => {

    if (textContent.length === 0 || textContent === '') {
      toast.error('Text field cannot be empty!')

      return;
    }

    if (imageFile && imageUrls.public_id === '') {
      toast.error('You have not uploaded your post image yet')

      return;
    }

    try {
      setIsLoading(true)
      const response = await createPost(postData)

      if(response.success) {
        toast.success(response.success)
        resetField();
        setIsLoading(false);
      }

      if (response.error) {
        toast.error(response.error)
        setIsLoading(false);
      }

    } catch (error) {
      toast.error('Internal server error')
    }
    setIsLoading(false);

  };

  return (
    <Card className='sticky md:top-4 top-20 z-30'> 
      <div className="flex flex-col">
        {imageUrls.secure_url &&
          <div className="w-full aspect-video relative rounded-md overflow-hidden mb-3">
            <Image src={imageUrls.secure_url} alt='uploadImage' fill />
            <div className="flex gap-4 absolute right-3 bottom-3">
              <button className='p-3 bg-red-500 text-white rounded-full' onClick={cancel}>
                <HiXMark size={20}/>
              </button>
              <button className='px-6 py-2 bg-blue-500 text-white rounded-full' onClick={() =>handleUploadImageFile()}>
                <HiCloudArrowUp size={20}/>
              </button>
            </div>
          </div>
        }
        <div className="flex">
          <div className="w-fit">
            <ImageAvatar imageSrc={currentUser?.image}/>
          </div>
          <TextArea
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
            placeholder={`What's on your mind on your mind ${currentUser?.username}?`}
          />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button className={`flex items-center gap-2 ${mood ? 'text-blue-500 font-semibold' : ''}`} onClick={() => setMood((prevState) => !prevState)}>
              <HiOutlineFaceSmile size={22}/>
              <h2>Mood</h2>
            </button>
            <button className={`flex items-center gap-2 ${checkedIn ? 'text-blue-500 font-semibold' : ''}`} onClick={() => setCheckedIn((prevState) => !prevState)}>
              <HiOutlineMapPin size={22}/>
              <h2>Check in</h2>
            </button>
            <label htmlFor="uploadPostImage" className={`flex items-center gap-2 cursor-pointer ${imageSelected ? 'text-blue-500 font-semibold' : ''}`}>
              <HiOutlinePhoto size={22}/>
              <h2>Image</h2>
              <input id="uploadPostImage" type="file" accept=".png, .jpg, .jpeg"  hidden  className="cursor-pointer"  onChange={handleImageFileChange} />
            </label>
          </div>
          <button className='px-5 py-1.5 rounded-full bg-blue-500 text-white' onClick={handleCreatePost} disabled={isLoading}>{isLoading ? 'Creating post...' : 'Share'}</button>
        </div>
      </div>
    </Card>
  )
}

export default CreatePost