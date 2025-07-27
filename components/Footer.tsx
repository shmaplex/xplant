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
    window.location.href = "/"; // redirect to home after logout
  };

  return (
    <footer className="bg-[#E2D9C4] text-[#2F2F2F] text-sm px-6 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-6 text-center sm:text-left">
        {/* Branding */}
        <div className="sm:col-span-1">
          <Image
            src="/svg/dirtman-shop-blk.svg"
            alt="Dirtman Worm & Root Supply Logo"
            width={1057 / 6}
            height={580 / 6}
            className="sm:-ml-2 sm:-mt-2 mx-auto"
          />
          <div className="flex justify-center sm:justify-start items-center space-x-1">
            <p className="text-[10px] text-[#888]">supported by</p>
            <Link
              href="https://www.shmaplex.com"
              target="_blank"
              className="opacity-60 hover:opacity-100 transition-opacity duration-500 ease-in-out"
            >
              <Image
                src="/svg/shmaplex-logo.svg"
                alt="Shmaplex Logo"
                width={100}
                height={50}
              />
            </Link>
          </div>
          <p className="sm:max-w-full max-w-62 mx-auto text-xs text-[#555] mt-4">
            Composting, worm wrangling, and soil storytelling from Korea to the
            world.
          </p>
        </div>

        {/* About */}
        <div>
          <h5 className="text-[#5C5138] font-semibold uppercase text-xs mb-2">
            About
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="/about">Meet Dirtman</Link>
            </li>
            <li className="hover:text-[#5C5138] transition-colors cursor-not-allowed opacity-40 disabled">
              <Link href="/projects">Compost Projects</Link>
            </li>
            <li className="hover:text-[#5C5138] transition-colors cursor-not-allowed opacity-40 disabled">
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h5 className="text-[#5C5138] font-semibold uppercase text-xs mb-2">
            Get Involved
          </h5>
          <ul className="space-y-1">
            <li>
              <a href="https://www.youtube.com/@DirtmanDiaries" target="_blank">
                Subscribe on YouTube
              </a>
            </li>
            <li>
              <span className="text-[#999] cursor-not-allowed">
                Join Discord (Coming Soon)
              </span>
            </li>
            <li>
              <Link href="/guide/worm-bin">Worm Bin Guide</Link>
            </li>
            <li>
              <Link href="/guide/worm-feeding">Worm Feeding Guide</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
          </ul>
        </div>

        {/* Learn */}
        <div>
          <h5 className="text-[#5C5138] font-semibold uppercase text-xs mb-2">
            Learn
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="/faq">Worm Bin FAQ</Link>
            </li>
            <li>
              <span className="text-[#999] cursor-not-allowed">Resources</span>
            </li>
            <li>
              <span className="text-[#999] cursor-not-allowed">
                Affiliate Gear
              </span>
            </li>
          </ul>
        </div>

        {/* Fine Print */}
        <div>
          <h5 className="text-[#5C5138] font-semibold uppercase text-xs mb-2">
            Fine Print
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="/legal/shipping-policy">Shipping Policy</Link>
            </li>
            <li>
              <Link href="/legal/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h5 className="text-[#5C5138] font-semibold uppercase text-xs mb-2">
            Account
          </h5>
          <ul className="space-y-1">
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-left w-full hover:text-[#5C5138] transition-colors"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-10 text-2xl text-[#2F2F2F]">
        <Link href="https://www.youtube.com/@DirtmanDiaries" target="_blank">
          <FaYoutube className="hover:text-[#5C5138] transition-colors cursor-pointer" />
        </Link>
        <FaInstagram className="hover:text-[#5C5138] transition-colors cursor-not-allowed opacity-40" />
        <FaTiktok className="hover:text-[#5C5138] transition-colors cursor-not-allowed opacity-40" />
        <FaDiscord className="hover:text-[#5C5138] transition-colors opacity-40 cursor-not-allowed" />
        <FaTelegram className="hover:text-[#5C5138] transition-colors opacity-40 cursor-not-allowed" />
      </div>
      {/* Copyright */}
      <div className="text-center mt-2 text-[#888] text-xs">
        © {new Date().getFullYear()} Dirtman Worm &amp; Root Supply. All rights
        decomposed.
      </div>
    </footer>
  );
}
