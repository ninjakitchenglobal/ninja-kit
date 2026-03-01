import { DEV_API } from '../lib/utils/api-url';

//IMPORTING HELPER COMPONENTS

import CombinedHeader from '../components/CombinedHeader';

//IMPORTING HOOKS AND DEPS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSocket } from '../lib/socket';
import { useParams } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { useAppSelector } from '../lib/redux/hooks';
import type IProduct from '../interfaces/IProduct';
import { toast } from 'react-toastify';

type Message = {
  senderId: string;
  text: string;
};

export default function ChatPage() {
  //UTILISING HOOKS
  const params = useParams();
  const { chatId } = params;
  const { user } = useAppContext();
  const cart = useAppSelector((store) => store.cartReducer);

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [products, setProducts] = useState<IProduct[]>();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [text, setText] = useState('');

  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(`${DEV_API}/chat/get-or-create`, {
          buyerId: user,
          sellerId: '6988e97855e9a3d54af22435',
          productIds: cart,
          chatId,
        });

        setProducts(res.data.data.products);

        setMessages(res.data.data.messages);

        setPaymentMethod(res.data.data.paymentOption);

        const socket = getSocket();
        socket.emit('join-chat', chatId);

        socket.on('receive-message', (msg: Message) => {
          setMessages((prev) => [...prev, msg]);
        });
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error.response.message);
      }
    };

    initChat();

    return () => {
      const socket = getSocket();
      socket.off('receive-message');
    };
  }, [chatId]);

  const sendMessage = () => {
    if (!text || !chatId) return;

    getSocket().emit('send-message', {
      chatId,
      senderId: user,
      text,
    });

    setText('');
  };

  if (isLoading) {
    return (
      <section className="flex justify-center mt-70">
        <span className="loading loading-ring loading-xl w-25 block" />
      </section>
    );
  }

  return (
    <>
      <CombinedHeader />
      <div className="p-5 mt-20 md:mt-35">
        <div className="mb-10">
          <h1 className="text-2xl text-gray-700 font-semibold">
            {' '}
            Payment processing for:{' '}
          </h1>
          <ul className="text-gray-700 list-disc relative left-10">
            {products?.map((product: IProduct, i: number) => {
              return (
                <li key={i}>
                  {' '}
                  {product.title} - {product.price}{' '}
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-gray-700 font-semibold text-xl">
            Paying via:{' '}
            {paymentMethod.slice(0, 1).toUpperCase() + paymentMethod.slice(1)}
          </p>
        </div>

        <div className="h-[60vh] border rounded-lg overflow-y-auto p-3 mb-3 flex flex-col gap-3 md:h-[65vh]">
          {messages.map((msg, i) => (
            <span
              key={i}
              className={`flex ${msg.senderId === user ? 'justify-end' : ''}`}
            >
              <p
                className={`py-2 px-4 max-w-[70%] rounded-lg font-semibold ${msg.senderId === user ? 'text-right bg-gray-200 text-gray-700' : 'bg-blue-200 text-blue 700'} `}
              >
                {msg.text}
              </p>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border outline-none p-2 flex-1 rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-black rounded-lg text-white px-4"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
