import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Input, Select, Textarea, Label, Button } from '../components/ui/form';
import { Switch } from '../components/ui/Switch';

describe('Design system consistency', () => {
  // ── Select has custom chevron classes ──
  it('Select has appearance-none for custom chevron', () => {
    render(<Select data-testid="sel"><option>A</option></Select>);
    expect(screen.getByTestId('sel').className).toContain('appearance-none');
  });

  it('Select has pr-9 for chevron spacing', () => {
    render(<Select data-testid="sel"><option>A</option></Select>);
    expect(screen.getByTestId('sel').className).toContain('pr-9');
  });

  // ── Switch accessibility ──
  it('Switch has role="switch" (not a janky custom div)', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const sw = screen.getByRole('switch');
    expect(sw.tagName).toBe('BUTTON');
  });

  it('Switch has aria-checked attribute', () => {
    render(<Switch checked={true} onCheckedChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('Switch has h-5 w-9 sizing (standard, not oversized)', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const cls = screen.getByRole('switch').className;
    expect(cls).toContain('h-5');
    expect(cls).toContain('w-9');
  });

  // ── Button focus ring ──
  it('Button focus-visible has ring-2 ring-emerald-500', () => {
    render(<Button data-testid="btn">Go</Button>);
    const cls = screen.getByTestId('btn').className;
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('focus-visible:ring-emerald-500');
  });

  // ── Shared components render correct elements ──
  it('Input renders as <input>', () => {
    render(<Input data-testid="inp" />);
    expect(screen.getByTestId('inp').tagName).toBe('INPUT');
  });

  it('Select renders as <select>', () => {
    render(<Select data-testid="sel"><option>A</option></Select>);
    expect(screen.getByTestId('sel').tagName).toBe('SELECT');
  });

  it('Textarea renders as <textarea>', () => {
    render(<Textarea data-testid="ta" />);
    expect(screen.getByTestId('ta').tagName).toBe('TEXTAREA');
  });

  it('Label renders as <label>', () => {
    render(<Label data-testid="lbl">X</Label>);
    expect(screen.getByTestId('lbl').tagName).toBe('LABEL');
  });

  // ── Input has proper base styling ──
  it('Input has focus ring classes', () => {
    render(<Input data-testid="inp" />);
    const cls = screen.getByTestId('inp').className;
    expect(cls).toContain('focus:ring-2');
    expect(cls).toContain('focus:ring-emerald-500');
  });

  // ── Textarea has resize-none ──
  it('Textarea has resize-none to prevent ugly resize handle', () => {
    render(<Textarea data-testid="ta" />);
    expect(screen.getByTestId('ta').className).toContain('resize-none');
  });

  // ── Disabled states ──
  it('Input disabled has opacity-50 class', () => {
    render(<Input data-testid="inp" disabled />);
    expect(screen.getByTestId('inp').className).toContain('disabled:opacity-50');
  });

  it('Button disabled has opacity-50 class', () => {
    render(<Button data-testid="btn" disabled>X</Button>);
    expect(screen.getByTestId('btn').className).toContain('disabled:opacity-50');
  });

  it('Switch disabled has opacity-50 class', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} disabled />);
    expect(screen.getByRole('switch').className).toContain('disabled:opacity-50');
  });
});

// ════════════════════════════════════════════════════════════════
// Regression tests for issues raised during session (2026-04-01)
// ════════════════════════════════════════════════════════════════

describe('Regression: Toggle component quality (was janky custom div)', () => {
  it('Switch uses <button> not <div> for toggle', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    expect(screen.getByRole('switch').tagName).toBe('BUTTON');
  });

  it('Switch thumb moves on toggle (translate-x-4 when checked)', () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />);
    const sw = screen.getByRole('switch');
    const thumb = sw.firstChild as HTMLElement;
    expect(thumb.className).toContain('translate-x-0');

    rerender(<Switch checked={true} onCheckedChange={() => {}} />);
    const thumbOn = sw.firstChild as HTMLElement;
    expect(thumbOn.className).toContain('translate-x-4');
  });

  it('Switch is not oversized (no w-10 h-6, uses h-5 w-9)', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const cls = screen.getByRole('switch').className;
    expect(cls).not.toContain('w-10');
    expect(cls).not.toContain('h-6');
    expect(cls).toContain('h-5');
    expect(cls).toContain('w-9');
  });
});

describe('Regression: Dropdown chevron spacing (was bad native chevron)', () => {
  it('Select has custom SVG background for chevron', () => {
    render(<Select data-testid="s"><option>X</option></Select>);
    const cls = screen.getByTestId('s').className;
    expect(cls).toContain('bg-[url(');
    expect(cls).toContain('bg-no-repeat');
    expect(cls).toContain('bg-[right_10px_center]');
  });

  it('Select has proper right padding for chevron (pr-9)', () => {
    render(<Select data-testid="s"><option>X</option></Select>);
    expect(screen.getByTestId('s').className).toContain('pr-9');
  });

  it('Select hides native browser chevron (appearance-none)', () => {
    render(<Select data-testid="s"><option>X</option></Select>);
    expect(screen.getByTestId('s').className).toContain('appearance-none');
  });
});

describe('Regression: Layout constraints (was max-w-2xl wasting 45% space)', () => {
  const srcDir = join(__dirname, '..');

  function readPageFile(name: string): string {
    return readFileSync(join(srcDir, 'pages', name), 'utf-8');
  }

  it('broadcast.tsx does NOT have max-w-2xl', () => {
    expect(readPageFile('broadcast.tsx')).not.toContain('max-w-2xl');
  });

  it('test.tsx does NOT have max-w-2xl', () => {
    expect(readPageFile('test.tsx')).not.toContain('max-w-2xl');
  });

  it('settings.tsx does NOT have max-w-3xl or max-w-2xl', () => {
    const content = readPageFile('settings.tsx');
    expect(content).not.toContain('max-w-2xl');
    expect(content).not.toContain('max-w-3xl');
  });

  it('broadcast.tsx uses responsive grid (lg:grid-cols)', () => {
    expect(readPageFile('broadcast.tsx')).toContain('lg:grid-cols');
  });

  it('test.tsx uses responsive grid (lg:grid-cols)', () => {
    expect(readPageFile('test.tsx')).toContain('lg:grid-cols');
  });
});

describe('Regression: No raw HTML form elements in page/component files', () => {
  const srcDir = join(__dirname, '..');

  function getAllTsxFiles(dir: string): string[] {
    const files: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('__')) {
        files.push(...getAllTsxFiles(full));
      } else if (entry.name.endsWith('.tsx') && entry.name !== 'form.tsx' && entry.name !== 'Switch.tsx') {
        files.push(full);
      }
    }
    return files;
  }

  const tsxFiles = getAllTsxFiles(srcDir);

  it('no raw <select> in any page or component file', () => {
    for (const f of tsxFiles) {
      const content = readFileSync(f, 'utf-8');
      const matches = content.match(/<select[\s>]/g);
      expect(matches, `Found raw <select> in ${f}`).toBeNull();
    }
  });

  it('no raw <textarea> in any page or component file', () => {
    for (const f of tsxFiles) {
      const content = readFileSync(f, 'utf-8');
      const matches = content.match(/<textarea[\s>]/g);
      expect(matches, `Found raw <textarea> in ${f}`).toBeNull();
    }
  });

  it('no raw <label> in any page or component file', () => {
    for (const f of tsxFiles) {
      const content = readFileSync(f, 'utf-8');
      const matches = content.match(/<label[\s>]/g);
      expect(matches, `Found raw <label> in ${f}`).toBeNull();
    }
  });

  it('no raw <input> (except hidden file pickers) in any page or component file', () => {
    for (const f of tsxFiles) {
      const content = readFileSync(f, 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (/<input[\s]/.test(line) && !line.includes('hidden') && !line.includes('type="file"')) {
          expect.fail(`Found raw <input> in ${f}: ${line.trim()}`);
        }
      }
    }
  });
});

describe('Regression: Date accuracy (was off by -1 day)', () => {
  it('STUD-00001 StartDate matches Excel (2025-10-09, not 2025-10-08)', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const seed = require('../data/seed.json');
    expect(seed.students[0].StartDate).toBe('2025-10-09');
  });

  it('STUD-00001 ExpiryDate matches Excel (2027-04-02, not 2027-04-01)', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const seed = require('../data/seed.json');
    expect(seed.students[0].ExpiryDate).toBe('2027-04-02');
  });
});

describe('Regression: Sidebar branding (was cluttered with logo)', () => {
  it('Sidebar has clean text branding, no logo icon component', () => {
    const sidebar = readFileSync(join(__dirname, '..', 'components', 'layout', 'Sidebar.tsx'), 'utf-8');
    expect(sidebar).not.toContain('bg-emerald-600 rounded-lg');
    expect(sidebar).toContain('-WhatsApp');
    expect(sidebar).toContain('Powered by ZOO-CRM');
  });
});
