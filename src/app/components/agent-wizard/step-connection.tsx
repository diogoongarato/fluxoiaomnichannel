import { useState, useEffect } from "react";
import {
  Car,
  Globe,
  MessageCircle,
  RefreshCw,
  CheckCircle2,
  Loader2,
  Link2,
  Database,
  AlertCircle,
  Megaphone,
  Building2,
  MapPin,
  Unlink,
} from "lucide-react";

interface Vehicle {
  id: string;
  model: string;
  year: string;
  price: string;
  km: string;
  status: "available" | "reserved" | "showroom";
}

export interface Dealership {
  id: string;
  name: string;
  location: string;
  syncState: "idle" | "syncing" | "done";
  syncProgress: number;
  vehicles: Vehicle[];
}

export interface Channel {
  id: string;
  name: string;
  icon: React.ElementType;
  connected: boolean;
  description: string;
}

const matrizVehicles: Vehicle[] = [
  { id: "1", model: "Honda Civic EXL 2.0", year: "2022/2023", price: "R$ 134.900", km: "28.000 km", status: "available" },
  { id: "2", model: "Toyota Corolla XEi 2.0", year: "2023/2023", price: "R$ 142.500", km: "15.000 km", status: "available" },
  { id: "3", model: "Hyundai HB20 1.0 Turbo", year: "2023/2024", price: "R$ 89.900", km: "12.000 km", status: "available" },
  { id: "4", model: "Volkswagen T-Cross 200 TSI", year: "2022/2022", price: "R$ 119.000", km: "35.000 km", status: "reserved" },
  { id: "5", model: "Chevrolet Tracker Premier", year: "2023/2023", price: "R$ 128.700", km: "18.000 km", status: "available" },
  { id: "6", model: "Jeep Compass Limited T270", year: "2022/2023", price: "R$ 169.900", km: "22.000 km", status: "available" },
  { id: "7", model: "Fiat Pulse Drive 1.3", year: "2023/2024", price: "R$ 95.500", km: "8.000 km", status: "available" },
  { id: "8", model: "Nissan Kicks Advance", year: "2022/2023", price: "R$ 108.000", km: "30.000 km", status: "reserved" },
  { id: "9", model: "Hyundai Creta Platinum 2.0", year: "2023/2024", price: "R$ 158.900", km: "10.000 km", status: "available" },
  { id: "10", model: "Toyota Hilux SRV 2.8 Diesel", year: "2022/2023", price: "R$ 249.900", km: "42.000 km", status: "showroom" },
  { id: "11", model: "Ford Ranger Limited 3.0 V6", year: "2024/2024", price: "R$ 299.000", km: "5.000 km", status: "showroom" },
  { id: "12", model: "Chevrolet S10 High Country", year: "2023/2023", price: "R$ 239.500", km: "20.000 km", status: "showroom" },
  { id: "13", model: "Volkswagen Polo TSI 1.0", year: "2023/2024", price: "R$ 92.500", km: "9.000 km", status: "available" },
  { id: "14", model: "Fiat Argo Drive 1.3", year: "2023/2023", price: "R$ 76.900", km: "14.000 km", status: "available" },
  { id: "15", model: "Chevrolet Onix Plus LTZ", year: "2023/2024", price: "R$ 94.800", km: "7.000 km", status: "available" },
  { id: "16", model: "Renault Kwid Intense 1.0", year: "2024/2024", price: "R$ 69.900", km: "3.000 km", status: "available" },
  { id: "17", model: "Toyota Yaris XLS 1.5", year: "2023/2024", price: "R$ 105.900", km: "8.000 km", status: "available" },
  { id: "18", model: "Honda City EXL 1.5", year: "2023/2023", price: "R$ 119.500", km: "16.000 km", status: "available" },
  { id: "19", model: "Volkswagen Virtus Highline TSI", year: "2023/2024", price: "R$ 112.000", km: "11.000 km", status: "available" },
  { id: "20", model: "Fiat Mobi Like 1.0", year: "2024/2024", price: "R$ 59.900", km: "2.000 km", status: "available" },
  { id: "21", model: "Chevrolet Montana LTZ 1.2 Turbo", year: "2024/2024", price: "R$ 139.900", km: "6.000 km", status: "showroom" },
  { id: "22", model: "Toyota Corolla Cross XRX Hybrid", year: "2023/2024", price: "R$ 198.500", km: "9.000 km", status: "available" },
  { id: "23", model: "Hyundai Tucson Ultimate 1.6 Turbo", year: "2023/2024", price: "R$ 215.000", km: "14.000 km", status: "reserved" },
  { id: "24", model: "Jeep Renegade Longitude T270", year: "2023/2024", price: "R$ 132.500", km: "19.000 km", status: "available" },
  { id: "25", model: "Volkswagen Jetta GLI 2.0 TSI", year: "2023/2024", price: "R$ 219.900", km: "8.000 km", status: "available" },
  { id: "26", model: "Honda Accord Touring 2.0 Turbo", year: "2023/2023", price: "R$ 279.000", km: "12.000 km", status: "showroom" },
  { id: "27", model: "Toyota Camry XLE 3.5 V6", year: "2022/2023", price: "R$ 259.500", km: "18.000 km", status: "available" },
  { id: "28", model: "Chevrolet Cruze Premier 1.4 Turbo", year: "2023/2024", price: "R$ 145.900", km: "11.000 km", status: "available" },
  { id: "29", model: "Hyundai HB20S Diamond Plus 1.0T", year: "2024/2024", price: "R$ 112.500", km: "3.000 km", status: "available" },
  { id: "30", model: "Fiat Cronos Precision 1.3", year: "2023/2024", price: "R$ 87.900", km: "15.000 km", status: "available" },
  { id: "31", model: "Renault Logan Iconic 1.0 Turbo", year: "2024/2024", price: "R$ 92.000", km: "4.000 km", status: "available" },
  { id: "32", model: "Volkswagen Saveiro Extreme 1.6", year: "2023/2024", price: "R$ 98.500", km: "7.000 km", status: "available" },
  { id: "33", model: "Fiat Toro Freedom 1.3 Turbo", year: "2023/2024", price: "R$ 148.900", km: "16.000 km", status: "available" },
  { id: "34", model: "Chevrolet Spin Activ 1.8", year: "2023/2023", price: "R$ 108.500", km: "20.000 km", status: "reserved" },
  { id: "35", model: "Nissan Versa Exclusive CVT", year: "2023/2024", price: "R$ 109.900", km: "9.000 km", status: "available" },
  { id: "36", model: "Honda WR-V EXL 1.5", year: "2024/2024", price: "R$ 118.900", km: "5.000 km", status: "available" },
  { id: "37", model: "Toyota Etios Sedan X Plus 1.5", year: "2023/2023", price: "R$ 78.500", km: "25.000 km", status: "available" },
  { id: "38", model: "Volkswagen Taos Comfortline 1.4 TSI", year: "2023/2024", price: "R$ 168.900", km: "13.000 km", status: "available" },
  { id: "39", model: "Jeep Commander Overland T270", year: "2023/2023", price: "R$ 249.000", km: "17.000 km", status: "showroom" },
  { id: "40", model: "Ford Maverick Lariat 2.0 EcoBoost", year: "2023/2024", price: "R$ 229.900", km: "8.000 km", status: "showroom" },
  { id: "41", model: "Chevrolet Equinox RS 2.0 Turbo", year: "2024/2024", price: "R$ 199.900", km: "4.000 km", status: "available" },
  { id: "42", model: "Hyundai Santa Fe 2.5 GDI", year: "2023/2024", price: "R$ 289.000", km: "10.000 km", status: "showroom" },
  { id: "43", model: "Renault Captur Iconic 1.3 Turbo", year: "2024/2024", price: "R$ 135.500", km: "3.000 km", status: "available" },
  { id: "44", model: "Fiat Fastback Abarth 1.3 Turbo", year: "2024/2024", price: "R$ 152.900", km: "2.000 km", status: "available" },
  { id: "45", model: "Nissan Frontier Attack 2.3 Diesel", year: "2023/2024", price: "R$ 225.000", km: "14.000 km", status: "available" },
  { id: "46", model: "Toyota RAV4 S Connect Hybrid", year: "2023/2024", price: "R$ 295.000", km: "7.000 km", status: "showroom" },
  { id: "47", model: "Volkswagen Amarok V6 Extreme", year: "2023/2023", price: "R$ 315.000", km: "19.000 km", status: "reserved" },
  { id: "48", model: "Chevrolet Trailblazer Premier 2.8", year: "2022/2023", price: "R$ 265.000", km: "32.000 km", status: "available" },
  { id: "49", model: "Honda ZR-V Touring 2.0 Hybrid", year: "2024/2024", price: "R$ 239.900", km: "1.500 km", status: "showroom" },
  { id: "50", model: "Peugeot 208 GT 1.0 Turbo", year: "2024/2024", price: "R$ 108.900", km: "5.000 km", status: "available" },
  { id: "51", model: "Citroën C3 You! 1.0", year: "2024/2024", price: "R$ 72.900", km: "4.000 km", status: "available" },
  { id: "52", model: "Caoa Chery Tiggo 5X Pro", year: "2024/2024", price: "R$ 119.900", km: "3.000 km", status: "available" },
  { id: "53", model: "Mitsubishi Eclipse Cross HPE-S", year: "2023/2024", price: "R$ 209.000", km: "11.000 km", status: "available" },
  { id: "54", model: "GWM Haval H6 GT 2.0 Turbo", year: "2024/2024", price: "R$ 189.900", km: "2.000 km", status: "available" },
  { id: "55", model: "BYD Song Plus GL", year: "2024/2024", price: "R$ 179.800", km: "1.000 km", status: "available" },
  { id: "56", model: "Fiat Strada Volcano 1.3", year: "2024/2024", price: "R$ 105.900", km: "6.000 km", status: "available" },
  { id: "57", model: "Volkswagen Nivus Comfortline TSI", year: "2023/2024", price: "R$ 109.500", km: "12.000 km", status: "available" },
  { id: "58", model: "Toyota Hilux SW4 SRX 2.8", year: "2023/2024", price: "R$ 339.000", km: "15.000 km", status: "reserved" },
  { id: "59", model: "Renault Duster Iconic 1.3 Turbo", year: "2024/2024", price: "R$ 127.500", km: "4.000 km", status: "available" },
  { id: "60", model: "Chevrolet Onix RS 1.0 Turbo", year: "2024/2024", price: "R$ 99.900", km: "3.000 km", status: "available" },
];

const filialCWBVehicles: Vehicle[] = [
  { id: "c1", model: "Jeep Renegade Longitude T270", year: "2022/2023", price: "R$ 138.500", km: "26.000 km", status: "available" },
  { id: "c2", model: "Honda HR-V EXL 1.5 Turbo", year: "2023/2024", price: "R$ 179.900", km: "11.000 km", status: "available" },
  { id: "c3", model: "Toyota SW4 SRX 2.8 Diesel", year: "2022/2022", price: "R$ 319.000", km: "38.000 km", status: "showroom" },
  { id: "c4", model: "Hyundai Tucson GLS 1.6 Turbo", year: "2023/2023", price: "R$ 198.500", km: "16.000 km", status: "available" },
  { id: "c5", model: "Volkswagen Nivus Highline", year: "2023/2024", price: "R$ 118.900", km: "13.000 km", status: "available" },
  { id: "c6", model: "Fiat Fastback Limited 1.3 Turbo", year: "2023/2024", price: "R$ 134.000", km: "6.000 km", status: "available" },
  { id: "c7", model: "BMW X1 sDrive20i GP", year: "2022/2023", price: "R$ 269.000", km: "21.000 km", status: "showroom" },
  { id: "c8", model: "Mercedes-Benz GLA 200 Style", year: "2022/2022", price: "R$ 249.900", km: "28.000 km", status: "showroom" },
  { id: "c9", model: "Chevrolet Equinox Premier 2.0 Turbo", year: "2023/2023", price: "R$ 189.900", km: "17.000 km", status: "available" },
  { id: "c10", model: "Ford Territory Titanium 1.5 Turbo", year: "2023/2024", price: "R$ 168.000", km: "12.000 km", status: "available" },
  { id: "c11", model: "Volkswagen Taos Highline 1.4 TSI", year: "2023/2024", price: "R$ 175.500", km: "10.000 km", status: "available" },
  { id: "c12", model: "Hyundai HB20S Platinum 1.0 Turbo", year: "2024/2024", price: "R$ 108.900", km: "4.000 km", status: "available" },
  { id: "c13", model: "Toyota RAV4 S Hybrid", year: "2022/2023", price: "R$ 289.000", km: "23.000 km", status: "showroom" },
  { id: "c14", model: "Honda Civic Touring 2.0", year: "2023/2024", price: "R$ 167.900", km: "9.000 km", status: "available" },
  { id: "c15", model: "Fiat Toro Ultra 2.0 Diesel", year: "2023/2023", price: "R$ 189.500", km: "18.000 km", status: "reserved" },
  { id: "c16", model: "Renault Duster Iconic 1.3 Turbo", year: "2024/2024", price: "R$ 124.900", km: "5.000 km", status: "available" },
  { id: "c17", model: "Chevrolet Tracker LTZ 1.0 Turbo", year: "2024/2024", price: "R$ 132.900", km: "3.000 km", status: "available" },
  { id: "c18", model: "Nissan Kicks Exclusive CVT", year: "2023/2024", price: "R$ 129.500", km: "8.000 km", status: "available" },
  { id: "c19", model: "Volkswagen T-Cross Highline TSI", year: "2024/2024", price: "R$ 142.900", km: "2.000 km", status: "available" },
  { id: "c20", model: "Toyota Corolla Altis Premium Hybrid", year: "2023/2024", price: "R$ 195.000", km: "6.000 km", status: "available" },
  { id: "c21", model: "Hyundai Creta Ultimate 2.0", year: "2024/2024", price: "R$ 172.500", km: "4.000 km", status: "showroom" },
  { id: "c22", model: "Fiat Pulse Abarth 1.3 Turbo", year: "2024/2024", price: "R$ 128.900", km: "3.000 km", status: "available" },
  { id: "c23", model: "Honda City Hatchback Touring", year: "2023/2024", price: "R$ 125.900", km: "9.000 km", status: "available" },
  { id: "c24", model: "Jeep Compass Trailhawk T270 Diesel", year: "2023/2024", price: "R$ 215.000", km: "14.000 km", status: "reserved" },
  { id: "c25", model: "Peugeot 2008 GT 1.0 Turbo", year: "2024/2024", price: "R$ 128.500", km: "5.000 km", status: "available" },
  { id: "c26", model: "Caoa Chery Tiggo 8 Pro", year: "2024/2024", price: "R$ 189.900", km: "2.000 km", status: "available" },
  { id: "c27", model: "Mitsubishi Outlander Sport HPE", year: "2023/2024", price: "R$ 195.500", km: "11.000 km", status: "available" },
  { id: "c28", model: "Volvo XC40 T5 R-Design", year: "2022/2023", price: "R$ 289.000", km: "19.000 km", status: "showroom" },
  { id: "c29", model: "Audi Q3 Sportback Black S-Line", year: "2023/2024", price: "R$ 279.000", km: "8.000 km", status: "showroom" },
  { id: "c30", model: "GWM Ora 03 Skin", year: "2024/2024", price: "R$ 150.000", km: "1.000 km", status: "available" },
  { id: "c31", model: "BYD Dolphin GL", year: "2024/2024", price: "R$ 149.800", km: "2.000 km", status: "available" },
  { id: "c32", model: "Chevrolet S10 LTZ 2.8 Diesel", year: "2023/2024", price: "R$ 235.000", km: "12.000 km", status: "available" },
  { id: "c33", model: "Ford Ranger XLS 2.0 Diesel", year: "2024/2024", price: "R$ 219.000", km: "6.000 km", status: "available" },
  { id: "c34", model: "Toyota Hilux SRV 2.8 Diesel", year: "2024/2024", price: "R$ 259.900", km: "4.000 km", status: "available" },
  { id: "c35", model: "Renault Sandero RS 1.6", year: "2023/2024", price: "R$ 89.900", km: "15.000 km", status: "available" },
  { id: "c36", model: "Volkswagen Polo GTS 1.4 TSI", year: "2023/2024", price: "R$ 118.500", km: "10.000 km", status: "reserved" },
  { id: "c37", model: "Hyundai HB20 Sport 1.0 Turbo", year: "2024/2024", price: "R$ 99.900", km: "3.000 km", status: "available" },
  { id: "c38", model: "Fiat Argo Trekking 1.3", year: "2024/2024", price: "R$ 85.900", km: "5.000 km", status: "available" },
  { id: "c39", model: "Chevrolet Onix Premier 1.0 Turbo", year: "2024/2024", price: "R$ 98.500", km: "4.000 km", status: "available" },
  { id: "c40", model: "Honda Fit EXL 1.5 CVT", year: "2023/2024", price: "R$ 115.900", km: "7.000 km", status: "available" },
];

const filialPGVehicles: Vehicle[] = [
  { id: "p1", model: "Mitsubishi Outlander HPE-S", year: "2022/2023", price: "R$ 229.000", km: "25.000 km", status: "available" },
  { id: "p2", model: "Caoa Chery Tiggo 7 Pro", year: "2024/2024", price: "R$ 159.900", km: "4.000 km", status: "available" },
  { id: "p3", model: "Peugeot 2008 GT 1.0 Turbo", year: "2023/2023", price: "R$ 122.500", km: "19.000 km", status: "reserved" },
  { id: "p4", model: "Audi Q3 Prestige Plus 1.4", year: "2023/2023", price: "R$ 239.500", km: "15.000 km", status: "showroom" },
  { id: "p5", model: "Volvo XC40 T4 Momentum", year: "2022/2023", price: "R$ 259.000", km: "30.000 km", status: "showroom" },
  { id: "p6", model: "Toyota Yaris XLS 1.5", year: "2023/2024", price: "R$ 105.900", km: "8.000 km", status: "available" },
  { id: "p7", model: "Citroën C4 Cactus Shine 1.6", year: "2023/2023", price: "R$ 98.500", km: "22.000 km", status: "available" },
  { id: "p8", model: "Jeep Commander Limited T270", year: "2022/2023", price: "R$ 239.900", km: "27.000 km", status: "available" },
  { id: "p9", model: "Nissan Frontier Attack 2.3 Diesel", year: "2023/2023", price: "R$ 219.000", km: "20.000 km", status: "showroom" },
  { id: "p10", model: "Fiat Strada Ranch 1.3", year: "2024/2024", price: "R$ 109.900", km: "3.000 km", status: "available" },
  { id: "p11", model: "Volkswagen Amarok V6 Highline", year: "2023/2023", price: "R$ 289.000", km: "15.000 km", status: "showroom" },
  { id: "p12", model: "Honda WR-V EXL 1.5", year: "2023/2024", price: "R$ 114.900", km: "10.000 km", status: "available" },
  { id: "p13", model: "Chevrolet Spin Premier 1.8", year: "2023/2024", price: "R$ 102.500", km: "14.000 km", status: "available" },
  { id: "p14", model: "Hyundai Creta Action 1.6", year: "2023/2023", price: "R$ 115.900", km: "21.000 km", status: "reserved" },
  { id: "p15", model: "Toyota Corolla GLi 2.0", year: "2023/2024", price: "R$ 135.000", km: "9.000 km", status: "available" },
  { id: "p16", model: "Ford Ka SE 1.0", year: "2023/2023", price: "R$ 62.900", km: "28.000 km", status: "available" },
  { id: "p17", model: "Volkswagen Gol 1.0 MPI", year: "2023/2023", price: "R$ 65.500", km: "22.000 km", status: "available" },
  { id: "p18", model: "Renault Kwid Outsider 1.0", year: "2024/2024", price: "R$ 74.900", km: "5.000 km", status: "available" },
  { id: "p19", model: "Fiat Mobi Trekking 1.0", year: "2024/2024", price: "R$ 68.500", km: "4.000 km", status: "available" },
  { id: "p20", model: "Chevrolet Montana Turbo 1.2", year: "2024/2024", price: "R$ 142.900", km: "3.000 km", status: "showroom" },
  { id: "p21", model: "Nissan Versa Advance CVT", year: "2023/2024", price: "R$ 105.500", km: "11.000 km", status: "available" },
  { id: "p22", model: "Honda Civic Sport 2.0", year: "2023/2024", price: "R$ 149.900", km: "7.000 km", status: "available" },
  { id: "p23", model: "Hyundai HB20 Comfort Plus 1.0", year: "2024/2024", price: "R$ 82.900", km: "6.000 km", status: "available" },
  { id: "p24", model: "Volkswagen T-Cross Sense TSI", year: "2024/2024", price: "R$ 115.900", km: "2.000 km", status: "available" },
  { id: "p25", model: "Toyota Hilux SRX 2.8 Diesel 4x4", year: "2023/2024", price: "R$ 279.000", km: "13.000 km", status: "reserved" },
  { id: "p26", model: "Fiat Toro Ranch 2.0 Diesel", year: "2023/2024", price: "R$ 199.900", km: "16.000 km", status: "available" },
  { id: "p27", model: "Jeep Renegade Sport T270", year: "2024/2024", price: "R$ 125.900", km: "4.000 km", status: "available" },
  { id: "p28", model: "Chevrolet Tracker LT 1.0 Turbo", year: "2024/2024", price: "R$ 119.500", km: "5.000 km", status: "available" },
  { id: "p29", model: "BYD Yuan Plus GL", year: "2024/2024", price: "R$ 185.000", km: "1.000 km", status: "available" },
  { id: "p30", model: "GWM Haval H6 HEV", year: "2024/2024", price: "R$ 199.000", km: "2.000 km", status: "showroom" },
];

export const mockVehicles: Vehicle[] = [...matrizVehicles, ...filialCWBVehicles, ...filialPGVehicles];

export const defaultDealerships: Dealership[] = [
  { id: "matriz", name: "Matriz", location: "São Paulo, SP", syncState: "idle", syncProgress: 0, vehicles: matrizVehicles },
  { id: "filial-cwb", name: "Filial CWB", location: "Curitiba, PR", syncState: "idle", syncProgress: 0, vehicles: filialCWBVehicles },
  { id: "filial-pg", name: "Filial PG", location: "Ponta Grossa, PR", syncState: "idle", syncProgress: 0, vehicles: filialPGVehicles },
];

export const defaultChannels: Channel[] = [
  { id: "meta", name: "META for Business", icon: MessageCircle, connected: true, description: "WhatsApp Business, Facebook e Instagram" },
  { id: "website", name: "Chat no Site", icon: Globe, connected: true, description: "Widget no seu site da loja" },
  { id: "portals", name: "Portais de Anúncio", icon: Megaphone, connected: true, description: "OLX, Webmotors, iCarros e outros" },
];

function SyncContent({ dealer, onSync }: { dealer: Dealership; onSync: () => void }) {
  if (dealer.syncState === "idle") {
    return (
      <div className="flex flex-col items-center gap-[16px] py-[24px]">
        <div className="size-[48px] rounded-full bg-[#F5F5F5] flex items-center justify-center">
          <RefreshCw size={24} className="text-[#717680]" />
        </div>
        <p className="text-[14px] text-[#535862] text-center">
          Clique para conectar ao sistema de estoque desta revenda
        </p>
        <button
          onClick={onSync}
          className="px-[20px] py-[10px] rounded-[8px] bg-[#7F56D9] text-[14px] text-white font-semibold hover:bg-[#6941C6] transition-colors"
        >
          Sincronizar Agora
        </button>
      </div>
    );
  }

  if (dealer.syncState === "syncing") {
    return (
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-full bg-[#F9F5FF] flex items-center justify-center">
            <Loader2 size={20} className="text-[#7F56D9] animate-spin" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] text-[#181D27] font-medium">Sincronizando estoque...</p>
            <p className="text-[12px] text-[#717680]">
              Lendo veículos de <span className="font-medium">{dealer.name}</span>. Isso leva alguns segundos.
            </p>
          </div>
          <span className="text-[14px] text-[#7F56D9] font-semibold">{dealer.syncProgress}%</span>
        </div>
        <div className="w-full h-[6px] bg-[#F0F0F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#7F56D9] rounded-full transition-all duration-500 ease-out" style={{ width: `${dealer.syncProgress}%` }} />
        </div>
        <div className="rounded-[8px] border border-[#E4E4E4] overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-[8px] px-[16px] py-[10px] bg-[#FAFAFA] border-b border-[#E4E4E4]">
            {["Veículo", "Ano", "Preço", "KM", "Status"].map((label) => (
              <div key={label} className="h-[14px] w-[60px] bg-[#E4E4E4] rounded-[4px] animate-pulse" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-[8px] px-[16px] py-[12px] border-b border-[#F0F0F0] last:border-b-0">
              <div className="flex items-center gap-[8px]">
                <div className="size-[16px] rounded-[4px] bg-[#F0F0F0] animate-pulse shrink-0" />
                <div className="h-[14px] bg-[#F0F0F0] rounded-[4px] animate-pulse" style={{ width: `${60 + Math.random() * 40}%`, animationDelay: `${i * 120}ms` }} />
              </div>
              <div className="h-[14px] w-[70px] bg-[#F0F0F0] rounded-[4px] animate-pulse" style={{ animationDelay: `${i * 120 + 50}ms` }} />
              <div className="h-[14px] w-[85px] bg-[#F0F0F0] rounded-[4px] animate-pulse" style={{ animationDelay: `${i * 120 + 100}ms` }} />
              <div className="h-[14px] w-[65px] bg-[#F0F0F0] rounded-[4px] animate-pulse" style={{ animationDelay: `${i * 120 + 150}ms` }} />
              <div className="h-[14px] w-[60px] bg-[#F0F0F0] rounded-full animate-pulse" style={{ animationDelay: `${i * 120 + 200}ms` }} />
            </div>
          ))}
        </div>
        <p className="text-[12px] text-[#A4A7AE] text-center">
          {dealer.syncProgress < 30 ? "Conectando ao sistema de gestão..." : dealer.syncProgress < 60 ? "Importando dados dos veículos..." : dealer.syncProgress < 90 ? "Verificando disponibilidade e fotos..." : "Finalizando sincronização..."}
        </p>
      </div>
    );
  }

  const avail = dealer.vehicles.filter((v) => v.status === "available").length;
  const showroom = dealer.vehicles.filter((v) => v.status === "showroom").length;
  const reserved = dealer.vehicles.filter((v) => v.status === "reserved").length;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[12px] p-[12px] rounded-[8px] bg-[#ECFDF3]">
        <CheckCircle2 size={20} className="text-[#039855] shrink-0" />
        <div>
          <p className="text-[14px] text-[#039855] font-medium">Estoque sincronizado com sucesso</p>
          <p className="text-[12px] text-[#027A48]">
            {dealer.vehicles.length} veículos encontrados · {avail} em estoque · {showroom} no showroom · {reserved} no pátio
          </p>
        </div>
      </div>
      <div className="rounded-[8px] border border-[#E4E4E4] overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-[8px] px-[16px] py-[10px] bg-[#FAFAFA] border-b border-[#E4E4E4]">
          <span className="text-[12px] text-[#535862] font-medium">Veículo</span>
          <span className="text-[12px] text-[#535862] font-medium">Ano</span>
          <span className="text-[12px] text-[#535862] font-medium">Preço</span>
          <span className="text-[12px] text-[#535862] font-medium">KM</span>
          <span className="text-[12px] text-[#535862] font-medium">Status</span>
        </div>
        <div className="max-h-[280px] overflow-y-auto [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#F0F0F0] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D5D7DA] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#A4A7AE]" style={{ scrollbarWidth: "thin", scrollbarColor: "#D5D7DA #F0F0F0" }}>
          {dealer.vehicles.map((v) => (
            <div key={v.id} className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-[8px] px-[16px] py-[10px] border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors">
              <div className="flex items-center gap-[8px]">
                <Car size={16} className="text-[#717680] shrink-0" />
                <span className="text-[14px] text-[#181D27] truncate">{v.model}</span>
              </div>
              <span className="text-[14px] text-[#535862]">{v.year}</span>
              <span className="text-[14px] text-[#181D27] font-medium">{v.price}</span>
              <span className="text-[14px] text-[#535862]">{v.km}</span>
              <span className={`inline-flex items-center px-[8px] py-[2px] rounded-full text-[12px] font-medium w-fit ${v.status === "available" ? "bg-[#ECFDF3] text-[#039855]" : v.status === "reserved" ? "bg-[#FFFAEB] text-[#DC6803]" : "bg-[#EFF8FF] text-[#1570EF]"}`}>
                {v.status === "available" ? "Em Estoque" : v.status === "reserved" ? "No Pátio" : "Showroom"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StepConnectionProps {
  dealerships: Dealership[];
  onDealershipsChange: (d: Dealership[] | ((prev: Dealership[]) => Dealership[])) => void;
  channels: Channel[];
  onChannelsChange: (c: Channel[]) => void;
  editSection?: string | null;
}

export function StepConnection({ dealerships, onDealershipsChange, channels, onChannelsChange, editSection }: StepConnectionProps) {
  const [activeDealership, setActiveDealership] = useState("matriz");

  const startSync = (id: string) => {
    onDealershipsChange((prev: Dealership[]) => prev.map((d) => (d.id === id ? { ...d, syncState: "syncing" as const, syncProgress: 0 } : d)));
    const intervals = [
      { delay: 400, progress: 8 },
      { delay: 900, progress: 18 },
      { delay: 1500, progress: 35 },
      { delay: 2200, progress: 52 },
      { delay: 2800, progress: 68 },
      { delay: 3400, progress: 82 },
      { delay: 3900, progress: 93 },
      { delay: 4300, progress: 100 },
    ];
    intervals.forEach(({ delay, progress }) =>
      setTimeout(() => {
        onDealershipsChange((prev: Dealership[]) => prev.map((d) => (d.id === id ? { ...d, syncState: "syncing" as const, syncProgress: progress } : d)));
      }, delay)
    );
    setTimeout(() => {
      onDealershipsChange((prev: Dealership[]) => prev.map((d) => (d.id === id ? { ...d, syncState: "done" as const, syncProgress: 100 } : d)));
    }, 4800);
  };

  const desyncDealership = (id: string) => {
    // Only filiais can be desynced, not matriz
    if (id === "matriz") return;
    onDealershipsChange((prev: Dealership[]) =>
      prev.map((d) => (d.id === id ? { ...d, syncState: "idle" as const, syncProgress: 0 } : d))
    );
  };

  const syncAll = () => {
    dealerships.forEach((d, i) => {
      if (d.syncState !== "done") {
        setTimeout(() => startSync(d.id), i * 1200);
      }
    });
  };

  const toggleChannel = (id: string) => {
    onChannelsChange(channels.map((ch) => (ch.id === id ? { ...ch, connected: !ch.connected } : ch)));
  };

  useEffect(() => {
    if (dealerships.every((d) => d.syncState === "idle")) {
      // Auto-sync all dealerships with staggered delays
      dealerships.forEach((d, i) => {
        setTimeout(() => startSync(d.id), 800 + i * 1500);
      });
    }
  }, []);

  useEffect(() => {
    if (editSection) {
      const sectionMap: Record<string, string> = {
        "Estoque": "section-estoque",
        "Canais": "section-canais",
      };
      const id = sectionMap[editSection];
      if (id) {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [editSection]);

  const activeDealer = dealerships.find((d) => d.id === activeDealership);
  const totalVehicles = dealerships.reduce((acc, d) => acc + d.vehicles.length, 0);
  const syncedCount = dealerships.filter((d) => d.syncState === "done").length;

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Stock sync section */}
      <div id="section-estoque" className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <Database size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">Sincronizar Estoque</h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">Conecte o estoque de cada revenda. A IA vai ler os veículos de todas as lojas.</p>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#E4E4E4] overflow-hidden" style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}>
          {/* Tab bar */}
          <div className="flex items-center border-b border-[#E4E4E4] bg-[#FAFAFA] overflow-x-auto">
            {dealerships.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDealership(d.id)}
                className={`relative flex items-center gap-[8px] px-[20px] py-[14px] text-[14px] font-medium transition-colors shrink-0 ${
                  activeDealership === d.id ? "text-[#7F56D9] bg-white" : "text-[#535862] hover:text-[#181D27] hover:bg-white/50"
                }`}
              >
                <Building2 size={16} className={activeDealership === d.id ? "text-[#7F56D9]" : "text-[#A4A7AE]"} />
                <span>{d.name}</span>
                {d.syncState === "done" && (
                  <span className="flex items-center justify-center size-[18px] rounded-full bg-[#ECFDF3]">
                    <CheckCircle2 size={12} className="text-[#039855]" />
                  </span>
                )}
                {d.syncState === "syncing" && <Loader2 size={14} className="text-[#7F56D9] animate-spin" />}
                <span className="text-[11px] text-[#A4A7AE] font-normal">{d.vehicles.length}</span>
                {activeDealership === d.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7F56D9]" />}
              </button>
            ))}
          </div>

          {/* Active dealer info bar */}
          {activeDealer && (
            <div className="flex items-center justify-between px-[20px] py-[10px] bg-white border-b border-[#F0F0F0]">
              <div className="flex items-center gap-[8px]">
                <MapPin size={14} className="text-[#A4A7AE]" />
                <span className="text-[13px] text-[#717680]">{activeDealer.location}</span>
                <span className="text-[12px] text-[#A4A7AE]">·</span>
                <span className="text-[13px] text-[#717680]">{activeDealer.vehicles.length} veículos</span>
              </div>
              {activeDealer.syncState === "done" && (
                <div className="flex items-center gap-[12px]">
                  <button onClick={() => startSync(activeDealer.id)} className="flex items-center gap-[4px] text-[12px] text-[#7F56D9] font-medium hover:underline">
                    <RefreshCw size={12} />
                    Ressincronizar
                  </button>
                  {activeDealer.id !== "matriz" && (
                    <button onClick={() => desyncDealership(activeDealer.id)} className="flex items-center gap-[4px] text-[12px] text-[#A4A7AE] hover:text-[#F04438] font-medium transition-colors">
                      <Unlink size={12} />
                      Dessincronizar
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sync content */}
          <div className="p-[24px]">
            {activeDealer && <SyncContent dealer={activeDealer} onSync={() => startSync(activeDealer.id)} />}
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center justify-between px-[16px] py-[12px] rounded-[8px] bg-[#F9F5FF]">
          <div className="flex items-center gap-[8px]">
            <Building2 size={16} className="text-[#7F56D9]" />
            <p className="text-[13px] text-[#535862]">
              <span className="text-[#181D27] font-medium">{dealerships.length} revendas</span> cadastradas · <span className="text-[#181D27] font-medium">{totalVehicles} veículos</span> no total
            </p>
          </div>
          {syncedCount < dealerships.length ? (
            <button onClick={syncAll} className="flex items-center gap-[6px] text-[13px] text-[#7F56D9] font-medium hover:underline">
              <RefreshCw size={14} />
              Sincronizar todas
            </button>
          ) : (
            <span className="flex items-center gap-[6px] text-[13px] text-[#039855] font-medium">
              <CheckCircle2 size={14} />
              Todas sincronizadas
            </span>
          )}
        </div>
      </div>

      {/* Channels section */}
      <div id="section-canais" className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="size-[40px] rounded-[10px] bg-[#F9F5FF] flex items-center justify-center">
            <Link2 size={20} className="text-[#7F56D9]" />
          </div>
          <div>
            <h3 className="text-[18px] text-[#181D27] font-semibold leading-[28px]">Canais de Atendimento</h3>
            <p className="text-[14px] text-[#535862] leading-[20px]">Escolha onde a IA vai atender seus clientes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => toggleChannel(channel.id)}
              className={`flex flex-col gap-[12px] p-[20px] rounded-[12px] border text-left transition-all ${
                channel.connected ? "border-[#7F56D9] bg-[#FCFAFF]" : "border-[#E4E4E4] bg-white hover:border-[#D6BBFB]"
              }`}
              style={{
                boxShadow: channel.connected
                  ? "0px 4px 8px -2px rgba(127,86,217,0.1), 0px 2px 4px -2px rgba(127,86,217,0.06)"
                  : "0px 1px 2px rgba(16,24,40,0.05)",
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`size-[40px] rounded-[8px] flex items-center justify-center ${channel.connected ? "bg-[#F4EBFF]" : "bg-[#F5F5F5]"}`}>
                  <channel.icon size={20} className={channel.connected ? "text-[#7F56D9]" : "text-[#717680]"} />
                </div>
                {channel.connected && <CheckCircle2 size={20} className="text-[#7F56D9]" />}
              </div>
              <div>
                <p className="text-[14px] text-[#181D27] font-medium leading-[20px]">{channel.name}</p>
                <p className="text-[12px] text-[#717680] leading-[18px] mt-[2px]">{channel.description}</p>
              </div>
            </button>
          ))}
        </div>

        {channels.filter((c) => c.connected).length === 0 && (
          <div className="flex items-center gap-[8px] p-[12px] rounded-[8px] bg-[#FFFAEB]">
            <AlertCircle size={16} className="text-[#DC6803] shrink-0" />
            <p className="text-[13px] text-[#DC6803]">Selecione ao menos um canal para a IA atender.</p>
          </div>
        )}
      </div>
    </div>
  );
}