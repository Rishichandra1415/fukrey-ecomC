// "use client";

// import { motion } from "framer-motion";
// import { Footer } from "@/components/layout";

// export default function AboutPage() {
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const staggerContainer = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const values = [
//     { title: "Affordability", description: "High-quality fashion shouldn't break the bank. We cut the fluff to give you the best price." },
//     { title: "Simplicity", description: "Clean designs that work for every occasion. Less noise, more style." },
//     { title: "Everyday Style", description: "Clothing made for real life. From street walks to casual hangouts." },
//     { title: "Confidence", description: "Look good, feel good. We build pieces that empower your daily routine." },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col bg-fukrey-black text-white">
//       <main className="flex-1">
//         {/* 1. Hero Section */}
//         <section className="relative flex min-h-[50vh] flex-col items-center justify-center border-b border-white/5 bg-fukrey-offblack px-4 py-24 text-center">
//           <motion.div {...fadeIn}>
//             <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
//               About Fukrey
//             </h1>
//             <p className="mx-auto mt-6 max-w-2xl text-lg text-fukrey-gray-400 sm:text-xl">
//               Defining the new standard for affordable men's fashion. Designed for the bold, the young, and the modern.
//             </p>
//           </motion.div>
//           {/* Decorative Background */}
//           <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
//         </section>

//         {/* 2. Brand Story Section */}
//         <section className="py-24">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//               <motion.div 
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
//                 <div className="mt-2 h-1 w-16 bg-white" />
//                 <p className="mt-8 text-lg leading-relaxed text-fukrey-gray-300">
//                   Fukrey was born out of a simple observation: stylish, high-quality men's clothing was often priced out of reach for young individuals. We wanted to change that. 
//                 </p>
//                 <p className="mt-4 text-lg leading-relaxed text-fukrey-gray-300">
//                   Our journey started with a vision to combine the latest trends with everyday comfort, without the premium price tag. Today, we are a destination for young men aged 16-30 who value both their look and their budget.
//                 </p>
//               </motion.div>
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8 }}
//                 className="relative aspect-square overflow-hidden rounded-2xl bg-fukrey-offblack border border-white/5"
//               >
//                 <div className="flex h-full w-full items-center justify-center p-12 text-center">
//                   <span className="text-sm font-medium uppercase tracking-widest text-fukrey-gray-500">
//                     Image: Streetwear Lifestyle
//                   </span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* 3. Mission Section */}
//         <section className="bg-white py-24 text-black">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="mx-auto max-w-3xl"
//             >
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl italic">"Making modern fashion accessible to every young man."</h2>
//               <p className="mt-8 text-xl font-medium leading-relaxed opacity-80">
//                 At Fukrey, our mission is to empower you with confidence through clothing that fits your life and your wallet. We believe style is an expression, and everyone deserves to speak.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* 4. Men's Fashion Focus Section */}
//         <section className="py-24 border-y border-white/5">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Built Exclusively for Men</h2>
//               <p className="mt-4 text-fukrey-gray-400">Our expertise lies in the details of menswear.</p>
//             </div>
//             <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
//               {['Shirts', 'Hoodies', 'T-Shirts', 'Casuals'].map((item, i) => (
//                 <motion.div
//                   key={item}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   className="group relative h-48 overflow-hidden rounded-xl border border-white/5 bg-fukrey-offblack p-6 transition-colors hover:bg-white/5"
//                 >
//                   <span className="absolute bottom-6 left-6 text-xl font-bold">{item}</span>
//                   <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* 5. Brand Values Section */}
//         <section className="py-24 bg-fukrey-offblack">
//           <div className="container mx-auto px-4">
//             <div className="mb-16 text-left">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Our Values</h2>
//               <p className="mt-4 max-w-xl text-fukrey-gray-400">The pillars that define the Fukrey experience.</p>
//             </div>
//             <motion.div 
//               variants={staggerContainer}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//               className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
//             >
//               {values.map((v) => (
//                 <motion.div 
//                   key={v.title}
//                   variants={fadeIn}
//                   className="rounded-2xl border border-white/5 bg-black p-8 transition-transform hover:-translate-y-1"
//                 >
//                   <h3 className="text-xl font-bold text-white">{v.title}</h3>
//                   <p className="mt-4 text-sm leading-relaxed text-fukrey-gray-400">{v.description}</p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }


export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen font-sans">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-28 pb-24 md:pt-40 md:pb-36 text-center">
        {/* decorative grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* accent line */}
        <span className="inline-block mb-6 h-px w-16 bg-[#e8d5b0] mx-auto" />

        <p className="mb-3 text-xs tracking-[0.35em] uppercase text-[#e8d5b0] font-medium">
          EST. 2024 — Men's Fashion
        </p>

        <h1
          className="text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          About
          <br />
          <span className="text-[#e8d5b0]">Fukrey</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base md:text-lg text-white/60 leading-relaxed">
          Trendy fits. Real prices. Built for the generation that refuses to
          choose between style and savings.
        </p>
      </section>

      {/* ── Brand Story ── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          {/* left – label + text */}
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] uppercase text-[#e8d5b0]">
              Our Story
            </p>
            <h2
              className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              Born from the streets,<br />
              <span className="text-white/40">built for everyone.</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Fukrey started with a single frustration — why does looking good
              have to cost so much? We saw young guys settle for boring basics
              because the cool stuff was always out of reach.
            </p>
            <p className="text-white/60 leading-relaxed">
              So we flipped the script. By cutting out middlemen and obsessing
              over direct-to-consumer sourcing, we built a brand where trend,
              comfort, and price finally coexist. No compromises — just the fit.
            </p>
          </div>

          {/* right – big pull quote */}
          <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/[0.03]">
            <span className="text-6xl text-[#e8d5b0] font-black leading-none">"</span>
            <p
              className="text-2xl md:text-3xl font-black uppercase leading-snug mt-2"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              Style is not a luxury. It's a right.
            </p>
            <span className="mt-6 block h-px w-10 bg-[#e8d5b0]" />
            <p className="mt-4 text-sm text-white/40 tracking-widest uppercase">
              Fukrey Founders
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="px-6 py-20 md:py-28 bg-[#111111]">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase text-[#e8d5b0]">
            Our Mission
          </p>
          <h2
            className="text-4xl md:text-6xl font-black uppercase leading-none mb-12 max-w-2xl"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Make modern fashion<br />
            <span className="text-[#e8d5b0]">accessible to every man.</span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Affordability First",
                body: "Every piece is priced so that a college student can build a complete wardrobe without breaking the bank.",
              },
              {
                num: "02",
                title: "Everyday Confidence",
                body: "Clothes shouldn't be saved for special occasions. Fukrey is made for Monday mornings and Friday nights alike.",
              },
              {
                num: "03",
                title: "Real Street Style",
                body: "We design for the way you actually live — commutes, hangouts, late-night runs. Fashion that works as hard as you do.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="group border border-white/10 rounded-2xl p-6 hover:border-[#e8d5b0]/40 transition-colors duration-300"
              >
                <p className="text-[#e8d5b0] text-xs font-bold tracking-widest mb-4">
                  {item.num}
                </p>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Men's Fashion Focus ── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] uppercase text-[#e8d5b0]">
              What We Make
            </p>
            <h2
              className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              100% Men.<br />
              <span className="text-white/40">Zero Exceptions.</span>
            </h2>
            <p className="text-white/60 leading-relaxed">
              Fukrey is exclusively a men's brand. We go deep so we can go
              right — obsessing over fit, fabric, and finish for the male form
              only. From oversized graphic tees to heavyweight hoodies, every
              category is built around how men actually dress.
            </p>
          </div>

          {/* category pills */}
          <div className="flex flex-wrap gap-3 content-start pt-2 md:pt-10">
            {[
              "Graphic Tees",
              "Hoodies",
              "Oversized Fits",
              "Casual Shirts",
              "Joggers",
              "Street Jackets",
              "Cargo Pants",
              "Co-ords",
            ].map((cat) => (
              <span
                key={cat}
                className="border border-white/15 rounded-full px-5 py-2 text-sm text-white/70 hover:border-[#e8d5b0] hover:text-[#e8d5b0] transition-colors duration-200 cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Values ── */}
      <section className="px-6 py-20 md:py-28 bg-[#111111]">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase text-[#e8d5b0]">
            What We Stand For
          </p>
          <h2
            className="text-4xl md:text-6xl font-black uppercase leading-none mb-14"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Our Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "₹",
                title: "Affordability",
                body: "Dope fits that don't drain your wallet.",
              },
              {
                icon: "◻",
                title: "Simplicity",
                body: "Clean designs. No clutter. Just the essentials done right.",
              },
              {
                icon: "✦",
                title: "Everyday Style",
                body: "Fashion for real life, not just the 'gram.",
              },
              {
                icon: "↑",
                title: "Confidence",
                body: "Wear it and own the room. That's the Fukrey effect.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors duration-300"
              >
                <span className="text-3xl text-[#e8d5b0] block mb-4">{v.icon}</span>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer Band ── */}
      <section className="px-6 py-20 text-center border-t border-white/10">
        <p className="text-xs tracking-[0.35em] uppercase text-[#e8d5b0] mb-4">
          Ready to upgrade?
        </p>
        <h2
          className="text-4xl md:text-6xl font-black uppercase mb-8"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          Shop the new drop.
        </h2>
        <a
          href="/shop"
          className="inline-block bg-[#e8d5b0] text-[#0a0a0a] font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-full hover:bg-white transition-colors duration-200"
        >
          Explore Collection →
        </a>
      </section>

    </main>
  );
}