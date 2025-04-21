"use client"

import {useCall,useCallStateHooks} from '@stream-io/video-react-sdk';
import { Button } from "@/components/ui/button"; // ✅ Correct path depending on your project structure
import { useRouter } from 'next/navigation';



import React from 'react'

const EndCallButton = () =>{
    const call=useCall();

    const {useLocalParticipant} =useCallStateHooks();
    const localParticipant =useLocalParticipant();
    const router = useRouter();
    
    const isMeetingOnwer = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if(!isMeetingOnwer)  return null;

    return (
        <Button 
        onClick={ async ()=>{
            await call?.endCall();
            router.push('/');
        }} 
        className="bg-red-500">
        End call for everyone 
        </Button>
    );
        // <div>EndCallButton</div>
    
};
export default EndCallButton;