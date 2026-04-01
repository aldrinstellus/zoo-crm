import { useState } from 'react';
import { CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { Card } from '@zoo/ui';
import { Switch } from '../ui/Switch';
import { Input, Select, Button, Label } from '../ui/form';
import type { AutomationConfig as AutomationConfigType } from '../../types';

interface Props {
  config: AutomationConfigType;
  onChange: (config: AutomationConfigType) => void;
  onSave: () => void;
  saving: boolean;
}

export default function AutomationConfig({ config, onChange, onSave, saving }: Props) {
  const [showAiKey, setShowAiKey] = useState(false);

  const update = (partial: Partial<AutomationConfigType>) => onChange({ ...config, ...partial });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  return (
    <div className="space-y-6">
      {/* Daily Schedule */}
      <Card title="Daily Schedule Notifications">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-800">Send daily class reminders</p>
              <p className="text-xs text-zinc-400 mt-0.5">Automatically sends schedule reminders to all students with classes that day</p>
            </div>
            <Switch checked={config.dailyScheduleEnabled} onCheckedChange={(v) => update({ dailyScheduleEnabled: v })} />
          </div>

          {config.dailyScheduleEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
              <div>
                <Label>Send at</Label>
                <div className="flex items-center gap-2">
                  <Select value={config.dailySendHour} onChange={(e) => update({ dailySendHour: parseInt(e.target.value) })}>
                    {hours.map(h => <option key={h} value={h}>{String(h).padStart(2, '0')}</option>)}
                  </Select>
                  <span className="text-zinc-400">:</span>
                  <Select value={config.dailySendMinute} onChange={(e) => update({ dailySendMinute: parseInt(e.target.value) })}>
                    {minutes.map(m => <option key={m} value={m}>{String(m).padStart(2, '0')}</option>)}
                  </Select>
                </div>
              </div>
              <div>
                <Label>Timezone</Label>
                <Select value={config.timezone} onChange={(e) => update({ timezone: e.target.value })}>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </Select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Fee Reminders */}
      <Card title="Fee Reminders">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-800">Automatic fee reminders</p>
              <p className="text-xs text-zinc-400 mt-0.5">Sends payment reminders before the due date and on overdue</p>
            </div>
            <Switch checked={config.feeReminderEnabled} onCheckedChange={(v) => update({ feeReminderEnabled: v })} />
          </div>

          {config.feeReminderEnabled && (
            <div className="pt-2 border-t border-zinc-100">
              <Label>Remind before due date</Label>
              <Select value={config.feeReminderDaysBefore} onChange={(e) => update({ feeReminderDaysBefore: parseInt(e.target.value) })}>
                <option value={1}>1 day before</option>
                <option value={2}>2 days before</option>
                <option value={3}>3 days before</option>
                <option value={5}>5 days before</option>
                <option value={7}>7 days before</option>
              </Select>
            </div>
          )}
        </div>
      </Card>

      {/* AI Message Composition */}
      <Card title="AI Message Composition">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-800">AI-powered messages</p>
              <p className="text-xs text-zinc-400 mt-0.5">Use Claude to compose context-aware, personalized messages instead of static templates</p>
            </div>
            <Switch checked={config.aiEnabled} onCheckedChange={(v) => update({ aiEnabled: v })} />
          </div>

          {config.aiEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
              <div>
                <Label>AI Provider</Label>
                <Select value={config.aiProvider} onChange={(e) => update({ aiProvider: e.target.value as 'claude' | 'none' })}>
                  <option value="claude">Claude (Anthropic)</option>
                </Select>
              </div>
              <div>
                <Label>Model</Label>
                <Select value={config.aiModel} onChange={(e) => update({ aiModel: e.target.value })}>
                  <option value="claude-sonnet-4-20250514">Claude Sonnet 4 (Recommended)</option>
                  <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 (Faster)</option>
                  <option value="claude-opus-4-6">Claude Opus 4.6 (Most capable)</option>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label>API Key</Label>
                <div className="relative">
                  <Input
                    type={showAiKey ? 'text' : 'password'}
                    value={config.aiApiKey}
                    onChange={(e) => update({ aiApiKey: e.target.value })}
                    placeholder="sk-ant-api03-..."
                    className="pr-10 font-mono"
                  />
                  <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 p-1" onClick={() => setShowAiKey(!showAiKey)}>
                    {showAiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Rate Limiting & Retries */}
      <Card title="Delivery Settings">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Retry Attempts</Label>
            <Select value={config.retryAttempts} onChange={(e) => update({ retryAttempts: parseInt(e.target.value) })}>
              <option value={0}>No retries</option>
              <option value={1}>1 retry</option>
              <option value={2}>2 retries</option>
              <option value={3}>3 retries</option>
            </Select>
          </div>
          <div>
            <Label>Retry Delay</Label>
            <Select value={config.retryDelayMs} onChange={(e) => update({ retryDelayMs: parseInt(e.target.value) })}>
              <option value={1000}>1 second</option>
              <option value={3000}>3 seconds</option>
              <option value={5000}>5 seconds</option>
              <option value={10000}>10 seconds</option>
            </Select>
          </div>
          <div>
            <Label>Rate Limit</Label>
            <Select value={config.rateLimitMs} onChange={(e) => update({ rateLimitMs: parseInt(e.target.value) })}>
              <option value={100}>100ms</option>
              <option value={200}>200ms (Recommended)</option>
              <option value={500}>500ms</option>
              <option value={1000}>1 second</option>
            </Select>
            <p className="text-xs text-zinc-400 mt-1">Delay between each WhatsApp message to avoid rate limits</p>
          </div>
        </div>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button variant="primary" onClick={onSave} disabled={saving} className="px-5">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
          {saving ? 'Saving...' : 'Save Automation Settings'}
        </Button>
      </div>
    </div>
  );
}
