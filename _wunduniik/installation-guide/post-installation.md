---
layout: skyground_readme
title: Post Installation
parent: Installation Guide
nav_order: 4
reading_mode_default: true
---

<div lang="en" markdown="1">

# Post Installation

## BethINI and INIs

BethINI is a really useful tool to edit your Skyrim.ini, SkyrimCustom.ini and SkyrimPrefs.ini. I already provided my INIs, but some lines might not be set up correctly for your computer. I advise you to make the changes by hand. Here are the lines you must check before starting your game:

1. SkyrimPrefs.ini:
   - `[Display]`
   - `iSize H=1080` → Change this to your screen resolution Height
   - `iSize W=1920` → Change this to your screen resolution Width
   - `[Launcher]`
   - `sD3DDevice="NVIDIA GeForce RTX 3060TI"` → Change this to your GPU name

2. Skyrim.ini:
   - `[Display]`
   - `sScreenShotBaseName=C:\Games\...\Screenshots` → Create a Screenshots folder and update this path

3. SSEDisplayTweaks.ini
   - `Resolution=1920x1080` → Change to your screen resolution

## Switching ENB Preset

Wunduniik was designed to be used with Cabbage ENB for NAT III Weather, but you can change it. Wunduniik uses Root Builder, which allows mods modifying game root to be installed as mods. To change the ENB:

1. Disable the current active preset ((ENB) Cabbage ENB - Wunduniik Edit - Clear by default):
<p align="center">
    <img src="https://static.wixstatic.com/media/579922_07e367e948ae44d186a20946870246cf~mv2.png/v1/fill/w_712,h_371,al_c,lg_1,q_85,enc_avif,quality_auto/579922_07e367e948ae44d186a20946870246cf~mv2.png" >
</p>
2. Enable the preset you want to use from the list.
3. Clear overwrite to delete the ENB Shader Cache:
<p align="center">
    <img src="https://static.wixstatic.com/media/579922_7b4dcdecd048480b9393151600b1f903~mv2.png/v1/fill/w_719,h_335,al_c,lg_1,q_85,enc_avif,quality_auto/579922_7b4dcdecd048480b9393151600b1f903~mv2.png" >
</p>
4. For Reshade, you don't need to clear the cache and can have multiple presets at once.

## Increasing Wunduniik Performance

### Profile Options

Wunduniik comes with 3 profiles: Performance, Standard, and Ultra. They are automatically assigned at MO2 launch based on your screen resolution and VRAM:
- **Performance** (0–8 GB VRAM): Sparse Forest with less realistic trees and lower density flora
- **Standard** (8–14 GB VRAM): Sparse Forests with realistic trees and dense flora
- **Ultra** (14+ GB VRAM): Dense Forests with realistic trees, ultra dense flora and Grass Lods

<p align="center">
    <img src="https://static.wixstatic.com/media/579922_349e8144acad4d0183354432f0602cb1~mv2.png/v1/fill/w_600,h_245,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e2d65f56f9178bbbad61edea29b3d1b3db469301776c6b449d80ffb953f62.png" >
</p>

### SSE Display Tweaks

Use the server command `/displaytweaks` to see how to access this file.
- Set `BorderlessUpscale = True`. Remove the `#` if present.
- Remove the `#` from `#ResolutionScale=0.75`. You can adjust the 0.75 value to tweak scaling.

### Disable ENB In-Game

Open the ENB GUI with **Shift+Enter**. Under `enbseries.ini` → `GLOBAL`, uncheck `UseEffect`, then click `---SAVE CONFIGURATION---`.

{: .warning }
> This method is not recommended as it will break visuals and some mod functions. Use only as a last resort.

### External Performance Tools

{: .note }
You are NOT forced to install any of these tools. They are provided as optional solutions.

- **Magpie Window Scaling Tool (free):** [https://github.com/Blinue/Magpie](https://github.com/Blinue/Magpie)
- **PureDark's DLSS Mod (~$5):** Search on Patreon or their Discord.
- **Lossless Scaling (~$7):** Available on Steam. Check the Guides section for setup.

</div>
<div lang="fr" markdown="1">

# Post-Installation

## BethINI et INIs

BethINI est un outil très utile pour modifier vos fichiers Skyrim.ini, SkyrimCustom.ini et SkyrimPrefs.ini. J'ai déjà fourni mes INIs, mais certaines lignes pourraient ne pas être correctement configurées pour votre ordinateur. Je vous conseille de faire les modifications à la main. Voici les lignes à vérifier avant de démarrer le jeu :

1. SkyrimPrefs.ini :
   - `[Display]`
   - `iSize H=1080` → Remplacez par la hauteur de votre résolution d'écran
   - `iSize W=1920` → Remplacez par la largeur de votre résolution d'écran
   - `[Launcher]`
   - `sD3DDevice="NVIDIA GeForce RTX 3060TI"` → Remplacez par le nom de votre carte graphique

2. Skyrim.ini :
   - `[Display]`
   - `sScreenShotBaseName=C:\Games\...\Screenshots` → Créez un dossier Screenshots et mettez à jour ce chemin

3. SSEDisplayTweaks.ini
   - `Resolution=1920x1080` → Remplacez par votre résolution d'écran

## Changer le Preset ENB

Wunduniik a été conçu pour être utilisé avec Cabbage ENB for NAT III Weather, mais vous pouvez le changer. Wunduniik utilise Root Builder, ce qui permet aux mods modifiant la racine du jeu d'être installés comme des mods. Pour changer l'ENB :

1. Désactivez le preset actif ((ENB) Cabbage ENB - Wunduniik Edit - Clear par défaut) :
<p align="center">
    <img src="https://static.wixstatic.com/media/579922_07e367e948ae44d186a20946870246cf~mv2.png/v1/fill/w_712,h_371,al_c,lg_1,q_85,enc_avif,quality_auto/579922_07e367e948ae44d186a20946870246cf~mv2.png" >
</p>
2. Activez le preset que vous souhaitez utiliser dans la liste.
3. Videz l'overwrite pour supprimer le cache de shaders ENB :
<p align="center">
    <img src="https://static.wixstatic.com/media/579922_7b4dcdecd048480b9393151600b1f903~mv2.png/v1/fill/w_719,h_335,al_c,lg_1,q_85,enc_avif,quality_auto/579922_7b4dcdecd048480b9393151600b1f903~mv2.png" >
</p>
4. Pour Reshade, vous n'avez pas besoin de vider le cache et pouvez avoir plusieurs presets en même temps.

## Améliorer les Performances de Wunduniik

### Options de Profils

Wunduniik est livré avec 3 profils : Performance, Standard et Ultra. Ils sont automatiquement assignés au lancement de MO2 selon votre résolution d'écran et votre VRAM :
- **Performance** (0–8 Go VRAM) : Forêt clairsemée avec des arbres moins réalistes et une flore moins dense
- **Standard** (8–14 Go VRAM) : Forêts clairsemées avec des arbres réalistes et une flore dense
- **Ultra** (14+ Go VRAM) : Forêts denses avec des arbres réalistes, flore ultra dense et LODs d'herbe

<p align="center">
    <img src="https://static.wixstatic.com/media/579922_349e8144acad4d0183354432f0602cb1~mv2.png/v1/fill/w_600,h_245,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e2d65f56f9178bbbad61edea29b3d1b3db469301776c6b449d80ffb953f62.png" >
</p>

### SSE Display Tweaks

Utilisez la commande serveur `/displaytweaks` pour accéder à ce fichier.
- Définissez `BorderlessUpscale = True`. Retirez le `#` si présent.
- Retirez le `#` de `#ResolutionScale=0.75`. Vous pouvez ajuster la valeur 0.75 pour régler la mise à l'échelle.

### Désactiver l'ENB En Jeu

Ouvrez l'interface ENB avec **Shift+Entrée**. Dans `enbseries.ini` → `GLOBAL`, décochez `UseEffect`, puis cliquez sur `---SAVE CONFIGURATION---`.

{: .warning }
> Cette méthode n'est pas recommandée car elle cassera les visuels et certaines fonctions de mods. À utiliser uniquement en dernier recours.

### Outils de Performance Externes

{: .note }
Vous n'êtes PAS obligé d'installer ces outils. Ils sont fournis comme solutions optionnelles.

- **Magpie Window Scaling Tool (gratuit) :** [https://github.com/Blinue/Magpie](https://github.com/Blinue/Magpie)
- **Mod DLSS de PureDark (~5$) :** Recherchez sur Patreon ou leur Discord.
- **Lossless Scaling (~7$) :** Disponible sur Steam. Consultez la section Guides pour la configuration.

</div>
