import { useState } from "react";
import {
  Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter,
  AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown,
  ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft,
  ArrowUpRight, AtSign, Award, BarChart, BarChart2, Battery, BatteryCharging,
  Bell, BellOff, Bluetooth, Bold, Book, BookOpen, Bookmark, Box, Briefcase,
  Calendar, Camera, CameraOff, Cast, Check, CheckCircle, CheckSquare,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown, ChevronsLeft,
  ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard, Clock, Cloud,
  CloudDrizzle, CloudLightning, CloudOff, CloudRain, CloudSnow, Code, Codepen,
  Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight,
  CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft,
  CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete,
  Disc, DollarSign, Download, Droplet, Edit, Edit2, Edit3, ExternalLink,
  Eye, EyeOff, Facebook, FastForward, Feather, File, FileMinus, FilePlus,
  FileText, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer,
  Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Globe,
  Grid2X2 as Grid, HardDrive, Hash, Headphones, Heart, HelpCircle, Hexagon, Home,
  Image, Inbox, Info, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2,
  List, Loader, Lock, LogIn, LogOut, Mail, Map, MapPin, Maximize, Maximize2,
  Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2,
  Minus, MinusCircle, MinusSquare, Monitor, Moon, MoreHorizontal, MoreVertical,
  MousePointer, Move, Music, Navigation, Navigation2, Octagon, Package,
  Paperclip, Pause, PauseCircle, Pen, Percent, Phone, PhoneCall,
  PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing,
  PieChart, Play, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power,
  Printer, Radio, RefreshCw, RefreshCcw, Repeat, Rewind, RotateCcw, RotateCw,
  Rss, Save, Scissors, Search, Send, Server, Settings, Share, Share2,
  Shield, ShieldOff, ShoppingBag, ShoppingCart, Shuffle, Sidebar,
  SkipBack, SkipForward, Slash, Sliders, Smartphone, Smile, Speaker,
  Square, Star, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag, Target,
  Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight,
  Trash, Trash2, TrendingDown, TrendingUp, Triangle, Truck, Tv, Type,
  Umbrella, Underline, Unlock, Upload, UploadCloud as CloudUpload, User, UserCheck, UserMinus,
  UserPlus, UserX, Users, Video, VideoOff, Voicemail, Volume, Volume1,
  Volume2, VolumeX, Watch, Wifi, WifiOff, Wind, X, XCircle, XSquare,
  Zap, ZapOff, ZoomIn, ZoomOut
} from "lucide-react";

const allIcons = [
  { name: "Activity", Icon: Activity }, { name: "Airplay", Icon: Airplay },
  { name: "AlertCircle", Icon: AlertCircle }, { name: "AlertOctagon", Icon: AlertOctagon },
  { name: "AlertTriangle", Icon: AlertTriangle }, { name: "AlignCenter", Icon: AlignCenter },
  { name: "AlignJustify", Icon: AlignJustify }, { name: "AlignLeft", Icon: AlignLeft },
  { name: "AlignRight", Icon: AlignRight }, { name: "Anchor", Icon: Anchor },
  { name: "Aperture", Icon: Aperture }, { name: "Archive", Icon: Archive },
  { name: "ArrowDown", Icon: ArrowDown }, { name: "ArrowDownLeft", Icon: ArrowDownLeft },
  { name: "ArrowDownRight", Icon: ArrowDownRight }, { name: "ArrowLeft", Icon: ArrowLeft },
  { name: "ArrowRight", Icon: ArrowRight }, { name: "ArrowUp", Icon: ArrowUp },
  { name: "ArrowUpLeft", Icon: ArrowUpLeft }, { name: "ArrowUpRight", Icon: ArrowUpRight },
  { name: "AtSign", Icon: AtSign }, { name: "Award", Icon: Award },
  { name: "BarChart", Icon: BarChart }, { name: "BarChart2", Icon: BarChart2 },
  { name: "Battery", Icon: Battery }, { name: "BatteryCharging", Icon: BatteryCharging },
  { name: "Bell", Icon: Bell }, { name: "BellOff", Icon: BellOff },
  { name: "Bluetooth", Icon: Bluetooth }, { name: "Bold", Icon: Bold },
  { name: "Book", Icon: Book }, { name: "BookOpen", Icon: BookOpen },
  { name: "Bookmark", Icon: Bookmark }, { name: "Box", Icon: Box },
  { name: "Briefcase", Icon: Briefcase }, { name: "Calendar", Icon: Calendar },
  { name: "Camera", Icon: Camera }, { name: "CameraOff", Icon: CameraOff },
  { name: "Cast", Icon: Cast }, { name: "Check", Icon: Check },
  { name: "CheckCircle", Icon: CheckCircle }, { name: "CheckSquare", Icon: CheckSquare },
  { name: "ChevronDown", Icon: ChevronDown }, { name: "ChevronLeft", Icon: ChevronLeft },
  { name: "ChevronRight", Icon: ChevronRight }, { name: "ChevronUp", Icon: ChevronUp },
  { name: "ChevronsDown", Icon: ChevronsDown }, { name: "ChevronsLeft", Icon: ChevronsLeft },
  { name: "ChevronsRight", Icon: ChevronsRight }, { name: "ChevronsUp", Icon: ChevronsUp },
  { name: "Chrome", Icon: Chrome }, { name: "Circle", Icon: Circle },
  { name: "Clipboard", Icon: Clipboard }, { name: "Clock", Icon: Clock },
  { name: "Cloud", Icon: Cloud }, { name: "CloudDrizzle", Icon: CloudDrizzle },
  { name: "CloudLightning", Icon: CloudLightning }, { name: "CloudOff", Icon: CloudOff },
  { name: "CloudRain", Icon: CloudRain }, { name: "CloudSnow", Icon: CloudSnow },
  { name: "Code", Icon: Code }, { name: "Codepen", Icon: Codepen },
  { name: "Coffee", Icon: Coffee }, { name: "Columns", Icon: Columns },
  { name: "Command", Icon: Command }, { name: "Compass", Icon: Compass },
  { name: "Copy", Icon: Copy }, { name: "CornerDownLeft", Icon: CornerDownLeft },
  { name: "CornerDownRight", Icon: CornerDownRight }, { name: "CornerLeftDown", Icon: CornerLeftDown },
  { name: "CornerLeftUp", Icon: CornerLeftUp }, { name: "CornerRightDown", Icon: CornerRightDown },
  { name: "CornerRightUp", Icon: CornerRightUp }, { name: "CornerUpLeft", Icon: CornerUpLeft },
  { name: "CornerUpRight", Icon: CornerUpRight }, { name: "Cpu", Icon: Cpu },
  { name: "CreditCard", Icon: CreditCard }, { name: "Crop", Icon: Crop },
  { name: "Crosshair", Icon: Crosshair }, { name: "Database", Icon: Database },
  { name: "Delete", Icon: Delete }, { name: "Disc", Icon: Disc },
  { name: "DollarSign", Icon: DollarSign }, { name: "Download", Icon: Download },
  { name: "Droplet", Icon: Droplet }, { name: "Edit", Icon: Edit },
  { name: "Edit2", Icon: Edit2 }, { name: "Edit3", Icon: Edit3 },
  { name: "ExternalLink", Icon: ExternalLink }, { name: "Eye", Icon: Eye },
  { name: "EyeOff", Icon: EyeOff }, { name: "Facebook", Icon: Facebook },
  { name: "FastForward", Icon: FastForward }, { name: "Feather", Icon: Feather },
  { name: "File", Icon: File }, { name: "FileMinus", Icon: FileMinus },
  { name: "FilePlus", Icon: FilePlus }, { name: "FileText", Icon: FileText },
  { name: "Film", Icon: Film }, { name: "Filter", Icon: Filter },
  { name: "Flag", Icon: Flag }, { name: "Folder", Icon: Folder },
  { name: "FolderMinus", Icon: FolderMinus }, { name: "FolderPlus", Icon: FolderPlus },
  { name: "Frown", Icon: Frown }, { name: "Gift", Icon: Gift },
  { name: "GitBranch", Icon: GitBranch }, { name: "GitCommit", Icon: GitCommit },
  { name: "GitMerge", Icon: GitMerge }, { name: "GitPullRequest", Icon: GitPullRequest },
  { name: "Globe", Icon: Globe }, { name: "Grid", Icon: Grid },
  { name: "HardDrive", Icon: HardDrive }, { name: "Hash", Icon: Hash },
  { name: "Headphones", Icon: Headphones }, { name: "Heart", Icon: Heart },
  { name: "HelpCircle", Icon: HelpCircle }, { name: "Hexagon", Icon: Hexagon },
  { name: "Home", Icon: Home }, { name: "Image", Icon: Image },
  { name: "Inbox", Icon: Inbox }, { name: "Info", Icon: Info },
  { name: "Italic", Icon: Italic }, { name: "Key", Icon: Key },
  { name: "Layers", Icon: Layers }, { name: "Layout", Icon: Layout },
  { name: "LifeBuoy", Icon: LifeBuoy }, { name: "Link", Icon: Link },
  { name: "Link2", Icon: Link2 }, { name: "List", Icon: List },
  { name: "Loader", Icon: Loader }, { name: "Lock", Icon: Lock },
  { name: "LogIn", Icon: LogIn }, { name: "LogOut", Icon: LogOut },
  { name: "Mail", Icon: Mail }, { name: "Map", Icon: Map },
  { name: "MapPin", Icon: MapPin }, { name: "Maximize", Icon: Maximize },
  { name: "Maximize2", Icon: Maximize2 }, { name: "Meh", Icon: Meh },
  { name: "Menu", Icon: Menu }, { name: "MessageCircle", Icon: MessageCircle },
  { name: "MessageSquare", Icon: MessageSquare }, { name: "Mic", Icon: Mic },
  { name: "MicOff", Icon: MicOff }, { name: "Minimize", Icon: Minimize },
  { name: "Minimize2", Icon: Minimize2 }, { name: "Minus", Icon: Minus },
  { name: "MinusCircle", Icon: MinusCircle }, { name: "MinusSquare", Icon: MinusSquare },
  { name: "Monitor", Icon: Monitor }, { name: "Moon", Icon: Moon },
  { name: "MoreHorizontal", Icon: MoreHorizontal }, { name: "MoreVertical", Icon: MoreVertical },
  { name: "MousePointer", Icon: MousePointer }, { name: "Move", Icon: Move },
  { name: "Music", Icon: Music }, { name: "Navigation", Icon: Navigation },
  { name: "Navigation2", Icon: Navigation2 }, { name: "Octagon", Icon: Octagon },
  { name: "Package", Icon: Package }, { name: "Paperclip", Icon: Paperclip },
  { name: "Pause", Icon: Pause }, { name: "PauseCircle", Icon: PauseCircle },
  { name: "Pen", Icon: Pen }, { name: "Percent", Icon: Percent },
  { name: "Phone", Icon: Phone }, { name: "PhoneCall", Icon: PhoneCall },
  { name: "PhoneForwarded", Icon: PhoneForwarded }, { name: "PhoneIncoming", Icon: PhoneIncoming },
  { name: "PhoneMissed", Icon: PhoneMissed }, { name: "PhoneOff", Icon: PhoneOff },
  { name: "PhoneOutgoing", Icon: PhoneOutgoing }, { name: "PieChart", Icon: PieChart },
  { name: "Play", Icon: Play }, { name: "PlayCircle", Icon: PlayCircle },
  { name: "Plus", Icon: Plus }, { name: "PlusCircle", Icon: PlusCircle },
  { name: "PlusSquare", Icon: PlusSquare }, { name: "Pocket", Icon: Pocket },
  { name: "Power", Icon: Power }, { name: "Printer", Icon: Printer },
  { name: "Radio", Icon: Radio }, { name: "RefreshCw", Icon: RefreshCw },
  { name: "RefreshCcw", Icon: RefreshCcw }, { name: "Repeat", Icon: Repeat },
  { name: "Rewind", Icon: Rewind }, { name: "RotateCcw", Icon: RotateCcw },
  { name: "RotateCw", Icon: RotateCw }, { name: "Rss", Icon: Rss },
  { name: "Save", Icon: Save }, { name: "Scissors", Icon: Scissors },
  { name: "Search", Icon: Search }, { name: "Send", Icon: Send },
  { name: "Server", Icon: Server }, { name: "Settings", Icon: Settings },
  { name: "Share", Icon: Share }, { name: "Share2", Icon: Share2 },
  { name: "Shield", Icon: Shield }, { name: "ShieldOff", Icon: ShieldOff },
  { name: "ShoppingBag", Icon: ShoppingBag }, { name: "ShoppingCart", Icon: ShoppingCart },
  { name: "Shuffle", Icon: Shuffle }, { name: "Sidebar", Icon: Sidebar },
  { name: "SkipBack", Icon: SkipBack }, { name: "SkipForward", Icon: SkipForward },
  { name: "Slash", Icon: Slash }, { name: "Sliders", Icon: Sliders },
  { name: "Smartphone", Icon: Smartphone }, { name: "Smile", Icon: Smile },
  { name: "Speaker", Icon: Speaker }, { name: "Square", Icon: Square },
  { name: "Star", Icon: Star }, { name: "StopCircle", Icon: StopCircle },
  { name: "Sun", Icon: Sun }, { name: "Sunrise", Icon: Sunrise },
  { name: "Sunset", Icon: Sunset }, { name: "Tablet", Icon: Tablet },
  { name: "Tag", Icon: Tag }, { name: "Target", Icon: Target },
  { name: "Terminal", Icon: Terminal }, { name: "Thermometer", Icon: Thermometer },
  { name: "ThumbsDown", Icon: ThumbsDown }, { name: "ThumbsUp", Icon: ThumbsUp },
  { name: "ToggleLeft", Icon: ToggleLeft }, { name: "ToggleRight", Icon: ToggleRight },
  { name: "Trash", Icon: Trash }, { name: "Trash2", Icon: Trash2 },
  { name: "TrendingDown", Icon: TrendingDown }, { name: "TrendingUp", Icon: TrendingUp },
  { name: "Triangle", Icon: Triangle }, { name: "Truck", Icon: Truck },
  { name: "Tv", Icon: Tv }, { name: "Type", Icon: Type },
  { name: "Umbrella", Icon: Umbrella }, { name: "Underline", Icon: Underline },
  { name: "Unlock", Icon: Unlock }, { name: "Upload", Icon: Upload },
  { name: "CloudUpload", Icon: CloudUpload }, { name: "User", Icon: User },
  { name: "UserCheck", Icon: UserCheck }, { name: "UserMinus", Icon: UserMinus },
  { name: "UserPlus", Icon: UserPlus }, { name: "UserX", Icon: UserX },
  { name: "Users", Icon: Users }, { name: "Video", Icon: Video },
  { name: "VideoOff", Icon: VideoOff }, { name: "Voicemail", Icon: Voicemail },
  { name: "Volume", Icon: Volume }, { name: "Volume1", Icon: Volume1 },
  { name: "Volume2", Icon: Volume2 }, { name: "VolumeX", Icon: VolumeX },
  { name: "Watch", Icon: Watch }, { name: "Wifi", Icon: Wifi },
  { name: "WifiOff", Icon: WifiOff }, { name: "Wind", Icon: Wind },
  { name: "X", Icon: X }, { name: "XCircle", Icon: XCircle },
  { name: "XSquare", Icon: XSquare }, { name: "Zap", Icon: Zap },
  { name: "ZapOff", Icon: ZapOff }, { name: "ZoomIn", Icon: ZoomIn },
  { name: "ZoomOut", Icon: ZoomOut },
];

const sizes = [
  { label: "16px", size: 16 },
  { label: "20px", size: 20 },
  { label: "24px", size: 24 },
];

export function IconSection() {
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState(20);

  const filtered = allIcons.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-[24px] font-['Inter',sans-serif]">
      <div>
        <h2 className="text-[24px] text-[#181d27] font-semibold">Icon library</h2>
        <p className="text-[14px] text-[#535862] mt-[4px]">
          Icons from the Lucide icon set. Stroke-based, consistent style. Available in multiple sizes.
        </p>
      </div>

      <div className="flex items-center gap-[16px]">
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#D5D7DA] rounded-[8px] px-[12px] py-[8px] text-[14px] w-[280px] outline-none focus:border-[#7F56D9]"
        />
        <div className="flex gap-[8px]">
          {sizes.map((s) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s.size)}
              className={`px-[12px] py-[6px] rounded-[6px] text-[13px] border ${
                selectedSize === s.size
                  ? "bg-[#7F56D9] text-white border-[#7F56D9]"
                  : "bg-white text-[#535862] border-[#D5D7DA] hover:bg-[#F9F5FF]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-[4px]">
        {filtered.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-[8px] p-[12px] rounded-[8px] hover:bg-[#F9F5FF] cursor-pointer group"
            title={name}
          >
            <Icon size={selectedSize} strokeWidth={1.5} className="text-[#181d27]" />
            <span className="text-[10px] text-[#717680] text-center truncate w-full group-hover:text-[#7F56D9]">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
