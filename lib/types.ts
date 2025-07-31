export type Profile = {
  id: string; // matches auth.users.id
  email: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  locale?: string;
  role?: string;
  is_premium?: boolean;
  is_banned?: boolean;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
};

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type PlantStage = {
  id: string;
  plant_id: string;
  stage: "Mother Block" | "Acclimation" | "Production" | "Cold Storage";
  room?: string;
  entered_on: string;
  notes?: string;
  created_at: string;
};

export type PlantWithStage = {
  id: string;
  species: string;
  photo_url?: string;
  transfer_cycle?: number;
  current_stage?: {
    id: string;
    stage: string;
  } | null;
};

export type PlantSummary = {
  id: string;
  species: string;
};

export interface Plant {
  id: string;
  user_id: string;
  species: string;
  source: string;
  initial_n_date: string;
  initial_i_date: string;
  current_stage?: PlantStage | null;
  transfer_cycle: number;
  media: string[];
  notes?: string;
  photo_url?: string;
  created_at: string;

  plant_stages?: PlantStage[];
}

export type PlantMediaLog = {
  id: string;
  plant_id: string;
  contamination_log_id: string | null;
  type: "photo" | "video" | "annotation";
  media_url: string; // internal storage path, e.g. "plantId/timestamp-filename.jpg"
  original_name: string; // original file name from upload
  file_type: string; // MIME type, e.g. "image/png"
  description?: string | null;
  captured_at?: string | null; // ISO date string when media was captured
  labels: string[]; // tags or labels for annotations
  annotated: boolean; // whether annotated or not
  is_public: boolean; // public or private flag
  uploaded_by?: string | null; // user id who uploaded
  created_at: string; // ISO date string when inserted
};

export type PlantRecipeLink = {
  recipe_id: string;
  linked_at: string;
  media_recipes: MediaRecipe;
};

export type PlantBasic = {
  id: string;
  species: string;
};

export type PlantTransfer = {
  id: string;
  plant_id: string;
  transfer_date: string;
  transfer_cycle: number;
  notes?: string;
  plant?: {
    species: string;
  };
  created_at: string;
};

export type Task = {
  id: string;
  user_id: string;
  title: string;
  due_date: string;
  is_completed: boolean;
  category: "media_prep" | "subculture" | "cleaning" | "monitoring" | "other";
  notes?: string;
  created_at: string;
};

export type ContaminationLogInput = {
  plant_id: string;
  type: ContaminationLog["type"];
  issue: string;
  description?: string;
  media_url?: string;
};

export type ContaminationLog = {
  id: string;
  plant_id: string;
  type: "mold" | "bacteria" | "hyperhydricity" | "other";
  issue: string;
  description?: string;
  media_url?: string;
  log_date: string;
  created_at: string;
};

export type MediaComponent = {
  name: string;
  qty: string;
};

export type MediaRecipe = {
  id: string;
  user_id: string;
  title: string;
  components: MediaComponent[];
  origin?: "user" | "system"; // new field for recipe source
  status?: "active" | "archived"; // new field for future control
  created_at: string;
};

export type Guide = {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  tags: string[];
  url: string;
  summary?: string;
  created_at: string;
};

export type GuideSuggestion = {
  id: string;
  user_id: string;
  plant_id: string | null;
  guide_url: string;
  suggestion?: string;
  created_at: string;
};

/* ===========================================
   SHOP / PRODUCTS
=========================================== */

export interface ProductVariant {
  id: string;
  product_id: string;
  title: string;
  price: string;
}

export interface ProductRelated {
  product_id: string;
  related_product_id: string;
}

export interface Product {
  id: string;
  slug?: string;
  title: string;
  image?: string;
  category: string;
  subcategory?: string;
  tag?: string;
  description?: string;
  images?: string[];
  features?: string[];
  specs?: Record<string, any>;
  youtube_video_id?: string; // keep as-is to match DB naming
  variants: ProductVariant[];
  relatedProducts?: Product[];
}

export interface CategoryWithSub {
  name: string;
  subcategories?: string[];
}

export type ContaminationLogWithRelations = ContaminationLog & {
  plant_species?: string;
  user_email?: string;
};

export type PlantTransferWithRelations = PlantTransfer & {
  plant_species?: string;
  user_email?: string;
  transfer_cycle?: number;
};
