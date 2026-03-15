// "use client";

// import React, { useState } from "react";
// import { 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Clock, 
//   Instagram, 
//   Facebook, 
//   Twitter, 
//   Send,
//   Loader2,
//   CheckCircle2
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Footer } from "@/components/layout";

// export default function ContactPage() {
//   return (
//     <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
//       <main className="flex-1">
//         {/* Header section */}
//         <section className="px-6 pt-24 pb-12 text-center md:pt-32 md:pb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 
//               className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-none tracking-tight mb-4"
//               style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
//             >
//               Get In <span className="text-[#e8d5b0]">Touch</span>
//             </h1>
//             <p className="mx-auto max-w-2xl text-white/50 text-sm md:text-base tracking-wide">
//               Have questions about your order, collaboration inquiries, or just want to say hi? 
//               Our team is here to help you redefine your style.
//             </p>
//           </motion.div>
//         </section>

//         {/* Main Contact Grid */}
//         <section className="px-6 pb-24">
//           <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
//             <ContactForm />
//             <ContactInfo />
//           </div>
//         </section>

//         {/* Map Section */}
//         <MapSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// function ContactForm() {
//   const [status, setStatus] = useState("idle"); // idle, loading, success
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("loading");
    
//     // Simulate API call
//     console.log("Submitting contact form:", formData);
    
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     // In a real app, you'd fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    
//     setStatus("success");
//     setFormData({ name: "", email: "", phone: "", message: "" });
    
//     // Reset success message after 5 seconds
//     setTimeout(() => setStatus("idle"), 5000);
//   };

//   if (status === "success") {
//     return (
//       <div className="flex flex-col items-center justify-center p-12 text-center border border-white/5 rounded-3xl bg-white/[0.02]">
//         <CheckCircle2 className="w-16 h-16 text-[#e8d5b0] mb-6 animate-bounce" />
//         <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Message Received</h3>
//         <p className="text-white/50 mb-8 max-w-sm">
//           Thanks for reaching out! Our team will get back to you within 24-48 hours.
//         </p>
//         <button 
//           onClick={() => setStatus("idle")}
//           className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5b0] hover:text-white transition-colors"
//         >
//           Send another message
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-8">
//       <div>
//         <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Send us a message</h2>
//         <div className="h-1 w-12 bg-[#e8d5b0]" />
//       </div>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/40 ml-1">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={handleChange}
//               className="bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 outline-none focus:border-[#e8d5b0]/50 transition-all text-sm placeholder:text-white/10"
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/40 ml-1">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               placeholder="john@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 outline-none focus:border-[#e8d5b0]/50 transition-all text-sm placeholder:text-white/10"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           <label htmlFor="phone" className="text-xs uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             placeholder="+91 98765 43210"
//             value={formData.phone}
//             onChange={handleChange}
//             className="bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 outline-none focus:border-[#e8d5b0]/50 transition-all text-sm placeholder:text-white/10"
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/40 ml-1">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             required
//             rows={5}
//             placeholder="Tell us what's on your mind..."
//             value={formData.message}
//             onChange={handleChange}
//             className="bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 outline-none focus:border-[#e8d5b0]/50 transition-all text-sm resize-none placeholder:text-white/10"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={status === "loading"}
//           className="mt-4 inline-flex items-center justify-center gap-3 bg-[#e8d5b0] text-[#0a0a0a] py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {status === "loading" ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Sending...
//             </>
//           ) : (
//             <>
//               Send Message
//               <Send className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// function ContactInfo() {
//   const infoItems = [
//     { 
//       icon: Mail, 
//       label: "Email", 
//       value: "support@fukrey.com", 
//       href: "mailto:support@fukrey.com" 
//     },
//     { 
//       icon: Phone, 
//       label: "Phone", 
//       value: "+91 98765 43210", 
//       href: "tel:+919876543210" 
//     },
//     { 
//       icon: MapPin, 
//       label: "Address", 
//       value: "123 Fashion Street, New Delhi, India 110001",
//       href: "#"
//     },
//     { 
//       icon: Clock, 
//       label: "Business Hours", 
//       value: "Mon - Sat: 10AM - 8PM IST", 
//       href: null 
//     }
//   ];

//   return (
//     <div className="flex flex-col gap-10">
//       <div className="flex flex-col gap-8">
//         <div>
//           <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Contact Information</h2>
//           <div className="h-1 w-12 bg-[#e8d5b0]" />
//         </div>

//         <div className="grid gap-6">
//           {infoItems.map((item, idx) => (
//             <div key={idx} className="flex items-start gap-4 group">
//               <div className="p-3 rounded-full bg-white/5 text-[#e8d5b0] group-hover:bg-[#e8d5b0] group-hover:text-black transition-all">
//                 <item.icon className="w-5 h-5" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">{item.label}</span>
//                 {item.href ? (
//                   <a href={item.href} className="text-white/80 hover:text-white transition-colors">{item.value}</a>
//                 ) : (
//                   <span className="text-white/80">{item.value}</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col gap-6">
//         <h3 className="text-sm font-bold uppercase tracking-widest text-[#e8d5b0]">Follow Us</h3>
//         <div className="flex items-center gap-4">
//           {[
//             { icon: Instagram, href: "#" },
//             { icon: Facebook, href: "#" },
//             { icon: Twitter, href: "#" }
//           ].map((social, i) => (
//             <a 
//               key={i} 
//               href={social.href} 
//               className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-[#e8d5b0] hover:border-[#e8d5b0]/30 transition-all transform hover:-translate-y-1"
//             >
//               <social.icon className="w-6 h-6" />
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MapSection() {
//   return (
//     <section className="px-6 py-20 bg-[#111111] overflow-hidden">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
//           <div>
//             <h2 className="text-2xl font-bold uppercase tracking-tight">Visit Our Store</h2>
//             <p className="text-sm text-white/40 mt-1 uppercase tracking-widest font-medium">Headquarters & Flagship Location</p>
//           </div>
//           <a 
//             href="https://maps.google.com" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5b0] hover:text-white transition-colors border-b border-[#e8d5b0] pb-1"
//           >
//             Get Directions →
//           </a>
//         </div>
        
//         <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-white/5 grayscale invert contrast-125 hover:grayscale-0 hover:invert-0 hover:contrast-100 transition-all duration-700">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827188844!2d77.2065851!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5d34700001%3A0x7d6a54162e245a1!2sFashion%20Street%2C%20Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import {  Footer } from "@/components";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Instagram, 
  Facebook, 
  Twitter, 
  Loader2 
} from "lucide-react";

/* ─────────────────────────────────────────
   ContactForm
───────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    console.log("Fukrey contact form data:", form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {
      // fail silently — show success anyway for demo
    }

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1200);
  };

  const inputBase =
    "w-full bg-fukrey-muted/5 border border-fukrey-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-fukrey-muted/50 outline-none focus:border-[#e8d5b0]/60 focus:bg-fukrey-muted/10 transition-all duration-200";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-[#e8d5b0]/20 rounded-2xl bg-fukrey-muted/5 h-full min-h-[420px]">
        <CheckCircle className="text-[#e8d5b0] mb-5" size={48} strokeWidth={1.5} />
        <h3
          className="text-3xl font-black uppercase mb-3 text-foreground"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          Message Sent!
        </h3>
        <p className="text-fukrey-muted text-sm max-w-xs leading-relaxed mb-8">
          Thanks for reaching out. The Fukrey team will get back to you within
          24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs tracking-widest uppercase text-[#e8d5b0] border border-[#e8d5b0]/30 px-6 py-2.5 rounded-full hover:bg-[#e8d5b0]/10 transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-fukrey-muted">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-fukrey-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-fukrey-muted">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-fukrey-muted">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind…"
          value={form.message}
          onChange={handleChange}
          className={`${inputBase} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-[#e8d5b0] text-[#0a0a0a] font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────
   ContactInfo
───────────────────────────────────────── */
function ContactInfo() {
  const details = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@fukrey.in",
      href: "mailto:hello@fukrey.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "12, Fashion Street, Patna, Bihar – 800001",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon – Sat: 10 AM – 7 PM",
      href: null,
    },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
    { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Contact details */}
      <div className="space-y-5">
        {details.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-4">
            <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-[#e8d5b0]/10 border border-[#e8d5b0]/20 flex items-center justify-center">
              <Icon size={16} className="text-[#e8d5b0]" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-fukrey-muted/60 mb-0.5">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/80 hover:text-[#e8d5b0] transition-colors leading-snug"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm text-foreground/80 leading-snug">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-fukrey-border" />

      {/* Social links */}
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-fukrey-muted/60 mb-4">
          Follow Us
        </p>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-fukrey-border flex items-center justify-center text-fukrey-muted/70 hover:border-[#e8d5b0]/50 hover:text-[#e8d5b0] transition-all duration-200"
            >
              <Icon size={16} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      </div>

      {/* Badge */}
      <div className="rounded-2xl border border-[#e8d5b0]/15 bg-[#e8d5b0]/[0.04] px-5 py-4">
        <p className="text-xs text-fukrey-muted/80 leading-relaxed">
          💬 &nbsp;Average reply time is under{" "}
          <span className="text-[#e8d5b0] font-semibold">24 hours</span>. For
          order issues, drop your order ID in the message.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MapSection
───────────────────────────────────────── */
function MapSection() {
  return (
    <section className="px-6 pb-24 mx-auto max-w-6xl">
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-fukrey-border" />
        <p className="text-xs tracking-[0.35em] uppercase text-fukrey-muted/60">
          Find Us In-Store
        </p>
        <span className="h-px flex-1 bg-fukrey-border" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-fukrey-border h-64 md:h-80">
        <iframe
          title="Fukrey Store Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.9553461847956!2d85.13756431502!3d25.594095983714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          className="grayscale contrast-75 dark:invert dark:contrast-100 dark:opacity-80 transition-all duration-700"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans transition-colors duration-200">

      <main>
        {/* ── Hero ── */}
        <section className="px-6 pt-28 pb-16 md:pt-36 md:pb-20 text-center">
          <span className="inline-block mb-5 h-px w-14 bg-[#e8d5b0]" />
          <p className="mb-3 text-xs tracking-[0.35em] uppercase text-[#e8d5b0]">
            Get In Touch
          </p>
          <h1
            className="text-[clamp(3rem,9vw,6.5rem)] font-black uppercase leading-none tracking-tight text-foreground"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Contact <span className="text-[#e8d5b0]">Fukrey</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm md:text-base text-fukrey-muted leading-relaxed">
            Questions, collabs, or just want to say hi — we're always here for it.
          </p>
        </section>

        {/* ── Two-column layout ── */}
        <section className="px-6 pb-24 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 xl:gap-16">

            {/* Left – Form */}
            <div className="border border-fukrey-border rounded-2xl p-7 md:p-10 bg-fukrey-muted/5">
              <p className="text-xs tracking-[0.3em] uppercase text-[#e8d5b0] mb-2">
                Send a Message
              </p>
              <h2
                className="text-3xl font-black uppercase mb-7 text-foreground"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
              >
                We'd love to hear from you.
              </h2>
              <ContactForm />
            </div>

            {/* Right – Info */}
            <div className="border border-fukrey-border rounded-2xl p-7 md:p-10 bg-fukrey-muted/5">
              <p className="text-xs tracking-[0.3em] uppercase text-[#e8d5b0] mb-2">
                Our Details
              </p>
              <h2
                className="text-3xl font-black uppercase mb-7 text-foreground"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
              >
                Reach us directly.
              </h2>
              <ContactInfo />
            </div>

          </div>
        </section>

        {/* ── Map ── */}
        <MapSection />
      </main>

      <Footer />
    </div>
  );
}