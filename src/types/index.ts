export enum WorkoutTypeName {
  Swimming = "Swimming",
  Running = "Running",
  HIIT = "HIIT",
  Yoga = "Yoga",
  Pilates = "Pilates",
  Cardio = "Cardio",
  Flexibility = "Flexibility",
  StrengthTraining = "Strength Training",
  CrossFit = "CrossFit",
  Balance = "Balance",
}

export interface WorkoutType {
  id: string;
  name: string;
  description: string;
}

export enum Intensity {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export type IntensityString = keyof typeof Intensity;

export interface Workout {
  id: string;
  type: WorkoutTypeName;
  duration: number;
  intensity: Intensity;
}

// Additional types needed for the app
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
