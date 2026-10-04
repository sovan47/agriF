import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login({signup=false}) {
  const {requestOtp}=useAuth(); const navigate=useNavigate(); const location=useLocation();
  const [phone,setPhone]=useState(""); const [loading,setLoading]=useState(false);
  const next=location.state?.from || location.state?.redirectTo || "/prediction";
  const submit=async e=>{e.preventDefault(); if(!/^[6-9]\d{9}$/.test(phone)){toast.error("Enter a valid 10-digit Indian mobile number");return}
    setLoading(true); try {const data=await requestOtp(phone,signup?"signup":"login"); localStorage.setItem("fasalsathi-pending",JSON.stringify({phone,mode:signup?"signup":"login",name:""})); toast.success("OTP sent"); navigate("/otp",{state:{phone,mode:signup?"signup":"login",next,devOtp:data.dev_otp}})} catch(err){toast.error(err.response?.data?.detail||"Unable to send OTP")} finally{setLoading(false)}
  };
  return <div className="min-h-[calc(100vh-76px)] gov-pattern flex items-center justify-center px-4 py-16"><div className="w-full max-w-lg bg-white rounded-3xl shadow-gov border p-7 sm:p-10">
    <div className="text-center"><div className="mx-auto h-14 w-14 rounded-full bg-blue-50 text-govBlue flex items-center justify-center"><ShieldCheck/></div><h1 className="mt-5 text-3xl font-extrabold">{signup?"Create Account":"Login to FasalSathi"}</h1><p className="mt-2 font-hi text-gray-600">{signup?"खाता बनाएं":"लॉगिन करें"}</p></div>
    {signup&&<div className="mt-7"><label className="text-sm font-semibold">Full Name</label><input className="mt-2 w-full border rounded-xl px-4 py-3" placeholder="Your full name" /></div>}
    <form onSubmit={submit} className="mt-6"><label className="text-sm font-semibold">Phone Number | फोन नंबर</label><div className="mt-2 flex"><span className="px-3 py-3 border border-r-0 rounded-l-xl bg-gray-50">+91</span><input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} className="w-full border rounded-r-xl px-4 py-3" placeholder="10-digit mobile number" inputMode="numeric" /></div><button disabled={loading} className="mt-5 w-full py-3.5 rounded-xl bg-govGreen text-white font-extrabold disabled:opacity-60">{loading?"Sending…":"Send OTP"}</button></form>
    <button onClick={()=>toast("Aadhaar integration is not enabled in this demo.")} className="mt-4 w-full py-3.5 rounded-xl border-2 border-govBlue text-govBlue font-bold">Login with Aadhaar (Demo)</button>
    <p className="mt-6 text-center text-sm text-gray-600">{signup?"Already have an account?":"New here?"} <Link to={signup?"/login":"/signup"} className="font-bold text-govGreen">{signup?"Login":"Create an account"}</Link></p>
    <div className="mt-6 text-xs text-gray-500 flex gap-2 items-start"><Smartphone size={15} className="shrink-0"/> OTP authentication is simulated for this hackathon build.</div>
  </div></div>
}
