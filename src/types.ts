export interface TimetableCell {
  day: string; // "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7" | "Chủ Nhật"
  timeSlotId: string; // e.g., "slot_s1"
  taskName: string;
  note?: string;
  color: string; // Tailwind bg class or hex code
  textColor?: string; // Tailwind text class or hex code
}

export interface LunchBreakCell {
  taskName: string;
  note?: string;
  color: string;
  textColor?: string;
}

export interface TimeSlot {
  id: string;
  timeText: string;
  session: 'Sáng' | 'Nghỉ trưa' | 'Tối';
}

export interface TimetableData {
  id: string;
  title: string;
  owner: string;
  cells: Record<string, TimetableCell>; // key is "day_timeSlotId"
  lunchBreak: LunchBreakCell;
}

export const DAYS_OF_WEEK = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
  'Chủ Nhật'
];

export const TIME_SLOTS: TimeSlot[] = [
  // Sáng
  { id: 'morning_1', timeText: '5h00 - 6h00', session: 'Sáng' },
  { id: 'morning_2', timeText: '6h00 - 7h00', session: 'Sáng' },
  { id: 'morning_3', timeText: '7h00 - 8h15', session: 'Sáng' },
  { id: 'morning_4', timeText: '8h15 - 9h30', session: 'Sáng' },
  { id: 'morning_5', timeText: '9h30 - 10h45', session: 'Sáng' },
  { id: 'morning_6', timeText: '10h45 - 12h00', session: 'Sáng' },
  
  // Nghỉ trưa (Lunch Break)
  { id: 'lunch_break', timeText: '12h00 - 12h30', session: 'Nghỉ trưa' },
  
  // Tối / Chiều
  { id: 'evening_1', timeText: '12h30 - 14h00', session: 'Tối' },
  { id: 'evening_2', timeText: '14h00 - 15h30', session: 'Tối' },
  { id: 'evening_3', timeText: '15h30 - 17h00', session: 'Tối' },
  { id: 'evening_4', timeText: '17h00 - 18h00', session: 'Tối' },
  { id: 'evening_5', timeText: '18h00 - 19h30', session: 'Tối' },
  { id: 'evening_6', timeText: '19h30 - 21h00', session: 'Tối' },
  { id: 'evening_7', timeText: '21h00 - 22h00', session: 'Tối' }
];

export interface PresetColor {
  name: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  bgHex: string;
  textHex: string;
}

export const PRESET_PASTEL_COLORS: PresetColor[] = [
  { name: 'Xám Tối Giản (Mặc định)', bgClass: 'bg-slate-100/90', borderClass: 'border-slate-200', textClass: 'text-slate-800', bgHex: '#f1f5f9', textHex: '#1e293b' },
  { name: 'Xanh Dương Nhẹ', bgClass: 'bg-blue-50/90', borderClass: 'border-blue-200', textClass: 'text-blue-800', bgHex: '#eff6ff', textHex: '#1e40af' },
  { name: 'Xanh Lá Nhạt', bgClass: 'bg-green-50/90', borderClass: 'border-green-200', textClass: 'text-green-800', bgHex: '#f0fdf4', textHex: '#166534' },
  { name: 'Hồng San Hô', bgClass: 'bg-rose-50/90', borderClass: 'border-rose-200', textClass: 'text-rose-800', bgHex: '#fff1f2', textHex: '#9f1239' },
  { name: 'Tím Lavender', bgClass: 'bg-purple-50/90', borderClass: 'border-purple-200', textClass: 'text-purple-800', bgHex: '#f3e8ff', textHex: '#6b21a8' },
  { name: 'Cam Nhạt', bgClass: 'bg-orange-50/90', borderClass: 'border-orange-200', textClass: 'text-orange-800', bgHex: '#fff7ed', textHex: '#c2410c' },
  { name: 'Vàng Nắng', bgClass: 'bg-amber-50/90', borderClass: 'border-amber-200', textClass: 'text-amber-800', bgHex: '#fffbeb', textHex: '#92400e' },
  { name: 'Xanh Ngọc', bgClass: 'bg-cyan-50/90', borderClass: 'border-cyan-200', textClass: 'text-cyan-800', bgHex: '#ecfeff', textHex: '#155e75' },
  { name: 'Trắng Sữa Tinh Khiết', bgClass: 'bg-neutral-50/90', borderClass: 'border-neutral-200', textClass: 'text-neutral-700', bgHex: '#fafaf9', textHex: '#404040' }
];

