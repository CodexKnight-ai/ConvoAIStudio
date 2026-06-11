'use client';

import { useState } from 'react';
import { CheckCircle2, Bell, BellOff } from 'lucide-react';
import { type PodcastPreview } from '../../../feed/_data/feedData';

interface ChannelSectionProps {
  podcast: PodcastPreview;
}

export function ChannelSection({ podcast }: ChannelSectionProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (isSubscribed) {
      setNotificationsOn(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsOn(!notificationsOn);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-y border-white/5 my-4">
      {/* Channel Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={podcast.channelAvatar}
          alt={podcast.channelName}
          className="w-12 h-12 rounded-full border border-white/10 object-cover flex-shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-sans font-bold text-white text-base truncate">
              {podcast.channelName}
            </span>
            {podcast.channelVerified && (
              <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/10 flex-shrink-0" />
            )}
          </div>
          <span className="text-white/40 font-sans text-xs">
            {podcast.subscriberCount} subscribers
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Subscribe Button */}
        <button
          onClick={toggleSubscribe}
          className={`px-5 py-2.5 rounded-full font-secondary font-bold text-sm transition-all duration-300 cursor-pointer ${
            isSubscribed
              ? 'bg-white/10 text-white hover:bg-white/15'
              : 'bg-white text-black hover:bg-white/95 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>

        {/* Bell Button (Only shown if subscribed) */}
        {isSubscribed && (
          <button
            onClick={toggleNotifications}
            className={`p-2.5 rounded-full border border-white/10 transition-all cursor-pointer ${
              notificationsOn
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            title={notificationsOn ? 'Mute Notifications' : 'All Notifications'}
          >
            {notificationsOn ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
