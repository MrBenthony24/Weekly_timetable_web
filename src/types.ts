export interface TimetableCell {
  day: string; // "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7"
  timeSlotId: string; // e.g., "morning_1"
  taskName: string;
  location?: string;
  note?: string;
  colorIndex: number; // Index of the preset color
  isOnline?: boolean;
}

export interface TimeSlot {
  id: string;
  timeText: string;
  session: 'Sáng' | 'Nghỉ trưa' | 'Tối';
}

export interface PresetColor {
  name: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  bgHex: string; // Used for inline styles or custom fallback
  textHex: string;
}

export const DAYS_OF_WEEK = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7'
];

export const TIME_SLOTS: TimeSlot[] = [
  // Sáng
  { id: 'morning_1', timeText: '5h - 6h', session: 'Sáng' },
  { id: 'morning_2', timeText: '6h - 7h', session: 'Sáng' },
  { id: 'morning_3', timeText: '7h - 8h30', session: 'Sáng' },
  { id: 'morning_4', timeText: '8h30 - 9h30', session: 'Sáng' },
  { id: 'morning_5', timeText: '9h30 - 10h30', session: 'Sáng' },
  { id: 'morning_6', timeText: '10h30 - 12h', session: 'Sáng' },
  
  // Nghỉ trưa
  { id: 'lunch_break', timeText: '12h - 12h30', session: 'Nghỉ trưa' },
  
  // Tối (including afternoon as labeled in screenshot)
  { id: 'evening_1', timeText: '12h30 - 2h', session: 'Tối' },
  { id: 'evening_2', timeText: '2h - 3h', session: 'Tối' },
  { id: 'evening_3', timeText: '3h - 4h', session: 'Tối' },
  { id: 'evening_4', timeText: '4h - 5h', session: 'Tối' },
  { id: 'evening_5', timeText: '5h - 7h', session: 'Tối' },
  { id: 'evening_6', timeText: '7h - 8h', session: 'Tối' },
  { id: 'evening_7', timeText: '8h - 9h', session: 'Tối' },
  { id: 'evening_8', timeText: '9h - 11h', session: 'Tối' }
];

export const PRESET_PASTEL_COLORS: PresetColor[] = [
  { name: 'Xanh Dương Nhẹ', bgClass: 'bg-blue-100/90 hover:bg-blue-200/90', borderClass: 'border-blue-200', textClass: 'text-blue-800', bgHex: '#dbeafe', textHex: '#1e40af' },
  { name: 'Xanh Lá Nhạt', bgClass: 'bg-green-100/90 hover:bg-green-200/90', borderClass: 'border-green-200', textClass: 'text-green-800', bgHex: '#dcfce7', textHex: '#166534' },
  { name: 'Hồng Nhẹ CHN', bgClass: 'bg-rose-100/90 hover:bg-rose-200/90', borderClass: 'border-rose-200', textClass: 'text-rose-800', bgHex: '#ffe4e6', textHex: '#9f1239' },
  { name: 'Hồng ADA', bgClass: 'bg-pink-100/90 hover:bg-pink-200/90', borderClass: 'border-pink-200', textClass: 'text-pink-800', bgHex: '#fce7f3', textHex: '#9d174d' },
  { name: 'Tím Lavender', bgClass: 'bg-purple-100/90 hover:bg-purple-200/90', borderClass: 'border-purple-200', textClass: 'text-purple-800', bgHex: '#f3e8ff', textHex: '#6b21a8' },
  { name: 'Cam MMP', bgClass: 'bg-orange-100/90 hover:bg-orange-200/90', borderClass: 'border-orange-200', textClass: 'text-orange-800', bgHex: '#ffedd5', textHex: '#c2410c' },
  { name: 'Vàng Nắng', bgClass: 'bg-amber-100/90 hover:bg-amber-200/90', borderClass: 'border-amber-200', textClass: 'text-amber-800', bgHex: '#fef3c7', textHex: '#92400e' },
  { name: 'Xanh Ngọc', bgClass: 'bg-cyan-100/90 hover:bg-cyan-200/90', borderClass: 'border-cyan-200', textClass: 'text-cyan-800', bgHex: '#ecfeff', textHex: '#155e75' },
  { name: 'Xám Tối Giản', bgClass: 'bg-slate-100/90 hover:bg-slate-200/90', borderClass: 'border-slate-200', textClass: 'text-slate-800', bgHex: '#f1f5f9', textHex: '#1e293b' }
];
