import {
    MixerVerticalIcon,
    SpeakerLoudIcon,
    ChatBubbleIcon,
    FaceIcon,
    GlobeIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
    {
        Icon: MixerVerticalIcon,
        name: "AI Podcast Hosts",
        description:
            "Two lifelike AI personalities simulate deep, emotionally aware podcast-style conversations.",
        href: "/",
        cta: "Explore",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl" />,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: SpeakerLoudIcon,
        name: "Real-Time Audio Streaming",
        description:
            "Stream low-latency AI-generated audio live via WebRTC, directly in your browser.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: ChatBubbleIcon,
        name: "Live Chat + Q&A",
        description:
            "Engage with AI and audience in real-time chat and inject live questions into the conversation.",
        href: "/",
        cta: "Try it live",
        background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: FaceIcon,
        name: "Emoji Reactions",
        description:
            "Send ❤️ 😂 🔥 👀 reactions in real time, floating on screen during the AI podcast.",
        href: "/",
        cta: "React live",
        background: <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: GlobeIcon,
        name: "Multilingual & Transcripts",
        description:
            "Get real-time translations and live captions for accessible, multilingual AI conversations.",
        href: "/",
        cta: "See how",
        background: <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];


function Features() {
    return (
        <div>
            <div className="w-full py-8 px-20 flex flex-col justify-center items-center gap-4">
            <h2 className="text-5xl font-bold font-secondary w-full text-center">Powerful Features</h2>
            <p className="text-gray-400 font-sans text-2xl mt-2 w-full max-w-[800px] text-center flex justify-center" >Everything you need to create, stream, and interact with truly intelligent podcast experiences — powered by GenAI and real-time tech.</p>
            </div>
        <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
        </div>
    );
}

export default Features;
