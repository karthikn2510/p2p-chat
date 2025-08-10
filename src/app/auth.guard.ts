import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, tap, filter, take } from 'rxjs/operators';
import { LoadingService } from './loading.service';

export const authGuard: CanActivateFn = () => {
    const auth = inject(Auth);
    const router = inject(Router);
    const loadingService = inject(LoadingService);

    loadingService.setLoading(true);

    return authState(auth).pipe(
        // Wait until Firebase actually gives us a result (null or user)
        filter(user => user !== undefined),
        take(1),
        tap(() => loadingService.setLoading(false)),
        map(user => {
            if (user) {
                return true;
            } else {
                router.navigate(['/']); // redirect to login
                return false;
            }
        })
    );
};
