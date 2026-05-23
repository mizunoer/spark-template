# Mythic-RX.com Handoff Package

This folder is a self-contained brief for a second Cursor agent (running in a separate IDE window, on the **mythic-rx.com** repo) to replicate everything we just shipped on **nume-health.com**.

## What was shipped on Nume today

1. A full brand kit, web favicon set, manifest, and palette tokens applied site-wide.
2. A config-driven GLP-1 landing-page system: 5 pages + shared CSS + a JS renderer + a single client-edited config file.
3. Two internal tools: `Update_Colors.html` (palette picker) and `ImageSelection.html` (logo / favicon / OG picker).
4. `Client_Onboarding.html` — single intake form that exports the entire `landing-config.js` for engineering to drop in.
5. `Marketing_Next_Steps.html` — internal action tracker with stat cards, compliance gates, deliverables, 7-day launch plan, dev tasks, and channel guardrails.

## How to use this folder

The other agent should open these files in this order:

| # | File | Purpose |
|---|---|---|
| 1 | `AGENT_BRIEF.md` | Drop-in prompt. Paste this verbatim to the second agent. |
| 2 | `PORT_CHECKLIST.md` | Ordered, mechanical task list with acceptance criteria. |
| 3 | `FILE_INVENTORY.md` | Every source path on Nume → target path on Mythic-RX. |
| 4 | `TOKEN_RENAME_MAP.md` | Every identifier rename (`NUME_CONFIG`→`MRX_CONFIG`, `--nume-*`→`--mrx-*`, etc.). |
| 5 | `DATA_BIND_REFERENCE.md` | The renderer's binding grammar. Read before editing pages. |
| 6 | `COMPLIANCE_GATES.md` | What does **not** carry over from Nume and must be re-validated. |
| 7 | `templates/landing-config.template.js` | Pre-renamed `MRX_CONFIG` skeleton — paste into the MRX repo and have the client fill it in. |
| 8 | `templates/mythic-rx.tokens.css` | CSS-variable skeleton. Drop hex values in once Mythic-RX brand colors are confirmed. |

## Source repo

The Nume repo is the reference implementation. Its root is:

```
C:\Users\Mizun\source\repos\Numi
```

All file paths in `FILE_INVENTORY.md` are relative to that root unless otherwise noted.

## Hard constraint

Compliance carries over **conceptually**, not factually. Every healthcare-claim, prescribing-entity, pharmacy-partner, served-state, refund-policy, and disclosure value used on Nume is **invalid** for Mythic-RX until reconfirmed by Mythic-RX's counsel and operations. See `COMPLIANCE_GATES.md`.
