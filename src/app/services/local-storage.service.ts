import { Injectable } from '@angular/core';

const APP_PREFIX = 'LEON-';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    set<T>(key: string, value: T) {
        localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }

    get<T>(key: string): T {
        return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`) || '{}');
    }

    remove(key: string) {
        localStorage.removeItem(`${APP_PREFIX}${key}`);
    }
}
