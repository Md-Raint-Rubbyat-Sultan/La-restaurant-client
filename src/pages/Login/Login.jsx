import { Link } from "react-router-dom";
import eye from "../../assets/eye.svg";
import eyeClose from "../../assets/eyeClose.svg";
import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(() => false);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/vintage-old-rustic-cutlery-dark_1220-4886.jpg?w=1380&t=st=1699289558~exp=1699290158~hmac=41ad46184cef504271d6729fbfbbe278ecc607406380bd440df88161f99bb3e2')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex justify-center items-center py-12"
    >
      <div className="w-11/12 md:w-full md:max-w-2xl shadow-2xl border-2 backdrop-blur-sm border-gray-300 rounded-lg">
        <h3 className="text-center text-5xl text-white font-bold mt-6">
          Login!
        </h3>
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-xl md:text-3xl font-bold">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-xl md:text-3xl font-bold">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered w-full pe-14"
                required
              />
              <div
                onClick={() => setShowPass((prev) => !prev)}
                className="inline absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPass ? (
                  <img className="w-6 h-6" src={eye} alt="eye" />
                ) : (
                  <img className="w-6 h-6" src={eyeClose} alt="eye slash" />
                )}
              </div>
            </div>
            <label className="label">
              <a
                href="#"
                className="label-text-alt link text-white dm:text-lg font-medium"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn-form py-2">
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-white mb-6">
          Don&lsquo;t have an account? Please{" "}
          <Link className="text-lg text-red-400 underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
