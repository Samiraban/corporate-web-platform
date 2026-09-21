import { Outlet } from 'react-router-dom';
import Chatbot from './Chatbot';

export default function ChatbotLayout({ children }) {
  return (
    <>
      {children || <Outlet />}
      <Chatbot />
    </>
  );
}