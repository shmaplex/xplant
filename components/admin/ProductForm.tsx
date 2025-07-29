"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/navigation";

interface Props {
  initial?: Partial<Product>;
  onSubmit: (data: any) => Promise<void>;
}

export default function ProductForm({ initial = {}, onSubmit }: Props) {
  const supabase = createClient();

  // States for form values
  const [title, setTitle] = useState(initial.title || "");
  const [slug, setSlug] = useState(initial.slug || "");
  const [image, setImage] = useState(initial.image || "");
  const [images, setImages] = useState((initial.images || []).join("\n"));
  const [category, setCategory] = useState(initial.category || "");
  const [subcategory, setSubcategory] = useState(initial.subcategory || "");
  const [tag, setTag] = useState(initial.tag || "");
  const [description, setDescription] = useState(initial.description || "");
  const [features, setFeatures] = useState((initial.features || []).join("\n"));
  const [specs, setSpecs] = useState(
    initial.specs ? JSON.stringify(initial.specs, null, 2) : ""
  );
  const [youtubeVideoId, setYoutubeVideoId] = useState(
    initial.youtube_video_id || ""
  );

  // States for autocomplete options
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // Dropdown visibility states
  const [catDropdown, setCatDropdown] = useState(false);
  const [subcatDropdown, setSubcatDropdown] = useState(false);
  const [tagDropdown, setTagDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  // Refs for clicking outside dropdown
  const catRef = useRef<HTMLDivElement>(null);
  const subcatRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  // If slug is empty, generate slug from title (only when title changes)
  useEffect(() => {
    if (!initial.slug) {
      setSlug(slugify(title));
    }
  }, [title, initial.slug]);

  // Fetch unique values on mount
  useEffect(() => {
    async function fetchUnique() {
      const fetchColumn = async (
        column: "category" | "subcategory" | "tag"
      ) => {
        const { data, error } = await supabase
          .from("products")
          .select(column)
          .not(column, "is", null);

        if (error) {
          console.error(error);
          return [];
        }
        const values = data?.map((item: any) => item[column]);
        return Array.from(new Set(values));
      };

      const [cats, subcats, tags] = await Promise.all([
        fetchColumn("category"),
        fetchColumn("subcategory"),
        fetchColumn("tag"),
      ]);

      setCategories(cats);
      setSubcategories(subcats);
      setTags(tags);
    }
    fetchUnique();
  }, [supabase]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (catRef.current && !catRef.current.contains(event.target as Node)) {
        setCatDropdown(false);
      }
      if (
        subcatRef.current &&
        !subcatRef.current.contains(event.target as Node)
      ) {
        setSubcatDropdown(false);
      }
      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setTagDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter helpers for dropdown
  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(category.toLowerCase())
  );
  const filteredSubcategories = subcategories.filter((c) =>
    c.toLowerCase().includes(subcategory.toLowerCase())
  );
  const filteredTags = tags.filter((t) =>
    t.toLowerCase().includes(tag.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await onSubmit({
      title,
      slug,
      image,
      images: images.split("\n").filter(Boolean),
      category,
      subcategory,
      tag,
      description,
      features: features.split("\n").filter(Boolean),
      specs: specs ? JSON.parse(specs) : null,
      youtube_video_id: youtubeVideoId,
    });

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-8 space-y-6 mx-auto"
      autoComplete="off"
    >
      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-[var(--moss-shadow)] mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-[var(--moss-shadow)] mb-1">
            Slug
          </label>
          <input
            value={slug}
            placeholder={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
          />
        </div>
      </div>

      {/* Main image and gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-[var(--moss-shadow)] mb-1">
            Main Image URL
          </label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
          />
        </div>
        <div>
          <label className="block font-medium text-[var(--moss-shadow)] mb-1">
            Additional Images (one per line)
          </label>
          <textarea
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
          />
        </div>
      </div>

      {/* Category */}
      <div ref={catRef} className="relative">
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          Category
        </label>
        <input
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCatDropdown(true);
          }}
          onFocus={() => setCatDropdown(true)}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
          autoComplete="off"
        />
        {/* Dropdown */}
        {catDropdown && filteredCategories.length > 0 && (
          <ul className="absolute z-10 max-h-40 overflow-auto w-full bg-white border border-[var(--spore-grey)] rounded-lg mt-1 shadow-lg">
            {filteredCategories.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setCategory(c);
                  setCatDropdown(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-[var(--psybeam-purple)] hover:text-white rounded"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Subcategory */}
      <div ref={subcatRef} className="relative">
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          Subcategory
        </label>
        <input
          value={subcategory}
          onChange={(e) => {
            setSubcategory(e.target.value);
            setSubcatDropdown(true);
          }}
          onFocus={() => setSubcatDropdown(true)}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
          autoComplete="off"
        />
        {/* Dropdown */}
        {subcatDropdown && filteredSubcategories.length > 0 && (
          <ul className="absolute z-10 max-h-40 overflow-auto w-full bg-white border border-[var(--spore-grey)] rounded-lg mt-1 shadow-lg">
            {filteredSubcategories.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setSubcategory(c);
                  setSubcatDropdown(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-[var(--psybeam-purple)] hover:text-white rounded"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tag */}
      <div ref={tagRef} className="relative">
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          Tag
        </label>
        <input
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
            setTagDropdown(true);
          }}
          onFocus={() => setTagDropdown(true)}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
          autoComplete="off"
        />
        {/* Dropdown */}
        {tagDropdown && filteredTags.length > 0 && (
          <ul className="absolute z-10 max-h-40 overflow-auto w-full bg-white border border-[var(--spore-grey)] rounded-lg mt-1 shadow-lg">
            {filteredTags.map((t) => (
              <li
                key={t}
                onClick={() => {
                  setTag(t);
                  setTagDropdown(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-[var(--psybeam-purple)] hover:text-white rounded"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
        />
      </div>

      {/* Features */}
      <div>
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          Features (one per line)
        </label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
        />
      </div>

      {/* Specs */}
      <div>
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          Specs (JSON)
        </label>
        <textarea
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 font-mono bg-white"
          placeholder='{"weight": "200g", "material": "cotton"}'
        />
      </div>

      {/* YouTube */}
      <div>
        <label className="block font-medium text-[var(--moss-shadow)] mb-1">
          YouTube Video ID
        </label>
        <input
          value={youtubeVideoId}
          onChange={(e) => setYoutubeVideoId(e.target.value)}
          className="w-full rounded-lg border border-[var(--spore-grey)] p-3 bg-white"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[var(--psybeam-purple)] hover:bg-[var(--organic-amber)] text-white font-semibold shadow-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
