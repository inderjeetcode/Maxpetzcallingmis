# Max PetZ Hospitals — Live Call Analytics Dashboard

Production-ready web application for Max PetZ Hospitals providing real-time call center performance analytics, missed-call recovery intelligence, daily growth trend tracking, and departmental metrics.

---

## 1. Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone or extract repository
cd max-petz-dashboard

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run development server
npm run dev
```
The application will be live at `http://localhost:3000`.

---

## 2. Google Sheets Single Source of Truth

- **Target Spreadsheet ID**: `170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA`
- **Target Sheet Tab**: `Main data`
- **Timezone**: `Asia/Kolkata` (IST · UTC+5:30)

### Supported Google Authentication Mechanisms

#### Option A: Google Cloud Service Account (Recommended for Production)
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Sheets API**.
3. Create a **Service Account** under **IAM & Admin > Service Accounts**.
4. Generate and download a **JSON Key** for the service account.
5. Copy the `client_email` address from the service account JSON.
6. Open your Google Sheet (`170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA`), click **Share**, and grant **Viewer** permission to the service account email.
7. Set the JSON content in your `.env` file:
   ```env
   GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","client_email":"your-sa@project.iam.gserviceaccount.com","private_key":"-----BEGIN PRIVATE KEY-----\n..."}'
   ```
   *(Or paste the JSON directly into the in-dashboard Data Source Settings page).*

#### Option B: Google Cloud API Key
1. In Google Cloud Console, generate an API Key under **APIs & Services > Credentials**.
2. Restrict the API key to the Google Sheets API.
3. Configure in `.env`:
   ```env
   GOOGLE_SHEETS_API_KEY="AIzaSy..."
   ```

#### Option C: Google Apps Script Web App
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Paste the following script:
   ```javascript
   function doGet() {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main data");
     var data = sheet.getDataRange().getValues();
     var csv = data.map(function(row) {
       return row.map(function(cell) {
         var str = String(cell);
         return (str.indexOf(',') >= 0 || str.indexOf('"') >= 0) ? '"' + str.replace(/"/g, '""') + '"' : str;
       }).join(",");
     }).join("\r\n");
     return ContentService.createTextOutput(csv).setMimeType(ContentService.MimeType.CSV);
   }
   ```
3. Deploy as Web App with access set to "Anyone".
4. Configure in `.env`:
   ```env
   GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
   ```

---

## 3. Section 14: Automated Test Suite

Run the full automated test suite verifying integration, calculations, deduplication, and callback matching:

```bash
npm test
```

### What is tested:
- **Spreadsheet ID and Tab Mapping**: Detects real headers dynamically (`UID`, `Event`, `Status`, `From`, `Duration (in seconds)`, `Timestamp`, etc.).
- **UID Deduplication**: Prevents duplicate records across synchronization cycles.
- **Timestamp Recovery**: Extracts epoch timestamps from UID segments and note patterns (`[Date YYYY-MM-DD HH:mm:ss]`).
- **KPI Metrics**: Total calls, inbound, outbound, answer rates, missed rates, and average durations.
- **Zero-Denominator Safety**: Protects against `NaN` and `Infinity` errors.
- **Callback Tracking Engine**: Enforces 24h window, 1:1 matching, chronological validation (no pre-missed matching), and separation of estimated vs confirmed outcomes.

---

## 4. Production Build & Deployment

```bash
# Build the production client
npm run build

# Start the full-stack production server
npm start
```

---

## 5. Architecture & File Structure

```
├── server.ts                    # Express backend, Google Sheets API client, persistence
├── src/
│   ├── App.tsx                  # Master application orchestrator
│   ├── types/callAnalytics.ts   # Complete TypeScript data model
│   ├── data/
│   │   └── rawSpreadsheetData.ts# Verified raw call log dataset
│   ├── services/
│   │   ├── googleSheetsService.ts # Google Service Account JWT & API client
│   │   ├── dataParser.ts        # Dynamic CSV parsing, header mapping, cleaning
│   │   ├── callbackEngine.ts    # Section 8 Callback Matching Engine
│   │   └── analyticsCalculator.ts # Section 5, 6, 7 KPI and growth calculators
│   ├── components/
│   │   ├── Header.tsx           # Sync timer, connection status, privacy toggle
│   │   ├── Sidebar.tsx          # 8-view navigation
│   │   ├── FilterBar.tsx        # Preset & custom date ranges, department/staff filters
│   │   ├── KPICard.tsx          # Brutalist KPI card with comparison deltas
│   │   ├── CallbackTriageModal.tsx # Staff callback confirmation modal
│   │   ├── AuditTrailModal.tsx  # Chronological audit log of manual actions
│   │   ├── AutomatedTestRunner.tsx # In-dashboard test suite runner
│   │   ├── charts/
│   │   │   └── BrutalistCharts.tsx # Graphs A through F (Volume, stacked, DoD %, Answer rate, Hourly)
│   │   └── views/
│   │       ├── OverviewView.tsx
│   │       ├── CallAnalyticsView.tsx
│   │       ├── DailyGrowthView.tsx
│   │       ├── MissedCallsView.tsx
│   │       ├── CallbackTrackingView.tsx
│   │       ├── DepartmentPerformanceView.tsx
│   │       ├── CallRecordsView.tsx
│   │       └── DataSourceSettingsView.tsx
│   └── test/
│       └── runTests.ts          # CLI & runtime test suite
├── .env.example                 # Safe environment configuration template
└── package.json
```

---

## 6. Security and Privacy Guidelines
- **Customer Privacy**: Customer phone numbers are masked by default (`+91 92*** **211`). An authorized toggle reveals plain numbers for verified operational staff.
- **Secret Protection**: Private credentials never enter the frontend bundle or client state; all Google Sheets API calls are proxied server-side.
- **Auditability**: Manual status updates require staff attribution and are recorded to persistent disk storage (`data/audit_logs.json`).
