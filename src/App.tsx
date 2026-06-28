import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  X, 
  Check, 
  Plus, 
  Calendar,
  Search,
  Users,
  User,
  Layers,
  Edit3,
  Info,
  Sliders,
  ChevronRight,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';

import { createClient } from '@supabase/supabase-js';

// 1. Khởi tạo Supabase ở bên ngoài Component
const supabaseUrl = 'https://zvbbubadkkikouswkwxw.supabase.co';
const supabaseKey = 'sb_publishable_9yKVcgAp6ujSa-I7vIvotg_c14X7Ndp';
const supabase = createClient(supabaseUrl, supabaseKey);

import { 
  DAYS_OF_WEEK, 
  TIME_SLOTS, 
  PRESET_PASTEL_COLORS, 
  type TimetableCell, 
  type TimeSlot 
} from './types';

// Default schedules for both Thịnh and Ben
const createDefaultScheduleThinh = (): Record<string, TimetableCell> => {
  const cells: Record<string, TimetableCell> = {};
  
  // Thứ 2
  cells['Thứ 2_morning_3'] = { day: 'Thứ 2', timeSlotId: 'morning_3', taskName: 'SDP', location: 'Online', isOnline: true, colorIndex: 0 };
  cells['Thứ 2_evening_1'] = { day: 'Thứ 2', timeSlotId: 'evening_1', taskName: 'MMP', location: 'Phòng 323', isOnline: false, colorIndex: 5 };

  // Thứ 3
  cells['Thứ 3_evening_1'] = { day: 'Thứ 3', timeSlotId: 'evening_1', taskName: 'LAE', location: 'Phòng 312', isOnline: false, colorIndex: 4 };
  cells['Thứ 3_evening_3'] = { day: 'Thứ 3', timeSlotId: 'evening_3', taskName: 'CHN', location: 'Lab', isOnline: false, colorIndex: 2 };
  cells['Thứ 3_evening_4'] = { day: 'Thứ 3', timeSlotId: 'evening_4', taskName: 'FIT', location: 'Phòng Máy', isOnline: false, colorIndex: 6 };

  // Thứ 4
  cells['Thứ 4_evening_5'] = { day: 'Thứ 4', timeSlotId: 'evening_5', taskName: 'Ăn cùng Ben', location: 'Nhà hàng', isOnline: false, colorIndex: 1 };

  // Thứ 5
  cells['Thứ 5_morning_5'] = { day: 'Thứ 5', timeSlotId: 'morning_5', taskName: 'MMP', location: 'Phòng 417', isOnline: false, colorIndex: 5 };
  cells['Thứ 5_evening_1'] = { day: 'Thứ 5', timeSlotId: 'evening_1', taskName: 'LAE', location: 'Phòng 308', isOnline: false, colorIndex: 4 };

  // Thứ 6
  cells['Thứ 6_morning_3'] = { day: 'Thứ 6', timeSlotId: 'morning_3', taskName: 'CHN', location: 'Lab', isOnline: false, colorIndex: 2 };
  cells['Thứ 6_morning_5'] = { day: 'Thứ 6', timeSlotId: 'morning_5', taskName: 'Ăn sáng Ben', location: 'Quán ăn', isOnline: false, colorIndex: 1 };
  cells['Thứ 6_evening_3'] = { day: 'Thứ 6', timeSlotId: 'evening_3', taskName: 'SDP', location: 'Online', isOnline: true, colorIndex: 0 };

  // Thứ 7
  cells['Thứ 7_morning_3'] = { day: 'Thứ 7', timeSlotId: 'morning_3', taskName: 'Ăn cùng Ben', location: 'Nhà', isOnline: false, colorIndex: 1 };
  cells['Thứ 7_morning_4'] = { day: 'Thứ 7', timeSlotId: 'morning_4', taskName: 'Ăn cùng Ben', location: 'Nhà', isOnline: false, colorIndex: 1 };
  cells['Thứ 7_morning_5'] = { day: 'Thứ 7', timeSlotId: 'morning_5', taskName: 'Ăn cùng Ben', location: 'Nhà', isOnline: false, colorIndex: 1 };
  cells['Thứ 7_evening_1'] = { day: 'Thứ 7', timeSlotId: 'evening_1', taskName: 'ADA', location: 'Online', isOnline: true, colorIndex: 3 };
  cells['Thứ 7_evening_7'] = { day: 'Thứ 7', timeSlotId: 'evening_7', taskName: 'Ăn cùng Ben', location: 'Nhà hàng', isOnline: false, colorIndex: 1 };

  return cells;
};

const createDefaultScheduleBen = (): Record<string, TimetableCell> => {
  const cells: Record<string, TimetableCell> = {};
  
  // Thứ 2
  cells['Thứ 2_morning_4'] = { day: 'Thứ 2', timeSlotId: 'morning_4', taskName: 'UI/UX Design', location: 'Online', isOnline: true, colorIndex: 7 };
  cells['Thứ 2_evening_2'] = { day: 'Thứ 2', timeSlotId: 'evening_2', taskName: 'Học tiếng Anh', location: 'Trung tâm', isOnline: false, colorIndex: 4 };

  // Thứ 3
  cells['Thứ 3_morning_3'] = { day: 'Thứ 3', timeSlotId: 'morning_3', taskName: 'Code React', location: 'Thư viện', isOnline: false, colorIndex: 0 };
  cells['Thứ 3_evening_3'] = { day: 'Thứ 3', timeSlotId: 'evening_3', taskName: 'CHN', location: 'Lab', isOnline: false, colorIndex: 2 };

  // Thứ 4
  cells['Thứ 4_evening_5'] = { day: 'Thứ 4', timeSlotId: 'evening_5', taskName: 'Ăn cùng Ben', location: 'Nhà hàng', isOnline: false, colorIndex: 1 };

  // Thứ 5
  cells['Thứ 5_morning_6'] = { day: 'Thứ 5', timeSlotId: 'morning_6', taskName: 'Nghiên cứu KH', location: 'Văn phòng', isOnline: false, colorIndex: 8 };

  // Thứ 6
  cells['Thứ 6_morning_5'] = { day: 'Thứ 6', timeSlotId: 'morning_5', taskName: 'Ăn sáng Ben', location: 'Quán ăn', isOnline: false, colorIndex: 1 };

  // Thứ 7
  cells['Thứ 7_morning_3'] = { day: 'Thứ 7', timeSlotId: 'morning_3', taskName: 'Ăn cùng Ben', location: 'Nhà', isOnline: false, colorIndex: 1 };
  cells['Thứ 7_morning_4'] = { day: 'Thứ 7', timeSlotId: 'morning_4', taskName: 'Ăn cùng Ben', location: 'Nhà', isOnline: false, colorIndex: 1 };
  cells['Thứ 7_morning_5'] = { day: 'Thứ 7', timeSlotId: 'morning_5', taskName: 'Ăn cùng Ben', location: 'Nhà', isOnline: false, colorIndex: 1 };
  cells['Thứ 7_evening_7'] = { day: 'Thứ 7', timeSlotId: 'evening_7', taskName: 'Ăn cùng Ben', location: 'Nhà hàng', isOnline: false, colorIndex: 1 };

  return cells;
};

export default function App() {
  // State for Schedule 1 (Thịnh) and Schedule 2 (Ben)
  const [scheduleThinh, setScheduleThinh] = useState<Record<string, TimetableCell>>(() => {
    const saved = localStorage.getItem('timetable_duo_thinh');
    return saved ? JSON.parse(saved) : createDefaultScheduleThinh();
  });

  const [scheduleBen, setScheduleBen] = useState<Record<string, TimetableCell>>(() => {
    const saved = localStorage.getItem('timetable_duo_ben');
    return saved ? JSON.parse(saved) : createDefaultScheduleBen();
  });

  // Names of the Duo
  const [nameThinh, setNameThinh] = useState(() => localStorage.getItem('timetable_duo_name_thinh') || 'Thịnh');
  const [nameBen, setNameBen] = useState(() => localStorage.getItem('timetable_duo_name_ben') || 'Ben');

  // App customization state
  const [timetableTitle, setTimetableTitle] = useState(() => localStorage.getItem('timetable_duo_title') || 'THỜI GIAN BIỂU ĐÔI');
  const [lunchBreakText, setLunchBreakText] = useState(() => localStorage.getItem('timetable_duo_lunch') || 'Nghỉ trưa');
  const [searchQuery, setSearchQuery] = useState('');

  // View state: 'single' (individual tab), 'split' (side by side), 'overlay' (combined schedule)
  const [viewMode, setViewMode] = useState<'single' | 'split' | 'overlay'>(() => {
    const saved = localStorage.getItem('timetable_duo_view_mode');
    return (saved as 'single' | 'split' | 'overlay') || 'split';
  });

  // Active individual tab (only applies in 'single' viewMode)
  const [activeTab, setActiveTab] = useState<'thinh' | 'ben'>('thinh');

  // Modal editor states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPerson, setTargetPerson] = useState<'thinh' | 'ben'>('thinh');
  const [selectedCellKey, setSelectedCellKey] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');

  // Editor form states
  const [formTaskName, setFormTaskName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formColorIndex, setFormColorIndex] = useState(0);
  const [formIsOnline, setFormIsOnline] = useState(false);

  // Settings Panel State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Quick Inline Name Edit State
  const [isEditingThinhName, setIsEditingThinhName] = useState(false);
  const [isEditingBenName, setIsEditingBenName] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const printAreaRef = useRef<HTMLDivElement>(null);

  // Supabase Realtime Sync State
  const [lichTrinh, setLichTrinh] = useState<any[]>([]);

  useEffect(() => {
    // 2. Mở kênh lắng nghe bên trong useEffect
    const channel = supabase
      .channel('dong-bo-lich-trinh')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Weekly_timetable_web' },
        (payload) => {
          console.log('Có thay đổi từ người kia:', payload);
          
          // 3. Xử lý cập nhật giao diện ở đây
          // Ví dụ: setLichTrinh(dữ_liệu_mới)
        }
      )
      .subscribe();

    // 4. Dọn dẹp kênh khi tắt trang để tránh lỗi tràn bộ nhớ
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Mảng rỗng [] giúp đoạn code này chỉ chạy 1 lần khi mở trang

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('timetable_duo_thinh', JSON.stringify(scheduleThinh));
  }, [scheduleThinh]);

  useEffect(() => {
    localStorage.setItem('timetable_duo_ben', JSON.stringify(scheduleBen));
  }, [scheduleBen]);

  useEffect(() => {
    localStorage.setItem('timetable_duo_name_thinh', nameThinh);
  }, [nameThinh]);

  useEffect(() => {
    localStorage.setItem('timetable_duo_name_ben', nameBen);
  }, [nameBen]);

  useEffect(() => {
    localStorage.setItem('timetable_duo_title', timetableTitle);
  }, [timetableTitle]);

  useEffect(() => {
    localStorage.setItem('timetable_duo_lunch', lunchBreakText);
  }, [lunchBreakText]);

  useEffect(() => {
    localStorage.setItem('timetable_duo_view_mode', viewMode);
  }, [viewMode]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset to original preset schedules
  const handleResetSchedules = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại thời khóa biểu đôi mẫu của Thịnh & Ben?')) {
      setScheduleThinh(createDefaultScheduleThinh());
      setScheduleBen(createDefaultScheduleBen());
      setNameThinh('Thịnh');
      setNameBen('Ben');
      setTimetableTitle('THỜI GIAN BIỂU ĐÔI');
      setLunchBreakText('Nghỉ trưa');
      setViewMode('split');
      triggerToast('Đã khôi phục dữ liệu thời khóa biểu đôi thanh lịch! ✨');
    }
  };

  // Clear all data
  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sạch toàn bộ các ô lịch học?')) {
      setScheduleThinh({});
      setScheduleBen({});
      triggerToast('Đã dọn sạch thời khóa biểu! 🗑️');
    }
  };

  // Handle click on a schedule cell
  const handleCellClick = (person: 'thinh' | 'ben', day: string, slotId: string) => {
    const key = `${day}_${slotId}`;
    const schedule = person === 'thinh' ? scheduleThinh : scheduleBen;
    const cell = schedule[key];

    setTargetPerson(person);
    setSelectedCellKey(key);
    setSelectedDay(day);
    setSelectedSlotId(slotId);

    setFormTaskName(cell?.taskName || '');
    setFormLocation(cell?.location || '');
    setFormNote(cell?.note || '');
    setFormColorIndex(cell?.colorIndex !== undefined ? cell.colorIndex : 0);
    setFormIsOnline(cell?.isOnline || false);

    setIsModalOpen(true);
  };

  // Save the edited cell
  const handleSaveCell = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCellKey) return;

    const trimmedTask = formTaskName.trim();
    const updateSchedule = targetPerson === 'thinh' ? setScheduleThinh : setScheduleBen;

    if (!trimmedTask) {
      // Remove cell if name is empty
      updateSchedule(prev => {
        const next = { ...prev };
        delete next[selectedCellKey];
        return next;
      });
      triggerToast(`Đã xóa lịch tại ô đã chọn.`);
    } else {
      // Add or update cell
      updateSchedule(prev => ({
        ...prev,
        [selectedCellKey]: {
          day: selectedDay,
          timeSlotId: selectedSlotId,
          taskName: trimmedTask,
          location: formLocation.trim(),
          note: formNote.trim(),
          colorIndex: formColorIndex,
          isOnline: formIsOnline
        }
      }));
      triggerToast(`Đã lưu lịch học cho ${targetPerson === 'thinh' ? nameThinh : nameBen}!`);
    }

    setIsModalOpen(false);
  };

  // Export timetable layout to PNG
  const handleExportPNG = () => {
    if (!printAreaRef.current) return;
    triggerToast('Đang khởi tạo ảnh nét cao... 📸');

    html2canvas(printAreaRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#faf6ee',
      logging: false,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${timetableTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      triggerToast('Tải ảnh thời khóa biểu thành công! 🎉');
    }).catch(err => {
      console.error(err);
      triggerToast('Gặp lỗi khi tạo ảnh. Hãy thử lại nhé!');
    });
  };

  // Check if a task matches search query
  const matchesSearch = (cell: TimetableCell | undefined) => {
    if (!cell) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      cell.taskName.toLowerCase().includes(query) ||
      (cell.location || '').toLowerCase().includes(query) ||
      (cell.note || '').toLowerCase().includes(query)
    );
  };

  // Calculate dynamic rowspan for connected matching blocks of schedule
  const getRowSpan = (
    schedule: Record<string, TimetableCell>, 
    day: string, 
    slotId: string, 
    cell?: TimetableCell
  ) => {
    if (!cell) return 1;

    const slotIdx = TIME_SLOTS.findIndex(s => s.id === slotId);
    if (slotIdx === -1) return 1;
    const currentSession = TIME_SLOTS[slotIdx].session;

    // If there is a cell of the same name and color above in the same session,
    // this cell is already spanned by the top one.
    if (slotIdx > 0) {
      const prevSlot = TIME_SLOTS[slotIdx - 1];
      if (prevSlot.session === currentSession) {
        const prevCell = schedule[`${day}_${prevSlot.id}`];
        if (
          prevCell && 
          prevCell.taskName === cell.taskName && 
          prevCell.location === cell.location && 
          prevCell.colorIndex === cell.colorIndex
        ) {
          return 0;
        }
      }
    }

    // Measure how many subsequent rows match in the same session
    let span = 1;
    for (let i = slotIdx + 1; i < TIME_SLOTS.length; i++) {
      const nextSlot = TIME_SLOTS[i];
      if (nextSlot.session !== currentSession) break;
      
      const nextCell = schedule[`${day}_${nextSlot.id}`];
      if (
        nextCell && 
        nextCell.taskName === cell.taskName && 
        nextCell.location === cell.location && 
        nextCell.colorIndex === cell.colorIndex
      ) {
        span++;
      } else {
        break;
      }
    }
    return span;
  };

  // Filter time slots by session
  const morningSlots = TIME_SLOTS.filter(s => s.session === 'Sáng');
  const lunchSlots = TIME_SLOTS.filter(s => s.session === 'Nghỉ trưa');
  const eveningSlots = TIME_SLOTS.filter(s => s.session === 'Tối');

  // =========================================================================================
  // HELPER COMPONENT: SINGLE TABLE RENDERING
  // =========================================================================================
  function renderSingleTable(person: 'thinh' | 'ben', schedule: Record<string, TimetableCell>) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs select-none font-serif">
          <thead>
            <tr className="bg-stone-50 border-b border-[#e9d8a6]/60">
              <th className="py-3 px-1 w-[8%] font-extrabold uppercase text-[#b84a24] text-[10px] font-serif">Ca</th>
              <th className="py-3 px-2 w-[14%] font-bold italic text-stone-600 border-r border-[#e9d8a6]/40 font-serif">Giờ</th>
              {DAYS_OF_WEEK.map((day) => (
                <th key={day} className="py-3 px-2 w-[13%] font-extrabold text-[#4a332a] border-r border-[#e9d8a6]/40 last:border-r-0 font-serif">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
            {/* 1. MORNING SLOTS */}
            {morningSlots.map((slot, idx) => (
              <tr key={slot.id} className="h-14 border-b border-[#e9d8a6]/20 last:border-b-0">
                {idx === 0 && (
                  <td 
                    rowSpan={morningSlots.length} 
                    className="font-black text-center text-stone-500 uppercase py-2 bg-stone-50/50 border-r border-[#e9d8a6]/40 text-[11px]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Sáng
                  </td>
                )}
                <td className="py-2 px-1 font-bold italic text-stone-500 border-r border-[#e9d8a6]/40 bg-stone-50/20">
                  {slot.timeText}
                </td>
                
                {DAYS_OF_WEEK.map((day) => {
                  const cellKey = `${day}_${slot.id}`;
                  const cell = schedule[cellKey];
                  const span = getRowSpan(schedule, day, slot.id, cell);
                  
                  if (span === 0) return null;

                  const hasTask = !!cell;
                  const matchesFilter = matchesSearch(cell);
                  const isSearchingActive = searchQuery.length > 0;
                  
                  // Pastel preset colors selection
                  const preset = hasTask ? PRESET_PASTEL_COLORS[cell.colorIndex] : null;
                  
                  return (
                    <td
                      key={day}
                      rowSpan={span}
                      onClick={() => handleCellClick(person, day, slot.id)}
                      className={`p-1.5 align-middle border-r border-[#e9d8a6]/40 last:border-r-0 cursor-pointer transition-all relative group ${
                        hasTask ? `${preset?.bgClass} ${preset?.textClass} font-bold` : 'hover:bg-[#faf6ee]/60 text-stone-300'
                      } ${isSearchingActive && !matchesFilter && hasTask ? 'opacity-20 blur-[0.5px]' : ''} ${isSearchingActive && matchesFilter ? 'ring-2 ring-rose-400 z-10' : ''}`}
                      style={{ height: span > 1 ? `${span * 56}px` : '56px' }}
                    >
                      {hasTask ? (
                        <div className="flex flex-col justify-center items-center h-full gap-0.5">
                          <span className="text-[11.5px] font-extrabold tracking-tight block">
                            {cell.taskName}
                          </span>
                          {cell.location && (
                            <span className={`text-[9.5px] px-1 py-0.5 rounded ${cell.isOnline ? 'bg-red-100 text-red-700 font-bold' : 'opacity-80'}`}>
                              📍 {cell.location}
                            </span>
                          )}
                          {cell.note && (
                            <span className="text-[8.5px] italic opacity-70 block font-normal max-w-full truncate">
                              {cell.note}
                            </span>
                          )}
                          
                          {/* Hover Edit Action */}
                          <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] bg-black/5 text-stone-500 p-0.5 rounded">
                            ✏️
                          </span>
                        </div>
                      ) : (
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-stone-400 font-sans">
                          + Trống
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* 2. LUNCH BREAK BAND */}
            <tr className="bg-stone-100/80 border-y border-[#e9d8a6]/60 font-medium h-10">
              <td className="py-1 px-1 bg-stone-100/50"></td>
              <td className="py-1 px-2 italic font-bold text-stone-600 border-r border-[#e9d8a6]/40">
                12h 12h30
              </td>
              <td 
                colSpan={6} 
                className="text-center font-bold italic text-stone-600 text-[13px] tracking-widest cursor-pointer hover:bg-stone-200/50 transition-colors"
                onClick={() => {
                  const ans = window.prompt('Đổi tên nhãn Nghỉ trưa:', lunchBreakText);
                  if (ans !== null) setLunchBreakText(ans);
                }}
              >
                🍱 {lunchBreakText} 🍕
              </td>
            </tr>

            {/* 3. EVENING SLOTS */}
            {eveningSlots.map((slot, idx) => (
              <tr key={slot.id} className="h-14 border-b border-[#e9d8a6]/20 last:border-b-0">
                {idx === 0 && (
                  <td 
                    rowSpan={eveningSlots.length} 
                    className="font-black text-center text-stone-500 uppercase py-2 bg-stone-50/50 border-r border-[#e9d8a6]/40 text-[11px]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Tối
                  </td>
                )}
                <td className="py-2 px-1 font-bold italic text-stone-500 border-r border-[#e9d8a6]/40 bg-stone-50/20">
                  {slot.timeText}
                </td>
                
                {DAYS_OF_WEEK.map((day) => {
                  const cellKey = `${day}_${slot.id}`;
                  const cell = schedule[cellKey];
                  const span = getRowSpan(schedule, day, slot.id, cell);
                  
                  if (span === 0) return null;

                  const hasTask = !!cell;
                  const matchesFilter = matchesSearch(cell);
                  const isSearchingActive = searchQuery.length > 0;
                  
                  const preset = hasTask ? PRESET_PASTEL_COLORS[cell.colorIndex] : null;

                  return (
                    <td
                      key={day}
                      rowSpan={span}
                      onClick={() => handleCellClick(person, day, slot.id)}
                      className={`p-1.5 align-middle border-r border-[#e9d8a6]/40 last:border-r-0 cursor-pointer transition-all relative group ${
                        hasTask ? `${preset?.bgClass} ${preset?.textClass} font-bold` : 'hover:bg-[#faf6ee]/60 text-stone-300'
                      } ${isSearchingActive && !matchesFilter && hasTask ? 'opacity-20 blur-[0.5px]' : ''} ${isSearchingActive && matchesFilter ? 'ring-2 ring-rose-400 z-10' : ''}`}
                      style={{ height: span > 1 ? `${span * 56}px` : '56px' }}
                    >
                      {hasTask ? (
                        <div className="flex flex-col justify-center items-center h-full gap-0.5">
                          <span className="text-[11.5px] font-extrabold tracking-tight block">
                            {cell.taskName}
                          </span>
                          {cell.location && (
                            <span className={`text-[9.5px] px-1 py-0.5 rounded ${cell.isOnline ? 'bg-red-100 text-red-700 font-bold' : 'opacity-80'}`}>
                              📍 {cell.location}
                            </span>
                          )}
                          {cell.note && (
                            <span className="text-[8.5px] italic opacity-70 block font-normal max-w-full truncate">
                              {cell.note}
                            </span>
                          )}
                          
                          <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] bg-black/5 text-stone-500 p-0.5 rounded">
                            ✏️
                          </span>
                        </div>
                      ) : (
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-stone-400 font-sans">
                          + Trống
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }

  // =========================================================================================
  // HELPER COMPONENT: OVERLAY COMBINED TABLE RENDERING
  // =========================================================================================
  function renderOverlayTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs select-none font-serif">
          <thead>
            <tr className="bg-stone-50 border-b border-[#e9d8a6]/60">
              <th className="py-3 px-1 w-[8%] font-extrabold uppercase text-[#b84a24] text-[10px] font-serif">Ca</th>
              <th className="py-3 px-2 w-[14%] font-bold italic text-stone-600 border-r border-[#e9d8a6]/40 font-serif">Giờ</th>
              {DAYS_OF_WEEK.map((day) => (
                <th key={day} className="py-3 px-2 w-[13%] font-extrabold text-[#4a332a] border-r border-[#e9d8a6]/40 last:border-r-0 font-serif">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
            {/* MORNING */}
            {morningSlots.map((slot, idx) => (
              <tr key={slot.id} className="h-16 border-b border-[#e9d8a6]/20">
                {idx === 0 && (
                  <td 
                    rowSpan={morningSlots.length} 
                    className="font-black text-center text-stone-500 uppercase py-2 bg-stone-50/50 border-r border-[#e9d8a6]/40 text-[11px]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Sáng
                  </td>
                )}
                <td className="py-2 px-1 font-bold italic text-stone-500 border-r border-[#e9d8a6]/40 bg-stone-50/20">
                  {slot.timeText}
                </td>

                {DAYS_OF_WEEK.map((day) => {
                  const key = `${day}_${slot.id}`;
                  const cellA = scheduleThinh[key];
                  const cellB = scheduleBen[key];
                  return renderOverlayCell(day, slot.id, cellA, cellB);
                })}
              </tr>
            ))}

            {/* LUNCH BREAK */}
            <tr className="bg-stone-100/80 border-y border-[#e9d8a6]/60 font-medium h-10">
              <td className="py-1 px-1 bg-stone-100/50"></td>
              <td className="py-1 px-2 italic font-bold text-stone-600 border-r border-[#e9d8a6]/40">
                12h 12h30
              </td>
              <td colSpan={6} className="text-center font-bold italic text-stone-600 text-[13px] tracking-widest">
                🍱 {lunchBreakText} 🍱
              </td>
            </tr>

            {/* EVENING */}
            {eveningSlots.map((slot, idx) => (
              <tr key={slot.id} className="h-16 border-b border-[#e9d8a6]/20 last:border-b-0">
                {idx === 0 && (
                  <td 
                    rowSpan={eveningSlots.length} 
                    className="font-black text-center text-stone-500 uppercase py-2 bg-stone-50/50 border-r border-[#e9d8a6]/40 text-[11px]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Tối
                  </td>
                )}
                <td className="py-2 px-1 font-bold italic text-stone-500 border-r border-[#e9d8a6]/40 bg-stone-50/20">
                  {slot.timeText}
                </td>

                {DAYS_OF_WEEK.map((day) => {
                  const key = `${day}_${slot.id}`;
                  const cellA = scheduleThinh[key];
                  const cellB = scheduleBen[key];
                  return renderOverlayCell(day, slot.id, cellA, cellB);
                })}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }

  // Helper to render overlayed cell data
  function renderOverlayCell(day: string, slotId: string, cellA?: TimetableCell, cellB?: TimetableCell) {
    const hasA = !!cellA;
    const hasB = !!cellB;

    // 1. Both empty
    if (!hasA && !hasB) {
      return (
        <td key={day} className="p-1 align-middle border-r border-[#e9d8a6]/40 last:border-r-0 text-stone-300">
          <span className="text-[9px] opacity-20 font-sans">Trống</span>
        </td>
      );
    }

    // 2. Exact same activity (Overlap/Common)
    if (hasA && hasB && cellA.taskName === cellB.taskName && cellA.colorIndex === cellB.colorIndex) {
      const preset = PRESET_PASTEL_COLORS[cellA.colorIndex];
      return (
        <td
          key={day}
          onClick={() => handleCellClick('thinh', day, slotId)}
          className={`p-1.5 align-middle border-r border-[#e9d8a6]/40 last:border-r-0 cursor-pointer ${preset.bgClass} ${preset.textClass} font-bold ring-2 ring-emerald-500/50 z-10`}
        >
          <div className="flex flex-col justify-center items-center h-full gap-0.5">
            <span className="text-[11.5px] font-black tracking-tight text-emerald-800">
              ⭐️ {cellA.taskName}
            </span>
            <span className="text-[8.5px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
              Chung giờ rảnh
            </span>
          </div>
        </td>
      );
    }

    // 3. Different activities or only one has activity
    // Render a split display inside the table cell (Left/Right division)
    return (
      <td key={day} className="p-1 align-middle border-r border-[#e9d8a6]/40 last:border-r-0 h-full">
        <div className="grid grid-cols-2 gap-1 h-full min-h-[48px]">
          
          {/* Left Side: Thịnh */}
          {hasA ? (
            <div 
              onClick={() => handleCellClick('thinh', day, slotId)}
              className={`p-1 rounded-lg text-left flex flex-col justify-between cursor-pointer border ${PRESET_PASTEL_COLORS[cellA.colorIndex].bgClass} ${PRESET_PASTEL_COLORS[cellA.colorIndex].textClass} ${PRESET_PASTEL_COLORS[cellA.colorIndex].borderClass}`}
            >
              <span className="text-[10px] font-bold leading-tight block truncate" title={cellA.taskName}>
                {cellA.taskName}
              </span>
              <span className="text-[8px] opacity-75 font-mono block">
                👤 {nameThinh}
              </span>
            </div>
          ) : (
            <div 
              onClick={() => handleCellClick('thinh', day, slotId)}
              className="rounded-lg border border-dashed border-stone-200 bg-stone-50/40 p-1 flex items-center justify-center cursor-pointer hover:bg-stone-50 text-[8px] text-stone-400 font-sans"
            >
              + {nameThinh}
            </div>
          )}

          {/* Right Side: Ben */}
          {hasB ? (
            <div 
              onClick={() => handleCellClick('ben', day, slotId)}
              className={`p-1 rounded-lg text-left flex flex-col justify-between cursor-pointer border ${PRESET_PASTEL_COLORS[cellB.colorIndex].bgClass} ${PRESET_PASTEL_COLORS[cellB.colorIndex].textClass} ${PRESET_PASTEL_COLORS[cellB.colorIndex].borderClass}`}
            >
              <span className="text-[10px] font-bold leading-tight block truncate" title={cellB.taskName}>
                {cellB.taskName}
              </span>
              <span className="text-[8px] opacity-75 font-mono block">
                👤 {nameBen}
              </span>
            </div>
          ) : (
            <div 
              onClick={() => handleCellClick('ben', day, slotId)}
              className="rounded-lg border border-dashed border-stone-200 bg-stone-50/40 p-1 flex items-center justify-center cursor-pointer hover:bg-stone-50 text-[8px] text-stone-400 font-sans"
            >
              + {nameBen}
            </div>
          )}

        </div>
      </td>
    );
  }

  return (
    <div className="min-h-screen pb-20 selection:bg-rose-200">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#4a332a] text-[#faf6ee] px-6 py-3.5 rounded-full shadow-xl flex items-center gap-2.5 text-sm font-medium border border-[#e9d8a6]/20"
          >
            <Sparkles className="w-4 h-4 text-[#e9c46a] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Header */}
      <header className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#e9d8a6]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-[#b84a24] rounded-full"></span>
            <span className="text-xs uppercase tracking-widest font-bold text-[#b84a24]">Duo Workspace</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#4a332a] font-serif flex items-center gap-3">
            Timetable Duo 
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#e9d8a6]/40 text-[#b84a24] border border-[#e9d8a6] font-sans">
              Bản Tối Giản Thanh Lịch
            </span>
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            Quản lý, đồng hành và so sánh lịch trình của <strong className="text-[#b84a24]">{nameThinh}</strong> & <strong className="text-[#b84a24]">{nameBen}</strong> trong một không gian duy nhất.
          </p>
        </div>

        {/* Quick controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#4a332a] border border-[#e9d8a6] shadow-sm text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            Cấu hình tên & tiêu đề
          </button>

          <button
            onClick={handleExportPNG}
            className="px-4 py-2.5 rounded-xl bg-[#b84a24] hover:bg-[#a03e1c] text-white shadow-md text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Xuất ảnh sắc nét (PNG)
          </button>

          <button
            onClick={handleResetSchedules}
            className="p-2.5 rounded-xl bg-white/50 hover:bg-white text-stone-600 border border-[#e9d8a6]/60 transition-all active:scale-95 cursor-pointer"
            title="Đặt lại thời khóa biểu mẫu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleClearAll}
            className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all active:scale-95 cursor-pointer"
            title="Xóa toàn bộ lịch trình"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Control bar / Smart Search & View Modes */}
      <section className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search tool */}
        <div className="relative md:col-span-4">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-stone-400" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm môn học, phòng học... 🔎"
            className="w-full bg-white/90 border border-[#e9d8a6] focus:border-[#b84a24] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#4a332a] placeholder:text-stone-400 font-sans shadow-sm transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Rename Panel */}
        <div className="md:col-span-4 flex items-center justify-center gap-2 bg-[#e9d8a6]/20 border border-[#e9d8a6]/40 px-3 py-2 rounded-xl text-xs font-sans text-[#4a332a] shadow-xs">
          <span className="font-bold text-[10px] uppercase text-[#b84a24] shrink-0">Chỉnh tên nhanh:</span>
          
          <input
            type="text"
            value={nameThinh}
            onChange={(e) => setNameThinh(e.target.value)}
            className="w-20 bg-white border border-[#e9d8a6] focus:border-[#b84a24] focus:outline-none rounded-lg px-2 py-1 text-xs text-center font-bold text-[#4a332a] placeholder:text-stone-300 transition-all shadow-2xs"
            placeholder="Tên 1"
            title="Đổi tên Thành viên 1"
          />
          
          <span className="text-[#b84a24] font-bold">&</span>
          
          <input
            type="text"
            value={nameBen}
            onChange={(e) => setNameBen(e.target.value)}
            className="w-20 bg-white border border-[#e9d8a6] focus:border-[#b84a24] focus:outline-none rounded-lg px-2 py-1 text-xs text-center font-bold text-[#4a332a] placeholder:text-stone-300 transition-all shadow-2xs"
            placeholder="Tên 2"
            title="Đổi tên Thành viên 2"
          />
        </div>

        {/* View Mode selection */}
        <div className="md:col-span-4 flex flex-wrap justify-end gap-1.5">
          
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-2 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'single'
                ? 'bg-white text-[#b84a24] border-[#b84a24] shadow-sm'
                : 'bg-white/40 text-stone-600 border-[#e9d8a6]/60 hover:bg-white'
            }`}
          >
            <User className="w-3 h-3" />
            Cá nhân
          </button>

          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-2 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'split'
                ? 'bg-white text-[#b84a24] border-[#b84a24] shadow-sm'
                : 'bg-white/40 text-stone-600 border-[#e9d8a6]/60 hover:bg-white'
            }`}
          >
            <Users className="w-3 h-3" />
            Song Song
          </button>

          <button
            onClick={() => setViewMode('overlay')}
            className={`px-3 py-2 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'overlay'
                ? 'bg-white text-[#b84a24] border-[#b84a24] shadow-sm'
                : 'bg-white/40 text-stone-600 border-[#e9d8a6]/60 hover:bg-white'
            }`}
            title="Đè hai lịch lên nhau để tìm giờ rảnh chung"
          >
            <Layers className="w-3 h-3" />
            Đè Lịch
          </button>

        </div>

      </section>

      {/* Main Content Arena */}
      <main className="max-w-7xl mx-auto px-6">

        {/* Interactive Tips & Hints for Search / Overlay Mode */}
        {searchQuery && (
          <div className="mb-4 px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-sans flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-700 shrink-0" />
              Đang lọc kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong>. Những ô không trùng khớp sẽ tự động mờ đi.
            </span>
            <button onClick={() => setSearchQuery('')} className="text-amber-700 hover:underline font-bold">Xóa lọc</button>
          </div>
        )}

        {viewMode === 'overlay' && (
          <div className="mb-4 px-4 py-2.5 bg-[#e9d8a6]/30 border border-[#e9d8a6] text-[#4a332a] rounded-xl text-xs font-sans flex items-center gap-2 leading-snug">
            <Info className="w-4.5 h-4.5 text-[#b84a24] shrink-0" />
            <span>
              💡 <strong>Chế độ Đè Lịch (Overlay):</strong> Hệ thống tự động gộp lịch của cả hai người. Những ô có chung hoạt động (trùng tên và màu) sẽ hiển thị lớn. Những ô khác nhau sẽ hiển thị nửa/nửa rất dễ so sánh!
            </span>
          </div>
        )}

        {/* Toggle tabs for single mode */}
        {viewMode === 'single' && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('thinh')}
              className={`px-5 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                activeTab === 'thinh' ? 'bg-[#4a332a] text-white shadow' : 'bg-white/50 text-[#4a332a] hover:bg-white'
              }`}
            >
              Lịch của {nameThinh}
            </button>
            <button
              onClick={() => setActiveTab('ben')}
              className={`px-5 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                activeTab === 'ben' ? 'bg-[#4a332a] text-white shadow' : 'bg-white/50 text-[#4a332a] hover:bg-white'
              }`}
            >
              Lịch của {nameBen}
            </button>
          </div>
        )}

        {/* PRINTABLE CONTAINER AREA */}
        <div ref={printAreaRef} className="p-4 md:p-8 bg-[#faf6ee] rounded-3xl border-2 border-[#e9d8a6] shadow-sm relative overflow-hidden">
          
          {/* Aesthetic Ethnic Accent Borders */}
          <div className="absolute top-0 left-0 right-0 h-1.5 tribal-stripe-pink"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 tribal-stripe-dark"></div>

          {/* Timetable Header Card block */}
          <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-black text-[#4a332a] tracking-widest font-serif uppercase italic">
              {timetableTitle}
            </h2>
            <div className="w-24 h-1 bg-[#b84a24] mx-auto mt-2 rounded-full"></div>
            
            {viewMode === 'split' && (
              <p className="text-xs text-stone-500 mt-2 font-serif uppercase tracking-wider italic">
                BẢNG SONG SONG • {nameThinh} & {nameBen}
              </p>
            )}
            {viewMode === 'overlay' && (
              <p className="text-xs text-[#b84a24] mt-2 font-serif uppercase tracking-wider font-bold italic">
                BẢNG GỘP TRÙNG KHỚP • OVERLAY VIEW
              </p>
            )}
            {viewMode === 'single' && (
              <p className="text-xs text-stone-500 mt-2 font-serif uppercase tracking-wider italic">
                BẢNG CÁ NHÂN • LỊCH CỦA {activeTab === 'thinh' ? nameThinh.toUpperCase() : nameBen.toUpperCase()}
              </p>
            )}
          </div>

          {/* RENDER THE GRID SYSTEM */}
          {/* ==================================== 1. SPLIT VIEW MODE ==================================== */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Table for Thịnh */}
              <div className="bg-white p-5 rounded-2xl border border-[#e9d8a6]/60 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e9d8a6]/40">
                  {isEditingThinhName ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></span>
                      <input
                        type="text"
                        value={nameThinh}
                        onChange={(e) => setNameThinh(e.target.value)}
                        onBlur={() => setIsEditingThinhName(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setIsEditingThinhName(false);
                          if (e.key === 'Escape') setIsEditingThinhName(false);
                        }}
                        autoFocus
                        className="border-b-2 border-[#b84a24] bg-[#faf6ee] px-2 py-0.5 rounded text-sm font-bold text-[#4a332a] focus:outline-none max-w-[150px]"
                      />
                      <button onClick={() => setIsEditingThinhName(false)} className="text-emerald-600 hover:text-emerald-800 p-0.5" title="Xong">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-bold text-base text-[#4a332a] flex items-center gap-1.5 group">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                      Thời khóa biểu của <span className="underline decoration-dashed decoration-[#b84a24]/40 cursor-pointer hover:text-[#b84a24] transition-colors" onClick={() => setIsEditingThinhName(true)}>{nameThinh}</span>
                      <button onClick={() => setIsEditingThinhName(true)} className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-[#b84a24] p-0.5 transition-all" title="Đổi tên nhanh">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                  )}
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                    Thành viên chính
                  </span>
                </div>
                {renderSingleTable('thinh', scheduleThinh)}
              </div>

              {/* Table for Ben */}
              <div className="bg-white p-5 rounded-2xl border border-[#e9d8a6]/60 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e9d8a6]/40">
                  {isEditingBenName ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-ping"></span>
                      <input
                        type="text"
                        value={nameBen}
                        onChange={(e) => setNameBen(e.target.value)}
                        onBlur={() => setIsEditingBenName(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setIsEditingBenName(false);
                          if (e.key === 'Escape') setIsEditingBenName(false);
                        }}
                        autoFocus
                        className="border-b-2 border-[#b84a24] bg-[#faf6ee] px-2 py-0.5 rounded text-sm font-bold text-[#4a332a] focus:outline-none max-w-[150px]"
                      />
                      <button onClick={() => setIsEditingBenName(false)} className="text-emerald-600 hover:text-emerald-800 p-0.5" title="Xong">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-bold text-base text-[#4a332a] flex items-center gap-1.5 group">
                      <span className="w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
                      Thời khóa biểu của <span className="underline decoration-dashed decoration-[#b84a24]/40 cursor-pointer hover:text-[#b84a24] transition-colors" onClick={() => setIsEditingBenName(true)}>{nameBen}</span>
                      <button onClick={() => setIsEditingBenName(true)} className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-[#b84a24] p-0.5 transition-all" title="Đổi tên nhanh">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                  )}
                  <span className="text-[10px] bg-pink-50 text-pink-700 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                    Đồng hành
                  </span>
                </div>
                {renderSingleTable('ben', scheduleBen)}
              </div>

            </div>
          )}

          {/* ==================================== 2. SINGLE TAB VIEW MODE ==================================== */}
          {viewMode === 'single' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e9d8a6]/60 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e9d8a6]/40">
                {activeTab === 'thinh' ? (
                  isEditingThinhName ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                      <input
                        type="text"
                        value={nameThinh}
                        onChange={(e) => setNameThinh(e.target.value)}
                        onBlur={() => setIsEditingThinhName(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setIsEditingThinhName(false);
                          if (e.key === 'Escape') setIsEditingThinhName(false);
                        }}
                        autoFocus
                        className="border-b-2 border-[#b84a24] bg-[#faf6ee] px-2 py-0.5 rounded text-base font-extrabold text-[#4a332a] focus:outline-none max-w-[180px]"
                      />
                      <button onClick={() => setIsEditingThinhName(false)} className="text-emerald-600 hover:text-emerald-800 p-0.5" title="Xong">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-extrabold text-lg text-[#4a332a] flex items-center gap-2 group">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      Thời khóa biểu của <span className="underline decoration-dashed decoration-[#b84a24]/40 cursor-pointer hover:text-[#b84a24] transition-colors" onClick={() => setIsEditingThinhName(true)}>{nameThinh}</span>
                      <button onClick={() => setIsEditingThinhName(true)} className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-[#b84a24] p-0.5 transition-all" title="Đổi tên nhanh">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                  )
                ) : (
                  isEditingBenName ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></span>
                      <input
                        type="text"
                        value={nameBen}
                        onChange={(e) => setNameBen(e.target.value)}
                        onBlur={() => setIsEditingBenName(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setIsEditingBenName(false);
                          if (e.key === 'Escape') setIsEditingBenName(false);
                        }}
                        autoFocus
                        className="border-b-2 border-[#b84a24] bg-[#faf6ee] px-2 py-0.5 rounded text-base font-extrabold text-[#4a332a] focus:outline-none max-w-[180px]"
                      />
                      <button onClick={() => setIsEditingBenName(false)} className="text-emerald-600 hover:text-emerald-800 p-0.5" title="Xong">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-extrabold text-lg text-[#4a332a] flex items-center gap-2 group">
                      <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                      Thời khóa biểu của <span className="underline decoration-dashed decoration-[#b84a24]/40 cursor-pointer hover:text-[#b84a24] transition-colors" onClick={() => setIsEditingBenName(true)}>{nameBen}</span>
                      <button onClick={() => setIsEditingBenName(true)} className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-[#b84a24] p-0.5 transition-all" title="Đổi tên nhanh">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                  )
                )}
              </div>
              {activeTab === 'thinh' ? renderSingleTable('thinh', scheduleThinh) : renderSingleTable('ben', scheduleBen)}
            </div>
          )}

          {/* ==================================== 3. OVERLAY/COMBINED VIEW MODE ==================================== */}
          {viewMode === 'overlay' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e9d8a6]/60 shadow-sm max-w-5xl mx-auto overflow-x-auto">
              {renderOverlayTable()}
            </div>
          )}

        </div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto text-center py-10 text-stone-400 text-xs font-sans">
        <p>© 2026 Timetable Duo. Được thiết kế tinh xảo với các tông màu Pastel cổ điển tinh tế.</p>
      </footer>

      {/* ========================================================================================= */}
      {/* EDIT MODAL DIALOG */}
      {/* ========================================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            />

            {/* Modal Dialog container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-[#e9d8a6] rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl overflow-hidden font-sans text-[#4a332a]"
            >
              
              {/* Header */}
              <div className="flex justify-between items-start pb-4 mb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#b84a24] font-bold mb-1 uppercase tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    Cập nhật lịch học
                  </div>
                  <h3 className="text-base font-black text-[#4a332a]">
                    Chỉnh sửa ô: {selectedDay} ({TIME_SLOTS.find(s => s.id === selectedSlotId)?.timeText})
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Đang chỉnh sửa lịch cho: <strong className="text-[#b84a24]">{targetPerson === 'thinh' ? nameThinh : nameBen}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleSaveCell} className="space-y-4">
                
                {/* Task/Activity Name */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Tên môn học / Hoạt động
                  </label>
                  <input
                    type="text"
                    required
                    value={formTaskName}
                    onChange={(e) => setFormTaskName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#4a332a] focus:outline-none focus:border-[#b84a24] focus:ring-1 focus:ring-[#b84a24] placeholder:text-stone-400 transition-all font-medium"
                    placeholder="Ví dụ: SDP, CHN, Ăn cùng Ben..."
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Địa điểm / Phòng học (Không bắt buộc)
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#4a332a] focus:outline-none focus:border-[#b84a24] focus:ring-1 focus:ring-[#b84a24] placeholder:text-stone-400 transition-all font-medium"
                    placeholder="Ví dụ: Phòng 323, Lab, Thư viện..."
                  />
                </div>

                {/* Online toggle */}
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="is_online_cell"
                    checked={formIsOnline}
                    onChange={(e) => setFormIsOnline(e.target.checked)}
                    className="w-4 h-4 text-rose-500 bg-stone-100 border-stone-300 rounded focus:ring-rose-500 cursor-pointer"
                  />
                  <label htmlFor="is_online_cell" className="text-xs font-semibold text-stone-700 cursor-pointer select-none">
                    Lớp học trực tuyến (Online) - Chữ địa điểm sẽ hiển thị đỏ nổi bật!
                  </label>
                </div>

                {/* Additional Note */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Ghi chú thêm (Không bắt buộc)
                  </label>
                  <input
                    type="text"
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-xs text-[#4a332a] focus:outline-none focus:border-[#b84a24] placeholder:text-stone-400 transition-all"
                    placeholder="Ghi chú giáo viên, tài liệu..."
                  />
                </div>

                {/* Grid Color presets */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                    Lựa chọn tông màu Pastel
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_PASTEL_COLORS.map((preset, index) => {
                      const isSelected = formColorIndex === index;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormColorIndex(index)}
                          className={`h-9 rounded-lg border text-[10px] flex items-center justify-center relative font-bold transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-[#b84a24] scale-[1.03] shadow-sm' : 'opacity-85 hover:opacity-100'
                          } ${preset.bgClass} ${preset.textClass} ${preset.borderClass}`}
                          title={preset.name}
                        >
                          <span className="truncate max-w-[90%] px-1">
                            {preset.name}
                          </span>
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 bg-[#b84a24] text-white rounded-full p-0.5 text-[6px]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      const updateSchedule = targetPerson === 'thinh' ? setScheduleThinh : setScheduleBen;
                      updateSchedule(prev => {
                        const next = { ...prev };
                        delete next[selectedCellKey!];
                        return next;
                      });
                      triggerToast('Đã dọn sạch ô lịch học.');
                      setIsModalOpen(false);
                    }}
                    className="flex-1 py-2.5 bg-stone-50 hover:bg-stone-100 text-[#b84a24] rounded-xl text-xs font-bold border border-stone-200 transition-colors cursor-pointer"
                  >
                    Xóa ô này
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#4a332a] hover:bg-stone-800 text-[#faf6ee] rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Lưu lịch trình
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================================= */}
      {/* APP CONFIGURATION SETTINGS PANEL */}
      {/* ========================================================================================= */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-[#e9d8a6] rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl font-sans text-[#4a332a]"
            >
              
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-stone-100">
                <h3 className="text-base font-black text-[#4a332a] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#b84a24]" />
                  Cấu hình Thời khóa biểu Đôi
                </h3>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                
                {/* Title edit */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Tiêu đề Bảng biểu
                  </label>
                  <input
                    type="text"
                    value={timetableTitle}
                    onChange={(e) => setTimetableTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#4a332a] focus:outline-none focus:border-[#b84a24] font-bold"
                    placeholder="Nhập tiêu đề thời khóa biểu..."
                  />
                </div>

                {/* Name of Thinh */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Tên Thành viên chính
                  </label>
                  <input
                    type="text"
                    value={nameThinh}
                    onChange={(e) => setNameThinh(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#4a332a] focus:outline-none focus:border-[#b84a24]"
                    placeholder="Nhập tên..."
                  />
                </div>

                {/* Name of Ben */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Tên Đồng hành
                  </label>
                  <input
                    type="text"
                    value={nameBen}
                    onChange={(e) => setNameBen(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#4a332a] focus:outline-none focus:border-[#b84a24]"
                    placeholder="Nhập tên..."
                  />
                </div>

                {/* Lunch break text */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Nhãn Nghỉ trưa
                  </label>
                  <input
                    type="text"
                    value={lunchBreakText}
                    onChange={(e) => setLunchBreakText(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#4a332a] focus:outline-none focus:border-[#b84a24]"
                    placeholder="Nhập nhãn..."
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-6 py-2.5 bg-[#4a332a] hover:bg-stone-800 text-[#faf6ee] rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Hoàn tất cấu hình
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
