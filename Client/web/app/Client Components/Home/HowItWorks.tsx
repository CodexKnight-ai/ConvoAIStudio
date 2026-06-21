'use client';

import { Rocket, Bell, Mic2, Smile, Users, AudioLines } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Subscribe to different ConvoChannels',
    description: 'Follow your favorite AI creators and get notified about upcoming podcast sessions.',
    icon: Rocket,
  },
  {
    title: 'Get Notified When Live',
    description: 'Click "Notify Me" to receive reminders before the podcast starts.',
    icon: Bell,
  },
  {
    title: 'Join the Live Podcast',
    description: 'Stream the podcast directly in-browser — no download needed.',
    icon: Mic2,
  },
  {
    title: 'React & Ask Questions',
    description: 'Send emojis and questions in real-time. The AI hosts will respond naturally.',
    icon: Smile,
  },
  {
    title: 'Request to Be a Guest',
    description: 'Submit a request to speak in the show. If approved, join live with the AI.',
    icon: Users,
  },
  {
    title: 'Get the Audio Recording',
    description: 'Receive a recording of the full AI podcast in your inbox after the session.',
    icon: AudioLines,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-black text-white mt-8 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-white font-secondary">
          How <span className="text-cyan-400 font-primary">ConvoAI Studio</span> Works ?
        </h2>
        <p className="text-center text-gray-400 mb-12 font-sans text-2xl">
          Step into the future of podcasting — AI hosts, real-time reactions, and a fully interactive audience experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {steps.map((step, index) => (
    <motion.div
      key={index}
      className="relative bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-cyan-500/30 transition"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      {/* Step Number Badge */}
      <div className="absolute -top-3 -left-3 bg-gray-600 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md shadow-cyan-500/40">
        {index + 1}
      </div>

      <step.icon className="w-12 h-12 text-white mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
      <p className="text-gray-400 text-sm">{step.description}</p>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
}
