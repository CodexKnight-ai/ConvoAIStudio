'use client';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import React from 'react';

const podcasts = [
    {
      id: 1,
      title: 'The Rise of AI Agents in 2025',
      creator: 'Dr. Ava Stone',
      channel: 'NeuroTalks',
      duration: '28:17',
      aiModels: ['GPT-4', 'Whisper', 'DALL·E 3'],
      membersJoined: 1240,
      likedBy: 932,
      date: 'July 1, 2025',
    },
    {
      id: 2,
      title: 'Can AI Replace CEOs?',
      creator: 'Eli Navarro',
      channel: 'Synthetic Minds',
      duration: '34:10',
      aiModels: ['Claude 3', 'GPT-4 Turbo'],
      membersJoined: 1982,
      likedBy: 1467,
      date: 'July 8, 2025',
    },
    {
      id: 3,
      title: 'Conversational Intelligence Deep Dive',
      creator: 'Lena Zhao',
      channel: 'ConvoSphere',
      duration: '41:05',
      aiModels: ['GPT-4', 'Google Gemini'],
      membersJoined: 882,
      likedBy: 670,
      date: 'July 14, 2025',
    },
  ];
  
export default function TopPodcasts() {
  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-12 lg:px-20">
      <h2 className="text-5xl font-bold text-center mb-4 font-secondary">
        Top AI Podcasts
      </h2>
      <p className="text-center text-gray-400 mb-12 text-2xl">
        Listen to the best AI podcasts from around the world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {podcasts.map((podcast, i) => (
          <motion.div
            key={podcast.id}
            className="bg-[#0d0d0d] border border-gray-800 p-6 rounded-2xl hover:shadow-cyan-500/20 transition shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-white">{podcast.title}</h3>
              <button className="bg-cyan-600 hover:bg-cyan-500 p-2 rounded-full">
                <Play className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-2">by {podcast.creator}</p>
            <p className="text-sm text-gray-500 mb-4 italic">
              Channel: {podcast.channel}
            </p>
            <p className="text-xs text-gray-500 mb-4">{podcast.date}</p>

            <div className="text-sm text-gray-400 mb-2">
              <span className="font-medium text-white">AI Models: </span>
              {podcast.aiModels.join(', ')}
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-white">Duration:</span> {podcast.duration} •{' '}
              <span>{podcast.membersJoined} joined</span> •{' '}
              <span>{podcast.likedBy} liked</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
