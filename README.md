# StructNote 릴리스

StructNote 는 철근콘크리트·재료역학 교육용 계산 노트 앱입니다.
이 저장소는 **설치본만** 싣습니다(소스는 비공개).

## 받기

[최신 릴리스](https://github.com/mikwon3/StructNote-releases/releases/latest)에서 받으십시오.

| 운영체제 | 파일 |
|---|---|
| macOS (Apple Silicon·Intel) | `StructNote-<판>.dmg` |
| Windows 10·11 (64비트) | `StructNote-<판>-amd64-installer.exe` |

설치한 뒤에는 앱이 새 판을 스스로 확인합니다(도움말 → 업데이트 확인).

## 자동 업데이트 파일

각 릴리스의 `manifest.json` 은 판 번호·설치본 크기·SHA-256 을 적은 것이고,
`manifest.json.sig` 는 그 서명(Ed25519)입니다. 앱은 서명이 맞고 받은 설치본의
해시가 일치할 때만 설치합니다.

---

StructNote is a calculation-note app for teaching reinforced concrete and
mechanics of materials. This repository hosts installers only; download
them from the latest release. The app checks for new versions itself.
