import { Link, useLocation, useNavigate } from "react-router-dom";
import eye from "../../assets/eye.svg";
import eyeClose from "../../assets/eyeClose.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPass, setShowPass] = useState(() => false);
  const { loginUser, loginWithGoogle, isLoading, setIsLoading } =
    useContext(AuthContext);
  const url = useAxiosSucre();
  const location = useLocation();
  const navigate = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    loginUser(email, password)
      .then(() => {
        url
          .post("/jwt", { name, email })
          .then((response) => {
            if (response.data?.success) {
              toast.success("Login Successful!");
              form.reset();
              navigate(location?.state || "/");
            }
          })
          .catch((er) => toast.error(er.message));
      })
      .catch((er) => toast.error(er.message))
      .finally(() => {
        setIsLoading(() => false);
      });
  };

  const handelGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        url
          .post("/add-a-user", {
            userName: res?.displayName,
            userEmail: res?.email,
            userPhotoUrl: res?.photoURL,
          })
          .then((res) => {
            if (res.data?.acknowledged) {
              url
                .post("/jwt", { name: res?.displayName, email: res?.email })
                .then((response) => {
                  if (response.data?.success) {
                    toast.success("Login Successful!");
                    navigate(location?.state || "/");
                  }
                })
                .catch((er) => toast.error(er.message));
            }
          })
          .catch((er) => toast.error(er.message));
      })
      .catch((er) => toast.error(er.message))
      .finally(() => {
        setIsLoading(() => false);
      });
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
          Login!{" "}
          {isLoading && (
            <span className="loading loading-spinner loading-md text-white font-bold"></span>
          )}
        </h3>
        <form onSubmit={handelLogin} className="card-body">
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
        <p className="text-white font-semibold text-center mb-8">OR</p>
        <div className="px-8 mb-6">
          <button
            onClick={handelGoogleLogin}
            type="button"
            className="btn-form w-full py-2"
          >
            Google
          </button>
        </div>
        <p className="text-center text-white mb-6">
          Don&lsquo;t have an account? Please{" "}
          <Link
            state={location?.state}
            className="text-lg text-red-400 underline"
            to={"/register"}
            replace={true}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
