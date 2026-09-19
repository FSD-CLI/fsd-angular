import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface AppPreferencesState {
  showDetails: boolean;
}

const initialState: AppPreferencesState = {
  showDetails: true,
};

export const AppPreferencesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggleDetails: () => patchState(store, { showDetails: !store.showDetails() }),
  })),
);
