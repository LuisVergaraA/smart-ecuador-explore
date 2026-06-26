import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bell, Briefcase, Bus, Building2, Calendar, ChevronRight, Compass, GraduationCap,
  Hotel, MapPin, MessageCircle, Menu, Mountain, Plane, Search, Send, Shield,
  Sparkles, Star, Tag, Tent, Users, Utensils, Wifi, X, Home, Heart, User,
} from "lucide-react";
import logoAsset from "@/assets/smarttrip-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: SmartTripApp,
});

type ProfileId = "mateo" | "andres" | "maria";

const PROFILES: Record<ProfileId, {
  name: string; role: string; tagline: string; icon: typeof GraduationCap;
  accent: string; budget: string;
}> = {
  mateo: {
    name: "Mateo", role: "Estudiante", tagline: "Aventura sin gastar de más",
    icon: GraduationCap, accent: "from-[oklch(0.65_0.18_145)] to-[oklch(0.55_0.14_220)]",
    budget: "$ Bajo presupuesto",
  },
  andres: {
    name: "Andrés", role: "Viajero de Negocios", tagline: "Eficiencia en cada parada",
    icon: Briefcase, accent: "from-[oklch(0.22_0.08_260)] to-[oklch(0.45_0.16_250)]",
    budget: "$$$ Corporativo",
  },
  maria: {
    name: "María", role: "Planificadora Familiar", tagline: "Seguridad para los tuyos",
    icon: Users, accent: "from-[oklch(0.55_0.14_220)] to-[oklch(0.65_0.18_145)]",
    budget: "$$ Familiar",
  },
};

function SmartTripApp() {
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [section, setSection] = useState("inicio");

  if (!profile) return <ProfileSelector onSelect={setProfile} />;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <DesktopSidebar profile={profile} section={section} setSection={setSection} onSwitch={() => setProfile(null)} />
      <TopBar profile={profile} onMenu={() => setMobileNavOpen(true)} onSwitch={() => setProfile(null)} />

      <main className="lg:pl-72 pt-16 pb-24 lg:pb-12">
        <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <ProfileDashboard profile={profile} />
          <ComparatorSection />
          <ReviewsSection />
        </div>
      </main>

      <MobileBottomNav section={section} setSection={setSection} />
      <MobileMenu open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} profile={profile} onSwitch={() => { setProfile(null); setMobileNavOpen(false); }} />
      <FloatingAssistant open={chatOpen} setOpen={setChatOpen} profile={profile} />
    </div>
  );
}

/* ---------------- PROFILE SELECTOR ---------------- */
function ProfileSelector({ onSelect }: { onSelect: (p: ProfileId) => void }) {
  return (
    <div className="min-h-screen gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20">
        <div className="flex items-center gap-3 mb-12">
          <img src={logoAsset.url} alt="SmartTrip" className="h-12 w-12 rounded-xl object-contain bg-white p-1 ring-2 ring-white/30" />
          <div>
            <div className="font-display font-bold text-xl tracking-tight">SmartTrip</div>
            <div className="text-xs text-white/70">Descubre Ecuador inteligentemente</div>
          </div>
        </div>

        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium mb-5 ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" /> IA personalizada por perfil
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold leading-[1.05] mb-4">
            ¿Quién viaja hoy<br />por <span className="text-[oklch(0.85_0.16_145)]">Ecuador</span>?
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl">
            Elige tu perfil y recibe recomendaciones inteligentes basadas en presupuesto, intereses y momento del viaje.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {(Object.keys(PROFILES) as ProfileId[]).map((id) => {
            const p = PROFILES[id]; const Icon = p.icon;
            return (
              <button key={id} onClick={() => onSelect(id)}
                className="group text-left rounded-3xl bg-white/10 hover:bg-white/15 backdrop-blur ring-1 ring-white/20 hover:ring-white/40 p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${p.accent} grid place-items-center mb-5 shadow-glow`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-xs uppercase tracking-widest text-white/60 mb-1">{p.role}</div>
                <div className="font-display text-2xl font-bold mb-1">{p.name}</div>
                <p className="text-sm text-white/75 mb-4">{p.tagline}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/20">{p.budget}</span>
                  <span className="inline-flex items-center gap-1 text-white/90 group-hover:translate-x-1 transition-transform">
                    Entrar <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- LAYOUT CHROME ---------------- */
function LogoMark({ size = "h-10 w-10" }: { size?: string }) {
  return (
    <div className={`${size} rounded-xl overflow-hidden ring-1 ring-border bg-white grid place-items-center shrink-0`}>
      <img src={logoAsset.url} alt="SmartTrip logo" className="h-full w-full object-contain p-0.5" />
    </div>
  );
}

function TopBar({ profile, onMenu, onSwitch }: { profile: ProfileId; onMenu: () => void; onSwitch: () => void }) {
  const p = PROFILES[profile];
  return (
    <header className="fixed top-0 inset-x-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="h-full px-4 sm:px-6 lg:pl-80 lg:pr-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={onMenu} className="h-10 w-10 grid place-items-center rounded-xl hover:bg-secondary">
            <Menu className="h-5 w-5" />
          </button>
          <LogoMark size="h-9 w-9" />
          <div className="min-w-0">
            <div className="font-display font-bold text-sm leading-tight truncate">SmartTrip</div>
            <div className="text-[10px] text-muted-foreground truncate">Hola, {p.name}</div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3 min-w-0">
          <div className="relative w-full max-w-xl">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Busca destinos, hoteles, vuelos en Ecuador…"
              className="w-full h-11 pl-11 pr-4 rounded-full bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
          </div>
        </div>
        <div className="col-start-3 flex items-center gap-2">
          <button className="hidden sm:grid h-10 w-10 place-items-center rounded-xl hover:bg-secondary relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--nature)]" />
          </button>
          <button onClick={onSwitch}
            className="hidden sm:inline-flex h-10 px-3 items-center gap-2 rounded-xl bg-secondary hover:bg-accent text-xs font-medium">
            <User className="h-4 w-4" /> Cambiar perfil
          </button>
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${p.accent} grid place-items-center text-white text-sm font-bold shadow-soft`}>
            {p.name[0]}
          </div>
        </div>
      </div>
    </header>
  );
}

function DesktopSidebar({ profile, section, setSection, onSwitch }: { profile: ProfileId; section: string; setSection: (s: string) => void; onSwitch: () => void }) {
  const p = PROFILES[profile];
  const items = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "destinos", label: "Destinos", icon: Compass },
    { id: "hospedaje", label: "Hospedaje", icon: Hotel },
    { id: "transporte", label: "Transporte", icon: Plane },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "alertas", label: "Alertas IA", icon: Sparkles },
  ];
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-72 flex-col border-r border-border bg-card">
      <div className="h-16 px-6 flex items-center gap-3 border-b border-border">
        <LogoMark />
        <div className="min-w-0">
          <div className="font-display font-bold leading-tight">SmartTrip</div>
          <div className="text-[11px] text-muted-foreground truncate">Descubre Ecuador</div>
        </div>
      </div>
      <div className="p-4">
        <div className={`rounded-2xl p-4 bg-gradient-to-br ${p.accent} text-white shadow-soft`}>
          <div className="text-[11px] uppercase tracking-widest opacity-80">Perfil activo</div>
          <div className="font-display font-bold text-lg">{p.name}</div>
          <div className="text-xs opacity-90">{p.role}</div>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setSection(id)}
            className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-colors ${section === id ? "bg-primary text-primary-foreground shadow-soft" : "text-foreground/70 hover:bg-secondary hover:text-foreground"}`}>
            <Icon className="h-4.5 w-4.5" /> {label}
          </button>
        ))}
      </nav>
      <button onClick={onSwitch} className="m-4 h-11 rounded-xl border border-border hover:bg-secondary text-sm font-medium flex items-center justify-center gap-2">
        <User className="h-4 w-4" /> Cambiar perfil
      </button>
    </aside>
  );
}

function MobileMenu({ open, onClose, profile, onSwitch }: { open: boolean; onClose: () => void; profile: ProfileId; onSwitch: () => void }) {
  const p = PROFILES[profile];
  if (!open) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] bg-card shadow-2xl flex flex-col animate-in slide-in-from-left">
        <div className="h-16 px-5 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <LogoMark size="h-9 w-9" />
            <div className="font-display font-bold truncate">SmartTrip</div>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className={`rounded-2xl p-4 bg-gradient-to-br ${p.accent} text-white`}>
            <div className="text-[11px] uppercase tracking-widest opacity-80">Perfil</div>
            <div className="font-display font-bold">{p.name}</div>
            <div className="text-xs opacity-90">{p.role}</div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {([
            ["Inicio", Home], ["Destinos", Compass], ["Hospedaje", Hotel],
            ["Transporte", Plane], ["Alertas IA", Sparkles], ["Favoritos", Heart],
          ] as const).map(([label, Icon]) => (
            <button key={label} onClick={onClose} className="w-full flex items-center gap-3 px-3 h-11 rounded-xl hover:bg-secondary text-sm font-medium">
              <Icon className="h-4.5 w-4.5" /> {label}
            </button>
          ))}
        </nav>
        <button onClick={onSwitch} className="m-4 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
          Cambiar perfil
        </button>
      </div>
    </div>
  );
}

function MobileBottomNav({ section, setSection }: { section: string; setSection: (s: string) => void }) {
  const items = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "destinos", label: "Explorar", icon: Compass },
    { id: "alertas", label: "Alertas", icon: Sparkles },
    { id: "favoritos", label: "Favs", icon: Heart },
    { id: "perfil", label: "Perfil", icon: User },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {items.map(({ id, label, icon: Icon }) => {
          const active = section === id;
          return (
            <button key={id} onClick={() => setSection(id)} className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium">
              <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={active ? "text-primary" : "text-muted-foreground"}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------------- DASHBOARD PER PROFILE ---------------- */
function ProfileDashboard({ profile }: { profile: ProfileId }) {
  if (profile === "mateo") return <MateoView />;
  if (profile === "andres") return <AndresView />;
  return <MariaView />;
}

function HeroBanner({ profile }: { profile: ProfileId }) {
  const p = PROFILES[profile];
  const Icon = p.icon;
  return (
    <section className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${p.accent} text-white shadow-glow relative overflow-hidden mt-6`}>
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="relative grid sm:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 ring-1 ring-white/25 text-[11px] mb-3">
            <Icon className="h-3.5 w-3.5" /> {p.role}
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold mb-2">
            Hola, {p.name} 👋
          </h1>
          <p className="text-white/85 text-sm sm:text-base max-w-xl">{p.tagline}. SmartTrip ya armó tu día en Ecuador.</p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1">
          <div className="text-[11px] uppercase tracking-widest text-white/70">Presupuesto</div>
          <div className="font-display text-lg font-bold">{p.budget}</div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ icon: Icon, title, action }: { icon: typeof Sparkles; title: string; action?: string }) {
  return (
    <div className="flex items-end justify-between mt-10 mb-4">
      <h2 className="font-display text-xl sm:text-2xl font-bold flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" /> {title}
      </h2>
      {action && <button className="text-xs font-medium text-primary hover:underline">{action}</button>}
    </div>
  );
}

/* ---- MATEO (estudiante) ---- */
function MateoView() {
  const offers = [
    { tag: "-60%", title: "Quilotoa Loop · 3 días", price: "$ 38", expires: "Termina en 4h", img: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=600&q=60" },
    { tag: "-45%", title: "Surf en Montañita", price: "$ 22 / noche", expires: "Hoy", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=60" },
    { tag: "Hostel", title: "Cuenca centro histórico", price: "$ 14 / noche", expires: "Mañana", img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&q=60" },
  ];
  const adventures = [
    { name: "Cotopaxi", type: "Trekking", price: "$ 25", icon: Mountain },
    { name: "Mindo", type: "Tirolesa + cascadas", price: "$ 32", icon: Tent },
    { name: "Baños", type: "Aventura extrema", price: "$ 18", icon: Compass },
    { name: "Otavalo", type: "Cultura andina", price: "$ 12", icon: MapPin },
  ];
  return (
    <>
      <HeroBanner profile="mateo" />
      <SectionTitle icon={Tag} title="Alertas de ofertas urgentes" action="Ver todas" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((o) => (
          <article key={o.title} className="group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:-translate-y-1 transition-transform">
            <div className="relative h-40 overflow-hidden">
              <img src={o.img} alt={o.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[var(--nature)] text-white text-xs font-bold">{o.tag}</span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-destructive/90 text-white text-[10px] font-medium animate-pulse">⏱ {o.expires}</span>
            </div>
            <div className="p-4">
              <div className="font-display font-bold">{o.title}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-bold">{o.price}</span>
                <button className="text-xs font-medium px-3 h-8 rounded-lg bg-primary text-primary-foreground">Reservar</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <SectionTitle icon={Mountain} title="Aventura económica cerca de ti" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {adventures.map(({ name, type, price, icon: Icon }) => (
          <div key={name} className="rounded-2xl p-4 bg-card border border-border hover:border-primary/40 hover:shadow-soft transition">
            <div className="h-10 w-10 rounded-xl bg-[var(--nature)]/15 text-[var(--nature)] grid place-items-center mb-3">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display font-bold truncate">{name}</div>
            <div className="text-xs text-muted-foreground">{type}</div>
            <div className="mt-2 text-sm font-bold text-primary">desde {price}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---- ANDRÉS (negocios) ---- */
function AndresView() {
  const quick = [
    { label: "Vuelo UIO → GYE", sub: "Hoy 18:40 · LATAM", icon: Plane },
    { label: "Uber Ejecutivo", sub: "Aeropuerto en 12 min", icon: Bus },
    { label: "Hotel corporativo", sub: "Wyndham Quito · check-in rápido", icon: Hotel },
    { label: "Sala de reunión", sub: "WeWork Cumbayá", icon: Building2 },
  ];
  const hotels = [
    { city: "Quito", name: "Swissôtel Quito", rating: 4.8, price: "$189", tag: "Wi-Fi 1Gbps", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=60" },
    { city: "Guayaquil", name: "Hilton Colón", rating: 4.7, price: "$165", tag: "Sala ejecutiva", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=60" },
    { city: "Cuenca", name: "Oro Verde Cuenca", rating: 4.6, price: "$142", tag: "Desayuno 5am", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=60" },
  ];
  const restaurants = [
    { name: "Casa Gangotena", city: "Quito", note: "Reunión formal · privado" },
    { name: "Lo Nuestro", city: "Guayaquil", note: "Almuerzo ejecutivo" },
    { name: "Tiestos", city: "Cuenca", note: "Cliente VIP" },
  ];
  return (
    <>
      <HeroBanner profile="andres" />
      <SectionTitle icon={Plane} title="Reservas rápidas" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quick.map(({ label, sub, icon: Icon }) => (
          <button key={label} className="text-left rounded-2xl bg-card border border-border p-4 hover:border-primary hover:shadow-soft transition">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display font-bold text-sm">{label}</div>
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{sub}</div>
            <div className="mt-3 text-xs font-medium text-primary inline-flex items-center gap-1">
              Reservar 1-tap <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </button>
        ))}
      </div>

      <SectionTitle icon={Hotel} title="Hoteles corporativos · Quito · Guayaquil · Cuenca" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((h) => (
          <article key={h.name} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft">
            <div className="relative h-40">
              <img src={h.img} alt={h.name} className="h-full w-full object-cover" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[var(--trust)] text-white text-[11px] font-bold">{h.city}</span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium inline-flex items-center gap-1">
                <Wifi className="h-3 w-3 text-primary" /> {h.tag}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-display font-bold">{h.name}</div>
                <div className="text-xs inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[var(--nature)] text-[var(--nature)]" />{h.rating}</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-primary font-bold">{h.price} <span className="text-xs font-normal text-muted-foreground">/ noche</span></span>
                <button className="text-xs h-8 px-3 rounded-lg bg-primary text-primary-foreground font-medium">Reservar</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <SectionTitle icon={Utensils} title="Restaurantes para reuniones" />
      <div className="grid sm:grid-cols-3 gap-3">
        {restaurants.map((r) => (
          <div key={r.name} className="rounded-2xl bg-card border border-border p-4 flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[var(--nature)]/15 text-[var(--nature)] grid place-items-center shrink-0">
              <Utensils className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold truncate">{r.name}</div>
              <div className="text-xs text-muted-foreground truncate">{r.city} · {r.note}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---- MARÍA (familiar) ---- */
function MariaView() {
  const trending = [
    { name: "Mindo Cloud Forest", safety: "98%", ages: "Todas", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=60" },
    { name: "Hacienda La Carriona", safety: "96%", ages: "6+", img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=60" },
    { name: "Playa Same", safety: "94%", ages: "Todas", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=60" },
  ];
  const itinerary = [
    { time: "08:00", title: "Desayuno familiar", note: "Cafetería kid-friendly · sillas para bebé", icon: Utensils },
    { time: "10:00", title: "Teleférico de Quito", note: "Recomendado 4+ · acceso a coche", icon: Mountain },
    { time: "13:00", title: "Almuerzo en La Ronda", note: "Menú infantil · zona peatonal", icon: Utensils },
    { time: "16:00", title: "Parque La Carolina", note: "Juegos, lago, botánico", icon: Tent },
  ];
  return (
    <>
      <HeroBanner profile="maria" />
      <SectionTitle icon={Shield} title="Destinos familiares en tendencia" action="Filtrar" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.map((d) => (
          <article key={d.name} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft group">
            <div className="relative h-44 overflow-hidden">
              <img src={d.img} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <div className="text-white font-display font-bold">{d.name}</div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-[var(--nature)] font-semibold"><Shield className="h-3.5 w-3.5" /> Seguridad {d.safety}</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Users className="h-3.5 w-3.5" /> Edades {d.ages}</span>
            </div>
          </article>
        ))}
      </div>

      <SectionTitle icon={Calendar} title="Itinerario sugerido · sábado en familia" />
      <div className="rounded-2xl bg-card border border-border p-4 sm:p-6">
        <ol className="space-y-4 sm:space-y-5">
          {itinerary.map(({ time, title, note, icon: Icon }, i) => (
            <li key={time} className="grid grid-cols-[auto_auto_minmax(0,1fr)] sm:grid-cols-[80px_auto_minmax(0,1fr)] gap-3 sm:gap-4 items-start">
              <div className="text-xs sm:text-sm font-mono font-bold text-primary pt-2">{time}</div>
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.14_220)] to-[oklch(0.65_0.18_145)] grid place-items-center text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </div>
                {i < itinerary.length - 1 && <div className="absolute left-1/2 top-12 bottom-[-24px] w-px bg-border" />}
              </div>
              <div className="min-w-0 pt-1">
                <div className="font-display font-bold truncate">{title}</div>
                <div className="text-xs text-muted-foreground">{note}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/* ---------------- COMPARATOR ---------------- */
function ComparatorSection() {
  const [tab, setTab] = useState<"hospedaje" | "transporte">("hospedaje");
  const hospedaje = [
    { name: "Casa Gangotena", type: "Boutique", price: 215, rating: 4.9, perks: ["Desayuno", "Centro histórico", "Spa"], best: true },
    { name: "Hotel Quito", type: "Negocios", price: 142, rating: 4.5, perks: ["Wi-Fi rápido", "Gimnasio", "Lavandería"] },
    { name: "Community Hostel", type: "Hostel", price: 22, rating: 4.6, perks: ["Cocina", "Tours", "Eventos"] },
  ];
  const transporte = [
    { name: "Vuelo LATAM UIO→GYE", type: "Avión", price: 78, rating: 4.6, perks: ["55 min", "Equipaje 23kg", "WiFi"] },
    { name: "Bus Cooperativa Panamericana", type: "Bus", price: 12, rating: 4.2, perks: ["8 h", "Reclinables", "Snack"], best: true },
    { name: "Renta auto Hertz", type: "Auto", price: 45, rating: 4.5, perks: ["Por día", "GPS", "Seguro"] },
  ];
  const items = tab === "hospedaje" ? hospedaje : transporte;
  const maxPrice = Math.max(...items.map((i) => i.price));

  return (
    <section>
      <SectionTitle icon={Compass} title="Comparador visual" />
      <div className="rounded-3xl bg-card border border-border p-4 sm:p-6 shadow-soft">
        <div className="inline-flex p-1 rounded-xl bg-secondary mb-5">
          {(["hospedaje", "transporte"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 h-9 rounded-lg text-xs sm:text-sm font-medium capitalize transition ${tab === t ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.name} className={`rounded-2xl border p-4 ${it.best ? "border-[var(--nature)] bg-[var(--nature)]/5" : "border-border"}`}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold truncate">{it.name}</h3>
                    {it.best && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--nature)] text-white">Mejor opción IA</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{it.type} · ⭐ {it.rating}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {it.perks.map((p) => (
                      <span key={p} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-primary font-display font-extrabold text-lg">${it.price}</div>
                  <div className="text-[10px] text-muted-foreground">{tab === "hospedaje" ? "/ noche" : "/ trayecto"}</div>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full gradient-brand" style={{ width: `${(it.price / maxPrice) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- REVIEWS ---------------- */
function ReviewsSection() {
  const reviews = [
    { name: "Lucía R.", place: "Galápagos", rating: 5, text: "SmartTrip me armó un itinerario perfecto en menos de un minuto. Las alertas de oferta me ahorraron casi $200." },
    { name: "Diego M.", place: "Quito", rating: 5, text: "Como viajero de negocios, las reservas rápidas son oro. Aterricé y el Uber ya estaba esperando." },
    { name: "Familia Andrade", place: "Mindo", rating: 4, text: "Las recomendaciones por edad de los niños fueron muy acertadas. Volveremos a usarlo seguro." },
    { name: "Sofía P.", place: "Cuenca", rating: 5, text: "El comparador visual me ayudó a decidir entre tres hoteles. Súper claro y rápido." },
  ];
  return (
    <section className="pb-10">
      <SectionTitle icon={MessageCircle} title="Reseñas de la comunidad" action="Escribir reseña" />
      <div className="grid sm:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full gradient-brand grid place-items-center text-white font-bold">
                {r.name[0]}
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold truncate">{r.name}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {r.place}
                </div>
              </div>
              <div className="ml-auto flex">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[var(--nature)] text-[var(--nature)]" />
                ))}
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">"{r.text}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FLOATING ASSISTANT ---------------- */
function FloatingAssistant({ open, setOpen, profile }: { open: boolean; setOpen: (v: boolean) => void; profile: ProfileId }) {
  const p = PROFILES[profile];
  const [messages, setMessages] = useState<{ role: "ai" | "me"; text: string }[]>([
    { role: "ai", text: `¡Hola ${p.name}! Soy tu asistente SmartTrip 🤖✈️ ¿A dónde quieres ir hoy?` },
  ]);
  const [input, setInput] = useState("");

  const suggestions = useMemo(() => ({
    mateo: ["Ofertas bajo $30", "Trekking este finde", "Hostels en Baños"],
    andres: ["Vuelo a Guayaquil", "Hotel corporativo Quito", "Restaurante para cliente VIP"],
    maria: ["Plan familiar 3 días", "Destinos seguros con niños", "Hoteles con piscina"],
  }[profile]), [profile]);

  function send(text: string) {
    const t = text.trim(); if (!t) return;
    setMessages((m) => [...m, { role: "me", text: t }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, {
      role: "ai", text: `Perfecto, busco "${t}" para ti. Te muestro 3 opciones inteligentes según tu perfil ${p.role.toLowerCase()}. ✨`,
    }]), 600);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed z-40 bottom-20 lg:bottom-6 right-4 lg:right-6 h-14 w-14 rounded-full gradient-brand text-white grid place-items-center shadow-glow hover:scale-105 transition-transform">
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-[var(--nature)] ring-2 ring-background animate-pulse" />}
      </button>
      {open && (
        <div className="fixed z-40 bottom-36 lg:bottom-24 right-4 lg:right-6 w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] rounded-3xl bg-card border border-border shadow-glow flex flex-col overflow-hidden">
          <div className="p-4 gradient-brand text-white flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/20 grid place-items-center"><Sparkles className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="font-display font-bold">Asistente SmartTrip</div>
              <div className="text-[11px] opacity-80">IA · responde en segundos</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm ${m.role === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2 overflow-x-auto mb-2 -mx-1 px-1 scrollbar-none">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="shrink-0 text-[11px] px-2.5 py-1.5 rounded-full bg-secondary hover:bg-accent">
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta…"
                className="flex-1 h-10 px-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <button type="submit" className="h-10 w-10 rounded-xl gradient-brand text-white grid place-items-center">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
