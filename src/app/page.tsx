import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  CircleDollarSign, 
  Users, 
  PackageMinus, 
  ShieldAlert, 
  MonitorX,
  TrendingUp,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
        <p className="text-muted-foreground">
          Aperçu global des performances du groupe BOUA.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d'Affaires Global
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2M XOF</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-green-500">
              <TrendingUp className="h-3 w-3" />
              +12.5% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux de Présence RH
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Activity className="h-3 w-3" />
              12 absences ce jour
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Stock Critique
            </CardTitle>
            <PackageMinus className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">18 Alertes</div>
            <p className="text-xs text-muted-foreground mt-1">
              Articles sous le seuil minimum
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Incidents QHSE Ouverts
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dernier incident il y a 2 jours
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tickets IT en Attente
            </CardTitle>
            <MonitorX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1 text-amber-500">
              5 tickets P1 critiques
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area - Charts & Lists */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Aperçu Financier</CardTitle>
            <CardDescription>
              Répartition du chiffre d'affaires par filiale.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t">
            {/* Espace pour le graphique (ex: Recharts) */}
            <p className="text-muted-foreground">Graphique CA vs Objectif</p>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Tâches Récentes</CardTitle>
            <CardDescription>
              Actions nécessitant votre validation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Validation de 4 congés", time: "Il y a 1 heure", status: "En attente" },
                { title: "Bon de commande #1042", time: "Il y a 3 heures", status: "Urgent" },
                { title: "Dépassement budget IT", time: "Hier", status: "Alerte" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "Urgent" || task.status === "Alerte" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                  }`}>
                    {task.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
