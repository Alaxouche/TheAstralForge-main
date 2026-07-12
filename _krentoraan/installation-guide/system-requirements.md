---
layout: skyground_readme
title: System Requirements
parent: Installation Guide
nav_order: 1
---

<div lang="en" markdown="1">

# System Requirements

## System Requirements

Only Windows 10 and 11 fully support Wabbajack. LTSC, special variants, lightened editions or any other modified variant **WILL NOT WORK**. Your Windows version **must be 21H2 or newer** to run both Wabbajack and Krentoraan.

Running the list from Hard Disk Drives or external drives is **STRONGLY ADVISED AGAINST**. A lot of content is swapped at game run time and, as a result, fast storage and RAM are needed.

As Krentoraan is a modlist based on graphics, you must have a good graphics card.

</div>
<div lang="fr" markdown="1">

# Configuration Requise

## Configuration Requise

Seuls Windows 10 et 11 prennent entièrement en charge Wabbajack. Les variantes LTSC, éditions spéciales, allégées ou toute autre variante modifiée **NE FONCTIONNERONT PAS**. Votre version de Windows **doit être 21H2 ou plus récente** pour faire fonctionner Wabbajack et Krentoraan.

Exécuter la liste depuis des disques durs (HDD) ou des lecteurs externes est **FORTEMENT DÉCONSEILLÉ**. Une grande quantité de contenu est échangée lors de l'exécution du jeu, ce qui nécessite un stockage rapide et de la RAM.

Comme Krentoraan est une modlist axée sur les graphismes, vous devez disposer d'une bonne carte graphique.

</div>

<div class="modlist-size" data-modlist-size data-modlist-source="https://raw.githubusercontent.com/Alaxouche/Krentoraan/main/modlist.json" data-modlist-title="Krentoraan">
  <strong>Space required:</strong>
  <span data-modlist-total>Loading...</span> total,
  including <span data-modlist-install>Loading...</span> for install
  and <span data-modlist-download>Loading...</span> for downloads.
  <span data-modlist-version hidden>Version</span>
</div>

<noscript>
  <p><strong>Space required:</strong> 75 GB total (approx. 50 GB install + 25 GB downloads).</p>
</noscript>

<div lang="en" markdown="1">

> If the space requirement is uncomfortable, remember that you can delete downloads once the list is successfully installed. You can also set your download location to a different drive than the installation location.
{: .note }

| Configuration         | CPU        | GPU                | RAM          | Storage                | Display          | FPS |
|-----------------------|------------|--------------------|--------------|------------------------|------------------|-----|
| **Minimum Specs**     | i5-7600k   | Nvidia GTX 2080    | 16 GB DDR4   | 500 GB SATA II SSD     | FHD 60 Hz        | 45  |
| **Recommended Specs** | i7-9700k   | Nvidia RTX 3060 Ti | 32 GB DDR4   | 1 TB SATA III/M.2 SSD  | FHD 60 Hz        | 60  |
| **Author's Specs**    | i5-10400f  | Nvidia RTX 3090    | 32 GB DDR4   | 1 TB M.2 SSD           | 2K 180 Hz        | 60+ |

## Necessary And Useful Applications

For the modlist to work you must have some apps: Please ensure you have the latest .NET Runtime installed. Download the desktop app installer and console app x64 from Microsoft here:
[https://dotnet.microsoft.com/en-us/download/dotnet/9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0), and also [Visual C++ x64](https://aka.ms/vs/16/release/vc_redist.x64.exe).

<p align="center">
     <img src="https://raw.githubusercontent.com/Lost-Outpost/lost-legacy/main/images/microsoft-net-5-0-installation.png" >
</p>

To help you with the INIs configuration, I highly recommend installing [Sublime Text](https://www.sublimetext.com/)

## PageFile Configuration

<img align="right" src="https://static.wixstatic.com/media/579922_da459dcbe3be46ad934f5ed3d962eca8~mv2.png/v1/fill/w_384,h_587,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e692b4cc9e2a94f37eec075d05c81bdd2d2a925dbf55944e1d2abfb660ab6d0f.png" alt="image" />

**Bigger Skyrim modlists** need a lot of memory, and when there is not enough available it may fail allocating more.

To fix this, you'll want to have a bigger pagefile. A pagefile is a file on your disk Windows will use when there is not enough RAM available.

**Never disable the pagefile** – this may lead to various issues on your system. If you've never touched the pagefile, try performing the following steps:

1. Press **Windows + R** on your keyboard
2. Type `sysdm.cpl,3`
3. Press **Enter**
4. Under the **Performance** section, press **Settings**
5. Click the **Advanced** tab at the top
6. At the **Virtual memory** section press **Change…**
7. Disable **Automatically manage paging file size for all drives**
8. Click **Custom size:**
   - **Initial size (MB):** 20480
   - **Maximum size (MB):** 40960
9. Click **Set**
10. Click **Apply** & **OK**
11. Press **Yes** to restart
12. Restart your computer

---

**THIS IS NOT OPTIONAL, YOU CANNOT SKIP THIS STEP EVEN IF YOU HAVE 256 GB OF RAM.**

## Exclusions and AntiVirus

<img align="right" src="https://static.wixstatic.com/media/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg/v1/fill/w_396,h_478,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg" alt="image" />

- Exclude **1)** `gamename.exe`, **2)** the game folder, and **3)** the shader cache folder from Windows Defender (or other) antivirus
- Also exclude the game from Control Flow Guard:
  1. Click **Start** → Type **Exploit Protection** → **Program Settings**
  2. Click **Add program to customize** → **Add by program name**
  3. Type **SKSE64_Loader.exe**
  4. Scroll to **Control flow guard (CFG)** → **Override** → **Off**

---

</div>
<div lang="fr" markdown="1">

> Si l'espace requis vous pose problème, sachez que vous pouvez supprimer les téléchargements une fois la liste installée avec succès. Vous pouvez également définir un emplacement de téléchargement sur un lecteur différent.
{: .note }

| Configuration          | CPU        | GPU                 | RAM          | Stockage               | Écran            | FPS |
|------------------------|------------|---------------------|--------------|------------------------|------------------|-----|
| **Config. Minimum**    | i5-7600k   | Nvidia GTX 2080     | 16 Go DDR4   | 500 Go SATA II SSD     | FHD 60 Hz        | 45  |
| **Config. Recommandée**| i7-9700k   | Nvidia RTX 3060 Ti  | 32 Go DDR4   | 1 To SATA III/M.2 SSD  | FHD 60 Hz        | 60  |
| **Config. de l'Auteur**| i5-10400f  | Nvidia RTX 3090     | 32 Go DDR4   | 1 To M.2 SSD           | 2K 180 Hz        | 60+ |

## Applications Nécessaires et Utiles

Pour que la modlist fonctionne, vous devez disposer de certaines applications. Veuillez vous assurer que le dernier runtime .NET est installé. Téléchargez depuis Microsoft :
[https://dotnet.microsoft.com/en-us/download/dotnet/9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0), ainsi que [Visual C++ x64](https://aka.ms/vs/16/release/vc_redist.x64.exe).

<p align="center">
     <img src="https://raw.githubusercontent.com/Lost-Outpost/lost-legacy/main/images/microsoft-net-5-0-installation.png" >
</p>

Pour la configuration des INIs, je recommande vivement d'installer [Sublime Text](https://www.sublimetext.com/)

## Configuration du Fichier d'Échange (PageFile)

<img align="right" src="https://static.wixstatic.com/media/579922_da459dcbe3be46ad934f5ed3d962eca8~mv2.png/v1/fill/w_384,h_587,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e692b4cc9e2a94f37eec075d05c81bdd2d2a925dbf55944e1d2abfb660ab6d0f.png" alt="image" />

**Les grandes modlists Skyrim** ont besoin de beaucoup de mémoire. Un fichier d'échange plus grand est nécessaire. **Ne désactivez jamais le fichier d'échange.** Si vous ne l'avez jamais modifié, suivez ces étapes :

1. Appuyez sur **Windows + R** → tapez `sysdm.cpl,3` → **Entrée**
2. Dans **Performances** → **Paramètres** → onglet **Avancé** → **Mémoire virtuelle** → **Modifier…**
3. Désactivez **Gérer automatiquement...**
4. Cliquez sur **Taille personnalisée :** : Initial 20480 Mo / Maximum 40960 Mo
5. **Définir** → **Appliquer** → **OK** → Redémarrez

---

**CETTE ÉTAPE N'EST PAS OPTIONNELLE, MÊME AVEC 256 GO DE RAM.**

## Exclusions et Antivirus

<img align="right" src="https://static.wixstatic.com/media/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg/v1/fill/w_396,h_478,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/579922_1d3150dfc46844dfaf1d657e56c723d3~mv2.jpg" alt="image" />

- Excluez **1)** `gamename.exe`, **2)** le dossier du jeu, et **3)** le dossier du cache de shaders de votre antivirus
- Excluez également le jeu du Control Flow Guard :
  1. Démarrer → **Protection contre les attaques** → **Paramètres du programme**
  2. **Ajouter un programme** → **Par nom** → tapez **SKSE64_Loader.exe**
  3. Descendez jusqu'à **Protection du flux de contrôle (CFG)** → **Remplacer** → **Désactivé**

---

</div>
