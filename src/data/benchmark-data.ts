// Enhanced benchmark data structure matching the requested fields

export interface SystemInfo {
  // System Identification
  State?: string;
  Series?: string;
  Segment?: string;
  MKT?: string;
  Model?: string;
  
  // Hardware Configuration
  CPU?: string;
  GPU?: string;
  DRAM?: string;
  Panel?: string;
  
  // System Version
  BIOS?: string;
  EC?: string;
  VBIOS?: string;
  VGA_Driver?: string;
  PN?: string;
  
  // Timeline Information
  PMSubmitDate?: string;
  TargetCompletionDate?: string;
  ActualCompletionDate?: string | null;
}

export interface BenchmarkScores {
  // Time Spy
  TimeSpy?: number;
  TimeSpyGraphicsScore?: number;
  TimeSpyCPUScore?: number;
  
  // Port Royal
  PortRoyal?: number;
  PortRoyalGraphics?: number;
  
  // Time Spy Extreme
  TimeSpyExtreme?: number;
  TimeSpyExtremeGraphicsScore?: number;
  TimeSpyExtremeCPUScore?: number;
  
  // Firestrike
  Firestrike?: number;
  FirestrikeGraphic?: number;
  FirestrikePhysics?: number;
  FirestrikeCombined?: number;
  
  // Firestrike Ultra
  FirestrikeUltra?: number;
  FirestrikeUltraGraphic?: number;
  FirestrikeUltraPhysics?: number;
  FirestrikeUltraCombined?: number;
}

export interface BenchmarkSystem {
  id: number;
  systemName: string;
  systemInfo: SystemInfo;
  benchmarkScores: BenchmarkScores;
}

// Sample data
export const benchmarkSystems: BenchmarkSystem[] = [
  {
    id: 1,
    systemName: "System A",
    systemInfo: {
      State: "Production",
      Series: "TravelBook",
      Segment: "Consumer",
      MKT: "US",
      Model: "TB2000",
      CPU: "Intel Core i7-13700H",
      GPU: "NVIDIA RTX 4060",
      DRAM: "16GB DDR5",
      Panel: "15.6\" FHD IPS",
      BIOS: "TB2000.123",
      EC: "EC1.4",
      VBIOS: "V1.03",
      VGA_Driver: "546.33",
      PN: "TBZ7890",
      PMSubmitDate: "2025-02-15",
      TargetCompletionDate: "2025-03-05",
      ActualCompletionDate: "2025-03-03"
    },
    benchmarkScores: {
      TimeSpy: 9245,
      TimeSpyGraphicsScore: 9261,
      TimeSpyCPUScore: 9185,
      PortRoyal: 5423,
      PortRoyalGraphics: 5423,
      TimeSpyExtreme: 4271,
      TimeSpyExtremeGraphicsScore: 4317,
      TimeSpyExtremeCPUScore: 4026,
      Firestrike: 19945,
      FirestrikeGraphic: 23721,
      FirestrikePhysics: 19762,
      FirestrikeCombined: 8328,
      FirestrikeUltra: 6728,
      FirestrikeUltraGraphic: 6523,
      FirestrikeUltraPhysics: 19786,
      FirestrikeUltraCombined: 3529
    }
  },
  {
    id: 2,
    systemName: "System B",
    systemInfo: {
      State: "Production",
      Series: "PowerBook",
      Segment: "Business",
      MKT: "EU",
      Model: "PB3500",
      CPU: "AMD Ryzen 9 7940HS",
      GPU: "NVIDIA RTX 4070",
      DRAM: "32GB DDR5",
      Panel: "14\" QHD OLED",
      BIOS: "PB3500.045",
      EC: "EC2.1",
      VBIOS: "V2.05",
      VGA_Driver: "551.86",
      PN: "PBX9012",
      PMSubmitDate: "2025-01-20",
      TargetCompletionDate: "2025-02-10",
      ActualCompletionDate: "2025-02-15"
    },
    benchmarkScores: {
      TimeSpy: 11992,
      TimeSpyGraphicsScore: 12763,
      TimeSpyCPUScore: 10636,
      PortRoyal: 7228,
      PortRoyalGraphics: 7228,
      TimeSpyExtreme: 5682,
      TimeSpyExtremeGraphicsScore: 5731,
      TimeSpyExtremeCPUScore: 5463,
      Firestrike: 26542,
      FirestrikeGraphic: 32145,
      FirestrikePhysics: 22657,
      FirestrikeCombined: 11634,
      FirestrikeUltra: 9187,
      FirestrikeUltraGraphic: 8943,
      FirestrikeUltraPhysics: 22831,
      FirestrikeUltraCombined: 5127
    }
  },
  {
    id: 3,
    systemName: "System C",
    systemInfo: {
      State: "Pre-production",
      Series: "GamingBook",
      Segment: "Gaming",
      MKT: "Global",
      Model: "GB7000",
      CPU: "Intel Core i9-14900HX",
      GPU: "NVIDIA RTX 4080",
      DRAM: "64GB DDR5",
      Panel: "17.3\" QHD 240Hz",
      BIOS: "GB7000.089",
      EC: "EC3.5",
      VBIOS: "V2.11",
      VGA_Driver: "553.75",
      PN: "GBX4567",
      PMSubmitDate: "2025-02-01",
      TargetCompletionDate: "2025-03-15",
      ActualCompletionDate: "2025-03-10"
    },
    benchmarkScores: {
      TimeSpy: 17794,
      TimeSpyGraphicsScore: 18224,
      TimeSpyCPUScore: 16198,
      PortRoyal: 11586,
      PortRoyalGraphics: 11586,
      TimeSpyExtreme: 8753,
      TimeSpyExtremeGraphicsScore: 8982,
      TimeSpyExtremeCPUScore: 8065,
      Firestrike: 36284,
      FirestrikeGraphic: 45781,
      FirestrikePhysics: 32457,
      FirestrikeCombined: 18734,
      FirestrikeUltra: 13267,
      FirestrikeUltraGraphic: 12945,
      FirestrikeUltraPhysics: 31985,
      FirestrikeUltraCombined: 8234
    }
  },
  {
    id: 4,
    systemName: "System D",
    systemInfo: {
      State: "Production",
      Series: "UltraBook",
      Segment: "Ultraportable",
      MKT: "APAC",
      Model: "UB1200",
      CPU: "Intel Core i5-1340P",
      GPU: "Intel Iris Xe",
      DRAM: "16GB LPDDR5",
      Panel: "13.5\" QHD+ IPS",
      BIOS: "UB1200.142",
      EC: "EC1.9",
      VBIOS: "N/A",
      VGA_Driver: "31.0.101.4575",
      PN: "UBX2345",
      PMSubmitDate: "2025-01-10",
      TargetCompletionDate: "2025-01-30",
      ActualCompletionDate: "2025-01-28"
    },
    benchmarkScores: {
      TimeSpy: 2396,
      TimeSpyGraphicsScore: 2172,
      TimeSpyCPUScore: 5080,
      TimeSpyExtreme: 1125,
      TimeSpyExtremeGraphicsScore: 1033,
      TimeSpyExtremeCPUScore: 1643,
      Firestrike: 6587,
      FirestrikeGraphic: 7215,
      FirestrikePhysics: 15784,
      FirestrikeCombined: 2367,
      FirestrikeUltra: 1624,
      FirestrikeUltraGraphic: 1512,
      FirestrikeUltraPhysics: 15689,
      FirestrikeUltraCombined: 853
    }
  },
  {
    id: 5,
    systemName: "System E",
    systemInfo: {
      State: "Production",
      Series: "WorkBook",
      Segment: "Workstation",
      MKT: "Global",
      Model: "WB8500",
      CPU: "AMD Ryzen Threadripper PRO 7985WX",
      GPU: "NVIDIA RTX A5000",
      DRAM: "128GB ECC DDR5",
      Panel: "15.6\" 4K OLED",
      BIOS: "WB8500.035",
      EC: "EC2.8",
      VBIOS: "V3.02",
      VGA_Driver: "552.22",
      PN: "WBX7812",
      PMSubmitDate: "2025-02-20",
      TargetCompletionDate: "2025-04-01",
      ActualCompletionDate: "2025-03-25"
    },
    benchmarkScores: {
      TimeSpy: 16494,
      TimeSpyGraphicsScore: 16706,
      TimeSpyCPUScore: 19758,
      PortRoyal: 9738,
      PortRoyalGraphics: 9738,
      TimeSpyExtreme: 8125,
      TimeSpyExtremeGraphicsScore: 7932,
      TimeSpyExtremeCPUScore: 9645,
      Firestrike: 35123,
      FirestrikeGraphic: 38456,
      FirestrikePhysics: 42361,
      FirestrikeCombined: 17456,
      FirestrikeUltra: 12367,
      FirestrikeUltraGraphic: 11287,
      FirestrikeUltraPhysics: 41923,
      FirestrikeUltraCombined: 7654
    }
  },
  {
    id: 6,
    systemName: "System F",
    systemInfo: {
      State: "Pre-production",
      Series: "CreatorBook",
      Segment: "Creative",
      MKT: "US",
      Model: "CB4200",
      CPU: "Intel Core i7-14700H",
      GPU: "NVIDIA RTX 4070",
      DRAM: "32GB DDR5",
      Panel: "16\" 4K Mini-LED",
      BIOS: "CB4200.067",
      EC: "EC1.5",
      VBIOS: "V2.07",
      VGA_Driver: "551.23",
      PN: "CBX5467",
      PMSubmitDate: "2025-03-01",
      TargetCompletionDate: "2025-04-15",
      ActualCompletionDate: null
    },
    benchmarkScores: {
      TimeSpy: 13245,
      TimeSpyGraphicsScore: 13761,
      TimeSpyCPUScore: 11985,
      PortRoyal: 7825,
      PortRoyalGraphics: 7825,
      TimeSpyExtreme: 6271,
      TimeSpyExtremeGraphicsScore: 6421,
      TimeSpyExtremeCPUScore: 5742,
      Firestrike: 27854,
      FirestrikeGraphic: 33721,
      FirestrikePhysics: 25762,
      FirestrikeCombined: 12328,
      FirestrikeUltra: 9723,
      FirestrikeUltraGraphic: 9323,
      FirestrikeUltraPhysics: 25786,
      FirestrikeUltraCombined: 5643
    }
  }
];

// Helper function to get unique values for filters
export function getUniqueValues(key: keyof SystemInfo): string[] {
  const uniqueValues = new Set<string>();
  
  benchmarkSystems.forEach(system => {
    const value = system.systemInfo[key];
    if (value) {
      uniqueValues.add(value);
    }
  });
  
  return Array.from(uniqueValues);
}
