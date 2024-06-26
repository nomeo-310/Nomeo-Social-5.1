'use client'

import Card from '@/components/Card';
import React from 'react'
import FriendCard from './FriendCard';
import { followDataProps, rawUserData, userFriends } from '@/types';
import EmptyState from '@/components/EmptyState';

type friendClientProps = {
  friends: any
  suggestedFriends: followDataProps[]
  currentUser:rawUserData | null
}

const FriendClient = ({friends, suggestedFriends, currentUser}: friendClientProps) => {
  const [friendState, setFriendState] = React.useState('followers');

  return (
    <React.Fragment>
      <div className="sticky md:top-4 top-20 z-30 bg-white">
        <h2 className='lg:text-6xl text-4xl font-bold text-gray-400 mb-4'>Friends</h2>
        <Card className='w-fit py-3 px-6 rounded-full flex gap-3 cursor-pointer'>
          <div onClick={() => setFriendState('followers')} className={friendState === 'followers' ? 'text-green-600 font-semibold flex items-center gap-6': 'flex items-center gap-6'}>
            Followers
            {friends?.followers && friends.followers.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-green-600'>{friends.followers.length}</span>}
          </div>
          <div className={friendState === 'followings' ? 'text-green-600 font-semibold border-l pl-3 flex items-center gap-6': 'border-l pl-3 flex items-center gap-6'} onClick={() => setFriendState('followings')}>
            Followings
            {friends?.followings && friends.followings.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-green-600'>{friends.followings.length}</span>}
          </div>
          <div className={friendState === 'suggested' ? 'text-green-600 font-semibold border-l pl-3 flex items-center gap-6': 'border-l pl-3 flex items-center gap-6'} onClick={() => setFriendState('suggested')}>
            Suggested
            {suggestedFriends && suggestedFriends?.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-green-600'>{suggestedFriends.length}</span>}
          </div>
        </Card>
      </div>
      { friendState === 'followers' ?
        <React.Fragment>
          { friends?.followers && friends.followers.length == 0 &&
            <EmptyState message='No followers yet'/>
          }
          { friends?.followers && friends.followers.length > 0 && friends.followers.map((follower:followDataProps, index:number) => (
            <FriendCard key={follower._id} currentUser={currentUser} user={follower} index={index}/>
          ))}
        </React.Fragment> :
        friendState === 'followings' ?
        <React.Fragment>
          { friends?.followings && friends.followings.length == 0 &&
            <EmptyState message='No followings yet'/>
          }

          { friends?.followings && friends.followings.length > 0 && friends.followings.map((following:followDataProps, index:number) => (
            <FriendCard key={following._id} currentUser={currentUser} user={following} index={index}/>
          ))}
        </React.Fragment> :
        <React.Fragment>
          { suggestedFriends && suggestedFriends.length == 0 &&
            <EmptyState message='No suggested users yet'/>
          }

          { suggestedFriends && suggestedFriends.length > 0 && suggestedFriends.map((user:followDataProps, index:number) => (
            <FriendCard key={user._id} currentUser={currentUser} user={user} index={index}/>
          ))}
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default FriendClient