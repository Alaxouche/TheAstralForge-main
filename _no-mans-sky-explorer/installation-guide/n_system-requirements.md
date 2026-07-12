---
layout: skyground_readme
title: System Requirement
parent: Installation Guide
nav_order: 1
---

<div lang="en" markdown="1">

# System Requirements & Necessary Tools

## System Requirements

Only Windows 10 and 11 fully support Wabbajack. LTSC, special variants, lightened editions or any other modified variant **WILL NOT WORK**. Your Windows version **must be 21H2 or newer** to run both Wabbajack and No Man's Sky Explorer.

Running the list from Hard Disk Drives or external drives is **STRONGLY ADVISED AGAINST**.

As No Man's Sky Explorer is a modlist based on graphics, you must have a good graphics card.

</div>
<div lang="fr" markdown="1">

# Configuration Requise & Outils Nécessaires

## Configuration Requise

Seuls Windows 10 et 11 prennent entièrement en charge Wabbajack. Les variantes LTSC, éditions spéciales ou allégées **NE FONCTIONNERONT PAS**. Votre version de Windows **doit être 21H2 ou plus récente**.

Exécuter la liste depuis des disques durs (HDD) ou des lecteurs externes est **FORTEMENT DÉCONSEILLÉ**.

Comme No Man's Sky Explorer est une modlist axée sur les graphismes, vous devez disposer d'une bonne carte graphique.

</div>

<div class="modlist-size" data-modlist-size data-modlist-source="https://raw.githubusercontent.com/Alaxouche/Wunduniik/main/modlist.json" data-modlist-machine="NMSExplorer">
   <strong>Space required:</strong>
   <span data-modlist-total>Loading...</span> total,
   including <span data-modlist-install>Loading...</span> for install
   and <span data-modlist-download>Loading...</span> for downloads.
   <span data-modlist-version hidden>Version</span>
</div>

<noscript>
   <p><strong>Space required:</strong> 12 GB total (approx. 10 GB install + 2 GB downloads).</p>
</noscript>

<div lang="en" markdown="1">

> If the space requirement is uncomfortable, you can delete downloads once installed.
{: .note }

| Configuration         | CPU        | GPU                | RAM          | Storage                | Display          | FPS  |
|-----------------------|------------|--------------------|--------------|------------------------|------------------|------|
| **Minimum Specs**     | i5-7600k   | Nvidia GTX 2060    | 16 GB DDR4   | 500 GB SATA II SSD     | FHD 60 Hz        | 45   |
| **Recommended Specs** | i7-9700k   | Nvidia RTX 3060 Ti | 32 GB DDR4   | 1 TB SATA III/M.2 SSD  | FHD 60 Hz        | 60+  |
| **Author's Specs**    | i5-10400f  | Nvidia RTX 3090    | 32 GB DDR4   | 1 TB M.2 SSD           | 2K 180 Hz        | 60+  |

## Necessary And Useful Applications

Please ensure you have the latest .NET version installed:
[https://dotnet.microsoft.com/download/dotnet/5.0/runtime](https://dotnet.microsoft.com/download/dotnet/5.0/runtime), and also [Visual C++ x64](https://aka.ms/vs/16/release/vc_redist.x64.exe).

<p align="center">
     <img src="https://raw.githubusercontent.com/Lost-Outpost/lost-legacy/main/images/microsoft-net-5-0-installation.png" >
</p>

## PageFile Configuration

<img align="right" src="https://static.wixstatic.com/media/579922_da459dcbe3be46ad934f5ed3d962eca8~mv2.png/v1/fill/w_384,h_587,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e692b4cc9e2a94f37eec075d05c81bdd2d2a925dbf55944e1d2abfb660ab6d0f.png" alt="image" />

**Bigger NMS modlists** need a lot of memory. **Never disable the pagefile.**

1. Press **Windows + R** → type `sysdm.cpl,3` → **Enter**
2. **Performance** → **Settings** → **Advanced** → **Virtual memory** → **Change…**
3. Disable **Automatically manage...** → **Custom size:** Initial 20480 / Maximum 40960
4. **Set** → **Apply** → **OK** → Restart

---

**THIS IS NOT OPTIONAL, YOU CANNOT SKIP THIS STEP EVEN IF YOU HAVE 256 GB OF RAM.**

## Exclusions and AntiVirus

<img align="right" src="https://static.wixstatic.com/media/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg/v1/fill/w_396,h_478,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg" alt="image" />

- Exclude **1)** `NMS.exe`, **2)** the game folder, and **3)** the shader cache folder from antivirus
- Exclude from Control Flow Guard: Start → **Exploit Protection** → **Program Settings** → Add **NMS.exe** → **Control flow guard (CFG)** → **Override** → **Off**

</div>
<div lang="fr" markdown="1">

> Si l'espace requis vous pose problème, vous pouvez supprimer les téléchargements une fois l'installation terminée.
{: .note }

| Configuration          | CPU        | GPU                 | RAM          | Stockage               | Écran            | FPS  |
|------------------------|------------|---------------------|--------------|------------------------|------------------|------|
| **Config. Minimum**    | i5-7600k   | Nvidia GTX 2060     | 16 Go DDR4   | 500 Go SATA II SSD     | FHD 60 Hz        | 45   |
| **Config. Recommandée**| i7-9700k   | Nvidia RTX 3060 Ti  | 32 Go DDR4   | 1 To SATA III/M.2 SSD  | FHD 60 Hz        | 60+  |
| **Config. de l'Auteur**| i5-10400f  | Nvidia RTX 3090     | 32 Go DDR4   | 1 To M.2 SSD           | 2K 180 Hz        | 60+  |

## Applications Nécessaires et Utiles

Assurez-vous d'avoir la dernière version de .NET installée :
[https://dotnet.microsoft.com/download/dotnet/5.0/runtime](https://dotnet.microsoft.com/download/dotnet/5.0/runtime), ainsi que [Visual C++ x64](https://aka.ms/vs/16/release/vc_redist.x64.exe).

<p align="center">
     <img src="https://raw.githubusercontent.com/Lost-Outpost/lost-legacy/main/images/microsoft-net-5-0-installation.png" >
</p>

## Configuration du Fichier d'Échange

<img align="right" src="https://static.wixstatic.com/media/579922_da459dcbe3be46ad934f5ed3d962eca8~mv2.png/v1/fill/w_384,h_587,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e692b4cc9e2a94f37eec075d05c81bdd2d2a925dbf55944e1d2abfb660ab6d0f.png" alt="image" />

**Les grandes modlists NMS** nécessitent beaucoup de mémoire. **Ne désactivez jamais le fichier d'échange.**

1. **Windows + R** → tapez `sysdm.cpl,3` → **Entrée**
2. **Performances** → **Paramètres** → **Avancé** → **Mémoire virtuelle** → **Modifier…**
3. Désactivez **Gérer automatiquement...** → **Taille personnalisée :** Initial 20480 / Maximum 40960
4. **Définir** → **Appliquer** → **OK** → Redémarrez

---

**CETTE ÉTAPE N'EST PAS OPTIONNELLE, MÊME AVEC 256 GO DE RAM.**

## Exclusions et Antivirus

<img align="right" src="https://static.wixstatic.com/media/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg/v1/fill/w_396,h_478,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg" alt="image" />

- Excluez **1)** `NMS.exe`, **2)** le dossier du jeu, et **3)** le dossier du cache de shaders de votre antivirus
- Excluez du Control Flow Guard : Démarrer → **Protection contre les attaques** → **Paramètres du programme** → Ajoutez **NMS.exe** → **Protection du flux de contrôle (CFG)** → **Remplacer** → **Désactivé**

</div>
