// lib/types.ts

export type PlantStage = {
  id: string;
  plant_id: string;
  stage: "Mother Block" | "Acclimation" | "Production" | "Cold Storage";
  room?: string;
  entered_on: string;
  notes?: string;
  created_at: string;
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

export type PlantBasic = {
  id: string;
  species: string;
};

export type PlantTransfer = {
  id: string;
  plant_id: string;
  transfer_date: string;
  transfer_number: number;
  stage: string;
  notes?: string;
  plant?: {
    species: string;
  };
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

export type ContaminationLog = {
  id: string;
  plant_id: string;
  type: "mold" | "bacteria" | "hyperhydricity" | "other";
  issue: string;
  description?: string;
  photo_url?: string;
  log_date: string;
  created_at: string;
};

type MediaComponent = {
  name: string;
  qty: string;
};

export type MediaRecipe = {
  id: string;
  user_id: string;
  title: string;
  components: MediaComponent[];
  linked_plant_ids?: string[];
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
