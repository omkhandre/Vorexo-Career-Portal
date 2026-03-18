import { useState } from "react";
import axios from "axios";
import { ArrowLeft, Building2 } from "lucide-react";

/* ================= TYPES ================= */

interface Employer {
  _id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
}

interface LoginResponse {
  token: string;
  employer: Employer;
}

interface EmployerLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

/* ================= CONFIG ================= */

const API_URL = "http://localhost:5000/api/auth";

/* ================= COMPONENT ================= */

export default function EmployerLogin({
  onLogin,
  onBack,
}: EmployerLoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    contactPerson: "",
    phone: "",
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await axios.post(`${API_URL}/register`, {
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        alert("Account created successfully. Please login.");
        setIsSignUp(false);
      } else {
        const res = await axios.post<LoginResponse>(
          `${API_URL}/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "employer",
          JSON.stringify(res.data.employer)
        );

        onLogin();
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B10] via-[#0B1E26] to-[#102B34] flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#B9C4D0] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Job Portal</span>
        </button>

        <div className="bg-[#1B2A41] border border-[#2E4A5C] rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#7B6CF6] rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-6">
            {isSignUp ? "Create Employer Account" : "Employer Login"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="Company Name"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
                />

                <input
                  type="text"
                  placeholder="Contact Person"
                  required
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPerson: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#102B34] border border-[#2E4A5C] rounded-lg text-white placeholder-[#8FA3B8] focus:ring-2 focus:ring-[#1E90FF] outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1E90FF] hover:bg-[#187BDA] text-white rounded-lg font-semibold transition-all disabled:opacity-60 shadow-lg hover:shadow-blue-500/40"
            >
              {loading
                ? "Please wait..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#1E90FF] hover:text-[#7B6CF6] font-medium transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
