
'use client';
import { tokenProvider } from "@/actions/stream.actions";
//import Loader from '@/components/Loader';
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from '@clerk/nextjs'; // Replace with the actual source of `useUser`

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if(!apiKey) throw new Error('Stream API key Missing')

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id ,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <div>loading..</div>;

  return (
  <StreamVideo client={videoClient}>{children}</StreamVideo>
  );
};

export default StreamVideoProvider;
