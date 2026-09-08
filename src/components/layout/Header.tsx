import { Bell, Search, Globe, User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher dans tout l'ERP..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Filiale Selector */}
        <select className="bg-transparent border border-border rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-primary hidden sm:block">
          <option>BOUA Stratégie & Influence</option>
          <option>BOUA Tech & Digital</option>
          <option>BOUA Fintech</option>
          <option>BOUA Industrie</option>
        </select>

        {/* Icons */}
        <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-card"></span>
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-border ml-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-sm">
            <p className="font-medium leading-none">Admin G.</p>
            <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
