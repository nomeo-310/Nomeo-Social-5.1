import React from 'react'
import Card from '@/components/Card';
import ImageAvatar from '@/components/ImageAvatar';
import { BsBriefcase, BsGeoAlt, BsPerson} from 'react-icons/bs';
import FollowButton from '@/components/FollowButton';
import { followDataProps, rawUserData } from '@/types';
import AnimationWrapper from '@/components/AnimationWrapper';

type friendCardsProps = {
  currentUser: any
  user: followDataProps
  index: number
}

const FriendCard = ({currentUser, user, index}: friendCardsProps) => {
  return (
    <AnimationWrapper key={index} transition={{duration: 1, delay: index*0.5}} keyValue={`${index}`} className='border-b last:border-b-0'>
      <div className='flex gap-4 items-start p-3 lg:p-4'>
        <div>
          <ImageAvatar className='rounded-md w-24 h-24 cursor-pointer hover:opacity-75' imageSrc={user.image}/>
        </div>
        <div className="grow">
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex gap-2 text-gray-400 capitalize items-center'>
              <BsBriefcase size={18}/>
              Occupation : {user.occupation}
            </div>
            <div className='flex gap-2 text-gray-400 capitalize items-center'>
              <BsGeoAlt size={18}/>
              Location : {user.state}, {user.country}.
            </div>
            <div className='w-full flex flex-col md:flex-row justify-between'>
              <div className='flex gap-2 text-gray-400 capitalize items-center'>
                <BsPerson size={18}/>
                Name : {user.name}
              </div>
              <div>
                <FollowButton currentUser={currentUser} userId={user._id} className='md:-mt-4 mb-0'/>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </AnimationWrapper>
  )
}

export default FriendCard;