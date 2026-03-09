export type Goal = 'muscle' | 'strength' | 'endurance' | 'fat_loss';
export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type Frequency = 'low' | 'medium' | 'high';
export type FormPreference = 'powder' | 'capsules';
export type TimingPreference = 'morning' | 'pre_workout' | 'post_workout' | 'evening';

export interface UserState {
  goals: Goal[];
  experience: Experience | null;
  weight: number;
  frequency: Frequency | null;
  form: FormPreference | null;
  timing: TimingPreference | null;
}

export const INITIAL_STATE: UserState = {
  goals: [],
  experience: null,
  weight: 75,
  frequency: null,
  form: null,
  timing: null,
};
