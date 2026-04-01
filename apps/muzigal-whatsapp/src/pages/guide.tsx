import { useState } from 'react';
import { Card } from '@zoo/ui';
import { cn } from '../lib/utils';
import {
  Rocket, Send, Settings, Zap, Database, AlertTriangle, Wrench,
  MessageCircle, Phone, Shield, Clock, Users, FileText,
} from 'lucide-react';

type Tab = 'quickstart' | 'messaging' | 'configuration' | 'data' | 'troubleshooting';

const TABS: { value: Tab; label: string; icon: React.ElementType }[] = [
  { value: 'quickstart', label: 'Quick Start', icon: Rocket },
  { value: 'messaging', label: 'Messaging', icon: Send },
  { value: 'configuration', label: 'Configuration', icon: Settings },
  { value: 'data', label: 'Data & Import', icon: Database },
  { value: 'troubleshooting', label: 'Troubleshooting', icon: Wrench },
];

function H2({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <Icon size={16} />
      </div>
      <h2 className="text-base font-semibold text-zinc-900">{children}</h2>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-zinc-800 mt-4 mb-1.5">{children}</p>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-600 leading-relaxed">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-1.5 text-sm text-zinc-600 list-disc list-inside ml-1">{children}</ul>;
}

function Ol({ children }: { children: React.ReactNode }) {
  return <ol className="space-y-1.5 text-sm text-zinc-600 list-decimal list-inside ml-1">{children}</ol>;
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="px-1.5 py-0.5 bg-zinc-100 text-zinc-700 rounded text-xs font-mono">{children}</code>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 mt-3">
      <Zap size={14} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 mt-3">
      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

function QuickStartTab() {
  return (
    <div className="space-y-5">
      <Card>
        <H2 icon={Rocket}>What is this app?</H2>
        <P>A WhatsApp broadcasting dashboard for music academies. Send class reminders, fee notices, schedule changes, and announcements to students via WhatsApp — individually, by batch, by subject, or to everyone at once.</P>
        <Tip><strong>Two modes:</strong> Demo mode lets you explore with mock data (no real messages sent). Production mode connects to your WhatsApp Business API and sends real messages.</Tip>
      </Card>

      <Card>
        <H2 icon={Shield}>First-Time Setup (5 minutes)</H2>
        <Ol>
          <li><strong>Login</strong> — Use <Code>demo@zoo.crm</Code> / <Code>demo</Code> to explore, or switch to Production with your admin credentials</li>
          <li><strong>Connect WhatsApp</strong> — Go to Settings &gt; Connection. Select your provider (Meta/Twilio/Gupshup), paste your API credentials, and click "Test Connection"</li>
          <li><strong>Set up your academy</strong> — Go to Settings &gt; Business. Enter your academy name, add admin users and teachers</li>
          <li><strong>Import your students</strong> — Go to Settings &gt; Data. Upload your Excel file or connect a Google Sheet</li>
          <li><strong>Configure automation</strong> — Go to Settings &gt; Automation. Enable daily schedule reminders and fee notifications</li>
          <li><strong>Send a test</strong> — Go to Test Message. Enter your own phone number and send a test to confirm everything works</li>
        </Ol>
        <Tip>You can complete steps 2-5 in any order. The app works in demo mode without any configuration.</Tip>
      </Card>

      <Card>
        <H2 icon={Clock}>Daily Workflow</H2>
        <Ol>
          <li>Check the <strong>Dashboard</strong> for delivery stats and recent messages</li>
          <li>Review <strong>Expiring Soon</strong> count — send renewal reminders via Broadcast &gt; Expiring</li>
          <li>Use <strong>Broadcast</strong> for any announcements (closures, schedule changes, events)</li>
          <li>The system automatically sends <strong>daily class reminders</strong> if enabled in Automation</li>
        </Ol>
      </Card>
    </div>
  );
}

function MessagingTab() {
  return (
    <div className="space-y-5">
      <Card>
        <H2 icon={Send}>Broadcast Messaging</H2>
        <P>The Broadcast page is the core of this app. It lets you send WhatsApp messages to any group of students with a few clicks.</P>

        <H3>5 Targeting Modes</H3>
        <Ul>
          <li><strong>All Students</strong> — Holiday closures, general announcements, event invitations. Sends to every active student (255 in demo).</li>
          <li><strong>By Batch</strong> — Schedule-specific messages. Search for a batch (e.g., "Guitar — 11 AM to 12 PM Sunday") and message only those students. Use for: class rescheduling, room changes, teacher substitutions.</li>
          <li><strong>By Subject</strong> — Instrument-wide updates. Click a subject pill (Piano, Guitar, Drums, etc.) to target all students of that instrument. Use for: exam dates, recital announcements, material updates.</li>
          <li><strong>Individual</strong> — Personal messages. Search by name, ID, or phone to find a specific student. Use for: attendance follow-ups, payment reminders, personal notes.</li>
          <li><strong>Expiring</strong> — Renewal reminders. Select a window (7/14/30/60/90 days) to target students whose enrollment is about to expire. Use for: subscription renewal campaigns.</li>
        </Ul>

        <H3>Quick Templates</H3>
        <Ul>
          <li><strong>Test</strong> — Verify your WhatsApp connection is working</li>
          <li><strong>Closure</strong> — "[Academy] will be closed on [date] for [reason]"</li>
          <li><strong>Fee Reminder</strong> — Monthly payment due reminder</li>
          <li><strong>Session Reminder</strong> — "Your class is scheduled for tomorrow"</li>
          <li><strong>Expiry Warning</strong> — "Your enrollment is expiring soon"</li>
        </Ul>
        <Tip>The <strong>Recipient Preview</strong> panel (right side) shows exactly who will receive your message before you send. Always verify the count and names.</Tip>
      </Card>

      <Card>
        <H2 icon={MessageCircle}>Test Messages</H2>
        <P>Before broadcasting to students, always send a test to your own phone first.</P>
        <Ul>
          <li>Phone format: country code + number, no <Code>+</Code> or spaces — e.g., <Code>919876543210</Code></li>
          <li>Test history appears on the right panel with delivery status (green = delivered)</li>
          <li>If the test fails, check your provider credentials in Settings &gt; Connection</li>
        </Ul>
        <Warning>In Demo mode, test messages are simulated — no real WhatsApp message is sent. Switch to Production to send real messages.</Warning>
      </Card>

      <Card>
        <H2 icon={FileText}>Message Templates (WhatsApp Rules)</H2>
        <P>WhatsApp Business API has two message types:</P>
        <Ul>
          <li><strong>Template messages</strong> — Pre-approved by Meta. Can be sent anytime (business-initiated). Used for: reminders, notifications, announcements. Templates must be submitted and approved in Meta Business Manager before use.</li>
          <li><strong>Free-form messages</strong> — Can only be sent within 24 hours of the student's last message to you. Used for: replies, follow-ups during conversation.</li>
        </Ul>
        <P>Your approved templates are visible in Settings &gt; Business &gt; Message Templates. Each template shows its approval status (APPROVED / PENDING / REJECTED) and the variable placeholders.</P>
        <Tip>Always use template messages for broadcasts. Free-form messages are only for active conversations.</Tip>
      </Card>

      <Card>
        <H2 icon={Zap}>AI Message Composition</H2>
        <P>When enabled (Settings &gt; Automation), the app uses Claude AI to compose context-aware messages instead of static templates.</P>
        <Ul>
          <li>The AI receives context: student name, class, subject, teacher, schedule changes</li>
          <li>It generates warm, concise WhatsApp messages (under 160 characters)</li>
          <li>Falls back to static templates if AI is disabled or the API key is missing</li>
          <li>Recommended model: Claude Sonnet 4 (fast + good quality)</li>
        </Ul>
      </Card>
    </div>
  );
}

function ConfigurationTab() {
  return (
    <div className="space-y-5">
      <Card>
        <H2 icon={Phone}>WhatsApp Provider Setup</H2>
        <P>The app supports 4 WhatsApp providers. Choose one in Settings &gt; Connection.</P>

        <H3>Meta Cloud API (Recommended)</H3>
        <Ol>
          <li>Go to <strong>developers.facebook.com</strong> and create a Meta App</li>
          <li>Add the <strong>WhatsApp</strong> product to your app</li>
          <li>In the API Setup section, find your <strong>Phone Number ID</strong> and generate an <strong>Access Token</strong></li>
          <li>Paste both into Settings &gt; Connection</li>
          <li>Copy the <strong>Webhook URL</strong> from Settings and paste it into Meta's webhook configuration</li>
          <li>Click <strong>Test Connection</strong> — you should see a green success message with latency</li>
        </Ol>
        <P><strong>Token types:</strong></P>
        <Ul>
          <li><strong>Temporary (24hr)</strong> — Generated from the developer dashboard. Expires daily. Good for testing. You'll need to refresh it manually every day.</li>
          <li><strong>System User (Permanent)</strong> — Created in Meta Business Manager &gt; System Users. Never expires. Required for production. <em>Always use this for live deployments.</em></li>
        </Ul>

        <H3>Twilio</H3>
        <Ul>
          <li>Sign up at twilio.com, get your <strong>Account SID</strong> and <strong>Auth Token</strong></li>
          <li>Enable WhatsApp on your Twilio number (format: <Code>whatsapp:+14155238886</Code>)</li>
          <li>Per-message pricing (check Twilio's rates)</li>
        </Ul>

        <H3>Gupshup</H3>
        <Ul>
          <li>Popular in India. Sign up at gupshup.io</li>
          <li>Get your <strong>API Key</strong>, <strong>Source Phone</strong>, and <strong>App Name</strong></li>
          <li>Good option if your students are primarily in India</li>
        </Ul>

        <H3>Custom Webhook</H3>
        <Ul>
          <li>Any HTTP endpoint that accepts POST with <Code>{`{ to: "+91...", message: "..." }`}</Code></li>
          <li>Add custom headers (e.g., Authorization) as JSON</li>
          <li>Use this for self-hosted or third-party solutions</li>
        </Ul>
      </Card>

      <Card>
        <H2 icon={Zap}>Automation Settings</H2>
        <H3>Daily Class Reminders</H3>
        <Ul>
          <li>Toggle ON to automatically send schedule reminders every day</li>
          <li>Set the send time (e.g., 08:00 IST) and timezone</li>
          <li>The system checks which classes are scheduled for today and messages each student</li>
        </Ul>

        <H3>Fee Reminders</H3>
        <Ul>
          <li>Toggle ON to send payment reminders X days before the due date</li>
          <li>Configurable: 1, 2, 3, 5, or 7 days before</li>
          <li>Also sends overdue reminders after the due date passes</li>
        </Ul>

        <H3>Delivery Settings</H3>
        <Ul>
          <li><strong>Retry attempts</strong> — How many times to retry a failed message (0-3)</li>
          <li><strong>Retry delay</strong> — Wait time between retries (1-10 seconds)</li>
          <li><strong>Rate limit</strong> — Delay between each message (200ms recommended). Prevents hitting WhatsApp API rate limits.</li>
        </Ul>
        <Warning>Setting rate limit below 100ms may trigger WhatsApp rate limiting. Stick with 200ms for reliability.</Warning>
      </Card>

      <Card>
        <H2 icon={Users}>Business Profile & Team</H2>
        <Ul>
          <li><strong>Academy Info</strong> — Name, email, phone, website, address. Used in message templates and the app UI.</li>
          <li><strong>Admin Users</strong> — Add/remove admins and staff. Admins have full access. Staff can send messages but not change settings.</li>
          <li><strong>Teachers</strong> — Manage the teacher roster (name, email, phone, instrument). Used for schedule notifications and teacher change alerts.</li>
          <li><strong>Message Templates</strong> — View your registered WhatsApp templates, their approval status, and variable mappings. Templates are managed in your WhatsApp provider's dashboard (Meta/Twilio), not here.</li>
        </Ul>
      </Card>
    </div>
  );
}

function DataTab() {
  return (
    <div className="space-y-5">
      <Card>
        <H2 icon={Database}>Importing Student Data</H2>
        <P>The app can import student, enquiry, and batch data from an Excel file (.xlsx). The file is parsed entirely in your browser — nothing is uploaded to a server.</P>

        <H3>Required Excel Format</H3>
        <P>Your Excel file must have these sheets with these exact column names:</P>

        <H3>Sheet 1: "Student Details"</H3>
        <Ul>
          <li><Code>Student ID</Code> — Unique ID (e.g., STUD-00001)</li>
          <li><Code>Student Name</Code>, <Code>Contact Number</Code>, <Code>Email</Code></li>
          <li><Code>Subjects</Code> — Piano, Guitar, Drums, etc.</li>
          <li><Code>Duration</Code> — 1 MONTHS, 3 MONTHS, 6 MONTHS, 12 MONTHS</li>
          <li><Code>Start Date</Code>, <Code>Expiry date</Code></li>
          <li><Code>Status</Code>, <Code>Enrolment Status</Code></li>
          <li><Code>Total Sessions</Code>, <Code>Session Enrolled</Code>, <Code>Completed Sessions</Code>, <Code>Pending Sessions</Code></li>
          <li><Code>Payment Mode Details</Code></li>
        </Ul>

        <H3>Sheet 2: "Enquiry Details"</H3>
        <Ul>
          <li><Code>Enquiry Date</Code>, <Code>Name of Contact</Code>, <Code>Name of Learner</Code></li>
          <li><Code>Contact Number</Code>, <Code>Age</Code>, <Code>Source</Code></li>
          <li><Code>Demo Status</Code>, <Code>Status</Code>, <Code>Instrument Interested</Code></li>
        </Ul>

        <H3>Sheet 3: "Student Batch"</H3>
        <Ul>
          <li><Code>Student Name</Code>, <Code>Student ID</Code></li>
          <li><Code>Batch Time</Code> — e.g., "11 AM to 12 PM"</li>
          <li><Code>Days</Code> — Sunday, Monday, etc.</li>
          <li><Code>Subject</Code></li>
        </Ul>

        <Tip>The app auto-normalizes messy data: phone numbers get +91 prefix, typos in instruments/sources are corrected, dates are parsed from multiple formats.</Tip>
      </Card>

      <Card>
        <H2 icon={Zap}>Google Sheet Sync</H2>
        <P>For live data, connect a Google Sheet instead of re-importing Excel files.</P>
        <Ol>
          <li>Create a Google Sheet with the same tab structure as the Excel format above</li>
          <li>Go to Settings &gt; Data &gt; Google Sheet Sync</li>
          <li>Paste the Sheet URL</li>
          <li>Toggle Auto-sync ON and set the interval (15min / 30min / 1hr / 6hr / daily)</li>
        </Ol>
        <P>The backend reads directly from the sheet on every API call, so data is always current. The sync interval controls how often the cached data refreshes.</P>
      </Card>

      <Card>
        <H2 icon={FileText}>Data Summary</H2>
        <P>The Data tab in Settings shows your current data counts:</P>
        <Ul>
          <li><strong>Students</strong> — Total imported students (255 in demo)</li>
          <li><strong>Enquiries</strong> — Lead/enquiry records (905 in demo)</li>
          <li><strong>Batches</strong> — Student-batch assignments (511 in demo)</li>
          <li><strong>Classes</strong> — Derived from batches by grouping Subject + Time + Day (138 in demo)</li>
        </Ul>
      </Card>
    </div>
  );
}

function TroubleshootingTab() {
  return (
    <div className="space-y-5">
      <Card>
        <H2 icon={AlertTriangle}>Common Issues</H2>

        <H3>"Backend not configured" on login</H3>
        <Ul>
          <li>You're in Production mode but <Code>VITE_GAS_URL</Code> is not set</li>
          <li><strong>Fix:</strong> Switch to Demo mode, or set the environment variable in Vercel to your Google Apps Script deployment URL</li>
        </Ul>

        <H3>"Test Connection" fails</H3>
        <Ul>
          <li>Check your Access Token is valid and not expired (Temporary tokens expire every 24 hours)</li>
          <li>Verify the Phone Number ID is correct</li>
          <li>Ensure your Meta App has the WhatsApp product added</li>
          <li><strong>Fix:</strong> Generate a new token at developers.facebook.com, or switch to a System User token for permanent access</li>
        </Ul>

        <H3>Messages sent but not received</H3>
        <Ul>
          <li>The student's phone number may be invalid or not on WhatsApp</li>
          <li>You may be sending a template message that hasn't been approved yet</li>
          <li>Check the message log on Dashboard for delivery status</li>
          <li><strong>Fix:</strong> Verify the phone format (+91XXXXXXXXXX), check template status in Settings &gt; Business</li>
        </Ul>

        <H3>Rate limiting errors</H3>
        <Ul>
          <li>You're sending too many messages too quickly</li>
          <li><strong>Fix:</strong> Increase the rate limit delay in Settings &gt; Automation &gt; Delivery Settings (200ms recommended)</li>
        </Ul>

        <H3>Excel import shows wrong dates</H3>
        <Ul>
          <li>Ensure dates in Excel are formatted as dates (not text)</li>
          <li>The parser handles DD/MM/YYYY and Excel date serials automatically</li>
        </Ul>
      </Card>

      <Card>
        <H2 icon={Shield}>Limitations</H2>
        <Ul>
          <li><strong>Demo mode</strong> — Mock data only, no real messages sent</li>
          <li><strong>Production</strong> — Requires Google Apps Script backend deployment</li>
          <li><strong>Meta free tier</strong> — Max 1,000 business-initiated conversations/month</li>
          <li><strong>Template approval</strong> — New templates take 24-48 hours for Meta review</li>
          <li><strong>24-hour window</strong> — Free-form messages only within 24h of student's last message</li>
          <li><strong>Rate limit</strong> — WhatsApp API limits vary by tier (default: 200ms between sends)</li>
        </Ul>
      </Card>

      <Card>
        <H2 icon={Wrench}>System Health</H2>
        <P>Use the Health Check button at the bottom of any Settings tab to verify:</P>
        <Ul>
          <li>WhatsApp connection status</li>
          <li>Active student count</li>
          <li>Automation trigger status (daily schedule, fee reminders)</li>
          <li>AI composer status</li>
        </Ul>
        <P>If health shows errors, review the Settings tabs for misconfigured values.</P>
      </Card>
    </div>
  );
}

export default function Guide() {
  const [tab, setTab] = useState<Tab>('quickstart');

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h1 className="text-lg font-bold text-zinc-900">WhatsApp Power Guide</h1>
        <p className="text-sm text-zinc-500">Everything you need to configure, use, and troubleshoot WhatsApp messaging</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-zinc-100 rounded-xl overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap',
              tab === t.value
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700'
            )}
          >
            <t.icon size={15} />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'quickstart' && <QuickStartTab />}
      {tab === 'messaging' && <MessagingTab />}
      {tab === 'configuration' && <ConfigurationTab />}
      {tab === 'data' && <DataTab />}
      {tab === 'troubleshooting' && <TroubleshootingTab />}

      <div className="pb-4" />
    </div>
  );
}
