"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  product: z.string().min(1, "Please select a product"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const products = [
  { value: "", label: "Select Insurance Product" },
  { value: "life", label: "Life Insurance" },
  { value: "health", label: "Health Insurance" },
  { value: "vehicle", label: "Vehicle Insurance" },
  { value: "home", label: "Home Insurance" },
  { value: "fire", label: "Fire Insurance" },
  { value: "marine", label: "Marine Insurance" },
  { value: "engineering", label: "Engineering Insurance" },
  { value: "liability", label: "Liability Insurance" },
  { value: "industrial", label: "Industrial Insurance" },
  { value: "financial", label: "Financial Services" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-[#1a365d] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2744] to-[#1a365d]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="contact-content text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#d69e2e] text-sm font-semibold tracking-wider uppercase mb-4">
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
            Contact Us
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Your Free
            <span className="gradient-text block">Insurance Quote</span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours
            with the best insurance options tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="contact-content lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#d69e2e]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Phone</div>
                    <a href="tel:+919822012345" className="text-white hover:text-[#d69e2e] transition-colors">
                      +91 98220 12345
                    </a>
                    <br />
                    <a href="tel:+912024456789" className="text-white hover:text-[#d69e2e] transition-colors">
                      +91 20 2445 6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#d69e2e]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Email</div>
                    <a href="mailto:hvranade@yahoo.com" className="text-white hover:text-[#d69e2e] transition-colors">
                      hvranade@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#d69e2e]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Address</div>
                    <p className="text-white">
                      Pune, Maharashtra
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Working Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-white">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sunday</span>
                  <span className="text-[#d69e2e]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-content lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-white/60">
                    Your enquiry has been submitted. We&apos;ll contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-[#0f2744] border border-[#d69e2e]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d69e2e] transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-[#0f2744] border border-[#d69e2e]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d69e2e] transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#0f2744] border border-[#d69e2e]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d69e2e] transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Product Dropdown */}
                    <div>
                      <label className="block text-white/80 text-sm mb-2">
                        Insurance Product *
                      </label>
                      <select
                        {...register("product")}
                        className="w-full bg-[#0f2744] border border-[#d69e2e]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d69e2e] transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d69e2e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px",
                        }}
                      >
                        {products.map((product) => (
                          <option key={product.value} value={product.value}>
                            {product.label}
                          </option>
                        ))}
                      </select>
                      {errors.product && (
                        <p className="text-red-400 text-xs mt-1">{errors.product.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell us about your insurance needs..."
                      className="w-full bg-[#0f2744] border border-[#d69e2e]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d69e2e] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d69e2e] text-[#1a365d] py-4 rounded-xl font-semibold text-lg hover:bg-[#ecc94b] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © 2024 H.V. Ranade & Associates. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
