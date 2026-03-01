//IMPORTING HOOKS AND DEPS
import usePayment from '../hooks/usePayment';

//IMPORTING PAGE ASSETS
import venmo from '../assets/payment-options/venmo.webp';
import cashapp from '../assets/payment-options/cashapp.webp';
import apple from '../assets/payment-options/apple3.png';
import zelle from '../assets/payment-options/zelle.png';
import dollar from '../assets/payment-options/dollar.png';
import CombinedHeader from '../components/CombinedHeader';

const PaymentOptionsPage = () => {
  const { buyNow } = usePayment();

  return (
    <>
      <CombinedHeader />
      <section className="mt-20 p-5 md:p-10 lg:p-15 xl:p-20">
        <div>
          <h1 className="text-2xl text-center text-gray-700 font-semibold">
            {' '}
            Select a payment method{' '}
          </h1>
          <p className="text-gray-700 font-semibold">Paying with:</p>
        </div>

        <div className="mt-5 flex flex-col gap-5 items-center">
          <span
            onClick={() => {
              buyNow('venmo');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={venmo} alt="" className="w-15 h-15 rounded-lg" />
            <p className="text-lg text-gray-700 font-semibold">Venmo</p>
          </span>

          <span
            onClick={() => {
              buyNow('cashapp');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={cashapp} alt="" className="w-15 h-15 rounded-lg" />
            <p className="text-lg text-gray-700 font-semibold">Cashapp</p>
          </span>

          <span
            onClick={() => {
              buyNow('apple-pay');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={apple} alt="" className="w-15 h-15 rounded-lg" />
            <p className="text-lg text-gray-700 font-semibold">Apple Pay</p>
          </span>

          <span
            onClick={() => {
              buyNow('zelle');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={zelle} alt="" className="w-15 h-15 rounded-lg" />
            <p className="text-lg text-gray-700 font-semibold"> Zelle </p>
          </span>

          <span
            onClick={() => {
              buyNow('others');
            }}
            className="flex items-center gap-3 border border-gray-600 rounded-lg p-2 w-[60%] cursor-pointer"
          >
            <img src={dollar} alt="" className="w-15 h-15 rounded-lg" />
            <p className="text-lg text-gray-700 font-semibold"> Others </p>
          </span>
        </div>
      </section>
    </>
  );
};

export default PaymentOptionsPage;
