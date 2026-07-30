# Negarit Platform

Modular local ecosystem for the National Disaster Intelligence & Early Warning System.

## Applications

| Portal | Local subdomain | Direct port | Access |
|---|---|---|---|
| Public & Community | `http://negarit.local` | `http://localhost:8080` | Public |
| Government Approval | `http://approval.negarit.local` | `http://localhost:8081` | Protected |
| Relief Agencies | `http://agencies.negarit.local` | `http://localhost:8082` | Protected |
| Platform Admin | `http://admin.negarit.local` | `http://localhost:8083` | Protected |

The protected portals use pre-filled demonstration credentials. Authentication sessions are isolated by portal in browser storage.

## Run

```bash
docker compose up -d --build
```

The direct port URLs work immediately. To enable the named local subdomains on Linux/macOS, add them to the hosts file once:

```bash
echo "127.0.0.1 negarit.local approval.negarit.local agencies.negarit.local admin.negarit.local" | sudo tee -a /etc/hosts
```

Then open any of the local subdomains in a browser.

## Services

- `negarit` — host-based Nginx edge router on port 80
- `negarit-main` — public/community portal
- `negarit-approval` — government approval portal
- `negarit-agency` — relief operations portal
- `negarit-admin` — system governance portal
- `negarit-broadcast-api` — simulated audited SMS/USSD broadcast gateway

The shared design system lives in `shared/`. Each portal is independently buildable and deployable from its own folder while consuming the shared components.

## Operations

```bash
docker compose ps
docker compose logs -f
docker compose restart
docker compose down
```

Rebuild a single portal:

```bash
docker compose up -d --build approval
```

## Broadcast API

Government approval submits:

```http
POST /api/broadcast/sms
Content-Type: application/json
```

The gateway validates the payload, creates a unique broadcast ID, records the approver and channels, and returns `202 Accepted`. This is a local simulation and does not contact real carriers.
