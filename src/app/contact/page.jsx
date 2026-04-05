"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Send,
  Loader2, 
  CheckCircle2, 
  ChevronRight,
  User,
  Mail,
  Phone,
  Tag,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-all duration-300">
      <main className="flex-1 flex flex-col items-center">
        
        {/* Native Shop Hero Section */}
        <section className="px-6 pt-12 pb-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
         

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
              Get in <span className="text-amber-500">Touch</span>
            </h1>
          </motion.div>
        </section>

        {/* ProductCard-Style Contact Section */}
        <section className="px-6 pb-24 w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 sm:p-12 rounded-xl border border-fukrey-border bg-background shadow-sm"
          >
           
            <ContactForm />
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    subject: "", 
    message: "" 
  });

  const inputContainerStyle = "flex flex-col gap-2";
  const labelStyle = "text-[10px] font-black uppercase tracking-widest text-fukrey-muted ml-0.5";
  const inputStyle = "w-full bg-fukrey-muted/5 border border-fukrey-border rounded-lg px-4 py-3.5 outline-none focus:border-amber-500 focus:bg-background transition-all text-sm font-bold uppercase tracking-tight text-foreground placeholder:text-fukrey-muted/30";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h4 className="text-2xl font-black uppercase mb-2 tracking-tighter">Message Received</h4>
          <p className="text-fukrey-muted text-[10px] font-bold uppercase tracking-widest">We will reach out to you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className={inputContainerStyle}>
               <label className={labelStyle}>Full Name</label>
               <input type="text" required placeholder="EX. RISHI SINGH" className={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value.toUpperCase()})} />
             </div>
             
             <div className={inputContainerStyle}>
               <label className={labelStyle}>Email Address</label>
               <input type="email" required placeholder="NAME@EMAIL.COM" className={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
             </div>

             <div className={inputContainerStyle}>
               <label className={labelStyle}>Phone Number</label>
               <input type="tel" required placeholder="+91 00000 00000" className={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
             </div>

             <div className={inputContainerStyle}>
               <label className={labelStyle}>Subject</label>
               <input type="text" required placeholder="EX. ORDER TRACKING" className={inputStyle} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value.toUpperCase()})} />
             </div>
          </div>

          <div className={inputContainerStyle}>
             <label className={labelStyle}>How can we help?</label>
             <textarea 
              required 
              rows={4} 
              placeholder="TELL US MORE ABOUT YOUR INQUIRY..." 
              className={`${inputStyle} resize-none min-h-[120px]`} 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})} 
             />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-3 bg-foreground text-background px-8 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-500 hover:text-black transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-lg shadow-black/5"
          >
            {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
          </button>
        </form>
      )}
    </AnimatePresence>
  );
}