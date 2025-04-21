// @ts-nocheck

'use client'
// import React from 'react';
import { useGetCalls } from '@/hooks/useGetCalls'
import {CallRecording} from '@stream-io/video-react-sdk';
import {useRouter} from 'next/navigation';
import { useState} from 'react';
import MeetingCard from './Meetingcard';

const  CallList = ( { type }: {type: 'ended' | 'upcoming' | 'recordings'}) => {
  const {endedCalls, upcomingCalls, callRecordings, isLoading} =useGetCalls();
  const router =useRouter();
  const [recordings, setRecordings] =useState<CallRecording[]>([])


  const { toast } =useToast();

  const getCalls =() => {
    switch(type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  }
  useEffect(() => {
    const fetchRecordings = async () => {
      try{
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    }catch(error){
      toast({title:'Try again later'})
    }
    }

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const getCallgetNoCallsMessage =() => {
    switch(type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No recordings';
      case 'upcoming':
        return 'No upcoming Calls';
      default:
        return '';
    }
  }

  const calls=getCalls();
  const nocallsMessage=getNoCallsMessage();

  if(isLoading) return <Loader />

  return (
    //when u want to make a card on one another or next to another use grid
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length>0 ? calls.map((meeting:Call | CallRecording)=>(
        <MeetingCard 
        key={(meeting as Call).id}
        icon={
          type==='ended'
          ? '/icons/previous.svg'
          :type ==='upcoming'
          ? '/icons/upcoming.svg'
          : '/icons/recordings.svg'
        }
        title={(meeting as Call).state?.custom?.description?.substring(0,20) || meeting?.filename?.substring(0,20)|| 'No description'}
        date ={
          (meeting as Call).state?.startsAt?.toLocaleString() ||
          (meeting as CallRecording).start_time?.toLocaleString()
        }
        isPreviousMeeting={Type==='ended'}
        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
        handleClick={
          type === 'recordings'
            ? () => router.push(`${(meeting as CallRecording).url}`)
            : () => router.push(`/meeting/${(meeting as Call).id}`)
        }
        link={
          type === 'recordings'
            ? (meeting as CallRecording).url
            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
        }
        buttonText={type === 'recordings' ? 'Play' : 'Start'}
        />
      )):(
        <h1>{nocallsMessage}</h1>
      )} 
       
    </div>
  );
}

export default CallList;
