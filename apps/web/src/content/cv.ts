/**
 * Single source of truth for the CV, merged from Duc_Tran_CV.md (verified) and
 * Duc_Tran_CV_Target.md (target). Rule: an item moves from `target` to verified
 * (delete the `status`) only once there is evidence, and every `[X]` is filled.
 */
import { CvSchema, type CvInput } from "./schema";

const T = "target" as const;

const cvInput = {
  name: "Duc Tran",
  headline: {
    verified: "Senior Front-end Engineer | React · TypeScript | Logistics & Data-heavy Platforms",
    target:
      "Senior Front-end Engineer | React · TypeScript · React Native | Logistics & Data-heavy Platforms",
  },
  location: {
    en: "Ho Chi Minh City, Vietnam",
    de: "Ho-Chi-Minh-Stadt, Vietnam",
    vi: "TP. Hồ Chí Minh, Việt Nam",
  },
  availability: {
    en: "Open to relocation",
    de: "Umzugsbereit",
    vi: "Sẵn sàng chuyển nơi làm việc",
  },
  summary: {
    verified: {
      en: "Senior Front-end Engineer with 10+ years of experience building web applications with React, Vue.js, and TypeScript, including experience as Technical Leader of a 10-person front-end team. Specialized in data-heavy logistics platforms: top contributor to an enterprise warehouse management system used by clients such as Siemens across Germany, Singapore, Mexico, and Brazil, and builder of a multi-tenant, white-labelled warehouse platform from scratch with React 19 and TanStack Query. Skilled at front-end architecture, dashboard frameworks, and performance optimization, with experience mentoring developers and working directly with international clients.",
      de: "Senior Frontend Engineer mit über 10 Jahren Erfahrung in der Entwicklung von Webanwendungen mit React, Vue.js und TypeScript, darunter als Technical Leader eines 10-köpfigen Frontend-Teams. Spezialisiert auf datenintensive Logistikplattformen: Top-Contributor eines Enterprise-Lagerverwaltungssystems, das Kunden wie Siemens in Deutschland, Singapur, Mexiko und Brasilien einsetzen, und Entwickler einer mandantenfähigen White-Label-Lagerplattform, von Grund auf mit React 19 und TanStack Query gebaut. Stark in Frontend-Architektur, Dashboard-Frameworks und Performance-Optimierung, mit Erfahrung im Mentoring von Entwicklern und in der direkten Zusammenarbeit mit internationalen Kunden.",
      vi: "Senior Front-end Engineer với hơn 10 năm kinh nghiệm xây dựng ứng dụng web bằng React, Vue.js và TypeScript, từng là Technical Leader của team front-end 10 người. Chuyên về các nền tảng logistics nhiều dữ liệu: người đóng góp nhiều nhất cho một hệ thống quản lý kho cấp doanh nghiệp được các khách hàng như Siemens sử dụng tại Đức, Singapore, Mexico và Brazil, và là người xây dựng từ đầu một nền tảng quản lý kho multi-tenant, white-label với React 19 và TanStack Query. Thế mạnh về kiến trúc front-end, framework dashboard và tối ưu hiệu năng, có kinh nghiệm kèm cặp developer và làm việc trực tiếp với khách hàng quốc tế.",
    },
    target:
      "Senior Front-end Engineer with 10+ years of experience building web applications with React, Vue.js, and TypeScript, including experience as Technical Leader of a 10-person front-end team. Specialized in data-heavy logistics platforms: top contributor to an enterprise warehouse management system used by clients such as Siemens across Germany, Singapore, Mexico, and Brazil, and builder of a multi-tenant, white-labelled warehouse platform from scratch with React 19 and TanStack Query. Extends front-end expertise to full-stack development with Next.js, Node.js, and PostgreSQL, and to mobile with React Native. IAAP-certified accessibility specialist who builds accessible, well-tested design systems and products.",
  },
  contacts: [
    { kind: "email", value: "ductm.official@gmail.com", href: "mailto:ductm.official@gmail.com" },
    { kind: "phone", value: "+84 (79) 582 5129", href: "tel:+84795825129" },
    {
      kind: "linkedin",
      value: "duc-tran-183a56220",
      href: "https://www.linkedin.com/in/duc-tran-183a56220",
    },
    {
      kind: "github",
      value: "github.com/ductmOfficial",
      href: "https://github.com/ductmOfficial",
      status: T,
    },
    { kind: "website", value: "ductran.vercel.app", href: "https://ductran.vercel.app" },
  ],
  metrics: [
    {
      id: "years",
      value: 10,
      suffix: "+",
      label: { en: "Years in front-end", de: "Jahre im Frontend", vi: "Năm làm front-end" },
    },
    {
      id: "los-commits",
      value: 6500,
      prefix: "~",
      label: { en: "Commits to LOS", de: "Commits für LOS", vi: "Commit cho LOS" },
    },
    {
      id: "countries",
      value: 4,
      label: { en: "Countries rolled out", de: "Länder mit Rollout", vi: "Quốc gia triển khai" },
    },
    {
      id: "entry-chunk",
      value: -549,
      unit: "kB",
      label: {
        en: "Entry chunk · BBX Intra",
        de: "Entry-Chunk · BBX Intra",
        vi: "Entry chunk · BBX Intra",
      },
    },
  ],
  experience: [
    {
      id: "bbx-intra",
      company: "BBX Intra GmbH",
      city: "Fürth",
      country: "DE",
      title: "Senior Front-end Engineer",
      employment: "freelance",
      start: "2026-02",
      end: null,
      about: {
        en: "German consulting and software company specializing in intralogistics and supply chain optimization. Product: a multi-tenant warehouse and logistics management platform, white-labelled across multiple brands.",
        de: "Deutsches Beratungs- und Softwareunternehmen mit Schwerpunkt Intralogistik und Supply-Chain-Optimierung. Produkt: eine mandantenfähige Lager- und Logistikplattform, als White-Label unter mehreren Marken betrieben.",
        vi: "Công ty tư vấn và phần mềm của Đức, chuyên về intralogistics và tối ưu chuỗi cung ứng. Sản phẩm: nền tảng quản lý kho và logistics multi-tenant, white-label cho nhiều thương hiệu.",
      },
      summary: {
        en: "Built a multi-tenant, white-labelled warehouse platform from scratch with React 19 and TanStack Query, with 10+ operational dashboards.",
        de: "Mandantenfähige White-Label-Lagerplattform von Grund auf mit React 19 und TanStack Query entwickelt, mit über 10 operativen Dashboards.",
        vi: "Xây dựng từ đầu nền tảng quản lý kho multi-tenant, white-label với React 19 và TanStack Query, cùng hơn 10 dashboard vận hành.",
      },
      highlights: [
        {
          text: {
            en: "Built the front-end from scratch with React 19, TypeScript, Vite, MUI, TanStack Query, React Router v7, and ECharts as the main contributor (~600 commits).",
            de: "Frontend von Grund auf mit React 19, TypeScript, Vite, MUI, TanStack Query, React Router v7 und ECharts entwickelt, als Hauptentwickler (~600 Commits).",
            vi: "Xây dựng front-end từ đầu với React 19, TypeScript, Vite, MUI, TanStack Query, React Router v7 và ECharts, là người đóng góp chính (~600 commit).",
          },
        },
        {
          text: {
            en: "Designed the multi-tenant architecture: per-warehouse API host resolution at runtime, warehouse-aware routing with seamless switching, and route- and component-level access control derived from a single route map.",
            de: "Mandantenfähige Architektur entworfen: Auflösung des API-Hosts pro Lager zur Laufzeit, lagerbezogenes Routing mit nahtlosem Wechsel sowie Zugriffskontrolle auf Routen- und Komponentenebene, abgeleitet aus einer einzigen Route-Map.",
            vi: "Thiết kế kiến trúc multi-tenant: xác định API host theo từng kho lúc runtime, routing theo kho với khả năng chuyển kho liền mạch, và phân quyền ở cấp route lẫn component suy ra từ một route map duy nhất.",
          },
        },
        {
          text: {
            en: "Delivered 10+ operational and reporting dashboards (Live Ops, SLA & Service Quality, Productivity, Picking Tour Cockpit, Storage Occupancy, Inbound/Outbound), including drill-down from charts to orders and order lines, on a reusable KPI widget framework with period aggregation, working-day calendars, warehouse-specific targets, export, and shareable URL-based dialog state.",
            de: "Über 10 operative und Reporting-Dashboards umgesetzt (Live Ops, SLA & Service Quality, Productivity, Picking Tour Cockpit, Storage Occupancy, Inbound/Outbound), mit Drill-down von Diagrammen zu Aufträgen und Auftragspositionen, auf Basis eines wiederverwendbaren KPI-Widget-Frameworks mit Periodenaggregation, Arbeitstagskalendern, lagerspezifischen Zielwerten, Export und teilbarem, URL-basiertem Dialogzustand.",
            vi: "Xây dựng hơn 10 dashboard vận hành và báo cáo (Live Ops, SLA & Service Quality, Productivity, Picking Tour Cockpit, Storage Occupancy, Inbound/Outbound), có drill-down từ biểu đồ xuống đơn hàng và dòng đơn hàng, trên một framework widget KPI tái sử dụng với tổng hợp theo kỳ, lịch ngày làm việc, chỉ tiêu riêng từng kho, xuất dữ liệu và trạng thái dialog lưu trên URL để chia sẻ.",
          },
        },
        {
          text: {
            en: "Built the authentication layer with queued token refresh via Axios interceptors and session-expiry handling, and bulk CSV/XLSX import tools with configurable data mapping and upload progress.",
            de: "Authentifizierungsschicht mit gebündeltem Token-Refresh über Axios-Interceptors und Behandlung abgelaufener Sitzungen entwickelt, dazu Massenimport-Werkzeuge für CSV/XLSX mit konfigurierbarem Daten-Mapping und Upload-Fortschritt.",
            vi: "Xây dựng lớp xác thực với cơ chế refresh token theo hàng đợi qua Axios interceptor và xử lý hết hạn phiên, cùng công cụ import hàng loạt CSV/XLSX có ánh xạ dữ liệu tuỳ chỉnh và hiển thị tiến trình tải lên.",
          },
        },
        {
          text: {
            en: "Implemented per-brand white-labelling with CSS variables and lazy-loaded English/German translations, plus a CI check that detects out-of-sync i18n keys.",
            de: "White-Labeling pro Marke mit CSS-Variablen und nachgeladenen englischen/deutschen Übersetzungen umgesetzt, plus einen CI-Check, der nicht synchronisierte i18n-Schlüssel erkennt.",
            vi: "Triển khai white-label theo từng thương hiệu bằng CSS variables và bản dịch tiếng Anh/tiếng Đức tải lười, cùng một bước kiểm tra trong CI phát hiện các key i18n bị lệch.",
          },
        },
        {
          text: {
            en: "Improved performance and maintainability: cut the entry chunk by 549 kB (180 kB gzipped) by switching ECharts to selective, tree-shaken imports on top of route-level code splitting, rewrote the in-house virtualized data table, custom-built without third-party grid libraries, around typed columns, drove the JavaScript-to-TypeScript migration (~75% of the codebase), and enforced a layered architecture with ESLint rules.",
            de: "Performance und Wartbarkeit verbessert: Entry-Chunk um 549 kB (180 kB gzip) verkleinert durch selektive, tree-shakebare ECharts-Imports zusätzlich zum Code-Splitting auf Routenebene; die hauseigene virtualisierte Datentabelle ohne Grid-Bibliotheken von Drittanbietern rund um typisierte Spalten neu geschrieben; die Migration von JavaScript zu TypeScript vorangetrieben (~75 % der Codebasis) und eine Schichtenarchitektur mit ESLint-Regeln durchgesetzt.",
            vi: "Cải thiện hiệu năng và khả năng bảo trì: giảm entry chunk 549 kB (180 kB gzip) nhờ chuyển ECharts sang import chọn lọc, tree-shake được, bên cạnh code splitting theo route; viết lại bảng dữ liệu ảo hoá tự xây (không dùng thư viện grid bên thứ ba) xoay quanh cột có kiểu; dẫn dắt việc chuyển JavaScript sang TypeScript (~75% codebase) và áp đặt kiến trúc phân lớp bằng quy tắc ESLint.",
          },
        },
        {
          status: T,
          text: "Introduced automated testing with Vitest, Testing Library, and Playwright, enforced in CI, covering permissions, working-day calendars, token refresh, and KPI calculations ([X] tests, [X%] coverage of core logic).",
        },
        {
          status: T,
          text: "Built an Expo mobile app (shipped to the App Store and Google Play), wrapping the fully responsive web platform with native barcode scanning over a versioned WebView bridge in [X] weeks, raising the mobile Lighthouse score of key screens from [X] to [X].",
        },
        {
          status: T,
          text: "Restructured the codebase into a Turborepo monorepo of 4 apps (web, admin, two mobile apps) and 11 internal packages (headless core, API client, TanStack Query layer, KPI engine, i18n, design tokens, UI library, app shell, scanner), removing hidden singletons and environment coupling, and completing the TypeScript migration.",
        },
        {
          status: T,
          text: "Built a native React Native (Expo) app reusing the shared headless packages, with inbound/outbound orders, live operations KPIs, SLA monitoring, push notifications, extended barcode scanning, and offline support, sharing [X%] of non-UI code with the web platform.",
        },
      ],
    },
    {
      id: "heureka",
      company: "Heureka Business Solutions GmbH",
      city: "Pfullingen",
      country: "DE",
      title: "Senior Front-end Engineer",
      employment: "freelance",
      start: "2021-10",
      end: null,
      titleHistory: {
        en: "Front-end Developer (Freelance), Oct 2021 – Oct 2022; Front-end Developer (Full-time), Oct 2022 – Jan 2026; Senior Front-end Engineer (Freelance), Feb 2026 – Present",
        de: "Front-end Developer (freiberuflich), Okt. 2021 – Okt. 2022; Front-end Developer (Festanstellung), Okt. 2022 – Jan. 2026; Senior Front-end Engineer (freiberuflich), seit Feb. 2026",
        vi: "Front-end Developer (Freelance), 10/2021 – 10/2022; Front-end Developer (toàn thời gian), 10/2022 – 01/2026; Senior Front-end Engineer (Freelance), 02/2026 – nay",
      },
      about: {
        en: "Founded in 2014, the company provides AI-driven intralogistics optimization and warehouse management software. Main project: LOS, a logistics management web platform.",
        de: "2014 gegründet, bietet das Unternehmen KI-gestützte Intralogistik-Optimierung und Lagerverwaltungssoftware. Hauptprojekt: LOS, eine webbasierte Logistikmanagement-Plattform.",
        vi: "Thành lập năm 2014, công ty cung cấp phần mềm tối ưu intralogistics ứng dụng AI và quản lý kho. Dự án chính: LOS, nền tảng web quản lý logistics.",
      },
      summary: {
        en: "Top contributor to LOS: 40+ modules and site rollouts for Siemens and others in Germany, Singapore, Mexico and Brazil.",
        de: "Top-Contributor von LOS: über 40 Module und Standort-Rollouts für Siemens und weitere Kunden in Deutschland, Singapur, Mexiko und Brasilien.",
        vi: "Người đóng góp nhiều nhất cho LOS: hơn 40 module và triển khai cho Siemens cùng các khách hàng khác tại Đức, Singapore, Mexico và Brazil.",
      },
      highlights: [
        {
          text: {
            en: "Top contributor to LOS with ~6,500 commits over 5 years, delivering 40+ modules for warehouse, transport, and finance operations with React, Redux Toolkit, React Query, and MUI.",
            de: "Top-Contributor von LOS mit ~6.500 Commits in 5 Jahren; über 40 Module für Lager-, Transport- und Finanzprozesse mit React, Redux Toolkit, React Query und MUI umgesetzt.",
            vi: "Người đóng góp nhiều nhất cho LOS với ~6.500 commit trong 5 năm, xây dựng hơn 40 module cho nghiệp vụ kho, vận tải và tài chính với React, Redux Toolkit, React Query và MUI.",
          },
        },
        {
          text: {
            en: "Delivered client-specific solutions for Siemens (Nuremberg, Singapore), Loxxess, Bewital, and ZooRoyal, rolling out site instances in Germany, Singapore, Mexico, and Brazil with site-specific KPIs, dashboards, and warehouse layouts.",
            de: "Kundenspezifische Lösungen für Siemens (Nürnberg, Singapur), Loxxess, Bewital und ZooRoyal umgesetzt und Standortinstanzen in Deutschland, Singapur, Mexiko und Brasilien mit standortspezifischen KPIs, Dashboards und Lagerlayouts ausgerollt.",
            vi: "Triển khai giải pháp riêng cho Siemens (Nuremberg, Singapore), Loxxess, Bewital và ZooRoyal, đưa các instance theo địa điểm vào vận hành tại Đức, Singapore, Mexico và Brazil với KPI, dashboard và layout kho riêng cho từng nơi.",
          },
        },
        {
          text: {
            en: "Built a configurable widget and dashboard framework with per-user saved settings, date-range filters, export, sanity checks, and aggregations, powering real-time, daily, and analysis dashboards across all client sites.",
            de: "Konfigurierbares Widget- und Dashboard-Framework mit benutzerbezogen gespeicherten Einstellungen, Datumsfiltern, Export, Plausibilitätsprüfungen und Aggregationen entwickelt, das Echtzeit-, Tages- und Analyse-Dashboards an allen Kundenstandorten antreibt.",
            vi: "Xây dựng framework widget và dashboard cấu hình được, lưu thiết lập theo từng người dùng, có bộ lọc khoảng ngày, xuất dữ liệu, kiểm tra tính hợp lệ và tổng hợp, làm nền cho các dashboard thời gian thực, hằng ngày và phân tích tại mọi địa điểm khách hàng.",
          },
        },
        {
          text: {
            en: "Developed a Layout Builder and Heatmap Builder for warehouse floor plans (area templates, aisle configuration, zoom/pan), delivering custom layouts for Siemens and Loxxess sites.",
            de: "Layout-Builder und Heatmap-Builder für Lagergrundrisse entwickelt (Bereichsvorlagen, Gangkonfiguration, Zoom/Pan) und damit individuelle Layouts für Standorte von Siemens und Loxxess umgesetzt.",
            vi: "Phát triển Layout Builder và Heatmap Builder cho mặt bằng kho (mẫu khu vực, cấu hình dãy kệ, zoom/pan), tạo layout riêng cho các địa điểm của Siemens và Loxxess.",
          },
        },
        {
          text: {
            en: "Built operational monitoring and business modules, including Control Tower shipment tracking with SLA timing, Packing Monitor, Trucks on Site, Digital Billing & Price Sheets, and a Ticketing System, plus Leaflet map views, ApexCharts dashboards, and a full-screen slideshow mode for shop-floor displays.",
            de: "Operative Monitoring- und Geschäftsmodule entwickelt, darunter Control-Tower-Sendungsverfolgung mit SLA-Zeiten, Packing Monitor, Trucks on Site, digitale Abrechnung & Preisblätter und ein Ticketsystem, dazu Leaflet-Kartenansichten, ApexCharts-Dashboards und einen Vollbild-Diashow-Modus für Displays in der Halle.",
            vi: "Xây dựng các module giám sát vận hành và nghiệp vụ, gồm theo dõi lô hàng Control Tower với thời gian SLA, Packing Monitor, Trucks on Site, Digital Billing & Price Sheets và hệ thống ticket, cùng bản đồ Leaflet, dashboard ApexCharts và chế độ trình chiếu toàn màn hình cho màn hình tại xưởng.",
          },
        },
        {
          text: {
            en: "Integrated Azure AD SSO (MSAL) with role-based permissions across navigation, pages, and actions, and API-driven multi-language support with i18next.",
            de: "Azure-AD-SSO (MSAL) mit rollenbasierten Berechtigungen für Navigation, Seiten und Aktionen integriert, dazu API-gesteuerte Mehrsprachigkeit mit i18next.",
            vi: "Tích hợp Azure AD SSO (MSAL) với phân quyền theo vai trò trên điều hướng, trang và thao tác, cùng hỗ trợ đa ngôn ngữ lấy từ API với i18next.",
          },
        },
        {
          text: {
            en: "Improved performance and data handling: lazy-loaded routes and dialogs, virtualized large tables (react-window, react-virtuoso), reduced bundle size, migrated the build to SWC, and evolved server state from SWR to React Query alongside Zustand.",
            de: "Performance und Datenverarbeitung verbessert: Routen und Dialoge nachgeladen, große Tabellen virtualisiert (react-window, react-virtuoso), Bundle verkleinert, Build auf SWC umgestellt und Server-State von SWR zu React Query neben Zustand weiterentwickelt.",
            vi: "Cải thiện hiệu năng và xử lý dữ liệu: tải lười route và dialog, ảo hoá bảng lớn (react-window, react-virtuoso), giảm kích thước bundle, chuyển build sang SWC và chuyển server state từ SWR sang React Query, dùng cùng Zustand.",
          },
        },
      ],
    },
    {
      id: "devblock",
      company: "DevBlock Technologies",
      city: { en: "Ho Chi Minh City", de: "Ho-Chi-Minh-Stadt", vi: "TP. Hồ Chí Minh" },
      country: "VN",
      title: "Technical Leader",
      start: "2019-06",
      end: "2022-10",
      titleHistory: {
        en: "Promoted from Front-end Developer (2019) to Senior Front-end Developer (2020) and Technical Leader (2021)",
        de: "Vom Front-end Developer (2019) zum Senior Front-end Developer (2020) und Technical Leader (2021) befördert",
        vi: "Thăng tiến từ Front-end Developer (2019) lên Senior Front-end Developer (2020) và Technical Leader (2021)",
      },
      about: {
        en: "Founded in 2010, the company delivers AI, machine learning, blockchain, and cloud computing solutions for enterprise clients.",
        de: "2010 gegründet, liefert das Unternehmen Lösungen in den Bereichen KI, maschinelles Lernen, Blockchain und Cloud Computing für Unternehmenskunden.",
        vi: "Thành lập năm 2010, công ty cung cấp giải pháp AI, machine learning, blockchain và điện toán đám mây cho khách hàng doanh nghiệp.",
      },
      summary: {
        en: "Led a 10-person front-end team across 6+ client projects and mentored two developers from junior to mid-level.",
        de: "Leitung eines 10-köpfigen Frontend-Teams in über 6 Kundenprojekten; zwei Entwickler vom Junior- zum Mid-Level begleitet.",
        vi: "Dẫn dắt team front-end 10 người qua hơn 6 dự án khách hàng, kèm cặp hai developer từ junior lên mid-level.",
      },
      highlights: [
        {
          text: {
            en: "As Technical Leader of the 10-person front-end team, set technical direction for engineers working on separate projects, shared knowledge and best practices, and helped them resolve technical issues in their projects.",
            de: "Als Technical Leader des 10-köpfigen Frontend-Teams die technische Richtung für Entwickler in verschiedenen Projekten vorgegeben, Wissen und Best Practices geteilt und bei technischen Problemen in ihren Projekten geholfen.",
            vi: "Với vai trò Technical Leader của team front-end 10 người, định hướng kỹ thuật cho các kỹ sư ở nhiều dự án khác nhau, chia sẻ kiến thức và best practice, hỗ trợ họ xử lý vấn đề kỹ thuật trong dự án.",
          },
        },
        {
          text: {
            en: "Worked on 6+ client and internal projects across healthcare, education, public safety, consumer services, and more, using React, Vue.js, Redux, and TypeScript.",
            de: "An über 6 Kunden- und internen Projekten in Gesundheitswesen, Bildung, öffentlicher Sicherheit, Verbraucherdiensten und weiteren Bereichen mit React, Vue.js, Redux und TypeScript gearbeitet.",
            vi: "Tham gia hơn 6 dự án khách hàng và nội bộ trong các lĩnh vực y tế, giáo dục, an toàn công cộng, dịch vụ tiêu dùng và nhiều lĩnh vực khác, dùng React, Vue.js, Redux và TypeScript.",
          },
        },
        {
          text: {
            en: "Developed front-end features for Talosix, an AI-powered clinical trial platform for patient recruitment, screening, and research data management, over one year, focusing on its dynamic form builder.",
            de: "Ein Jahr lang Frontend-Funktionen für Talosix entwickelt, eine KI-gestützte Plattform für klinische Studien (Patientenrekrutierung, Screening, Verwaltung von Forschungsdaten), mit Schwerpunkt auf dem dynamischen Formular-Builder.",
            vi: "Phát triển tính năng front-end trong một năm cho Talosix, nền tảng thử nghiệm lâm sàng ứng dụng AI cho tuyển chọn, sàng lọc bệnh nhân và quản lý dữ liệu nghiên cứu, tập trung vào trình tạo form động.",
          },
        },
        {
          text: {
            en: "Built multiple modules for LinkIt!, a K-12 assessment management and data analytics platform, covering test taking, grading, and administration.",
            de: "Mehrere Module für LinkIt! entwickelt, eine Plattform für Prüfungsverwaltung und Datenanalyse im K-12-Bereich, für Testdurchführung, Bewertung und Administration.",
            vi: "Xây dựng nhiều module cho LinkIt!, nền tảng quản lý kiểm tra và phân tích dữ liệu cho giáo dục phổ thông (K-12), gồm làm bài, chấm điểm và quản trị.",
          },
        },
        {
          text: {
            en: "Built Canari, an on-demand cleaning service booking platform, from scratch and handed it over to the client within 6 months; also contributed to Snopac 911, an internal emergency dispatch system for recording and assigning 911 calls, and BeautyTab.",
            de: "Canari, eine Buchungsplattform für Reinigungsdienste auf Abruf, von Grund auf entwickelt und innerhalb von 6 Monaten an den Kunden übergeben; außerdem an Snopac 911 mitgewirkt, einem internen Leitstellensystem zur Erfassung und Zuweisung von Notrufen, sowie an BeautyTab.",
            vi: "Xây dựng từ đầu Canari, nền tảng đặt dịch vụ dọn dẹp theo yêu cầu, và bàn giao cho khách hàng trong vòng 6 tháng; đồng thời tham gia Snopac 911, hệ thống điều phối khẩn cấp nội bộ để ghi nhận và phân công cuộc gọi 911, và BeautyTab.",
          },
        },
        {
          text: {
            en: "Ran hiring interviews, established the team’s code review process, and estimated project timelines; mentored 2 developers from junior to mid-level.",
            de: "Bewerbungsgespräche geführt, den Code-Review-Prozess des Teams etabliert und Projektzeitpläne geschätzt; zwei Entwickler vom Junior- zum Mid-Level begleitet.",
            vi: "Phỏng vấn tuyển dụng, xây dựng quy trình code review của team và ước lượng tiến độ dự án; kèm cặp 2 developer từ junior lên mid-level.",
          },
        },
      ],
    },
    {
      id: "nhn",
      company: "NHN Vietnam",
      city: { en: "Ho Chi Minh City", de: "Ho-Chi-Minh-Stadt", vi: "TP. Hồ Chí Minh" },
      country: "VN",
      title: "Front-end Engineer",
      start: "2017-08",
      end: "2019-04",
      compact: true,
      summary: {
        en: "Web applications with Vue.js for a technology and online gaming company.",
        de: "Webanwendungen mit Vue.js für ein Technologie- und Online-Gaming-Unternehmen.",
        vi: "Ứng dụng web với Vue.js cho một công ty công nghệ và game online.",
      },
      highlights: [
        {
          text: {
            en: "Developed web applications with Vue.js, JavaScript, and jQuery, integrating RESTful APIs for a technology and online gaming company.",
            de: "Webanwendungen mit Vue.js, JavaScript und jQuery für ein Technologie- und Online-Gaming-Unternehmen entwickelt und RESTful APIs angebunden.",
            vi: "Phát triển ứng dụng web với Vue.js, JavaScript và jQuery, tích hợp RESTful API cho một công ty công nghệ và game online.",
          },
        },
      ],
    },
    {
      id: "imad",
      company: "IMAD Technology",
      city: { en: "Ho Chi Minh City", de: "Ho-Chi-Minh-Stadt", vi: "TP. Hồ Chí Minh" },
      country: "VN",
      title: "Front-end Developer",
      start: "2016-03",
      end: "2017-06",
      compact: true,
      summary: {
        en: "User interfaces for movie streaming and anime-manga news websites.",
        de: "Benutzeroberflächen für Film-Streaming- und Anime-Manga-News-Websites.",
        vi: "Giao diện cho website xem phim và tin tức anime-manga.",
      },
      highlights: [
        {
          text: {
            en: "Built user interfaces for movie streaming and anime-manga news websites with Vue.js, JavaScript, HTML, and CSS.",
            de: "Benutzeroberflächen für Film-Streaming- und Anime-Manga-News-Websites mit Vue.js, JavaScript, HTML und CSS entwickelt.",
            vi: "Xây dựng giao diện cho website xem phim và tin tức anime-manga với Vue.js, JavaScript, HTML và CSS.",
          },
        },
      ],
    },
  ],
  projects: [
    {
      id: "multi-tenant-wms",
      name: "Multi-tenant WMS",
      kicker: "BBX Intra · 2026",
      title: {
        en: "A multi-tenant WMS, from the first commit",
        de: "Ein mandantenfähiges Lagerverwaltungssystem ab dem ersten Commit",
        vi: "Hệ thống quản lý kho multi-tenant từ commit đầu tiên",
      },
      caseStudy: true,
      description: {
        en: "Per-warehouse API hosts resolved at runtime, access control derived from one route map, and a reusable KPI widget framework.",
        de: "API-Hosts pro Lager zur Laufzeit aufgelöst, Zugriffskontrolle aus einer einzigen Route-Map und ein wiederverwendbares KPI-Widget-Framework.",
        vi: "API host theo từng kho được xác định lúc runtime, phân quyền suy ra từ một route map duy nhất và framework widget KPI tái sử dụng.",
      },
      metric: { en: "−549 kB entry chunk", de: "−549 kB Entry-Chunk", vi: "−549 kB entry chunk" },
      stack: ["React 19", "TypeScript", "TanStack Query", "ECharts"],
    },
    {
      id: "los-dashboards",
      name: "LOS dashboards",
      kicker: "Heureka · LOS",
      title: {
        en: "A dashboard framework at enterprise scale",
        de: "Ein Dashboard-Framework im Enterprise-Maßstab",
        vi: "Framework dashboard ở quy mô doanh nghiệp",
      },
      caseStudy: true,
      description: {
        en: "Configurable widgets, a Layout and Heatmap Builder for warehouse floors, and rollouts across four countries.",
        de: "Konfigurierbare Widgets, ein Layout- und Heatmap-Builder für Lagergrundrisse und Rollouts in vier Ländern.",
        vi: "Widget cấu hình được, Layout Builder và Heatmap Builder cho mặt bằng kho, triển khai tại bốn quốc gia.",
      },
      metric: { en: "~6,500 commits", de: "~6.500 Commits", vi: "~6.500 commit" },
      stack: ["React", "Redux Toolkit", "React Query", "MUI"],
    },
    {
      id: "lumi",
      name: "Lumi",
      kicker: { en: "Side project", de: "Eigenes Projekt", vi: "Dự án cá nhân" },
      caseStudy: true,
      description: {
        en: "A bilingual movie and series discovery app on the TMDB API, served through a Cloudflare Workers proxy with CI.",
        de: "Eine zweisprachige App zum Entdecken von Filmen und Serien auf Basis der TMDB-API, ausgeliefert über einen Cloudflare-Workers-Proxy mit CI.",
        vi: "Ứng dụng khám phá phim và series song ngữ dùng TMDB API, chạy qua proxy Cloudflare Workers, có CI.",
      },
      metric: "React 19 · Workers",
      stack: [
        "React 19",
        "Vite",
        "TanStack Query",
        "Zustand",
        "React Router",
        "Tailwind CSS",
        "Cloudflare Workers",
      ],
    },
    {
      id: "sen-ui",
      name: "Sen UI",
      kicker: "Open source · npm",
      status: T,
      repo: "https://github.com/ductmOfficial/sen-ui",
      description:
        "Open-source React component library with [8] accessible components and a virtualized DataTable that follows the ARIA grid pattern (WCAG 2.2 AA), built with TypeScript and documented in Storybook. [X] weekly npm downloads.",
      stack: ["React", "TypeScript", "Storybook"],
    },
    {
      id: "bandup",
      name: "BandUp",
      kicker: "Full-stack",
      status: T,
      repo: "https://github.com/ductmOfficial/bandup",
      description:
        "Full-stack IELTS practice web app with spaced-repetition vocabulary, AI-powered Writing feedback with streaming responses, and installable PWA support. [X] registered users, [X%] weekly retention.",
      stack: ["Next.js", "PostgreSQL", "[Prisma/Drizzle]"],
    },
    {
      id: "creator-storefront",
      name: "[Product name]",
      kicker: "Creator Storefront · commercial",
      status: T,
      description:
        "Commercial link-in-bio storefront for affiliate creators with multi-marketplace collections, privacy-friendly click analytics, and AI-generated product copy. [X] active creators.",
      stack: ["Next.js", "PostgreSQL", "Sen UI"],
    },
  ],
  skills: [
    {
      id: "frontend",
      name: "Front-end",
      items: [
        { name: "React" },
        { name: "TypeScript" },
        { name: "TanStack Query", match: ["TanStack Query", "React Query"] },
        { name: "Redux Toolkit" },
        { name: "Zustand" },
        { name: "React Router" },
        { name: "Next.js" },
        { name: "Vue.js" },
        { name: "Next.js App Router", status: T },
        { name: "React Native", status: T },
        { name: "Expo", status: T },
      ],
    },
    {
      id: "data-ui",
      name: { en: "Data & UI", de: "Daten & UI", vi: "Dữ liệu & UI" },
      items: [
        { name: "ECharts" },
        { name: "ApexCharts" },
        { name: "Leaflet" },
        { name: "MUI" },
        { name: "Tailwind CSS", match: ["Tailwind"] },
        { name: "react-window", match: ["react-window", "react-virtuoso"] },
        { name: "i18next" },
        { name: "Azure AD (MSAL)", match: ["MSAL"] },
        { name: "Storybook", status: T },
      ],
    },
    {
      id: "practice",
      name: { en: "Practice", de: "Praxis", vi: "Thực hành" },
      items: [
        {
          name: {
            en: "Multi-tenant architecture",
            de: "Mandantenfähige Architektur",
            vi: "Kiến trúc multi-tenant",
          },
          match: ["multi-tenant", "site instances"],
        },
        {
          name: {
            en: "Role-based access",
            de: "Rollenbasierte Zugriffskontrolle",
            vi: "Phân quyền theo vai trò",
          },
          match: ["access control", "role-based permissions"],
        },
        { name: "i18n", match: ["i18n", "translations", "multi-language"] },
        {
          name: { en: "White-labelling", de: "White-Labeling", vi: "White-label" },
          match: ["white-label*"],
        },
        {
          name: { en: "Web performance", de: "Web-Performance", vi: "Hiệu năng web" },
          match: ["performance", "bundle", "entry chunk"],
        },
        {
          name: { en: "Code review", de: "Code-Reviews", vi: "Code review" },
          match: ["code review"],
        },
        {
          name: {
            en: "Accessibility (WCAG)",
            de: "Barrierefreiheit (WCAG)",
            vi: "Accessibility (WCAG)",
          },
          status: T,
        },
      ],
    },
    {
      id: "quality",
      name: { en: "Testing & back-end", de: "Tests & Backend", vi: "Kiểm thử & back-end" },
      status: T,
      items: [
        { name: "Vitest" },
        { name: "Playwright" },
        { name: "axe" },
        { name: "Node.js" },
        { name: "PostgreSQL" },
        { name: "Turborepo" },
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's degree in Software Engineering",
      school: "Saigon University",
      city: { en: "Ho Chi Minh City", de: "Ho-Chi-Minh-Stadt", vi: "TP. Hồ Chí Minh" },
      country: "VN",
      end: "2017-03",
    },
  ],
  certifications: [
    { name: "IAAP Web Accessibility Specialist (WAS)", date: "[MM/YYYY]", status: T },
    { name: "IELTS General Training, Overall [7.0]", date: "[MM/YYYY]", status: T },
  ],
  languages: [
    {
      name: { en: "Vietnamese", de: "Vietnamesisch", vi: "Tiếng Việt" },
      level: { verified: { en: "Native", de: "Muttersprache", vi: "Bản ngữ" } },
    },
    {
      name: { en: "English", de: "Englisch", vi: "Tiếng Anh" },
      level: {
        verified: {
          en: "Limited working proficiency",
          de: "Grundkenntnisse für den Beruf",
          vi: "Giao tiếp công việc cơ bản",
        },
        target: {
          en: "Professional working proficiency (IELTS [7.0])",
          de: "Verhandlungssicher im Beruf (IELTS [7.0])",
          vi: "Thành thạo trong công việc (IELTS [7.0])",
        },
      },
    },
  ],
} satisfies CvInput;

/** Parsed at import time: a malformed entry fails the build, not production. */
export const cv = CvSchema.parse(cvInput);
