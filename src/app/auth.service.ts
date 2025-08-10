import { Injectable, signal } from "@angular/core";
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: Observable<any>;
    username = signal<string | null>(null);

    constructor(private auth: Auth, private router: Router) {
        this.user$ = user(this.auth);

        const storedName = localStorage.getItem('username');
        if (storedName) {
            this.username.set(storedName);
        }
    }

    async loginWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
            const name = result.user.displayName || '';
            console.log("Logged in as:", name);
            this.username.set(name);
            localStorage.setItem('username', name);
            return result.user;
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            return null;
        }
    }

    async logout() {
        await signOut(this.auth);
        this.username.set(null);
        localStorage.removeItem('username');
        this.router.navigate(['/']); // Redirect to home/login
    }
}