import React, { useState, useEffect, useRef, RefObject } from 'react';
import { 
  Calendar, 
  Heart, 
  Sparkles, 
  Download, 
  Trash2, 
  Copy, 
  Plus, 
  Search, 
  User, 
  RefreshCw, 
  Share2, 
  ArrowRightLeft, 
  Info, 
  Check, 
  BookOpen, 
  Coffee, 
  Clock, 
  Maximize2, 
  Minimize2,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';

import { 
  DAYS_OF_WEEK, 
  TIME_SLOTS, 
  PRESET_PASTEL_COLORS, 
  type TimetableCell, 
  type LunchBreakCell, 
  type TimetableData, 
  type TimeSlot 
} from './types';

// Tribal pattern components made empty for minimalist design
const TribalPattern: React.FC<{ className?: string; height?: number }> = () => {
  return null;
};

const TribalVerticalStripe: React.FC<{ className?: string }> = () => {
  return null;
};

// Let's create starter schedules to populate the app beautifully on first load
const createStarterSchedule1 = (): Record<string, TimetableCell> => {
  const cells: Record<string, TimetableCell> = {};
  
  // Thứ 2: Giải tích 1
  cells['Thứ 2_morning_3'] = {
    day: 'Thứ 2',
    timeSlotId: 'morning_3',
    taskName: 'Giải Tích 1 📐',
    note: 'Giảng đường A2-302',
    color: 'bg-orange-100/90',
    textColor: 'text-orange-700'
  };
  cells['Thứ 2_morning_4'] = {
    day: 'Thứ 2',
    timeSlotId: 'morning_4',
    taskName: 'Giải Tích 1 📐',
    note: 'Giảng đường A2-302',
    color: 'bg-orange-100/90',
    textColor: 'text-orange-700'
  };
  cells['Thứ 2_evening_2'] = {
    day: 'Thứ 2',
    timeSlotId: 'evening_2',
    taskName: 'Học Tiếng Anh 🇬🇧',
    note: 'Trung tâm IELTS',
    color: 'bg-sky-100/90',
    textColor: 'text-sky-700'
  };

  // Thứ 3: Thể dục, tự học, cầu lông
  cells['Thứ 3_morning_4'] = {
    day: 'Thứ 3',
    timeSlotId: 'morning_4',
    taskName: 'Tự Học Thư Viện 📚',
    note: 'Nhóm tự quản lý',
    color: 'bg-amber-100/90',
    textColor: 'text-amber-700'
  };
  cells['Thứ 3_morning_5'] = {
    day: 'Thứ 3',
    timeSlotId: 'morning_5',
    taskName: 'Thể Dục Quốc Phòng 🏃‍♂️',
    note: 'Sân vận động trường',
    color: 'bg-emerald-100/90',
    textColor: 'text-emerald-700'
  };
  cells['Thứ 3_evening_5'] = {
    day: 'Thứ 3',
    timeSlotId: 'evening_5',
    taskName: 'Bóng Rổ 🏀',
    note: 'Sân thể thao khu B',
    color: 'bg-rose-100/90',
    textColor: 'text-rose-700'
  };

  // Thứ 4: Lập trình Web
  cells['Thứ 4_morning_3'] = {
    day: 'Thứ 4',
    timeSlotId: 'morning_3',
    taskName: 'Lập Trình Web 💻',
    note: 'Phòng thực hành 502',
    color: 'bg-purple-100/90',
    textColor: 'text-purple-700'
  };
  cells['Thứ 4_morning_4'] = {
    day: 'Thứ 4',
    timeSlotId: 'morning_4',
    taskName: 'Lập Trình Web 💻',
    note: 'Phòng thực hành 502',
    color: 'bg-purple-100/90',
    textColor: 'text-purple-700'
  };
  cells['Thứ 4_evening_6'] = {
    day: 'Thứ 4',
    timeSlotId: 'evening_6',
    taskName: 'Xem Phim Cùng Bé 🍿',
    note: 'Netflix & Chill',
    color: 'bg-pink-100/90',
    textColor: 'text-pink-700'
  };

  // Thứ 5: Kỹ năng mềm, thực hành lý thuyết
  cells['Thứ 5_morning_5'] = {
    day: 'Thứ 5',
    timeSlotId: 'morning_5',
    taskName: 'Kỹ Năng Mềm 🤝',
    note: 'Hội trường lớn',
    color: 'bg-teal-100/90',
    textColor: 'text-teal-700'
  };
  cells['Thứ 5_evening_2'] = {
    day: 'Thứ 5',
    timeSlotId: 'evening_2',
    taskName: 'Lý Thuyết Mạch 🔌',
    note: 'Tự ôn tập lý thuyết',
    color: 'bg-sky-100/90',
    textColor: 'text-sky-700'
  };

  // Thứ 6: SDI at 306, Chạy bộ
  cells['Thứ 6_morning_3'] = {
    day: 'Thứ 6',
    timeSlotId: 'morning_3',
    taskName: 'SDI at 306 🏫',
    note: 'Phòng chuyên đề 306',
    color: 'bg-rose-100/90',
    textColor: 'text-rose-700'
  };
  cells['Thứ 6_morning_4'] = {
    day: 'Thứ 6',
    timeSlotId: 'morning_4',
    taskName: 'SDI at 306 🏫',
    note: 'Phòng chuyên đề 306',
    color: 'bg-rose-100/90',
    textColor: 'text-rose-700'
  };
  cells['Thứ 6_evening_3'] = {
    day: 'Thứ 6',
    timeSlotId: 'evening_3',
    taskName: 'Chạy Bộ Công Viên 🏃',
    note: '3 vòng công viên gần nhà',
    color: 'bg-emerald-100/90',
    textColor: 'text-emerald-700'
  };

  // Thứ 7: Dọn dẹp, hẹn hò
  cells['Thứ 7_morning_5'] = {
    day: 'Thứ 7',
    timeSlotId: 'morning_5',
    taskName: 'Dọn Dẹp Phòng 🧼',
    note: 'Quét dọn, giặt đồ',
    color: 'bg-slate-100/90',
    textColor: 'text-slate-600'
  };
  cells['Thứ 7_evening_5'] = {
    day: 'Thứ 7',
    timeSlotId: 'evening_5',
    taskName: 'Hẹn Hò Cuối Tuần 🥰',
    note: 'Đi ăn lẩu & uống trà sữa',
    color: 'bg-pink-100/90',
    textColor: 'text-pink-700'
  };
  cells['Thứ 7_evening_6'] = {
    day: 'Thứ 7',
    timeSlotId: 'evening_6',
    taskName: 'Hẹn Hò Cuối Tuần 🥰',
    note: 'Đi ăn lẩu & uống trà sữa',
    color: 'bg-pink-100/90',
    textColor: 'text-pink-700'
  };

  // Chủ Nhật: Cafe, ôn bài
  cells['Chủ Nhật_morning_6'] = {
    day: 'Chủ Nhật',
    timeSlotId: 'morning_6',
    taskName: 'Cafe Bạn Bè ☕',
    note: 'The Coffee House',
    color: 'bg-amber-100/90',
    textColor: 'text-amber-700'
  };
  cells['Chủ Nhật_evening_6'] = {
    day: 'Chủ Nhật',
    timeSlotId: 'evening_6',
    taskName: 'Chuẩn Bị Tuần Mới 📝',
    note: 'Lên kế hoạch tuần sau',
    color: 'bg-slate-100/90',
    textColor: 'text-slate-600'
  };

  return cells;
};

const createStarterSchedule2 = (): Record<string, TimetableCell> => {
  const cells: Record<string, TimetableCell> = {};
  
  // Thứ 2: Kinh tế vĩ mô
  cells['Thứ 2_morning_4'] = {
    day: 'Thứ 2',
    timeSlotId: 'morning_4',
    taskName: 'Kinh Tế Vĩ Mô 📈',
    note: 'Giảng đường B3-101',
    color: 'bg-sky-100/90',
    textColor: 'text-sky-700'
  };
  cells['Thứ 2_morning_5'] = {
    day: 'Thứ 2',
    timeSlotId: 'morning_5',
    taskName: 'Kinh Tế Vĩ Mô 📈',
    note: 'Giảng đường B3-101',
    color: 'bg-sky-100/90',
    textColor: 'text-sky-700'
  };
  cells['Thứ 2_evening_3'] = {
    day: 'Thứ 2',
    timeSlotId: 'evening_3',
    taskName: 'Đọc Sách Thư Giãn 📖',
    note: 'Hạt giống tâm hồn',
    color: 'bg-amber-100/90',
    textColor: 'text-amber-700'
  };

  // Thứ 3: Học nhóm, Yoga
  cells['Thứ 3_morning_3'] = {
    day: 'Thứ 3',
    timeSlotId: 'morning_3',
    taskName: 'Học Nhóm Tiếng Anh 👥',
    note: 'Học online Zoom',
    color: 'bg-emerald-100/90',
    textColor: 'text-emerald-700'
  };
  cells['Thứ 3_evening_2'] = {
    day: 'Thứ 3',
    timeSlotId: 'evening_2',
    taskName: 'Yoga Nhẹ Nhàng 🧘‍♀️',
    note: 'Phòng tập Aura',
    color: 'bg-purple-100/90',
    textColor: 'text-purple-700'
  };

  // Thứ 4: Tiếng Nhật
  cells['Thứ 4_morning_4'] = {
    day: 'Thứ 4',
    timeSlotId: 'morning_4',
    taskName: 'Tiếng Nhật Cơ Bản 🇯🇵',
    note: 'Học bảng chữ cái Hiragana',
    color: 'bg-orange-100/90',
    textColor: 'text-orange-700'
  };
  cells['Thứ 4_morning_5'] = {
    day: 'Thứ 4',
    timeSlotId: 'morning_5',
    taskName: 'Tiếng Nhật Cơ Bản 🇯🇵',
    note: 'Học bảng chữ cái Hiragana',
    color: 'bg-orange-100/90',
    textColor: 'text-orange-700'
  };
  cells['Thứ 4_evening_6'] = {
    day: 'Thứ 4',
    timeSlotId: 'evening_6',
    taskName: 'Xem Phim Cùng Bé 🍿',
    note: 'Netflix & Chill',
    color: 'bg-pink-100/90',
    textColor: 'text-pink-700'
  };

  // Thứ 5: Thuyết trình, siêu thị
  cells['Thứ 5_morning_6'] = {
    day: 'Thứ 5',
    timeSlotId: 'morning_6',
    taskName: 'Thuyết Trình Nhóm 🎤',
    note: 'Học phần Kỹ năng',
    color: 'bg-rose-100/90',
    textColor: 'text-rose-700'
  };
  cells['Thứ 5_evening_3'] = {
    day: 'Thứ 5',
    timeSlotId: 'evening_3',
    taskName: 'Mua Sắm Siêu Thị 🛒',
    note: 'Lotte Mart Quận 7',
    color: 'bg-slate-100/90',
    textColor: 'text-slate-600'
  };

  // Thứ 6: Phân tích dữ liệu, Cầu lông
  cells['Thứ 6_morning_4'] = {
    day: 'Thứ 6',
    timeSlotId: 'morning_4',
    taskName: 'Phân Tích Dữ Liệu 📊',
    note: 'Phòng Lab tầng 4',
    color: 'bg-teal-100/90',
    textColor: 'text-teal-700'
  };
  cells['Thứ 6_morning_5'] = {
    day: 'Thứ 6',
    timeSlotId: 'morning_5',
    taskName: 'Phân Tích Dữ Liệu 📊',
    note: 'Phòng Lab tầng 4',
    color: 'bg-teal-100/90',
    textColor: 'text-teal-700'
  };
  cells['Thứ 6_evening_5'] = {
    day: 'Thứ 6',
    timeSlotId: 'evening_5',
    taskName: 'Cầu Lông 🏸',
    note: 'Sân cầu lông Kỳ Hòa',
    color: 'bg-emerald-100/90',
    textColor: 'text-emerald-700'
  };

  // Thứ 7: Làm bánh, hẹn hò
  cells['Thứ 7_morning_4'] = {
    day: 'Thứ 7',
    timeSlotId: 'morning_4',
    taskName: 'Làm Bánh Ngọt 🍰',
    note: 'Bánh bông lan trứng muối',
    color: 'bg-orange-100/90',
    textColor: 'text-orange-700'
  };
  cells['Thứ 7_morning_5'] = {
    day: 'Thứ 7',
    timeSlotId: 'morning_5',
    taskName: 'Làm Bánh Ngọt 🍰',
    note: 'Học công thức mới',
    color: 'bg-orange-100/90',
    textColor: 'text-orange-700'
  };
  cells['Thứ 7_evening_5'] = {
    day: 'Thứ 7',
    timeSlotId: 'evening_5',
    taskName: 'Hẹn Hò Cuối Tuần 🥰',
    note: 'Đi ăn lẩu & uống trà sữa',
    color: 'bg-pink-100/90',
    textColor: 'text-pink-700'
  };
  cells['Thứ 7_evening_6'] = {
    day: 'Thứ 7',
    timeSlotId: 'evening_6',
    taskName: 'Hẹn Hò Cuối Tuần 🥰',
    note: 'Đi ăn lẩu & uống trà sữa',
    color: 'bg-pink-100/90',
    textColor: 'text-pink-700'
  };

  // Chủ Nhật: Ngủ nướng, chuẩn bị bài
  cells['Chủ Nhật_morning_5'] = {
    day: 'Chủ Nhật',
    timeSlotId: 'morning_5',
    taskName: 'Ngủ Nướng Tự Do 💤',
    note: 'Nghỉ ngơi hồi phục sức',
    color: 'bg-amber-100/90',
    textColor: 'text-amber-700'
  };
  cells['Chủ Nhật_evening_6'] = {
    day: 'Chủ Nhật',
    timeSlotId: 'evening_6',
    taskName: 'Chuẩn Bị Tuần Mới 📝',
    note: 'Dọn bàn học, soạn tập',
    color: 'bg-slate-100/90',
    textColor: 'text-slate-600'
  };

  return cells;
};

export default function App() {
  // Load data from localstorage or use preloaded beautiful timetables
  const [timetable1, setTimetable1] = useState<TimetableData>(() => {
    const saved = localStorage.getItem('pastel_pink_timetable_1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      id: 'tb_1',
      title: 'Thời Khóa Biểu Của Mình ⏱️',
      owner: 'Huy Ngô',
      cells: createStarterSchedule1(),
      lunchBreak: {
        taskName: 'Ăn Trưa & Nghỉ Ngơi Buổi Trưa 🍲💤',
        note: 'Giải lao thoải mái nạp năng lượng',
        color: 'bg-slate-50 border-slate-200',
        textColor: 'text-slate-600'
      }
    };
  });

  const [timetable2, setTimetable2] = useState<TimetableData>(() => {
    const saved = localStorage.getItem('pastel_pink_timetable_2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      id: 'tb_2',
      title: 'Thời Khóa Biểu Đối Tác ⏱️',
      owner: 'Trúc Vy',
      cells: createStarterSchedule2(),
      lunchBreak: {
        taskName: 'Nghỉ Trưa & Chợp Mắt Thư Giãn 🍱🧸',
        note: 'Nghe nhạc nhẹ hoặc chợp mắt 30 phút',
        color: 'bg-slate-50 border-slate-200',
        textColor: 'text-slate-600'
      }
    };
  });

  // Current view: 'single_1' (Table 1), 'single_2' (Table 2), 'dual' (Compare both side-by-side)
  const [activeView, setActiveView] = useState<'single_1' | 'single_2' | 'dual'>(() => {
    // Default to 'dual' view on desktop size, let's keep it in state
    return 'dual';
  });

  // Active highlighted search query
  const [searchQuery, setSearchQuery] = useState('');

  // Mode sáng/tối (Light/Dark mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('timetable_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('timetable_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Editing state
  const [editingCell, setEditingCell] = useState<{
    timetableId: '1' | '2';
    day?: string; // If undefined, we are editing lunchBreak!
    timeSlotId?: string; // If undefined, we are editing lunchBreak!
  } | null>(null);

  // Form input fields for the active modal
  const [formTaskName, setFormTaskName] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formColor, setFormColor] = useState<string>('bg-slate-100/90');
  const [formTextColor, setFormTextColor] = useState<string>('text-slate-800');
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [customHexBg, setCustomHexBg] = useState('#f1f5f9');
  const [customHexText, setCustomHexText] = useState('#1e293b');

  // Notification / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null); // Id of table being exported, or 'dual'

  // Ref pointers to capture DOM screenshots
  const table1Ref = useRef<HTMLDivElement>(null);
  const table2Ref = useRef<HTMLDivElement>(null);
  const dualViewRef = useRef<HTMLDivElement>(null);

  // Helper to resolve cell styling classes with dark mode support
  const getCellThemeClasses = (colorClass: string, textClass: string) => {
    if (!colorClass) return 'bg-slate-100/90 text-slate-800 border-slate-200';
    if (colorClass.startsWith('#')) return '';
    
    // Default fallback
    let darkBg = 'dark:bg-slate-800/60';
    let darkText = 'dark:text-slate-200';
    let darkBorder = 'dark:border-slate-700/60';
    
    const colorLower = colorClass.toLowerCase();
    if (colorLower.includes('blue')) {
      darkBg = 'dark:bg-blue-950/40';
      darkText = 'dark:text-blue-300';
      darkBorder = 'dark:border-blue-900/60';
    } else if (colorLower.includes('green')) {
      darkBg = 'dark:bg-green-950/40';
      darkText = 'dark:text-green-300';
      darkBorder = 'dark:border-green-900/60';
    } else if (colorLower.includes('rose') || colorLower.includes('pink') || colorLower.includes('red')) {
      darkBg = 'dark:bg-rose-950/40';
      darkText = 'dark:text-rose-300';
      darkBorder = 'dark:border-rose-900/60';
    } else if (colorLower.includes('purple') || colorLower.includes('indigo') || colorLower.includes('violet')) {
      darkBg = 'dark:bg-purple-950/40';
      darkText = 'dark:text-purple-300';
      darkBorder = 'dark:border-purple-900/60';
    } else if (colorLower.includes('orange') || colorLower.includes('amber') || colorLower.includes('yellow')) {
      darkBg = 'dark:bg-amber-950/40';
      darkText = 'dark:text-amber-300';
      darkBorder = 'dark:border-amber-900/60';
    } else if (colorLower.includes('cyan')) {
      darkBg = 'dark:bg-cyan-950/40';
      darkText = 'dark:text-cyan-300';
      darkBorder = 'dark:border-cyan-900/60';
    }
    
    return `${colorClass} ${textClass} border-slate-200/60 ${darkBg} ${darkText} ${darkBorder}`;
  };

  // Sync to localstorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pastel_pink_timetable_1', JSON.stringify(timetable1));
  }, [timetable1]);

  useEffect(() => {
    localStorage.setItem('pastel_pink_timetable_2', JSON.stringify(timetable2));
  }, [timetable2]);

  // Utility to display temporary success notification
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle cell click -> opens the editing modal
  const handleCellClick = (timetableId: '1' | '2', day: string, timeSlotId: string) => {
    const timetable = timetableId === '1' ? timetable1 : timetable2;
    const key = `${day}_${timeSlotId}`;
    const cell = timetable.cells[key];

    setEditingCell({ timetableId, day, timeSlotId });
    setFormTaskName(cell?.taskName || '');
    setFormNote(cell?.note || '');
    
    // Check if the cell has standard styling or hex colors
    if (cell?.color && cell.color.startsWith('#')) {
      setIsCustomColor(true);
      setCustomHexBg(cell.color);
      setCustomHexText(cell.textColor || '#8a2be2');
    } else {
      setIsCustomColor(false);
      setFormColor(cell?.color || 'bg-pink-100/90');
      setFormTextColor(cell?.textColor || 'text-pink-700');
    }
  };

  // Handle lunch break click -> single spanned row edit
  const handleLunchClick = (timetableId: '1' | '2') => {
    const timetable = timetableId === '1' ? timetable1 : timetable2;
    setEditingCell({ timetableId }); // No day/timeSlotId means lunchBreak
    setFormTaskName(timetable.lunchBreak.taskName || '');
    setFormNote(timetable.lunchBreak.note || '');
    
    if (timetable.lunchBreak.color.startsWith('#')) {
      setIsCustomColor(true);
      setCustomHexBg(timetable.lunchBreak.color);
      setCustomHexText(timetable.lunchBreak.textColor || '#c084fc');
    } else {
      setIsCustomColor(false);
      setFormColor(timetable.lunchBreak.color || 'bg-pink-50');
      setFormTextColor(timetable.lunchBreak.textColor || 'text-pink-600');
    }
  };

  // Save changes from modal back to the schedule
  const handleSaveCell = () => {
    if (!editingCell) return;

    const { timetableId, day, timeSlotId } = editingCell;
    const isLunch = !day || !timeSlotId;

    const chosenColor = isCustomColor ? customHexBg : formColor;
    const chosenTextColor = isCustomColor ? customHexText : formTextColor;

    if (timetableId === '1') {
      const updated = { ...timetable1 };
      if (isLunch) {
        updated.lunchBreak = {
          taskName: formTaskName.trim(),
          note: formNote.trim(),
          color: chosenColor,
          textColor: chosenTextColor,
        };
      } else {
        const key = `${day}_${timeSlotId}`;
        if (!formTaskName.trim()) {
          delete updated.cells[key];
        } else {
          updated.cells[key] = {
            day,
            timeSlotId,
            taskName: formTaskName.trim(),
            note: formNote.trim(),
            color: chosenColor,
            textColor: chosenTextColor,
          };
        }
      }
      setTimetable1(updated);
    } else {
      const updated = { ...timetable2 };
      if (isLunch) {
        updated.lunchBreak = {
          taskName: formTaskName.trim(),
          note: formNote.trim(),
          color: chosenColor,
          textColor: chosenTextColor,
        };
      } else {
        const key = `${day}_${timeSlotId}`;
        if (!formTaskName.trim()) {
          delete updated.cells[key];
        } else {
          updated.cells[key] = {
            day,
            timeSlotId,
            taskName: formTaskName.trim(),
            note: formNote.trim(),
            color: chosenColor,
            textColor: chosenTextColor,
          };
        }
      }
      setTimetable2(updated);
    }

    setEditingCell(null);
    triggerToast('Đã lưu thay đổi thời khóa biểu thành công! ✨');
  };

  // Delete/Clear the specific slot directly
  const handleDeleteCell = () => {
    if (!editingCell) return;

    const { timetableId, day, timeSlotId } = editingCell;
    const isLunch = !day || !timeSlotId;

    if (timetableId === '1') {
      const updated = { ...timetable1 };
      if (isLunch) {
        updated.lunchBreak = {
          taskName: '',
          note: '',
          color: 'bg-pink-50',
          textColor: 'text-pink-600'
        };
      } else {
        const key = `${day}_${timeSlotId}`;
        delete updated.cells[key];
      }
      setTimetable1(updated);
    } else {
      const updated = { ...timetable2 };
      if (isLunch) {
        updated.lunchBreak = {
          taskName: '',
          note: '',
          color: 'bg-rose-50',
          textColor: 'text-rose-600'
        };
      } else {
        const key = `${day}_${timeSlotId}`;
        delete updated.cells[key];
      }
      setTimetable2(updated);
    }

    setEditingCell(null);
    triggerToast('Đã xóa buổi học/hoạt động này! 🧹');
  };

  // Quick action: Clear entire timetable
  const handleClearAll = (timetableId: '1' | '2') => {
    const confirmText = timetableId === '1' ? timetable1.owner : timetable2.owner;
    if (window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ lịch trình của [${confirmText}] không?`)) {
      if (timetableId === '1') {
        setTimetable1({
          ...timetable1,
          cells: {},
          lunchBreak: {
            taskName: 'Nghỉ trưa',
            note: '',
            color: 'bg-pink-50',
            textColor: 'text-pink-600'
          }
        });
      } else {
        setTimetable2({
          ...timetable2,
          cells: {},
          lunchBreak: {
            taskName: 'Nghỉ trưa',
            note: '',
            color: 'bg-rose-50',
            textColor: 'text-rose-600'
          }
        });
      }
      triggerToast('Đã xóa toàn bộ thời khóa biểu! Thỏa sức sáng tạo mới nhé. 💕');
    }
  };

  // Quick action: Copy Schedule 1 contents into Schedule 2, or vice versa
  const handleCopySchedule = (fromId: '1' | '2', toId: '1' | '2') => {
    const fromTable = fromId === '1' ? timetable1 : timetable2;
    const toTable = toId === '1' ? timetable1 : timetable2;
    
    if (window.confirm(`Bạn muốn sao chép toàn bộ thời khóa biểu từ [${fromTable.owner}] sang [${toTable.owner}] chứ? (Lưu ý: Thao tác này sẽ ghi đè dữ liệu cũ của ${toTable.owner})`)) {
      const copiedCells = JSON.parse(JSON.stringify(fromTable.cells)) as Record<string, TimetableCell>;
      // Map days and keys safely
      const copiedLunch = { ...fromTable.lunchBreak };

      if (toId === '1') {
        setTimetable1({
          ...timetable1,
          cells: copiedCells,
          lunchBreak: copiedLunch
        });
      } else {
        setTimetable2({
          ...timetable2,
          cells: copiedCells,
          lunchBreak: copiedLunch
        });
      }
      triggerToast(`Đã sao chép lịch trình từ [${fromTable.owner}] sang [${toTable.owner}] thành công! 📑✨`);
    }
  };

  // Swap entire schedules with each other
  const handleSwapSchedules = () => {
    if (window.confirm('Bạn có muốn hoán đổi toàn bộ thời khóa biểu của hai người với nhau không?')) {
      const tempCells1 = JSON.parse(JSON.stringify(timetable1.cells));
      const tempLunch1 = { ...timetable1.lunchBreak };

      const tempCells2 = JSON.parse(JSON.stringify(timetable2.cells));
      const tempLunch2 = { ...timetable2.lunchBreak };

      setTimetable1({
        ...timetable1,
        cells: tempCells2,
        lunchBreak: tempLunch2
      });

      setTimetable2({
        ...timetable2,
        cells: tempCells1,
        lunchBreak: tempLunch1
      });

      triggerToast('Đã hoán đổi thành công lịch trình của cả hai! 🔄💕');
    }
  };

  // Update Owner name
  const handleOwnerChange = (timetableId: '1' | '2', newName: string) => {
    if (timetableId === '1') {
      setTimetable1({ ...timetable1, owner: newName });
    } else {
      setTimetable2({ ...timetable2, owner: newName });
    }
  };

  // Quick theme applicator: apply predefined template types (English major, Dev major, Highschool, Empty)
  const applyPresetTemplate = (timetableId: '1' | '2', type: 'english' | 'tech' | 'exam') => {
    const cells: Record<string, TimetableCell> = {};
    
    if (type === 'english') {
      cells['Thứ 2_morning_3'] = { day: 'Thứ 2', timeSlotId: 'morning_3', taskName: 'English Phonetics 🗣️', note: 'Phòng B204', color: 'bg-rose-100/90', textColor: 'text-rose-700' };
      cells['Thứ 2_morning_4'] = { day: 'Thứ 2', timeSlotId: 'morning_4', taskName: 'English Phonetics 🗣️', note: 'Phòng B204', color: 'bg-rose-100/90', textColor: 'text-rose-700' };
      cells['Thứ 3_evening_2'] = { day: 'Thứ 3', timeSlotId: 'evening_2', taskName: 'Reading & Writing 📖', note: 'Thư viện tầng 2', color: 'bg-purple-100/90', textColor: 'text-purple-700' };
      cells['Thứ 4_morning_5'] = { day: 'Thứ 4', timeSlotId: 'morning_5', taskName: 'Listening Skill 🎧', note: 'Phòng Lab 102', color: 'bg-sky-100/90', textColor: 'text-sky-700' };
      cells['Thứ 5_evening_3'] = { day: 'Thứ 5', timeSlotId: 'evening_3', taskName: 'Speaking Practice 💬', note: 'CLB Ngoại ngữ', color: 'bg-emerald-100/90', textColor: 'text-emerald-700' };
      cells['Thứ 6_morning_4'] = { day: 'Thứ 6', timeSlotId: 'morning_4', taskName: 'Grammar in Use 📝', note: 'Học online', color: 'bg-amber-100/90', textColor: 'text-amber-700' };
      cells['Thứ 7_evening_5'] = { day: 'Thứ 7', timeSlotId: 'evening_5', taskName: 'Hẹn hò xem phim 🎬', note: 'Rạp CGV', color: 'bg-pink-100/90', textColor: 'text-pink-700' };
    } else if (type === 'tech') {
      cells['Thứ 2_morning_3'] = { day: 'Thứ 2', timeSlotId: 'morning_3', taskName: 'Cấu trúc dữ liệu 💻', note: 'Giảng đường A', color: 'bg-sky-100/90', textColor: 'text-sky-700' };
      cells['Thứ 2_morning_4'] = { day: 'Thứ 2', timeSlotId: 'morning_4', taskName: 'Giải thuật cơ bản 💻', note: 'Giảng đường A', color: 'bg-sky-100/90', textColor: 'text-sky-700' };
      cells['Thứ 3_evening_2'] = { day: 'Thứ 3', timeSlotId: 'evening_2', taskName: 'Cơ sở dữ liệu SQL 🗄️', note: 'Tự học', color: 'bg-teal-100/90', textColor: 'text-teal-700' };
      cells['Thứ 4_morning_4'] = { day: 'Thứ 4', timeSlotId: 'morning_4', taskName: 'Lập trình Mobile 📱', note: 'Phòng Lab 5', color: 'bg-purple-100/90', textColor: 'text-purple-700' };
      cells['Thứ 5_evening_4'] = { day: 'Thứ 5', timeSlotId: 'evening_4', taskName: 'Học UI/UX Figma 🎨', note: 'Youtube khóa học', color: 'bg-pink-100/90', textColor: 'text-pink-700' };
      cells['Thứ 6_morning_5'] = { day: 'Thứ 6', timeSlotId: 'morning_5', taskName: 'An toàn thông tin 🔒', note: 'Hội trường C', color: 'bg-amber-100/90', textColor: 'text-amber-700' };
      cells['Thứ 7_evening_1'] = { day: 'Thứ 7', timeSlotId: 'evening_1', taskName: 'Hackathon coding ⌨️', note: 'Discord Team', color: 'bg-orange-100/90', textColor: 'text-orange-700' };
    } else if (type === 'exam') {
      cells['Thứ 2_morning_3'] = { day: 'Thứ 2', timeSlotId: 'morning_3', taskName: 'Luyện đề Toán 🧮', note: 'Đặt giờ 90 phút', color: 'bg-rose-100/90', textColor: 'text-rose-700' };
      cells['Thứ 3_morning_4'] = { day: 'Thứ 3', timeSlotId: 'morning_4', taskName: 'Luyện đề Lý ⚡', note: 'Tập trung công thức', color: 'bg-sky-100/90', textColor: 'text-sky-700' };
      cells['Thứ 4_morning_3'] = { day: 'Thứ 4', timeSlotId: 'morning_3', taskName: 'Luyện đề Hóa 🧪', note: 'Học thuộc lý thuyết', color: 'bg-emerald-100/90', textColor: 'text-emerald-700' };
      cells['Thứ 5_evening_2'] = { day: 'Thứ 5', timeSlotId: 'evening_2', taskName: 'Học từ vựng Anh 📝', note: 'Flashcards', color: 'bg-purple-100/90', textColor: 'text-purple-700' };
      cells['Thứ 6_morning_5'] = { day: 'Thứ 6', timeSlotId: 'morning_5', taskName: 'Tổng hợp lỗi sai ❌', note: 'Sổ tay sửa lỗi', color: 'bg-amber-100/90', textColor: 'text-amber-700' };
      cells['Thứ 7_evening_5'] = { day: 'Thứ 7', timeSlotId: 'evening_5', taskName: 'Xả stress đi dạo 🌳', note: 'Công viên quận', color: 'bg-pink-100/90', textColor: 'text-pink-700' };
    }

    if (timetableId === '1') {
      setTimetable1({
        ...timetable1,
        cells,
        lunchBreak: {
          taskName: 'Nghỉ trưa & Sạc năng lượng 🔋🍲',
          note: 'Cơm trưa tự nấu',
          color: 'bg-pink-50',
          textColor: 'text-pink-600'
        }
      });
    } else {
      setTimetable2({
        ...timetable2,
        cells,
        lunchBreak: {
          taskName: 'Ăn trưa nhẹ & Chill 🥗🎧',
          note: 'Nghe nhạc nhẹ',
          color: 'bg-rose-50',
          textColor: 'text-rose-600'
        }
      });
    }
    triggerToast('Đã áp dụng lịch mẫu xinh xắn thành công! 💖');
  };

  // Convert table/layout into a high-quality PNG image for saving
  const handleExportImage = async (ref: RefObject<HTMLDivElement | null>, fileName: string, exportId: string) => {
    if (!ref.current) return;
    setIsExporting(exportId);
    
    // Give state transition a microsecond to settle
    await new Promise((resolve) => setTimeout(resolve, 350));

    try {
      // Find element to snapshot
      const element = ref.current;
      
      // Temporary style adjustments to guarantee pristine rendering on mobile browsers
      const originalStyleWidth = element.style.width;
      const originalOverflow = element.style.overflow;
      
      // Force element to be fully laid out without clipping/scrollbars
      element.style.overflow = 'visible';
      
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2, // Retinal high resolution scaling
        backgroundColor: darkMode ? '#090d16' : '#f8fafc', // Adaptive background based on dark mode
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        onclone: (clonedDoc) => {
          // Adjust layout of the cloned element to ensure everything is perfect
          const clonedEl = clonedDoc.getElementById(element.id);
          if (clonedEl) {
            clonedEl.style.maxHeight = 'none';
            clonedEl.style.boxShadow = 'none';
            clonedEl.style.borderRadius = '16px';
            clonedEl.style.padding = '24px';
          }
        }
      });

      // Restore styles
      element.style.width = originalStyleWidth;
      element.style.overflow = originalOverflow;

      // Create download trigger
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      triggerToast('Đã tải xuống ảnh thời khóa biểu nét cao! 📸🌸');
    } catch (err) {
      console.error('Image capture failed:', err);
      triggerToast('Gặp lỗi khi tạo ảnh. Vui lòng thử lại trên trình duyệt Chrome/Safari! 🥺');
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className={`min-h-screen pb-24 font-sans relative selection:bg-slate-200 selection:text-slate-900 overflow-x-hidden transition-colors duration-300 ${
      darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Repeating side vertical patterns disabled for minimalist design */}
      <TribalVerticalStripe className="left-0" />
      <TribalVerticalStripe className="right-0" />

      {/* Header horizontal pattern banner disabled for minimalist design */}
      <TribalPattern height={42} />

      {/* Modern Soft Background Accents */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900/50 dark:to-slate-950/20 -z-10 rounded-b-[40px] opacity-70 pointer-events-none transition-colors duration-300" />
      <div className="absolute top-32 right-12 w-48 h-48 bg-slate-200 dark:bg-slate-850 rounded-full filter blur-3xl -z-10 opacity-30 dark:opacity-10 transition-colors duration-300" />
      <div className="absolute top-80 left-16 w-72 h-72 bg-slate-200 dark:bg-slate-850 rounded-full filter blur-3xl -z-10 opacity-20 dark:opacity-10 transition-colors duration-300" />

      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            id="toast-notification"
            className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2.5 backdrop-blur-md"
          >
            <span className="text-slate-500 text-lg">✨</span>
            <span className="font-semibold text-sm tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <header className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center xl:px-0">

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
          Thời Khóa Biểu <span className="text-slate-800 dark:text-slate-100 relative inline-block">
            Tối Giản Duo
            <span className="absolute bottom-1.5 left-0 w-full h-2 bg-slate-200/80 dark:bg-slate-800/80 -z-10 rounded-full" />
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Được thiết kế tinh tế với phong cách tối giản hiện đại, màu sắc trang nhã, sắc nét. Tạo và xuất ảnh thời khóa biểu song song siêu tốc!
        </p>
      </header>

      {/* Dynamic Divider Graphic */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <hr className="border-slate-200 dark:border-slate-800" />
      </div>

      {/* Search and Global Layout Control Box */}
      <section className="max-w-5xl mx-auto px-4 mb-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-5 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center transition-colors duration-300">
          
          {/* Left: View selector tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800 w-full md:w-auto" id="view-mode-tabs">
            <button
              onClick={() => setActiveView('single_1')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeView === 'single_1'
                  ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="truncate">{timetable1.owner || 'Bảng 1'}</span>
            </button>
            <button
              onClick={() => setActiveView('single_2')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeView === 'single_2'
                  ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <Heart className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="truncate">{timetable2.owner || 'Bảng 2'}</span>
            </button>
            <button
              onClick={() => setActiveView('dual')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeView === 'dual'
                  ? 'bg-slate-800 dark:bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Xem Cả Hai 👩‍❤️‍👨</span>
            </button>
          </div>

          {/* Center/Right controls: Search highlight filter, swap buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
            {/* Search filter input */}
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-slate-400 dark:text-slate-500"><Search className="h-4 w-4" /></span>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ khóa (ví dụ: Toán, Cầu lông)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-800 focus:border-slate-400 dark:focus:border-slate-800 text-sm placeholder-slate-400 dark:placeholder-slate-500 transition-all text-slate-800 dark:text-white font-medium"
                id="task-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Actions Button Container */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
                className="flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                id="theme-toggle-button"
              >
                {darkMode ? (
                  <Sun className="w-4.5 h-4.5 text-amber-500 animate-[spin_12s_linear_infinite]" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-indigo-400" />
                )}
              </button>

              <button
                onClick={handleSwapSchedules}
                title="Hoán đổi lịch hai người"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
                id="swap-schedules-button"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Hoán đổi lịch</span>
              </button>
              
              <button
                onClick={() => {
                  if (activeView === 'dual') {
                    handleExportImage(dualViewRef, `Dual_Timetable_${timetable1.owner}_${timetable2.owner}`, 'dual');
                  } else if (activeView === 'single_1') {
                    handleExportImage(table1Ref, `Timetable_${timetable1.owner}`, '1');
                  } else {
                    handleExportImage(table2Ref, `Timetable_${timetable2.owner}`, '2');
                  }
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-900 dark:hover:bg-slate-200 active:scale-[0.98] transition-all shadow-sm"
                id="global-export-button"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Toàn Bộ Ảnh 📸</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Guide Note */}
      <section className="max-w-5xl mx-auto px-4 mb-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-slate-400 dark:border-l-slate-600 p-3 rounded-r-xl flex items-start gap-3 shadow-xs transition-colors duration-300">
          <Info className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-800 dark:text-slate-200">Mẹo tương tác:</span> Click trực tiếp vào bất kỳ <span className="font-bold underline">ô thời gian</span> hoặc <span className="font-semibold underline">thanh nghỉ trưa</span> nào để thêm công việc mới, chỉnh sửa nội dung, hoặc tô điểm thêm các tông màu trang nhã tự chọn! Lịch trình được tự động lưu lại trên máy của bạn.
          </div>
        </div>
      </section>

      {/* MAIN TIMETABLES LAYOUT CONTAINER */}
      <main className="max-w-5xl mx-auto px-4">
        <div ref={dualViewRef} id="dual-view-container" className="p-1 rounded-2xl bg-transparent">
          <div className="grid gap-8 grid-cols-1">
            
            {/* TIMETABLE 1 */}
            {(activeView === 'dual' || activeView === 'single_1') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-6 shadow-xs relative overflow-hidden transition-colors duration-300"
                id="timetable-section-1"
              >
                {/* Background watermarks disabled */}

                {/* Header controls for Timetable 1 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 mb-3 border-b border-slate-200/60 dark:border-b-slate-800/80 relative z-10">
                  <div className="w-full sm:w-auto">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">⏱️</span>
                      <input 
                        type="text" 
                        value={timetable1.owner} 
                        onChange={(e) => handleOwnerChange('1', e.target.value)}
                        placeholder="Tên của bạn..."
                        className="bg-slate-50 hover:bg-slate-100 focus:bg-white dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus:bg-slate-900 text-base font-extrabold text-slate-800 dark:text-white px-2 py-0.5 rounded-lg border border-transparent focus:border-slate-400 dark:focus:border-slate-800 outline-none w-44 transition-all"
                        id="owner-name-1"
                        title="Thay đổi tên chủ sở hữu"
                      />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Thời khóa biểu của bạn</div>
                  </div>

                  {/* Template Quick Selection */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold mr-1 hidden md:inline">Lịch mẫu:</span>
                    <button 
                      onClick={() => applyPresetTemplate('1', 'english')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all border border-slate-200 dark:border-slate-800"
                      title="Áp dụng lịch Ngoại Ngữ mẫu"
                    >
                      🗣️ Anh Ngữ
                    </button>
                    <button 
                      onClick={() => applyPresetTemplate('1', 'tech')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all border border-slate-200 dark:border-slate-800"
                      title="Áp dụng lịch CNTT mẫu"
                    >
                      💻 Công Nghệ
                    </button>
                    <button 
                      onClick={() => applyPresetTemplate('1', 'exam')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all border border-slate-200 dark:border-slate-800"
                      title="Áp dụng lịch Luyện Thi mẫu"
                    >
                      📐 Luyện Thi
                    </button>
                    <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />
                    <button 
                      onClick={() => handleClearAll('1')}
                      className="p-1 py-1 px-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-850 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-xs font-bold flex items-center gap-1"
                      title="Xóa trống bảng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden xl:inline">Xóa</span>
                    </button>
                  </div>
                </div>

                {/* Table Core Container */}
                <div ref={table1Ref} id="timetable-capture-1" className="bg-white dark:bg-slate-900 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800 p-2 shadow-xs scrollbar-thin transition-colors duration-300">
                  
                  {/* Decorative exported banner, shown only inside exported image */}
                  <div className="hidden printing-banner text-center py-4 px-2 bg-slate-50 dark:bg-slate-950 rounded-xl mb-4 border border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">⏱️ Lịch Trình Của {timetable1.owner} ⏱️</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Được lập từ Timetable Duo • Thiết kế tối giản</p>
                  </div>

                  <table className="w-full border-collapse text-left min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                        <th className="py-2.5 px-3 font-bold text-xs text-slate-700 dark:text-slate-300 tracking-wider text-center w-24">Giờ</th>
                        {DAYS_OF_WEEK.map((day) => (
                          <th key={day} className="py-2.5 px-2 font-bold text-xs text-slate-700 dark:text-slate-300 tracking-wider text-center border-l border-slate-200 dark:border-l-slate-800">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* --- MORNING SECTION --- */}
                      <tr className="bg-slate-50/50 dark:bg-slate-950/40">
                        <td className="py-1 px-2 text-center text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-r-slate-800 uppercase tracking-widest" colSpan={8}>
                          🌅 Buổi Sáng
                        </td>
                      </tr>
                      {TIME_SLOTS.filter(s => s.session === 'Sáng').map((slot) => (
                        <tr key={slot.id} className="border-b border-slate-100 dark:border-b-slate-800/50 hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors">
                          {/* Time label cell */}
                          <td className="py-1 px-1.5 text-center text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col justify-center min-h-[38px]">
                            <div className="flex flex-col items-center justify-center gap-0.5 leading-tight">
                              <Clock className="w-2.5 h-2.5 text-slate-400 inline-block" />
                              <span>{slot.timeText}</span>
                            </div>
                          </td>
                          {/* Day column cells */}
                          {DAYS_OF_WEEK.map((day) => {
                            const key = `${day}_${slot.id}`;
                            const cell = timetable1.cells[key];
                            const isMatched = searchQuery && (
                                cell?.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                cell?.note?.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            
                            return (
                              <td 
                                key={day} 
                                onClick={() => handleCellClick('1', day, slot.id)}
                                className={`p-1 border-l border-slate-100 dark:border-l-slate-800/40 align-top transition-all duration-200 cursor-pointer w-[12%] group relative min-h-[38px] ${
                                  cell ? '' : 'hover:bg-slate-50/30 dark:hover:bg-slate-800/30'
                                }`}
                              >
                                {cell ? (
                                  <div 
                                    className={`w-full h-full min-h-[30px] rounded-md p-1 text-xs border transition-all shadow-xs relative flex flex-col justify-between ${
                                      cell.color?.startsWith('#') ? '' : getCellThemeClasses(cell.color, cell.textColor || 'text-slate-800')
                                    } ${
                                      isMatched ? 'ring-2 ring-slate-400 dark:ring-slate-500 scale-[1.02] shadow-sm animate-pulse' : 'hover:scale-[1.01] hover:shadow-sm'
                                    }`}
                                    style={cell.color?.startsWith('#') ? {
                                      backgroundColor: cell.color,
                                      borderColor: darkMode ? '#334155' : `${cell.color}ee`,
                                      color: cell.textColor || (darkMode ? '#f1f5f9' : '#1e293b')
                                    } : undefined}
                                  >
                                    <div className="font-semibold leading-tight line-clamp-2 break-words text-[11px]">
                                      {cell.taskName}
                                    </div>
                                    {cell.note && (
                                      <div className="text-[9px] opacity-80 mt-0.5 italic line-clamp-1 break-words leading-none">
                                        {cell.note}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="w-full h-full min-h-[30px] rounded-md border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-3 h-3 text-slate-400/70 dark:text-slate-600" />
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                      {/* --- LUNCH BREAK ROW (SINGLE SPANNING ROW) --- */}
                      <tr className="border-y border-slate-200 dark:border-y-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                        <td className="py-2.5 px-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300 w-24">
                          🍱 12h00 - 12h30
                        </td>
                        <td 
                          colSpan={7} 
                          onClick={() => handleLunchClick('1')}
                          className="p-1 cursor-pointer align-middle border-l border-slate-200 dark:border-l-slate-800"
                        >
                          <div 
                            className={`py-2 px-4 rounded-xl text-center border shadow-xs transition-all flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-3 ${
                              timetable1.lunchBreak.color.startsWith('#')
                                ? ''
                                : getCellThemeClasses(timetable1.lunchBreak.color, timetable1.lunchBreak.textColor || 'text-slate-800')
                            } hover:scale-[1.005]`}
                            style={timetable1.lunchBreak.color.startsWith('#') ? {
                              backgroundColor: timetable1.lunchBreak.color,
                              color: timetable1.lunchBreak.textColor || (darkMode ? '#f1f5f9' : '#1e293b'),
                              borderColor: darkMode ? '#334155' : '#e2e8f0'
                            } : undefined}
                          >
                            <span className="font-bold text-xs tracking-wide">
                              ☕ {timetable1.lunchBreak.taskName || 'Nghỉ trưa tự do'}
                            </span>
                            {timetable1.lunchBreak.note && (
                              <span className="text-[10px] opacity-75 italic">
                                ({timetable1.lunchBreak.note})
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* --- AFTERNOON / EVENING SECTION --- */}
                      <tr className="bg-slate-50/50 dark:bg-slate-950/40">
                        <td className="py-1 px-2 text-center text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-r-slate-800 uppercase tracking-widest" colSpan={8}>
                          🌌 Buổi Chiều & Tối
                        </td>
                      </tr>
                      {TIME_SLOTS.filter(s => s.session === 'Tối').map((slot) => (
                        <tr key={slot.id} className="border-b border-slate-100 dark:border-b-slate-800/50 hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors">
                          {/* Time label cell */}
                          <td className="py-1 px-1.5 text-center text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col justify-center min-h-[38px]">
                            <div className="flex flex-col items-center justify-center gap-0.5 leading-tight">
                              <Clock className="w-2.5 h-2.5 text-slate-400 inline-block" />
                              <span>{slot.timeText}</span>
                            </div>
                          </td>
                          {/* Day column cells */}
                          {DAYS_OF_WEEK.map((day) => {
                            const key = `${day}_${slot.id}`;
                            const cell = timetable1.cells[key];
                            const isMatched = searchQuery && (
                              cell?.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              cell?.note?.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            
                            return (
                              <td 
                                key={day} 
                                onClick={() => handleCellClick('1', day, slot.id)}
                                className={`p-1 border-l border-slate-100 dark:border-l-slate-800/40 align-top transition-all duration-200 cursor-pointer w-[12%] group relative min-h-[38px] ${
                                  cell ? '' : 'hover:bg-slate-50/30 dark:hover:bg-slate-800/30'
                                }`}
                              >
                                {cell ? (
                                  <div 
                                    className={`w-full h-full min-h-[30px] rounded-md p-1 text-xs border transition-all shadow-xs relative flex flex-col justify-between ${
                                      cell.color?.startsWith('#') ? '' : getCellThemeClasses(cell.color, cell.textColor || 'text-slate-800')
                                    } ${
                                      isMatched ? 'ring-2 ring-slate-400 dark:ring-slate-500 scale-[1.02] shadow-sm animate-pulse' : 'hover:scale-[1.01] hover:shadow-sm'
                                    }`}
                                    style={cell.color?.startsWith('#') ? {
                                      backgroundColor: cell.color,
                                      borderColor: darkMode ? '#334155' : `${cell.color}ee`,
                                      color: cell.textColor || (darkMode ? '#f1f5f9' : '#1e293b')
                                    } : undefined}
                                  >
                                    <div className="font-semibold leading-tight line-clamp-2 break-words text-[11px]">
                                      {cell.taskName}
                                    </div>
                                    {cell.note && (
                                      <div className="text-[9px] opacity-80 mt-0.5 italic line-clamp-1 break-words leading-none">
                                        {cell.note}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="w-full h-full min-h-[30px] rounded-md border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-3 h-3 text-slate-400/70 dark:text-slate-600" />
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>

                {/* Bottom stats and action block for Timetable 1 */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    ⚡ Đã lên lịch: <span className="font-bold text-slate-800 dark:text-slate-200">{Object.keys(timetable1.cells).length}</span> buổi học & hoạt động
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopySchedule('1', '2')}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors shadow-xs"
                      title="Sao chép lịch sang Bảng 2"
                    >
                      <Copy className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      <span>Chép sang Bảng 2</span>
                    </button>
                    <button
                      onClick={() => handleExportImage(table1Ref, `Timetable_${timetable1.owner}`, '1')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors shadow-xs border border-slate-200 dark:border-slate-800"
                    >
                      {isExporting === '1' ? 'Đang tạo...' : 'Tải Ảnh Bảng 1 📸'}
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TIMETABLE 2 */}
            {(activeView === 'dual' || activeView === 'single_2') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xs relative overflow-hidden"
                id="timetable-section-2"
              >
                {/* Background watermarks disabled */}

                {/* Header controls for Timetable 2 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 mb-3 border-b border-slate-200/60 relative z-10">
                  <div className="w-full sm:w-auto">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">⏱️</span>
                      <input 
                        type="text" 
                        value={timetable2.owner} 
                        onChange={(e) => handleOwnerChange('2', e.target.value)}
                        placeholder="Tên của bạn..."
                        className="bg-slate-50 hover:bg-slate-100 focus:bg-white text-base font-extrabold text-slate-800 px-2 py-0.5 rounded-lg border border-transparent focus:border-slate-400 outline-none w-44 transition-all"
                        id="owner-name-2"
                        title="Thay đổi tên chủ sở hữu"
                      />
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">Thời khóa biểu của đối tác / Bạn bè</div>
                  </div>

                  {/* Template Quick Selection */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
                    <span className="text-xs text-slate-500 font-bold mr-1 hidden md:inline">Lịch mẫu:</span>
                    <button 
                      onClick={() => applyPresetTemplate('2', 'english')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all border border-slate-200"
                      title="Áp dụng lịch Ngoại Ngữ mẫu"
                    >
                      🗣️ Anh Ngữ
                    </button>
                    <button 
                      onClick={() => applyPresetTemplate('2', 'tech')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all border border-slate-200"
                      title="Áp dụng lịch CNTT mẫu"
                    >
                      💻 Công Nghệ
                    </button>
                    <button 
                      onClick={() => applyPresetTemplate('2', 'exam')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all border border-slate-200"
                      title="Áp dụng lịch Luyện Thi mẫu"
                    >
                      📐 Luyện Thi
                    </button>
                    <div className="h-5 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                    <button 
                      onClick={() => handleClearAll('2')}
                      className="p-1 py-1 px-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all text-xs font-bold flex items-center gap-1"
                      title="Xóa trống bảng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden xl:inline">Xóa</span>
                    </button>
                  </div>
                </div>

                {/* Table Core Container */}
                <div ref={table2Ref} id="timetable-capture-2" className="bg-white rounded-xl overflow-x-auto border border-slate-200 p-2 shadow-xs scrollbar-thin">
                  
                  {/* Decorative exported banner, shown only inside exported image */}
                  <div className="hidden printing-banner text-center py-4 px-2 bg-slate-50 rounded-xl mb-4 border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">⏱️ Lịch Trình Của {timetable2.owner} ⏱️</h2>
                    <p className="text-xs text-slate-500">Được lập từ Timetable Duo • Thiết kế tối giản</p>
                  </div>

                  <table className="w-full border-collapse text-left min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="py-2.5 px-3 font-bold text-xs text-slate-700 tracking-wider text-center w-24">Giờ</th>
                        {DAYS_OF_WEEK.map((day) => (
                          <th key={day} className="py-2.5 px-2 font-bold text-xs text-slate-700 tracking-wider text-center border-l border-slate-200">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* --- MORNING SECTION --- */}
                      <tr className="bg-slate-50/50">
                        <td className="py-1 px-2 text-center text-[10px] font-bold text-slate-600 bg-slate-100 border-r border-slate-200 uppercase tracking-widest" colSpan={8}>
                          🌅 Buổi Sáng
                        </td>
                      </tr>
                      {TIME_SLOTS.filter(s => s.session === 'Sáng').map((slot) => (
                        <tr key={slot.id} className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                          {/* Time label cell */}
                          <td className="py-1 px-1.5 text-center text-[10px] font-bold text-slate-700 bg-slate-50/50 flex flex-col justify-center min-h-[38px]">
                            <div className="flex flex-col items-center justify-center gap-0.5 leading-tight">
                              <Clock className="w-2.5 h-2.5 text-slate-400 inline-block" />
                              <span>{slot.timeText}</span>
                            </div>
                          </td>
                          {/* Day column cells */}
                          {DAYS_OF_WEEK.map((day) => {
                            const key = `${day}_${slot.id}`;
                            const cell = timetable2.cells[key];
                            const isMatched = searchQuery && (
                              cell?.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              cell?.note?.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            
                            return (
                              <td 
                                key={day} 
                                onClick={() => handleCellClick('2', day, slot.id)}
                                className={`p-1 border-l border-slate-100 align-top transition-all duration-200 cursor-pointer w-[12%] group relative min-h-[38px] ${
                                  cell ? '' : 'hover:bg-slate-50/30'
                                }`}
                              >
                                {cell ? (
                                  <div 
                                    className={`w-full h-full min-h-[30px] rounded-md p-1 text-xs border transition-all shadow-xs relative flex flex-col justify-between ${
                                      cell.color?.startsWith('#') ? '' : `${cell.color} ${cell.textColor || 'text-slate-800'} border-slate-200/60`
                                    } ${
                                      isMatched ? 'ring-2 ring-slate-400 scale-[1.02] shadow-sm animate-pulse' : 'hover:scale-[1.01] hover:shadow-sm'
                                    }`}
                                    style={cell.color?.startsWith('#') ? {
                                      backgroundColor: cell.color,
                                      borderColor: `${cell.color}ee`,
                                      color: cell.textColor || '#1e293b'
                                    } : undefined}
                                  >
                                    <div className="font-semibold leading-tight line-clamp-2 break-words text-[11px]">
                                      {cell.taskName}
                                    </div>
                                    {cell.note && (
                                      <div className="text-[9px] opacity-80 mt-0.5 italic line-clamp-1 break-words leading-none">
                                        {cell.note}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="w-full h-full min-h-[30px] rounded-md border border-dashed border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-3 h-3 text-slate-400/70" />
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                      {/* --- LUNCH BREAK ROW (SINGLE SPANNING ROW) --- */}
                      <tr className="border-y border-slate-200 bg-slate-50/50">
                        <td className="py-2.5 px-3 text-center text-xs font-bold text-slate-700 w-24">
                          🍱 12h00 - 12h30
                        </td>
                        <td 
                          colSpan={7} 
                          onClick={() => handleLunchClick('2')}
                          className="p-1 cursor-pointer align-middle border-l border-slate-200"
                        >
                          <div 
                            className={`py-2 px-4 rounded-xl text-center border shadow-xs transition-all flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-3 ${
                              timetable2.lunchBreak.color.startsWith('#')
                                ? ''
                                : `${timetable2.lunchBreak.color} ${timetable2.lunchBreak.textColor || 'text-slate-800'} border-slate-200/60`
                            } hover:scale-[1.005]`}
                            style={timetable2.lunchBreak.color.startsWith('#') ? {
                              backgroundColor: timetable2.lunchBreak.color,
                              color: timetable2.lunchBreak.textColor || '#1e293b',
                              borderColor: '#e2e8f0'
                            } : undefined}
                          >
                            <span className="font-bold text-xs tracking-wide">
                              ☕ {timetable2.lunchBreak.taskName || 'Nghỉ trưa tự do'}
                            </span>
                            {timetable2.lunchBreak.note && (
                              <span className="text-[10px] opacity-75 italic">
                                ({timetable2.lunchBreak.note})
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* --- AFTERNOON / EVENING SECTION --- */}
                      <tr className="bg-slate-50/50">
                        <td className="py-1 px-2 text-center text-[10px] font-bold text-slate-600 bg-slate-100 border-r border-slate-200 uppercase tracking-widest" colSpan={8}>
                          🌌 Buổi Chiều & Tối
                        </td>
                      </tr>
                      {TIME_SLOTS.filter(s => s.session === 'Tối').map((slot) => (
                        <tr key={slot.id} className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                          {/* Time label cell */}
                          <td className="py-1 px-1.5 text-center text-[10px] font-bold text-slate-700 bg-slate-50/50 flex flex-col justify-center min-h-[38px]">
                            <div className="flex flex-col items-center justify-center gap-0.5 leading-tight">
                              <Clock className="w-2.5 h-2.5 text-slate-400 inline-block" />
                              <span>{slot.timeText}</span>
                            </div>
                          </td>
                          {/* Day column cells */}
                          {DAYS_OF_WEEK.map((day) => {
                            const key = `${day}_${slot.id}`;
                            const cell = timetable2.cells[key];
                            const isMatched = searchQuery && (
                              cell?.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              cell?.note?.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            
                            return (
                              <td 
                                key={day} 
                                onClick={() => handleCellClick('2', day, slot.id)}
                                className={`p-1 border-l border-slate-100 align-top transition-all duration-200 cursor-pointer w-[12%] group relative min-h-[38px] ${
                                  cell ? '' : 'hover:bg-slate-50/30'
                                }`}
                              >
                                {cell ? (
                                  <div 
                                    className={`w-full h-full min-h-[30px] rounded-md p-1 text-xs border transition-all shadow-xs relative flex flex-col justify-between ${
                                      cell.color?.startsWith('#') ? '' : `${cell.color} ${cell.textColor || 'text-slate-800'} border-slate-200/60`
                                    } ${
                                      isMatched ? 'ring-2 ring-slate-400 scale-[1.02] shadow-sm animate-pulse' : 'hover:scale-[1.01] hover:shadow-sm'
                                    }`}
                                    style={cell.color?.startsWith('#') ? {
                                      backgroundColor: cell.color,
                                      borderColor: `${cell.color}ee`,
                                      color: cell.textColor || '#1e293b'
                                    } : undefined}
                                  >
                                    <div className="font-semibold leading-tight line-clamp-2 break-words text-[11px]">
                                      {cell.taskName}
                                    </div>
                                    {cell.note && (
                                      <div className="text-[9px] opacity-80 mt-0.5 italic line-clamp-1 break-words leading-none">
                                        {cell.note}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="w-full h-full min-h-[30px] rounded-md border border-dashed border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-3 h-3 text-slate-400/70" />
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>

                {/* Bottom stats and action block for Timetable 2 */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="text-xs text-slate-500 font-medium">
                    ⚡ Đã lên lịch: <span className="font-bold text-slate-800">{Object.keys(timetable2.cells).length}</span> buổi học & hoạt động
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopySchedule('2', '1')}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
                      title="Sao chép lịch sang Bảng 1"
                    >
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Chép sang Bảng 1</span>
                    </button>
                    <button
                      onClick={() => handleExportImage(table2Ref, `Timetable_${timetable2.owner}`, '2')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-xs border border-slate-200"
                    >
                      {isExporting === '2' ? 'Đang tạo...' : 'Tải Ảnh Bảng 2 📸'}
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </div>
        </div>
      </main>

      {/* FOOTER & GREETINGS BRANDING */}
      <footer className="max-w-5xl mx-auto px-4 mt-12 text-center text-xs text-slate-400 font-medium">
        <div className="flex justify-center items-center gap-1 mb-2">
          <span>Thời Khóa Biểu Duo được thiết kế tối giản với</span>
          <Heart className="w-3.5 h-3.5 text-slate-400 fill-slate-200 inline animate-pulse" />
          <span>cho cuộc sống ngăn nắp & hiện đại.</span>
        </div>
        <p className="opacity-80">© 2026 Timetable Duo • Đồng bộ an toàn trong trình duyệt cục bộ.</p>
        <div className="mt-4 flex justify-center">
          <div className="h-[1px] w-24 bg-slate-200/60" />
        </div>
      </footer>


      {/* EDIT CELL OVERLAY MODAL DIALOG */}
      <AnimatePresence>
        {editingCell && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-md relative overflow-hidden"
              id="edit-cell-modal"
            >
              {/* Background circular decorations removed for ultimate clean layout */}

              {/* Title & Close */}
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-200/60 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✏️</span>
                  <h3 className="font-bold text-lg text-slate-800">
                    {!editingCell.day 
                      ? `Cập Nhật Giờ Nghỉ Trưa` 
                      : `Chỉnh Sửa Lịch (${editingCell.day})`}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingCell(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-4 relative z-10 text-sm">
                
                {/* Task Name Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Tên buổi học / hoạt động
                  </label>
                  <input
                    type="text"
                    value={formTaskName}
                    onChange={(e) => setFormTaskName(e.target.value)}
                    placeholder="ví dụ: Giải tích 1, Học Tiếng Anh..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 text-slate-900 transition-all placeholder-slate-300"
                    id="modal-task-name"
                    autoFocus
                  />
                </div>

                {/* Optional Note/Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Ghi chú / Địa điểm (Không bắt buộc)
                  </label>
                  <input
                    type="text"
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    placeholder="ví dụ: Giảng đường A2-302, phòng 306..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 text-slate-900 transition-all placeholder-slate-300"
                    id="modal-task-note"
                  />
                </div>

                {/* Color Customize Toggles */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Màu Sắc Đại Diện
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        id="custom-color-checkbox"
                        checked={isCustomColor}
                        onChange={(e) => setIsCustomColor(e.target.checked)}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400 w-4 h-4"
                      />
                      <label htmlFor="custom-color-checkbox" className="text-xs text-slate-500 font-bold select-none cursor-pointer">
                        Màu tự chọn (Color Picker)
                      </label>
                    </div>
                  </div>

                  {/* Standard Pastel Color Palette Grid */}
                  {!isCustomColor ? (
                    <div className="grid grid-cols-3 gap-2" id="preset-color-grid">
                      {PRESET_PASTEL_COLORS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setFormColor(preset.bgClass);
                            setFormTextColor(preset.textClass);
                          }}
                          className={`p-2 rounded-xl text-[10px] font-bold border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${preset.bgClass} ${preset.textClass} ${
                            formColor === preset.bgClass 
                              ? 'ring-2 ring-slate-400 border-slate-200 scale-[1.02] shadow-xs' 
                              : 'border-transparent hover:scale-[1.01]'
                          }`}
                        >
                          <span className="truncate max-w-full">{preset.name.split(' ')[0]}</span>
                          {formColor === preset.bgClass && (
                            <Check className="w-3 h-3 text-slate-800" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* Advanced HEX custom picker */
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={customHexBg}
                            onChange={(e) => setCustomHexBg(e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 bg-white p-0.5"
                            id="custom-hex-bg"
                          />
                          <span className="text-[11px] font-semibold text-slate-500">Màu nền: {customHexBg}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={customHexText}
                            onChange={(e) => setCustomHexText(e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 bg-white p-0.5"
                            id="custom-hex-text"
                          />
                          <span className="text-[11px] font-semibold text-slate-500">Màu chữ: {customHexText}</span>
                        </div>
                      </div>
                      <div className="w-24 h-14 rounded-xl flex items-center justify-center border border-slate-200 p-2 shadow-xs text-center" style={{ backgroundColor: customHexBg }}>
                        <span className="text-xs font-bold truncate max-w-full" style={{ color: customHexText }}>
                          Mẫu Màu ✨
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 relative z-10">
                <button
                  type="button"
                  onClick={handleDeleteCell}
                  className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  id="modal-delete-button"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa ô này</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCell(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCell}
                    className="px-5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl shadow-xs active:scale-[0.98] transition-all"
                    id="modal-save-button"
                  >
                    Lưu Lịch Trình
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
