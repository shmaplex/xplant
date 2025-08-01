export type GuideSection = {
  section_id: string;
  title: string;
  content?: string;
  sort_order?: number;
};

export type OnboardingStepType = "single-choice" | "multi-choice" | "final";

export interface OnboardingOption {
  label: string;
  value: string;
}

export interface OnboardingStep {
  key: string;
  question: string;
  type: OnboardingStepType;
  options?: OnboardingOption[];
}

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
  user_id: string;
  transfer_date: string;
  transfer_cycle: number;
  notes?: string;
  plant?: Plant;
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

export type CountryCode =
  | "AC"
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TA"
  | "TC"
  | "TD"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "XK"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW";
