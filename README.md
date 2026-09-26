# CivilNote 릴리스

CivilNote 는 구조·토질·수리를 다루는 **토목공학 계산 노트** 앱입니다.
식을 적으면 단위까지 따져 계산하고, 구조를 그리면 풀이 과정과 선도를 노트에 넣어 줍니다.
이 저장소는 **설치본만** 싣습니다(소스는 비공개).

## 먼저 둘러보기

설치하지 않고도 만져 볼 수 있습니다 — 값을 고치면 그림이 그 자리에서 다시 그려집니다.

**<https://mikwon3.github.io/CivilNote-releases/tutorial/>**

## 받기

[최신 릴리스](https://github.com/mikwon3/CivilNote-releases/releases/latest)에서 받으십시오.

| 운영체제 | 파일 |
|---|---|
| macOS (Apple Silicon, M1 이후) | `CivilNote-<판>.dmg` |
| Windows 10·11 (64비트) | `CivilNote-<판>-amd64-installer.exe` |

설치한 뒤에는 앱이 새 판을 스스로 확인합니다(도움말 → 업데이트 확인).

## 노트 파일

노트는 **꾸러미**(`.cnote`) 한 개입니다 — 글과 그림이 한 파일에 들어 있어 그대로 보내고
옮길 수 있습니다. 두 번 눌러 열립니다. 평범한 Markdown(`.md`) 파일로 저장할 수도 있습니다.

## 자동 업데이트 파일

각 릴리스의 `manifest.json` 은 판 번호·설치본 크기·SHA-256 을 적은 것이고,
`manifest.json.sig` 는 그 서명(Ed25519)입니다. 앱은 서명이 맞고 받은 설치본의
해시가 일치할 때만 설치합니다.

## 만든이

Minho Kwon ([@mikwon3](https://github.com/mikwon3)) · <mikwon@me.com>

---

CivilNote is a **calculation notebook for civil engineering** — structures, soil mechanics and
hydraulics. You write the equations, it works them out with the units, and when you draw a
structure it puts the solution and the diagrams into your note. This repository hosts installers
only; download them from the latest release, and the app checks for new versions itself.

Try it first, without installing: <https://mikwon3.github.io/CivilNote-releases/tutorial/>
