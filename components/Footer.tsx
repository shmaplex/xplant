"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaTelegram,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { guideLinks } from "@/data/navigation";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <footer className="bg-[#F7F2EC] text-[#1A1A1A] text-sm px-6 sm:px-10 py-12 border-t border-[#DAD7D2]">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-6 text-center sm:text-left mb-8">
        {/* Branding */}
        <div className="sm:col-span-1">
          <Image
            src="/svg/shmaplexplant-logo.svg"
            alt="XPlant Logo"
            width={1057 / 6}
            height={580 / 6}
            className="sm:-ml-2 sm:-mt-2 mx-auto"
          />
          <p className="sm:max-w-full max-w-62 mx-auto text-xs text-[#42594D] mt-4">
            Organic plant futures. From Shmaplex labs to the world.
          </p>
        </div>

        {/* About */}
        <div>
          <h5 className="text-[#42594D] font-semibold uppercase tracking-wide text-xs mb-2">
            About
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="/about" className="hover:text-[#B7EF48] transition">
                About XPlant
              </Link>
            </li>
            <li>
              <Link href="/projects">Research Projects</Link>
            </li>
            <li className="opacity-40 cursor-not-allowed pointer-events-none">
              <Link href="/blog">Journal</Link>
            </li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h5 className="text-[#42594D] font-semibold uppercase tracking-wide text-xs mb-2">
            Get Involved
          </h5>
          <ul className="space-y-1">
            {/* <li>
              <a
                href="https://www.youtube.com/@ShmaplexPlant"
                target="_blank"
                className="hover:text-[#B7EF48] transition"
              >
                Subscribe on YouTube
              </a>
            </li> */}
            <li className="text-[#999] cursor-not-allowed">
              Join Discord (Soon)
            </li>
            <li>
              <Link href="/shop" className="hover:text-[#B7EF48] transition">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Learn */}
        <div>
          <h5 className="text-[#42594D] font-semibold uppercase tracking-wide text-xs mb-2">
            Learn
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="/faq" className="hover:text-[#B7EF48] transition">
                Tissue Culture FAQ
              </Link>
            </li>
            {guideLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[#B7EF48] transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* <li className="text-[#999] cursor-not-allowed">Resources</li> */}
          </ul>
        </div>

        {/* Fine Print */}
        <div>
          <h5 className="text-[#42594D] font-semibold uppercase tracking-wide text-xs mb-2">
            Fine Print
          </h5>
          <ul className="space-y-1">
            <li>
              <Link
                href="/legal/shipping-policy"
                className="hover:text-[#B7EF48] transition"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                href="/legal/privacy"
                className="hover:text-[#B7EF48] transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h5 className="text-[#42594D] font-semibold uppercase tracking-wide text-xs mb-2">
            Account
          </h5>
          <ul className="space-y-1">
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-left w-full hover:text-[#B7EF48] transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="hover:text-[#B7EF48] transition">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="hidden justify-center gap-4 mt-10 text-2xl text-[#1A1A1A]">
        <FaYoutube className="opacity-40 cursor-not-allowed" />
        {/* <Link href="https://www.youtube.com/@ShmaplexPlant" target="_blank">
          <FaYoutube className="hover:text-[#B7EF48] transition cursor-pointer" />
        </Link> */}
        <FaInstagram className="opacity-40 cursor-not-allowed" />
        <FaTiktok className="opacity-40 cursor-not-allowed" />
        <FaDiscord className="opacity-40 cursor-not-allowed" />
        <FaTelegram className="opacity-40 cursor-not-allowed" />
      </div>
      <div className="text-center mt-2 text-[#42594D] text-xs">
        © {new Date().getFullYear()} XPlant / Shmaplex
      </div>
    </footer>
  );
}
