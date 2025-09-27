import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaService } from '../../services/asistencia.service.ts/asistencia.service';

interface Day {
  date: Date;
  ymd: string;
  state: 'present' | 'absent' | null;
  isToday: boolean;
  isHoliday: boolean;
  isWeekend: boolean;
}

interface AttendanceRecord {
  date: string;       // “2025-09-27”
  state: 'present' | 'absent' | null;
}

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {

hasCheckedIn: boolean = false;
hasCheckedOut: boolean = false;

markCheckIn() {
  this._asistenciaService.checkin().subscribe({
    next: (res: any) => {
      // El backend responde con { msg: "Check-in registrado" }
      alert(res.msg);
      this.hasCheckedIn = true;
    },
    error: (err) => {
      console.error('Error en check-in:', err);
      alert('Hubo un error al hacer check-in.');
    }
  });
}

markCheckOut() {
  this._asistenciaService.checkout().subscribe({
    next: (res: any) => {
      alert(res.msg); // { msg: "Check-out registrado" }
      this.hasCheckedOut = true;
    },
    error: (err) => {
      console.error('Error en check-out:', err);
      alert('Hubo un error al hacer check-out.');
    }
  });
}

  _asistenciaService = inject(AsistenciaService);

  weekdays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  currentDate: Date = new Date();
  daysInMonth: Day[] = [];
  holidays: string[] = ['2025-01-01', '2025-12-25']; // ejemplo


  loadMonthly(): void {
    this._asistenciaService.getMonthly()
      .subscribe(records => {
        this.buildCalendar(records);
      });
  }

  buildCalendar(records: AttendanceRecord[]): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Day[] = [];
    const today = new Date();

    // for cada día del mes
    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
      const dt = new Date(year, month, d);
      const ymd = dt.toISOString().split('T')[0];
      const rec = records.find(r => r.date === ymd);
      const isHoliday = this.holidays.includes(ymd);
      const isWeekend = dt.getDay() === 0 || dt.getDay() === 6;
  // (0 = Domingo, 6 = Sábado)

      days.push({
        date: dt,
        ymd,
        state: rec ? rec.state : null,
        isToday: dt.toDateString() === today.toDateString(),
        isHoliday,
        isWeekend
      });
    }

    this.daysInMonth = days;
  }

  // Ejemplo: marcar asistencia (checkin / checkout)
  markToday(): void {
    const todayRec = this.daysInMonth.find(d => d.isToday);
    if (!todayRec) return;

    // Supón que si está null → hacemos checkin, si present → checkout, etc.
    if (todayRec.state === null) {
      this._asistenciaService.checkin().subscribe({
        next: () => this.loadMonthly(),
        error: err => console.error(err)
      });
    } else {
      this._asistenciaService.checkout().subscribe({
        next: () => this.loadMonthly(),
        error: err => console.error(err)
      });
    }
  }

  ngOnInit(): void {
    this.generateCalendar(this.currentDate);
  }

  generateCalendar(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Day[] = [];

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      const clone = new Date(d);
      const ymd = this.toYMD(clone);

      days.push({
        date: clone,
        ymd,
        state: null,
        isToday: this.isToday(clone),
        isHoliday: this.holidays.includes(ymd),
        isWeekend: [0, 6].includes(clone.getDay())
      });
    }

    this.daysInMonth = [...days];
  }

  toggleAttendance(ymd: string): void {
    const day = this.daysInMonth.find(d => d.ymd === ymd);
    if (!day) return;

    if (day.state === null) {
      day.state = 'present';
    } else if (day.state === 'present') {
      day.state = 'absent';
    } else {
      day.state = null;
    }
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar(this.currentDate);
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  private toYMD(date: Date): string {
    return date.toISOString().split('T')[0];
  }


}
