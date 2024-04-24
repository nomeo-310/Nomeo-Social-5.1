'use client'


import React from 'react'
import Card from '@/components/Card'
import Image from 'next/image'
import { LuImagePlus } from "react-icons/lu";
import { toast } from 'sonner'
import { uploadImage } from '@/hooks/uploadImage'
import { UnControlledInput } from '@/components/Inputs'
import { BsAt, BsBriefcase, BsEnvelope, BsFacebook, BsGeoAlt, BsGlobe2, BsInstagram, BsPerson, BsTwitter, BsUpload } from 'react-icons/bs'
import TextArea from '@/components/TextArea';
import { rawUserData } from '@/types';
import { HiCloudArrowUp, HiXMark } from 'react-icons/hi2';
import { deleteImageOnCloudinary } from '@/actions/data.actions';
import { updateProfile } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';

type editProileProps = {
  currentUser:rawUserData
}

const EditProfileClient = ({currentUser}: editProileProps) => {

  const router = useRouter();

  const [profileImageFile, setProfileImageFile] = React.useState<File | null>(null);
  const [isNewProfileImage, setIsNewProfileImage] =React.useState(false);
  const [isNewCoverImage, setIsNewCoverImage] =React.useState(false);
  const [coverImageFile, setCoverImageFile] = React.useState<File | null>(null);
  const [newProfileImage, setNewProfileImage] = React.useState(currentUser.profileImage);
  const [newCoverImage, setNewCoverImage] = React.useState(currentUser.coverImage);
  const [newUsername, setNewUserName] = React.useState(currentUser?.username);
  const [newOccupation, setNewOccupation] = React.useState(currentUser?.occupation);
  const [newCity, setNewCity] = React.useState(currentUser?.state);
  const [newBio, setNewBio] = React.useState(currentUser?.bio);
  const [newCountry, setNewCountry] = React.useState(currentUser?.country);
  const [newFacebookUrl, setNewFacebookUrl] = React.useState(currentUser?.facebookUrl);
  const [newTwitterUrl, setNewTwitterUrl] = React.useState(currentUser?.twitterUrl);
  const [newInstagramUrl, setNewInstagramUrl] = React.useState(currentUser?.instagramUrl);
  const [newPersonalWebsite, setNewPersonalWebsite] = React.useState(currentUser?.personalWebsite);
  const [isLoading, setIsLoading] =React.useState(false);


  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage({...newProfileImage, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCoverImage({...newCoverImage, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfileImage = async () => {
    let loadingImageToast = toast.loading("...Uploading profile image");

    try {
      const data = await uploadImage(profileImageFile);
      const imageUrls = { public_id: data?.public_id, secure_url: data?.secure_url};
      setNewProfileImage(imageUrls);
      setIsNewProfileImage(true);
      toast.dismiss(loadingImageToast);
      toast.success("Image successfully uploaded");
    } catch (error) {
      toast.dismiss(loadingImageToast);
      toast.error("Error uploading image");
    }
  };

  const handleUploadCoverImage = async () => {
    let loadingImageToast = toast.loading("...Uploading cover image");

    try {
      const data = await uploadImage(coverImageFile);
      const imageUrls = { public_id: data?.public_id, secure_url: data?.secure_url};
      setNewCoverImage(imageUrls);
      setIsNewCoverImage(true);
      toast.dismiss(loadingImageToast);
      toast.success("Image successfully uploaded");
    } catch (error) {
      toast.dismiss(loadingImageToast);
      toast.error("Error uploading image");
    }
  };

  const deleteUploadedProfileImage = async () => {
    await deleteImageOnCloudinary(newProfileImage.public_id);
    setProfileImageFile(null);
    setNewProfileImage({...newProfileImage, secure_url: ''})
  }

  const deleteUploadedCoverImage = async() => {
    await deleteImageOnCloudinary(newCoverImage.public_id);
    setCoverImageFile(null);
    setNewCoverImage({...newProfileImage, secure_url: ''})
  }

  const updateData = {
    userId: currentUser._id,
    username: newUsername,
    bio : newBio,
    state: newCity,
    country: newCountry,
    occupation: newOccupation,
    coverImage: newCoverImage,
    profileImage: newProfileImage,
    facebookUrl: newFacebookUrl,
    twitterUrl: newTwitterUrl,
    instagramUrl: newInstagramUrl,
    personalWebsite: newPersonalWebsite,
    isNewCoverImage: isNewCoverImage,
    isNewProfileImage: isNewProfileImage
  }

  const resetField = () => {
    setProfileImageFile(null);
    setNewProfileImage({...newProfileImage, secure_url: ''});
    setCoverImageFile(null);
    setNewCoverImage({...newCoverImage, secure_url: ''});
  }

  const updateUserProfile = async() => {

    if (profileImageFile && !newProfileImage.public_id) {
      toast.error('Upload your profile image')

      return;
    }

    if (coverImageFile && !newCoverImage.public_id) {
      toast.error('Upload your cover image')

      return;
    }

    setIsLoading(true)
    try {
      const response = await updateProfile(updateData);

      if (response?.success) {
        toast.success(response.success);
        setIsLoading(false);
        resetField();
        router.push(`/profile/${currentUser._id}`)
      }

      if (response?.error) {
        toast.error(response.error)
        setIsLoading(false);
      }
      
    } catch (error) {
      toast.error('Internal server error')
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <Card className='p-0 lg:p-0 overflow-hidden'>
        <div className='relative'>
          <label htmlFor='uploadCoverImage' className="w-full relative bg-gray-300 rounded-md aspect-video lg:h-72 h-52 flex items-center justify-center cursor-pointer">
            { newCoverImage.secure_url ? (
              <Image src={newCoverImage.secure_url} alt="profile_image" fill className='object-cover' priority />) : 
              (<Image src={"/images/defaultCoverImage.jpg"} alt="profile_image" fill className='object-cover' priority />
            )}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-black/50 opacity-0 hover:opacity-100 cursor-pointer">
              <LuImagePlus className="text-5xl" />
            </div>
            <input id="uploadCoverImage" type="file" accept=".png, .jpg, .jpeg"  hidden  className="cursor-pointer"  onChange={handleCoverImageChange} />
          </label>
          <div className='absolute right-3 bottom-3 flex items-center justify-end gap-3'>
            {newCoverImage.public_id && coverImageFile &&
              <button className='relative z-10 p-3 bg-red-500 text-white rounded-full' onClick={deleteUploadedCoverImage}>
                <HiXMark size={20}/>
              </button>}
            <button className='relative z-10 p-3 bg-green-600 text-white rounded-full' onClick={handleUploadCoverImage}>
              <HiCloudArrowUp size={20}/>
            </button>
          </div>
        </div>
        <div className="-mt-16 md:-mt-16 lg:-mt-28 p-4 flex items-end lg:items-center gap-3 relative">
          <div className='flex justify-center flex-col'>
            <label htmlFor="uploadProfileImage" className="cursor-pointer">
                <div className="relative bg-grey overflow-hidden lg:w-40 lg:h-40 w-32 h-32 rounded-full flex items-center justify-center">
                  {newProfileImage.secure_url ? (
                    <Image src={newProfileImage.secure_url} alt="profile_image" fill/>) : 
                    (<Image src={currentUser.image ? currentUser.image : "/images/default_user.png"} alt="profile_image" fill/>
                  )}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-black/50 opacity-0 hover:opacity-100 cursor-pointer">
                    <LuImagePlus className="text-5xl" />
                  </div>
                </div>
                <input id="uploadProfileImage" type="file" accept=".png, .jpg, .jpeg"  hidden  className="cursor-pointer"  onChange={handleProfileImageChange} />
            </label>
            <div className="mt-3 relative z-10 flex items-center gap-4 justify-center">
            { newProfileImage.public_id && profileImageFile &&
              <button className='p-3 bg-red-500 text-white rounded-full' onClick={deleteUploadedProfileImage}>
                <HiXMark size={20}/>
              </button>
            }
              <button className='p-3 bg-green-600 text-white rounded-full' onClick={handleUploadProfileImage}>
                <HiCloudArrowUp size={20}/>
              </button>
            </div>
          </div>
          <div className='grow w-full flex gap-3 lg:gap-4 flex-col lg:flex-row lg:mt-24'>
            <UnControlledInput
              type='text'
              value={currentUser?.name}
              disabled
              containerStyle='w-full mb-0'
              inputElementStyle='disabled:bg-gray-100 disabled:text-gray-500 capitalize'
              icon={BsPerson} 
              id='fullname'           
            />
            <UnControlledInput
              type='email'
              value={currentUser?.email}
              disabled
              containerStyle='w-full mb-0'
              inputElementStyle='disabled:bg-gray-100 disabled:text-gray-500'
              icon={BsEnvelope}
              id='email' 
            />
          </div>
        </div>
      </Card>
      <h2 className='lg:text-2xl text-xl mb-3'>Personal details:</h2>
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UnControlledInput
            containerStyle='mb-0'
            id='username'
            type='text'
            value={newUsername}
            onChange={(event) => setNewUserName(event.target.value)}
            icon={BsAt}
            inputElementStyle='bg-gray-200'
            placeholder='add your new username'
          />
          <UnControlledInput
            containerStyle='mb-0'
            id='occupation'
            type='text'
            value={newOccupation}
            onChange={(event) => setNewOccupation(event.target.value)}
            icon={BsBriefcase}
            inputElementStyle='bg-gray-200'
            placeholder='add your new occupation'
          />
          <UnControlledInput
            containerStyle='mb-0'
            id='city'
            type='text'
            value={newCity}
            onChange={(event) => setNewCity(event.target.value)}
            icon={BsGeoAlt}
            inputElementStyle='bg-gray-200'
            placeholder='add your new state'
          />
          <UnControlledInput
            containerStyle='mb-0'
            id='country'
            type='text'
            value={newCountry}
            onChange={(event) => setNewCountry(event.target.value)}
            icon={BsGeoAlt}
            inputElementStyle='bg-gray-200'
            placeholder='add country'
          />
        </div>
      </Card>
      <h2 className='lg:text-2xl text-xl mb-3'>Social media links:</h2>
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UnControlledInput
            containerStyle='mb-0'
            id='facebook'
            type='text'
            value={newFacebookUrl}
            onChange={(event) => setNewFacebookUrl(event.target.value)}
            icon={BsFacebook}
            inputElementStyle='bg-gray-200'
            placeholder='add your new facebook url'
          />
          <UnControlledInput
            containerStyle='mb-0'
            id='instagram'
            type='text'
            value={newInstagramUrl}
            onChange={(event) => setNewInstagramUrl(event.target.value)}
            icon={BsInstagram}
            inputElementStyle='bg-gray-200'
            placeholder='add your new instagram url'
          />
          <UnControlledInput
            containerStyle='mb-0'
            id='twitter'
            type='text'
            value={newTwitterUrl}
            onChange={(event) => setNewTwitterUrl(event.target.value)}
            icon={BsTwitter}
            inputElementStyle='bg-gray-200'
            placeholder='add your new twitter url'
          />
          <UnControlledInput
            containerStyle='mb-0'
            id='website'
            type='text'
            value={newPersonalWebsite}
            onChange={(event) => setNewPersonalWebsite(event.target.value)}
            icon={BsGlobe2}
            inputElementStyle='bg-gray-200'
            placeholder='add your personal website url'
          />
        </div>
      </Card>
      <h2 className='lg:text-2xl text-xl mb-3'>Bio:</h2>
      <Card>
        <TextArea
          className='bg-gray-200 h-[120px] lg:h-[90px] placeholder:text-black'
          value={newBio}
          onChange={(event) => setNewBio(event.target.value)}
          placeholder='add your bio'
        />
      </Card>
      <button className='px-8 py-3 bg-green-600 text-white mt-8 rounded-full' onClick={updateUserProfile}>
        {isLoading ? 'Updating profile...' : 'Update profile'}
      </button>
    </React.Fragment>
  )
}

export default EditProfileClient