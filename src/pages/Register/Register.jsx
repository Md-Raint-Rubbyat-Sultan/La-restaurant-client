import { useContext, useState } from "react";
import eye from "../../assets/eye.svg";
import eyeClose from "../../assets/eyeClose.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const [showPass, setShowPass] = useState(() => false);
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handelRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password, photo);
  };

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
          Register!
        </h3>
        <form onSubmit={handelRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-xl md:text-3xl font-bold">
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-xl md:text-3xl font-bold">
                User Photo URL
              </span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
            />
          </div>
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
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn-form py-2">
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-white mb-6">
          already have an account? Please{" "}
          <Link className="text-lg text-red-400 underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
