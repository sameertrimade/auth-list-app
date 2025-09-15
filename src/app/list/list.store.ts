import { DestroyRef, inject } from '@angular/core';
import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { DepartmentState } from '../shared/models/department-store.model';

const initialState: DepartmentState = {
  departments: [],
  isLoading: false,
  error: null,
};

export const DepartmentStore = signalStore(
  withState<DepartmentState>(initialState),

  withMethods((store, api = inject(ApiService)) => {
    const destroyRef = inject(DestroyRef);

    return {
      load(): void {
        patchState(store, { isLoading: true, error: null });
        api
          .getDepartments()
          .pipe(
            finalize(() => patchState(store, { isLoading: false })),
            takeUntilDestroyed(destroyRef),
          )
          .subscribe({
            next: (data) => patchState(store, { departments: data }),
            error: () =>
              patchState(store, { error: 'Failed to load departments. Please try again.' }),
          });
      },
    };
  }),

  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
