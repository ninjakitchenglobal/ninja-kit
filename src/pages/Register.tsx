//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';

//IMPORTING HOOKS
import useAuth from '../hooks/useAuth';

const SignUpPage = () => {
  const { userDetails, handleChange, isLoading, signup } = useAuth();

  return (
    <>
      <CombinedHeader />
      <section className="p-5 md:p-10 lg:p-15 xl:p-20 flex flex-col gap-5">
        <div>
          <h1 className="text-center text-2xl text-gray-700 font-semibold mt-30">
            {' '}
            Enter your details to create a new account{' '}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-3">
          <input
            type="text"
            name="email"
            value={userDetails.email}
            placeholder="Enter your Email"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            placeholder="First name"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            placeholder="Last name"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <input
            type="password"
            name="password"
            value={userDetails.password}
            placeholder="Password"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleChange}
            className="py-2 px-4 rounded-lg border-2  w-80"
          />

          <button
            onClick={signup}
            className="text-white bg-black rounded-lg py-3 px-5  w-80 text-center font-semibold cursor-pointer"
          >
            {isLoading ? (
              <span className="loading loading-ring loading-xl font-bold text-white block mx-auto"></span>
            ) : (
              ' Sign up'
            )}
          </button>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
