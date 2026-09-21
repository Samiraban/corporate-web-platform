import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Minimize2, RotateCcw, Send, Sparkles, X } from 'lucide-react';

const QUICK_REPLIES = [
  'Tell me about OS Group',
  'What services do you provide?',
  'What companies are in OS Group?',
  'How can I contact you?',
];

const DEFAULT_MESSAGE = {
  id: 'welcome',
  sender: 'bot',
  text: 'Hello! I’m the OS Group AI Assistant. I can help you explore our companies, services, industries, projects, careers, news and contact information.',
};

const createMessage = (sender, text) => ({
  id: `${Date.now()}-${Math.random()}`,
  sender,
  text,
});

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([DEFAULT_MESSAGE]);
  const [typing, setTyping] = useState(false);
  const [attention, setAttention] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  useEffect(() => {
    const timer = window.setTimeout(() => setAttention(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  async function sendMessage(value = input) {
    const message = value.trim();
    if (!message || typing) return;

    const userMessage = createMessage('user', message);
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.slice(0, 1000) }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || 'Chatbot unavailable');

      setMessages((current) => [
        ...current,
        createMessage('bot', data?.reply || data?.message || data?.answer || 'Please try that again.'),
      ]);
    } catch (error) {
      console.error('OS Group chatbot error:', error);
      setMessages((current) => [
        ...current,
        createMessage('bot', 'I’m having trouble connecting right now. Please try again, or use our Contact page to reach the team.'),
      ]);
    } finally {
      setTyping(false);
    }
  }

  function resetConversation() {
    setMessages([DEFAULT_MESSAGE]);
    setInput('');
    setTyping(false);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label="OS Group AI chatbot"
            className="fixed bottom-[88px] right-4 z-[120] flex w-[calc(100vw-2rem)] max-w-[410px] flex-col overflow-hidden rounded-[24px] border border-[#ddd4eb] bg-white shadow-[0_24px_70px_rgba(82,58,128,0.18)] sm:right-5"
          >
            <header className="flex items-center justify-between border-b border-[#e5dff0] bg-[#f7f3fc] px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#e9def8] text-[#7657b7]"><Bot size={20} /></span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-extrabold text-[#302b42]">OS Group Assistant</h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-[#716b7e]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={resetConversation} aria-label="New conversation" className="rounded-lg p-2 text-[#716b7e] hover:bg-white hover:text-[#7657b7]"><RotateCcw size={15} /></button>
                <button type="button" onClick={() => setMinimized((v) => !v)} aria-label={minimized ? 'Expand chatbot' : 'Minimize chatbot'} className="rounded-lg p-2 text-[#716b7e] hover:bg-white hover:text-[#7657b7]"><Minimize2 size={16} /></button>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close chatbot" className="rounded-lg p-2 text-[#716b7e] hover:bg-white hover:text-[#7657b7]"><X size={17} /></button>
              </div>
            </header>

            {!minimized && (
              <>
                <div className="flex h-[min(470px,calc(100vh-240px))] flex-col gap-3 overflow-y-auto bg-[#fcfbfe] p-4">
                  {messages.map((message) => {
                    const user = message.sender === 'user';
                    return (
                      <div key={message.id} className={`flex items-end gap-2 ${user ? 'justify-end' : 'justify-start'}`}>
                        {!user && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eee7f9] text-[#7657b7]"><Bot size={14} /></span>}
                        <div className={`max-w-[82%] rounded-2xl px-3.5 py-3 text-sm leading-6 ${user ? 'rounded-br-md bg-[#7d5bc4] text-white' : 'rounded-bl-md border border-[#e4ddec] bg-white text-[#4d485b]'}`}>
                          {message.text}
                        </div>
                      </div>
                    );
                  })}

                  {typing && (
                    <div className="flex items-end gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eee7f9] text-[#7657b7]"><Bot size={14} /></span>
                      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-[#e4ddec] bg-white px-4 py-3">
                        {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a18bbf]" style={{ animationDelay: `${dot * 120}ms` }} />)}
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                <div className="border-t border-[#e5dff0] bg-white p-3">
                  <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                    {QUICK_REPLIES.map((reply) => (
                      <button key={reply} type="button" disabled={typing} onClick={() => sendMessage(reply)} className="shrink-0 rounded-full border border-[#ded5eb] bg-white px-3 py-2 text-[11px] font-semibold text-[#615b70] transition-colors hover:border-[#c5b1e4] hover:bg-[#f6f1fc] hover:text-[#7657b7] disabled:opacity-50">{reply}</button>
                    ))}
                  </div>
                  <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="flex gap-2">
                    <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} disabled={typing} maxLength={1000} placeholder="Ask OS Group anything..." className="min-w-0 flex-1 rounded-xl border border-[#ddd5e8] bg-[#faf9fc] px-3.5 py-3 text-sm text-[#302b42] outline-none placeholder:text-[#918a9e] focus:border-[#9b7bd3] focus:ring-2 focus:ring-[#9b7bd3]/10" />
                    <button type="submit" disabled={!input.trim() || typing} aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7d5bc4] text-white shadow-[0_6px_16px_rgba(125,91,196,0.18)] transition hover:-translate-y-0.5 hover:bg-[#6f4fb0] disabled:cursor-not-allowed disabled:opacity-40"><Send size={16} /></button>
                  </form>
                  <p className="mt-2 text-center text-[10px] text-[#9690a0]">OS Group AI Assistant</p>
                </div>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {!open && (
        <div className="fixed bottom-5 right-5 z-[120] flex items-center gap-2">
          <AnimatePresence>
            {attention && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="hidden rounded-full border border-[#ddd4eb] bg-white px-3.5 py-2 text-xs font-bold text-[#4d485b] shadow-[0_8px_24px_rgba(82,58,128,0.10)] sm:block"
              >
                Need help?
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => { setOpen(true); setMinimized(false); setAttention(false); }}
            aria-label="Open OS Group AI chatbot"
            animate={attention ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#7d5bc4] text-white shadow-[0_12px_32px_rgba(125,91,196,0.28)] ring-4 ring-[#eee7f9] transition hover:-translate-y-1 hover:bg-[#6f4fb0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#cbb9e8]"
          >
            <MessageCircle size={27} strokeWidth={2} />
            <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </motion.button>
        </div>
      )}
    </>
  );
}
