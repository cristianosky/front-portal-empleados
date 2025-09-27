import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface AttendanceRecord {
  date: string;       // “2025-09-27”
  state: 'present' | 'absent' | null;
}

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
    base: string = environment.urlApi;

  private http = inject(HttpClient);

  getToday(): Observable<AttendanceRecord> {
    return this.http.get<AttendanceRecord>(`${this.base}/today`);
  }

  getMonthly(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.base}/monthly`);
  }

  checkin(): Observable<any> {
    return this.http.post(`${this.base}/checkin`, {});
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.base}/checkout`, {});
  }

  getTodayStatus(): Observable<{ checkIn: boolean; checkOut: boolean }> {
  return this.http.get<{ checkIn: boolean; checkOut: boolean }>(`${this.base}/today/status`);
}


}
