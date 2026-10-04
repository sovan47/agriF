import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function OTP(){
  const {verifyOtp}=useAuth(); const nav=useNavigate(); const loc=useLocation();
  const pending=JSON.parse(localStorage.getItem("fasalsathi-pending")||"{}");
  const phone=loc.state?.phone||pending.phone||""; const mode=loc.state?.mode||pending.mode||"login"; const next=loc.state?.next||"/prediction";
  const [otp,setOtp]=useState(""); const [seconds,setSeconds]=useState(299); const [loading,setLoading]=useState(false);
  useEffect(()=>{const t=setInterval(()=>setSeconds(s=>s>0?s-1:0),1000);return()=>clearInterval(t)},[]);
  const verify=async e=>{e.preventDefault(); if(otp.length!==6){toast.error("Enter 6-digit OTP");return} setLoading(true); try{await verifyOtp(phone,otp,mode);localStorage.removeItem("fasalsathi-pending");toast.success("Welcome back! You can now access all features");nav(next,{replace:true})}catch(err){toast.error(err.response?.data?.detail||"Invalid OTP")}finally{setLoading(false)}};
  return <div className="min-h-[calc(100vh-76px)] gov-pattern flex items-center justify-center px-4 py-16"><div className="w-full max-w-md bg-white rounded-3xl shadow-gov border p-8 text-center"><h1 className="text-3xl font-extrabold">Enter OTP | OTP दर्ज करें</h1><p className="mt-3 text-gray-600">We've sent a code to +91 {phone}</p><form onSubmit={verify} className="mt-8"><input autoFocus value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} className="w-full text-center tracking-[.65em] text-2xl font-bold border rounded-xl py-4" placeholder="••••••" inputMode="numeric" /><button disabled={loading} className="mt-5 w-full py-3.5 rounded-xl bg-govGreen text-white font-bold">{loading?"Verifying…":"Verify & Continue"}</button></form><p className="mt-4 text-sm text-gray-500">OTP expires in {String(Math.floor(seconds/60)).padStart(2,"0")}:{String(seconds%60).padStart(2,"0")}</p><button className="mt-2 text-govBlue font-semibold" onClick={()=>toast("Use 123456 in this development build.")}>Resend OTP</button><div className="mt-5 rounded-xl bg-blue-50 text-govBlue p-3 text-sm">Development OTP: <b>123456</b></div></div></div>
}
