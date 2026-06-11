'use client';

export function FeedSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          {/* Thumbnail skeleton */}
          <div className="aspect-video rounded-2xl bg-white/5 mb-3" />
          
          {/* Metadata skeleton */}
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-white/5 flex-shrink-0 mt-0.5" />
            
            <div className="flex-1 space-y-2">
              {/* Title lines */}
              <div className="h-4 bg-white/5 rounded-full w-full" />
              <div className="h-4 bg-white/5 rounded-full w-3/4" />
              
              {/* Channel name */}
              <div className="h-3 bg-white/[0.03] rounded-full w-1/2 mt-1" />
              
              {/* Stats */}
              <div className="h-3 bg-white/[0.03] rounded-full w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PlayerSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Video player */}
      <div className="aspect-video rounded-[2rem] bg-white/5" />
      
      {/* Title */}
      <div className="space-y-3">
        <div className="h-7 bg-white/5 rounded-full w-3/4" />
        <div className="h-4 bg-white/[0.03] rounded-full w-1/2" />
      </div>
      
      {/* Actions */}
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-white/5 rounded-full" />
        ))}
      </div>
      
      {/* Channel */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/5" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-white/5 rounded-full w-1/3" />
          <div className="h-3 bg-white/[0.03] rounded-full w-1/4" />
        </div>
        <div className="h-10 w-28 bg-white/5 rounded-full" />
      </div>
      
      {/* Description */}
      <div className="liquid-glass-strong rounded-2xl p-6 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-3 bg-white/5 rounded-full" style={{ width: `${90 - i * 15}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-5 bg-white/5 rounded-full w-1/2 mb-6" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="w-[168px] h-[94px] rounded-xl bg-white/5 flex-shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 bg-white/5 rounded-full w-full" />
            <div className="h-3 bg-white/5 rounded-full w-3/4" />
            <div className="h-2.5 bg-white/[0.03] rounded-full w-1/2 mt-1" />
            <div className="h-2.5 bg-white/[0.03] rounded-full w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
