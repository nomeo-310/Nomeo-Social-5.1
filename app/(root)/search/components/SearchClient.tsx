'use client'

import React from 'react'
import { UnControlledInput } from '@/components/Inputs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { rawUserData } from '@/types'
import EmptyState from '@/components/EmptyState'
import FriendCard from '../../friends/components/FriendCard'

const SearchClient = ({searchResults, currentUser}:{searchResults:rawUserData[], currentUser:rawUserData}) => {
  const [queryText, setQueryText] = React.useState('')
  const router = useRouter();

  React.useEffect(() => {

    const delayDebounceFn = setTimeout(() => {
      if (queryText) {
        router.push(`/search?query=` + queryText);
      } else {
        router.push('/search');
      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [queryText, router]);

  return (
    <React.Fragment>
      <div className="sticky md:top-4 top-20 z-30 bg-white">
        <h2 className='lg:text-6xl text-4xl font-bold text-gray-400 mb-4'>Search</h2>
        <div className="w-full">
          <UnControlledInput
            type='text'
            id='queryText'
            value={queryText}
            onChange={(event) => setQueryText(event.target.value)}
            placeholder='Search for users with name, username...'
            inputElementStyle='bg-gray-200 lg:text-lg rounded-full bg-gray-200'
            icon={HiMagnifyingGlass}
          />
        </div>
      </div>
      {searchResults && searchResults.length === 0 && 
        <EmptyState message='No user with that name or username exists in the database.'/>
      }
      { searchResults && searchResults.length > 0 && searchResults.map((item:rawUserData, index:number) => (
        <FriendCard key={index} currentUser={currentUser} index={index} user={item}/>
      ))}
    </React.Fragment>
  )
}

export default SearchClient;